
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Phone } from 'lucide-react';
import { paymentDetails } from '@/services/paymentService';

interface CompletedPaymentProps {
  handleCallExpert: () => void;
}

const CompletedPayment = ({ handleCallExpert }: CompletedPaymentProps) => {
  return (
    <div className="py-6 space-y-4">
      <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
        <Check className="h-6 w-6 text-green-500" />
        <div>
          <h4 className="font-medium">Payment Complete</h4>
          <p className="text-sm text-muted-foreground">Your session has been booked successfully</p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="mb-4">You can now call the expert directly</p>
        <Button 
          onClick={handleCallExpert} 
          className="w-full"
        >
          <Phone className="mr-2 h-4 w-4" />
          Call Expert Now
        </Button>
      </div>
    </div>
  );
};

export default CompletedPayment;
