
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { paymentService, PaymentPlan } from '@/services/paymentService';
import { Loader2, CreditCard, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PaymentPlan;
}

const SubscriptionDialog = ({ open, onOpenChange, plan }: SubscriptionDialogProps) => {
  const { user } = useAuth();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for paid plans
    if (plan.price > 0 && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to subscribe to a plan",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    const success = await paymentService.processSubscription(plan.id, user.id);
    
    setIsProcessing(false);
    
    if (success) {
      // Reset form
      setCardNumber('');
      setCardName('');
      setCardExpiry('');
      setCardCvv('');
      onOpenChange(false);
    }
  };

  // Check if user is already subscribed to this plan
  const isCurrentPlan = user && paymentService.getUserSubscription(user.id) === plan.id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to {plan.name}</DialogTitle>
          <DialogDescription>
            {isCurrentPlan 
              ? "You are currently subscribed to this plan" 
              : plan.price > 0 
                ? `₹${plan.price}/${plan.interval} subscription plan` 
                : 'Free plan - no payment required'}
          </DialogDescription>
        </DialogHeader>
        
        {isCurrentPlan ? (
          <div className="py-6 space-y-4">
            <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
              <Check className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="font-medium">Active Subscription</h4>
                <p className="text-sm text-muted-foreground">You are already subscribed to this plan</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-4 py-4">
            {plan.price > 0 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      type="password"
                      placeholder="***"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={3}
                    />
                  </div>
                </div>
                
                {plan.includesExpertCalls && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm flex items-start">
                      <Check className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                      <span>
                        Includes free expert consultations, no additional payment required
                      </span>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center space-y-3">
                <p className="text-muted-foreground">
                  Click the button below to activate your free subscription.
                </p>
                {!plan.includesExpertCalls && (
                  <p className="text-sm text-muted-foreground">
                    Note: Expert consultations are not included in the free plan and will require payment.
                  </p>
                )}
              </div>
            )}
            
            <DialogFooter>
              <Button type="submit" disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : plan.price > 0 ? (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe - ₹{plan.price}/{plan.interval}
                  </>
                ) : (
                  'Activate Free Plan'
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
