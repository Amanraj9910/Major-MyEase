
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { paymentDetails } from '@/services/paymentService';
import { Check, IndianRupee, Loader2, Phone } from 'lucide-react';
import UpiPaymentMethod from './UpiPaymentMethod';
import CardPaymentMethod from './CardPaymentMethod';

interface ExpertPaymentFormProps {
  hasSubscriptionAccess: boolean;
  duration: number;
  setDuration: (value: number) => void;
  paymentMethod: 'card' | 'upi';
  setPaymentMethod: (value: 'card' | 'upi') => void;
  totalAmount: number;
  isProcessing: boolean;
  handlePayment: (e: React.FormEvent) => void;
  handleCallExpert: () => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardName: string;
  setCardName: (value: string) => void;
  cardExpiry: string;
  setCardExpiry: (value: string) => void;
  cardCvv: string;
  setCardCvv: (value: string) => void;
}

const ExpertPaymentForm = ({
  hasSubscriptionAccess,
  duration,
  setDuration,
  paymentMethod,
  setPaymentMethod,
  totalAmount,
  isProcessing,
  handlePayment,
  handleCallExpert,
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv
}: ExpertPaymentFormProps) => {
  return (
    <form onSubmit={handlePayment} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="duration">Session Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          min={paymentDetails.minDuration}
          max={120}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
        <p className="text-sm text-muted-foreground">
          {hasSubscriptionAccess 
            ? "Free with your subscription" 
            : `Total cost: ₹${totalAmount} (Minimum ${paymentDetails.minDuration} minutes)`}
        </p>
      </div>
      
      {!hasSubscriptionAccess && (
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={paymentMethod === 'upi' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setPaymentMethod('upi')}
            >
              UPI / QR
            </Button>
            <Button
              type="button"
              variant={paymentMethod === 'card' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setPaymentMethod('card')}
            >
              Card
            </Button>
          </div>
        </div>
      )}
      
      {!hasSubscriptionAccess && paymentMethod === 'upi' ? (
        <UpiPaymentMethod />
      ) : !hasSubscriptionAccess ? (
        <CardPaymentMethod 
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardName={cardName}
          setCardName={setCardName}
          cardExpiry={cardExpiry}
          setCardExpiry={setCardExpiry}
          cardCvv={cardCvv}
          setCardCvv={setCardCvv}
        />
      ) : null}
      
      <div className="flex-col gap-2">
        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : hasSubscriptionAccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Book Free Consultation
            </>
          ) : (
            <>
              <IndianRupee className="mr-2 h-4 w-4" />
              Pay ₹{totalAmount}
            </>
          )}
        </Button>
        
        {hasSubscriptionAccess && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCallExpert} 
            className="w-full mt-2"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Expert Directly
          </Button>
        )}
      </div>
    </form>
  );
};

export default ExpertPaymentForm;
