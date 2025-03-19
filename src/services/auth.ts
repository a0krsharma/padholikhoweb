import { FirebaseAuthService, UserRole } from './firebase';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Register web browser for Google Sign In
WebBrowser.maybeCompleteAuthSession();

export const AuthService = {
  // Email/Password Authentication
  async signUpWithEmail(email: string, password: string, userType: UserRole) {
    try {
      const userCredential = await FirebaseAuthService.signUpWithEmail(email, password, userType);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  async signInWithEmail(email: string, password: string) {
    try {
      const userCredential = await FirebaseAuthService.signInWithEmail(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Google Sign-In
  // This is a placeholder - Google Sign-in with Expo requires additional setup
  // and configuration with expo-auth-session
  async signInWithGoogle() {
    try {
      // This is a placeholder - in a real implementation you would:
      // 1. Set up Google OAuth client ID in your Google Cloud Console
      // 2. Configure expo-auth-session with the proper client IDs
      // 3. Implement the full OAuth flow with state management
      
      // For demonstration, we'll just throw an error for now
      throw new Error('Google Sign In not implemented yet. Please use email/password authentication.');
    } catch (error) {
      throw error;
    }
  },

  // Sign Out
  async signOut() {
    try {
      await FirebaseAuthService.signOut();
    } catch (error) {
      throw error;
    }
  },

  // Get Current User
  getCurrentUser() {
    return FirebaseAuthService.getCurrentUser();
  },

  // Update Profile
  async updateProfile(data: {
    displayName?: string;
    photoURL?: string;
  }) {
    try {
      await FirebaseAuthService.updateProfile(data);
      return this.getCurrentUser();
    } catch (error) {
      throw error;
    }
  },
}; 