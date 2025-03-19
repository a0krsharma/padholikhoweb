import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut,
  UserCredential,
  User,
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-A1HYDwm9Qoz9oPnOC3mEk9e_glyat2M",
  authDomain: "padholikhoweb.firebaseapp.com",
  projectId: "padholikhoweb",
  storageBucket: "padholikhoweb.firebasestorage.app",
  messagingSenderId: "800408278183",
  appId: "1:800408278183:web:6e7df826727937ea817782",
  measurementId: "G-EEEYBCZ772"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth with appropriate persistence based on platform
export let auth;

// Check if we're running in a web environment
const isWeb = typeof document !== 'undefined';

if (isWeb) {
  // Use standard getAuth for web environments
  auth = getAuth(firebaseApp);
} else {
  // Use initializeAuth with AsyncStorage persistence for React Native
  try {
    auth = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  } catch (error) {
    // Fallback to standard auth if there's an error
    console.warn('Falling back to standard auth:', error);
    auth = getAuth(firebaseApp);
  }
}

export const firestore = getFirestore(firebaseApp);
export const db = firestore; // Alias for consistency
export const storage = getStorage(firebaseApp);

export type UserRole = 'student' | 'teacher' | 'parent';

// Auth Service
export class FirebaseAuthService {
  // Get current user
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Sign up with email and password
  static async signUpWithEmail(
    email: string,
    password: string,
    role: UserRole
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        email,
        role,
        createdAt: serverTimestamp(),
      });
      
      return userCredential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  // Sign in with email and password
  static async signInWithEmail(
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(profileData: { displayName?: string; photoURL?: string }): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');
      
      await updateProfile(user, profileData);
      
      // Update profile in Firestore as well
      await setDoc(
        doc(firestore, 'users', user.uid),
        { 
          displayName: profileData.displayName,
          photoURL: profileData.photoURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Check if user exists
  static async getUserRole(uid: string): Promise<UserRole | null> {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data().role as UserRole;
      }
      return null;
    } catch (error) {
      console.error('Error getting user role:', error);
      throw error;
    }
  }
}

// Firestore Service for general operations
export class FirestoreService {
  // Get document by ID
  static async getDocument(collectionName: string, docId: string): Promise<any> {
    try {
      const docRef = doc(firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting ${collectionName} document:`, error);
      throw error;
    }
  }
  
  // Add document to collection
  static async addDocument(collectionName: string, data: any, docId?: string): Promise<string> {
    try {
      const docRef = docId 
        ? doc(firestore, collectionName, docId) 
        : doc(collection(firestore, collectionName));
        
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error(`Error adding ${collectionName} document:`, error);
      throw error;
    }
  }
  
  // Update document
  static async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    try {
      const docRef = doc(firestore, collectionName, docId);
      
      await setDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error(`Error updating ${collectionName} document:`, error);
      throw error;
    }
  }
  
  // Query collection
  static async queryCollection(collectionName: string, fieldPath: string, value: any): Promise<any[]> {
    try {
      const q = query(collection(firestore, collectionName), where(fieldPath, '==', value));
      const querySnapshot = await getDocs(q);
      
      const results: any[] = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      
      return results;
    } catch (error) {
      console.error(`Error querying ${collectionName} collection:`, error);
      throw error;
    }
  }
}

// Storage Service
export class StorageService {
  // Upload file
  static async uploadFile(filePath: string, file: Blob): Promise<string> {
    try {
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  
  // Get file URL
  static async getFileURL(filePath: string): Promise<string> {
    try {
      const storageRef = ref(storage, filePath);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  }
} 