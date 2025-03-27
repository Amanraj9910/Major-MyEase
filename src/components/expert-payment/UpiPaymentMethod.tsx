
import React from 'react';
import { paymentDetails } from '@/services/paymentService';

const UpiPaymentMethod = () => {
  return (
    <div className="space-y-2 py-2">
      <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
        <div className="w-48 h-48 bg-white p-2 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          <img 
            src={paymentDetails.qrImageUrl} 
            alt="PhonePe QR Code" 
            className="w-full h-auto object-contain"
            style={{ transform: 'scale(1.25)' }} // Zoom in the QR to crop out surroundings
          />
        </div>
        <p className="text-sm font-medium">UPI ID: {paymentDetails.upiId}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Scan the QR code or pay using the UPI ID
        </p>
      </div>
    </div>
  );
};

export default UpiPaymentMethod;
