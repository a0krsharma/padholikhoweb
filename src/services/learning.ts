import { 
  db, 
  storage 
} from './firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs,
  query, 
  where, 
  arrayUnion, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export interface LiveClass {
  id: string;
  sessionId: string;
  teacherId: string;
  studentIds: string[];
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'ongoing' | 'completed';
  subject: string;
  topic: string;
  recordingURL?: string;
  whiteboardData?: any;
  chatMessages: {
    id: string;
    userId: string;
    message: string;
    timestamp: Date;
  }[];
}

export interface Assignment {
  id: string;
  sessionId: string;
  teacherId: string;
  title: string;
  description: string;
  dueDate: Date;
  attachments: {
    name: string;
    url: string;
    type: string;
  }[];
  submissions: {
    studentId: string;
    submittedAt: Date;
    files: {
      name: string;
      url: string;
    }[];
    grade?: number;
    feedback?: string;
  }[];
}

export interface Assessment {
  id: string;
  sessionId: string;
  teacherId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: {
    id: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    question: string;
    options?: string[];
    correctAnswer: string;
    points: number;
  }[];
  results: {
    studentId: string;
    score: number;
    answers: {
      questionId: string;
      answer: string;
      isCorrect: boolean;
    }[];
    submittedAt: Date;
  }[];
}

export const LearningService = {
  // Live Class Management
  async createLiveClass(classData: Omit<LiveClass, 'id'>) {
    try {
      const liveClassesRef = collection(db, 'liveClasses');
      const docRef = await addDoc(liveClassesRef, {
        ...classData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  async updateLiveClass(classId: string, updates: Partial<LiveClass>) {
    try {
      const liveClassRef = doc(db, 'liveClasses', classId);
      await updateDoc(liveClassRef, updates);
      return true;
    } catch (error) {
      throw error;
    }
  },

  async getLiveClass(classId: string): Promise<LiveClass | null> {
    try {
      const liveClassRef = doc(db, 'liveClasses', classId);
      const docSnap = await getDoc(liveClassRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as LiveClass : null;
    } catch (error) {
      throw error;
    }
  },

  // Assignment Management
  async createAssignment(assignmentData: Omit<Assignment, 'id'>) {
    try {
      const assignmentsRef = collection(db, 'assignments');
      const docRef = await addDoc(assignmentsRef, {
        ...assignmentData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  async submitAssignment(assignmentId: string, submission: {
    studentId: string;
    files: { name: string; url: string }[];
  }) {
    try {
      const assignmentRef = doc(db, 'assignments', assignmentId);

      await updateDoc(assignmentRef, {
        submissions: arrayUnion({
          ...submission,
          submittedAt: serverTimestamp(),
        }),
      });
      return true;
    } catch (error) {
      throw error;
    }
  },

  async gradeAssignment(assignmentId: string, studentId: string, grade: number, feedback: string) {
    try {
      const assignmentRef = doc(db, 'assignments', assignmentId);
      const assignmentSnap = await getDoc(assignmentRef);
      
      if (!assignmentSnap.exists()) {
        throw new Error('Assignment not found');
      }
      
      const assignmentData = assignmentSnap.data();
      const submissions = assignmentData?.submissions || [];
      
      const updatedSubmissions = submissions.map((submission: any) => {
        if (submission.studentId === studentId) {
          return {
            ...submission,
            grade,
            feedback,
          };
        }
        return submission;
      });

      await updateDoc(assignmentRef, { submissions: updatedSubmissions });
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Assessment Management
  async createAssessment(assessmentData: Omit<Assessment, 'id'>) {
    try {
      const assessmentsRef = collection(db, 'assessments');
      const docRef = await addDoc(assessmentsRef, {
        ...assessmentData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  async submitAssessment(assessmentId: string, submission: {
    studentId: string;
    answers: { questionId: string; answer: string; isCorrect: boolean }[];
  }) {
    try {
      const assessmentRef = doc(db, 'assessments', assessmentId);
      const assessmentSnap = await getDoc(assessmentRef);
      
      if (!assessmentSnap.exists()) {
        throw new Error('Assessment not found');
      }
      
      const assessmentData = assessmentSnap.data();
      const questions = assessmentData?.questions || [];
      
      // Calculate score
      const score = submission.answers.reduce((acc, curr) => {
        const question = questions.find((q: any) => q.id === curr.questionId);
        return acc + (curr.isCorrect ? question.points : 0);
      }, 0);

      await updateDoc(assessmentRef, {
        results: arrayUnion({
          ...submission,
          score,
          submittedAt: serverTimestamp(),
        }),
      });
      return score;
    } catch (error) {
      throw error;
    }
  },

  // File Upload
  async uploadFile(file: any, path: string) {
    try {
      const storageRef = ref(storage, path);
      await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      throw error;
    }
  },

  // Get Student Progress
  async getStudentProgress(studentId: string, sessionId: string) {
    try {
      const assignmentsRef = collection(db, 'assignments');
      const assignmentsQuery = query(assignmentsRef, where('sessionId', '==', sessionId));
      const assignmentsSnapshot = await getDocs(assignmentsQuery);

      const assessmentsRef = collection(db, 'assessments');
      const assessmentsQuery = query(assessmentsRef, where('sessionId', '==', sessionId));
      const assessmentsSnapshot = await getDocs(assessmentsQuery);

      const assignmentProgress = assignmentsSnapshot.docs.map(doc => {
        const data = doc.data();
        const submission = data.submissions?.find((s: any) => s.studentId === studentId);
        return {
          id: doc.id,
          title: data.title,
          status: submission ? 'completed' : 'pending',
          grade: submission?.grade,
        };
      });

      const assessmentProgress = assessmentsSnapshot.docs.map(doc => {
        const data = doc.data();
        const result = data.results?.find((r: any) => r.studentId === studentId);
        return {
          id: doc.id,
          title: data.title,
          status: result ? 'completed' : 'pending',
          score: result?.score,
        };
      });

      return {
        assignments: assignmentProgress,
        assessments: assessmentProgress,
      };
    } catch (error) {
      throw error;
    }
  },
}; 