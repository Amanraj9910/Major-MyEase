
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { dbService } from "./dbService";

// Define the payment plans
export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  interval?: 'month' | 'year';
  features: string[];
  includesExpertCalls: boolean;
}

// Expert payment interface
export interface ExpertPayment {
  expertId: number;
  expertName: string;
  amount: number;
  duration: number; // in minutes
  contactNumber: string;
  paymentMethod: 'upi' | 'card';
  timestamp?: Date;
}

// Payment details configuration
export const paymentDetails = {
  upiId: "rajaman78167@axl", // Updated UPI ID
  contactNumber: "9910772433", // Contact number for experts
  minDuration: 2, // Minimum duration in minutes
  qrImageUrl: "/lovable-uploads/4985d0e0-20cc-4f07-9ff1-292e0fdb0201.png" // PhonePe QR code
};

// Mock subscription plans - in a real app, these would come from your backend
export const subscriptionPlans: PaymentPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: [
      'Basic process guides',
      'Limited document templates',
      'Community support',
      '5 AI queries per month',
      'Basic document generation'
    ],
    includesExpertCalls: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 299,
    interval: 'month',
    features: [
      'All Basic features',
      'Unlimited process guides',
      '50 AI queries per month',
      'Priority email support',
      'Step-by-step assistance',
      'Document verification checks',
      'Free expert consultations'
    ],
    includesExpertCalls: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 999,
    interval: 'month',
    features: [
      'All Premium features',
      'Unlimited AI queries',
      'Dedicated account manager',
      'Custom document templates',
      'Bulk application processing',
      'API access',
      'Advanced analytics',
      'Priority expert consultations'
    ],
    includesExpertCalls: true
  }
];

// Payment gateway service
class PaymentService {
  // Store active subscriptions
  private activeSubscriptions: Record<string, string> = {};
  
  // Get user's active subscription
  getUserSubscription(userId: string): string | null {
    return this.activeSubscriptions[userId] || null;
  }
  
  // Check if user can access free expert calls
  hasExpertCallAccess(userId: string): boolean {
    const subscriptionId = this.getUserSubscription(userId);
    if (!subscriptionId) return false;
    
    const plan = subscriptionPlans.find(p => p.id === subscriptionId);
    return plan?.includesExpertCalls || false;
  }
  
  // Process subscription payment
  async processSubscription(planId: string, userId: string): Promise<boolean> {
    try {
      // In a real implementation, this would call your payment processor API
      console.log(`Processing subscription payment for plan: ${planId} for user: ${userId}`);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get the plan details
      const plan = subscriptionPlans.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Invalid plan selected');
      }
      
      // Store the user's subscription
      this.activeSubscriptions[userId] = planId;
      
      // Save to local storage for persistence across sessions
      this.saveSubscriptionsToStorage();
      
      // Store payment record in database
      await dbService.savePayment({
        userId,
        type: 'subscription',
        planId,
        amount: plan.price,
        paymentMethod: 'card'
      });
      
      // Simulate successful payment
      toast({
        title: "Subscription Activated",
        description: "Your subscription has been successfully activated.",
      });
      
      return true;
    } catch (error) {
      console.error('Error processing subscription payment:', error);
      
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  }
  
  // Process expert consultation payment
  async processExpertPayment(payment: ExpertPayment, userId: string): Promise<boolean> {
    try {
      // Check if user has subscription that includes expert calls
      if (this.hasExpertCallAccess(userId)) {
        console.log(`User ${userId} has subscription with free expert calls, skipping payment`);
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Store consultation record in database (amount = 0 for subscription users)
        await dbService.savePayment({
          userId,
          type: 'expert',
          expertId: payment.expertId,
          amount: 0, // Free for subscription users
          paymentMethod: payment.paymentMethod
        });
        
        toast({
          title: "Expert Call Access Granted",
          description: `Your subscription includes expert consultations. Your session with ${payment.expertName} has been booked.`,
        });
        
        return true;
      }
      
      // Process regular payment
      console.log(`Processing expert payment: ${payment.expertName}, ₹${payment.amount} for user: ${userId}`);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store payment record in database
      await dbService.savePayment({
        userId,
        type: 'expert',
        expertId: payment.expertId,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod
      });
      
      // Simulate successful payment
      toast({
        title: "Payment Successful",
        description: `Your session with ${payment.expertName} has been booked. They will call you shortly on your registered number.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error processing expert payment:', error);
      
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  }
  
  // Save subscriptions to localStorage for persistence
  private saveSubscriptionsToStorage(): void {
    localStorage.setItem('userSubscriptions', JSON.stringify(this.activeSubscriptions));
  }
  
  // Load subscriptions from localStorage
  loadSubscriptionsFromStorage(): void {
    const stored = localStorage.getItem('userSubscriptions');
    if (stored) {
      this.activeSubscriptions = JSON.parse(stored);
    }
  }
}

export const paymentService = new PaymentService();

// Initialize subscriptions from storage
paymentService.loadSubscriptionsFromStorage();
