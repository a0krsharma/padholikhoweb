import { db } from './firebase';
import { 
  doc, 
  collection, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  runTransaction, 
  increment 
} from 'firebase/firestore';
import { Platform } from 'react-native';

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  timestamp: Date;
  sessionId?: string;
  teacherId?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  teacherId: string;
  sessionId: string;
  plan: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  amount: number;
  status: 'active' | 'cancelled' | 'expired';
  autoRenew: boolean;
}

export interface Wallet {
  userId: string;
  balance: number;
  currency: string;
  lastUpdated: Date;
}

export const PaymentService = {
  // Wallet Management
  async getWallet(userId: string): Promise<Wallet | null> {
    try {
      const walletRef = doc(db, 'wallets', userId);
      const docSnap = await getDoc(walletRef);
      return docSnap.exists() ? docSnap.data() as Wallet : null;
    } catch (error) {
      throw error;
    }
  },

  async updateWallet(userId: string, amount: number, type: 'add' | 'subtract') {
    try {
      const walletRef = doc(db, 'wallets', userId);

      await runTransaction(db, async (transaction) => {
        const walletDoc = await transaction.get(walletRef);
        const currentBalance = walletDoc.data()?.balance || 0;
        const newBalance = type === 'add' 
          ? currentBalance + amount 
          : currentBalance - amount;

        if (type === 'subtract' && newBalance < 0) {
          throw new Error('Insufficient funds');
        }

        transaction.update(walletRef, {
          balance: newBalance,
          lastUpdated: serverTimestamp(),
        });
      });

      return true;
    } catch (error) {
      throw error;
    }
  },

  // Transaction Management
  async createTransaction(transactionData: Omit<Transaction, 'id'>) {
    try {
      const transactionsRef = collection(db, 'transactions');
      const docRef = await addDoc(transactionsRef, {
        ...transactionData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  async getTransactions(userId: string) {
    try {
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(
        transactionsRef,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      
      const snapshot = await getDocs(transactionsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Subscription Management
  async createSubscription(subscriptionData: Omit<Subscription, 'id'>) {
    try {
      const subscriptionsRef = collection(db, 'subscriptions');
      const docRef = await addDoc(subscriptionsRef, {
        ...subscriptionData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  async cancelSubscription(subscriptionId: string) {
    try {
      const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
      await updateDoc(subscriptionRef, {
        status: 'cancelled',
        autoRenew: false,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Payment Processing
  async processPayment(paymentData: {
    userId: string;
    amount: number;
    sessionId: string;
    teacherId: string;
  }) {
    try {
      const { userId, amount, sessionId, teacherId } = paymentData;

      // Create transaction record
      const transactionId = await this.createTransaction({
        userId,
        type: 'payment',
        amount,
        status: 'pending',
        description: `Payment for session ${sessionId}`,
        timestamp: new Date(),
        sessionId,
        teacherId,
      });

      // Process payment (integrate with payment gateway)
      // This is a mock implementation
      const paymentSuccess = await this.mockPaymentGateway(amount);

      if (paymentSuccess) {
        // Update transaction status
        const transactionRef = doc(db, 'transactions', transactionId);
        await updateDoc(transactionRef, { status: 'completed' });

        // Update teacher's earnings
        const teacherRef = doc(db, 'teachers', teacherId);
        await updateDoc(teacherRef, {
          earnings: increment(amount * 0.8), // 80% goes to teacher
        });

        return true;
      } else {
        // Update transaction status
        const transactionRef = doc(db, 'transactions', transactionId);
        await updateDoc(transactionRef, { status: 'failed' });

        throw new Error('Payment failed');
      }
    } catch (error) {
      throw error;
    }
  },

  // Mock payment gateway (replace with actual payment gateway integration)
  private async mockPaymentGateway(amount: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Simulate successful payment
      }, 1000);
    });
  },

  // Get payment history
  async getPaymentHistory(userId: string) {
    try {
      const transactions = await this.getTransactions(userId);
      
      const subscriptionsRef = collection(db, 'subscriptions');
      const subscriptionsQuery = query(
        subscriptionsRef,
        where('userId', '==', userId),
        orderBy('startDate', 'desc')
      );
      
      const subscriptionsSnapshot = await getDocs(subscriptionsQuery);

      return {
        transactions,
        subscriptions: subscriptionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })),
      };
    } catch (error) {
      throw error;
    }
  },

  // Get teacher earnings
  async getTeacherEarnings(teacherId: string) {
    try {
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(
        transactionsRef,
        where('teacherId', '==', teacherId),
        where('type', '==', 'payment'),
        where('status', '==', 'completed')
      );
      
      const snapshot = await getDocs(transactionsQuery);

      const earnings = snapshot.docs.reduce((acc, doc) => {
        const data = doc.data();
        return acc + (data.amount * 0.8); // 80% goes to teacher
      }, 0);

      return earnings;
    } catch (error) {
      throw error;
    }
  },
}; 