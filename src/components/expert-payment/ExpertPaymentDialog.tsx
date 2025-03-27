
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { paymentService, ExpertPayment, paymentDetails } from '@/services/paymentService';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import ExpertPaymentForm from './ExpertPaymentForm';
import CompletedPayment from './CompletedPayment';

interface ExpertPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expert: {
    id: number;
    name: string;
    rate: number;
  };
}

const ExpertPaymentDialog = ({ open, onOpenChange, expert }: ExpertPaymentDialogProps) => {
  const { user } = useAuth();
  const [duration, setDuration] = useState(paymentDetails.minDuration);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const hasSubscriptionAccess = user ? paymentService.hasExpertCallAccess(user.id) : false;
  const totalAmount = expert.rate * duration;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for paid users
    if (!hasSubscriptionAccess) {
      if (paymentMethod === 'card' && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
        toast({
          title: "Missing Information",
          description: "Please fill in all card details",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (duration < paymentDetails.minDuration) {
      toast({
        title: "Invalid Duration",
        description: `Minimum consultation duration is ${paymentDetails.minDuration} minutes`,
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    const paymentInfo: ExpertPayment = {
      expertId: expert.id,
      expertName: expert.name,
      amount: totalAmount,
      duration: duration,
      contactNumber: paymentDetails.contactNumber,
      paymentMethod: paymentMethod
    };
    
    const success = await paymentService.processExpertPayment(paymentInfo, user?.id || 'guest');
    
    setIsProcessing(false);
    
    if (success) {
      // Reset form
      setCardNumber('');
      setCardName('');
      setCardExpiry('');
      setCardCvv('');
      setPaymentComplete(true);
    }
  };

  const handleCallExpert = () => {
    if (!paymentComplete && !hasSubscriptionAccess) {
      toast({
        title: "Payment Required",
        description: "Please complete the payment before calling the expert",
        variant: "destructive"
      });
      return;
    }
    
    window.location.href = `tel:${paymentDetails.contactNumber}`;
  };

  const handleClose = () => {
    if (paymentComplete) {
      setPaymentComplete(false);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Expert Session</DialogTitle>
          <DialogDescription>
            {hasSubscriptionAccess 
              ? "Your subscription includes expert consultations" 
              : `Book a consultation with ${expert.name} at ₹${expert.rate}/min`}
          </DialogDescription>
        </DialogHeader>
        
        {paymentComplete ? (
          <CompletedPayment handleCallExpert={handleCallExpert} />
        ) : (
          <ExpertPaymentForm 
            hasSubscriptionAccess={hasSubscriptionAccess}
            duration={duration}
            setDuration={setDuration}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            totalAmount={totalAmount}
            isProcessing={isProcessing}
            handlePayment={handlePayment}
            handleCallExpert={handleCallExpert}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardName={cardName}
            setCardName={setCardName}
            cardExpiry={cardExpiry}
            setCardExpiry={setCardExpiry}
            cardCvv={cardCvv}
            setCardCvv={setCardCvv}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExpertPaymentDialog;
