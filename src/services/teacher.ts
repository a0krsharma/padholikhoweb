import { 
  db, 
  storage, 
  StorageService, 
  FirestoreService 
} from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoURL: string;
  subjects: string[];
  classes: number[];
  languages: string[];
  experience: number;
  education: string[];
  hourlyRate: {
    oneToOne: number;
    oneToTwo: number;
    oneToFive: number;
    oneToTen: number;
  };
  rating: number;
  totalReviews: number;
  bio: string;
  availability: {
    [key: string]: {
      start: string;
      end: string;
    }[];
  };
  qualifications: {
    degree: string;
    institution: string;
    year: number;
    certificateURL: string;
  }[];
  isVerified: boolean;
}

export const TeacherService = {
  // Create or update teacher profile
  async updateProfile(teacherId: string, profileData: Partial<TeacherProfile>) {
    try {
      const teacherDocRef = doc(db, 'teachers', teacherId);
      await setDoc(teacherDocRef, profileData, { merge: true });
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Get teacher profile
  async getProfile(teacherId: string): Promise<TeacherProfile | null> {
    try {
      const teacherDocRef = doc(db, 'teachers', teacherId);
      const docSnap = await getDoc(teacherDocRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as TeacherProfile : null;
    } catch (error) {
      throw error;
    }
  },

  // Update availability
  async updateAvailability(teacherId: string, availability: TeacherProfile['availability']) {
    try {
      const teacherDocRef = doc(db, 'teachers', teacherId);
      await updateDoc(teacherDocRef, { availability });
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Upload qualification documents
  async uploadQualification(teacherId: string, file: any, qualification: string) {
    try {
      const storageRef = ref(storage, `qualifications/${teacherId}/${qualification}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      throw error;
    }
  },

  // Search teachers with filters
  async searchTeachers(filters: {
    subjects?: string[];
    classes?: number[];
    languages?: string[];
    minRating?: number;
    maxPrice?: number;
  }) {
    try {
      // Start with a basic collection reference
      const teachersRef = collection(db, 'teachers');
      
      // Build queries - note that Firestore web SDK can't do multiple 'array-contains-any' filters in one query
      // For complex filtering, we'll need to do it in code
      let teachersQuery;
      
      if (filters.subjects?.length) {
        teachersQuery = query(teachersRef, where('subjects', 'array-contains-any', filters.subjects));
      } else if (filters.minRating) {
        teachersQuery = query(teachersRef, where('rating', '>=', filters.minRating));
      } else {
        teachersQuery = query(teachersRef);
      }
      
      const snapshot = await getDocs(teachersQuery);
      let results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Apply additional filters in memory if needed
      if (filters.classes?.length) {
        results = results.filter(teacher => 
          teacher.classes.some((cls: number) => filters.classes?.includes(cls))
        );
      }
      
      if (filters.languages?.length) {
        results = results.filter(teacher => 
          teacher.languages.some((lang: string) => filters.languages?.includes(lang))
        );
      }
      
      if (filters.maxPrice) {
        results = results.filter(teacher => teacher.hourlyRate.oneToOne <= filters.maxPrice);
      }
      
      return results;
    } catch (error) {
      throw error;
    }
  },

  // Get teacher's sessions
  async getSessions(teacherId: string) {
    try {
      const sessionsRef = collection(db, 'sessions');
      const sessionsQuery = query(sessionsRef, where('teacherId', '==', teacherId));
      const snapshot = await getDocs(sessionsQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Update session status
  async updateSessionStatus(sessionId: string, status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled') {
    try {
      const sessionDocRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionDocRef, { status });
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Get teacher's reviews
  async getReviews(teacherId: string) {
    try {
      const reviewsRef = collection(db, 'reviews');
      const reviewsQuery = query(
        reviewsRef, 
        where('teacherId', '==', teacherId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(reviewsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Add review
  async addReview(teacherId: string, review: {
    studentId: string;
    rating: number;
    comment: string;
  }) {
    try {
      const reviewsRef = collection(db, 'reviews');
      const newReview = {
        teacherId,
        ...review,
        createdAt: serverTimestamp()
      };
      
      const reviewDoc = await addDoc(reviewsRef, newReview);

      // Update teacher's rating
      const reviews = await this.getReviews(teacherId);
      const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
      
      const teacherDocRef = doc(db, 'teachers', teacherId);
      await updateDoc(teacherDocRef, {
        rating: averageRating,
        totalReviews: reviews.length
      });

      return reviewDoc.id;
    } catch (error) {
      throw error;
    }
  }
}; 