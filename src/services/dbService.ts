// Mock MongoDB service for storing user data
// In a real application, this would connect to an actual MongoDB instance

// Interfaces for data models
export interface UserData {
  id: string;
  name: string;
  email: string;
  picture?: string;
  authProvider?: 'email' | 'google';
  createdAt: Date;
  lastLogin: Date;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  type: 'subscription' | 'expert';
  planId?: string;
  expertId?: number;
  amount: number;
  timestamp: Date;
  paymentMethod: 'card' | 'upi';
}

export interface SearchRecord {
  id: string;
  userId: string;
  query: string;
  timestamp: Date;
  results?: any;
}

// Mock database collections
class DatabaseService {
  private users: UserData[] = [];
  private payments: PaymentRecord[] = [];
  private searches: SearchRecord[] = [];
  
  constructor() {
    this.loadFromLocalStorage();
  }
  
  // User methods
  async saveUser(userData: Omit<UserData, 'id' | 'createdAt'>): Promise<UserData> {
    const existingUser = this.users.find(u => u.email === userData.email);
    
    if (existingUser) {
      // Update existing user
      existingUser.lastLogin = new Date();
      this.saveToLocalStorage();
      return existingUser;
    }
    
    // Create new user
    const newUser: UserData = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    this.users.push(newUser);
    this.saveToLocalStorage();
    return newUser;
  }
  
  async getUser(userId: string): Promise<UserData | null> {
    return this.users.find(u => u.id === userId) || null;
  }
  
  // Payment methods
  async savePayment(paymentData: Omit<PaymentRecord, 'id' | 'timestamp'>): Promise<PaymentRecord> {
    const newPayment: PaymentRecord = {
      id: `payment_${Date.now()}`,
      ...paymentData,
      timestamp: new Date()
    };
    
    this.payments.push(newPayment);
    this.saveToLocalStorage();
    return newPayment;
  }
  
  async getUserPayments(userId: string): Promise<PaymentRecord[]> {
    return this.payments.filter(p => p.userId === userId);
  }
  
  // Search methods
  async saveSearch(searchData: Omit<SearchRecord, 'id' | 'timestamp'>): Promise<SearchRecord> {
    const newSearch: SearchRecord = {
      id: `search_${Date.now()}`,
      ...searchData,
      timestamp: new Date()
    };
    
    this.searches.push(newSearch);
    this.saveToLocalStorage();
    return newSearch;
  }
  
  async getUserSearches(userId: string): Promise<SearchRecord[]> {
    return this.searches.filter(s => s.userId === userId);
  }
  
  // Persistence helpers
  private saveToLocalStorage() {
    localStorage.setItem('db_users', JSON.stringify(this.users));
    localStorage.setItem('db_payments', JSON.stringify(this.payments));
    localStorage.setItem('db_searches', JSON.stringify(this.searches));
  }
  
  private loadFromLocalStorage() {
    try {
      const users = localStorage.getItem('db_users');
      const payments = localStorage.getItem('db_payments');
      const searches = localStorage.getItem('db_searches');
      
      if (users) {
        this.users = JSON.parse(users);
      }
      
      if (payments) {
        this.payments = JSON.parse(payments);
      }
      
      if (searches) {
        this.searches = JSON.parse(searches);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }
}

export const dbService = new DatabaseService();
