// src/components/experts/AppointmentBooking.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { expertAvailabilityService } from '@/services/expertAvailabilityService';
import { toast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

interface AppointmentBookingProps {
  expertId: number;
  expertName: string;
  onSuccess: () => void;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ 
  expertId, 
  expertName,
  onSuccess 
}) => {
  const [step, setStep] = useState<'date' | 'time' | 'confirm' | 'success'>('date');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch available dates when component mounts
    const loadDates = async () => {
      setLoading(true);
      try {
        const dates = await expertAvailabilityService.getAvailableDays(expertId);
        setAvailableDates(dates);
      } catch (error) {
        toast({
          title: "Failed to load availability",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadDates();
  }, [expertId]);

  useEffect(() => {
    // When date changes, fetch time slots
    if (selectedDate && step === 'time') {
      const loadTimeSlots = async () => {
        setLoading(true);
        try {
          const dateStr = selectedDate.toISOString().split('T')[0];
          const slots = await expertAvailabilityService.getTimeSlots(expertId, dateStr);
          setAvailableSlots(slots);
        } catch (error) {
          toast({
            title: "Failed to load time slots",
            description: "Please try again later",
            variant: "destructive"
          });
          setStep('date');
        } finally {
          setLoading(false);
        }
      };
      
      loadTimeSlots();
    }
  }, [selectedDate, step, expertId]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setStep('time');
    }
  };

  const handleTimeSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    setStep('confirm');
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) return;
    
    setLoading(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const success = await expertAvailabilityService.bookAppointment(
        expertId, dateStr, selectedSlot
      );
      
      if (success) {
        setStep('success');
        onSuccess();
      } else {
        toast({
          title: "Booking failed",
          description: "This slot may no longer be available",
          variant: "destructive"
        });
        // Refresh available slots
        const slots = await expertAvailabilityService.getTimeSlots(expertId, dateStr);
        setAvailableSlots(slots);
        setStep('time');
      }
    } catch (error) {
      toast({
        title: "Error booking appointment",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderDateSelection = () => (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Select a Date</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) => {
            // Disable dates that are not in the available dates list
            const dateStr = date.toISOString().split('T')[0];
            return !availableDates.includes(dateStr);
          }}
          className="rounded-md border"
        />
      </CardContent>
    </>
  );

  const renderTimeSelection = () => {
    const formattedDate = selectedDate?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <>
        <CardHeader>
          <CardTitle className="text-lg">Select a Time</CardTitle>
          <div className="text-sm text-muted-foreground flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {formattedDate}
          </div>
        </CardHeader>
        <CardContent>
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={slot.isBooked ? "outline" : "default"}
                  disabled={slot.isBooked}
                  onClick={() => handleTimeSelect(slot.id)}
                  className="p-2 text-center justify-center"
                >
                  <Clock className="h-4 w-4 mr-1.5" />
                  {slot.time}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-6">
              No available time slots for this date.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setStep('date')}>
            Back
          </Button>
        </CardFooter>
      </>
    );
  };

  const renderConfirmation = () => {
    const formattedDate = selectedDate?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const selectedTimeSlot = availableSlots.find(slot => slot.id === selectedSlot);

    return (
      <>
        <CardHeader>
          <CardTitle className="text-lg">Confirm Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Expert</span>
              <span className="font-medium">{expertName}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="font-medium">{selectedTimeSlot?.time}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setStep('time')}>
            Back
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </CardFooter>
      </>
    );
  };

  const renderSuccess = () => (
    <>
      <CardHeader>
        <CardTitle className="text-lg text-center">Booking Confirmed!</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-6">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <p>
          Your appointment with {expertName} has been confirmed. You'll receive a confirmation email shortly.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => setStep('date')}>
          Book Another Appointment
        </Button>
      </CardFooter>
    </>
  );

  return (
    <Card className="w-full">
      {step === 'date' && renderDateSelection()}
      {step === 'time' && renderTimeSelection()}
      {step === 'confirm' && renderConfirmation()}
      {step === 'success' && renderSuccess()}
    </Card>
  );
};