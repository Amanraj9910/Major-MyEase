
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CardPaymentMethodProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardName: string;
  setCardName: (value: string) => void;
  cardExpiry: string;
  setCardExpiry: (value: string) => void;
  cardCvv: string;
  setCardCvv: (value: string) => void;
}

const CardPaymentMethod = ({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv
}: CardPaymentMethodProps) => {
  return (
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
    </>
  );
};

export default CardPaymentMethod;
