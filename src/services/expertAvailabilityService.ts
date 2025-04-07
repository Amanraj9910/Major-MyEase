// src/services/expertAvailabilityService.ts
interface TimeSlot {
    id: string;
    time: string;
    isBooked: boolean;
  }
  
  interface DayAvailability {
    date: string;
    dayOfWeek: string;
    slots: TimeSlot[];
  }
  
  interface ExpertAvailability {
    expertId: number;
    availableDays: DayAvailability[];
  }
  
  // Mock database for demonstration
  const availabilityData: Record<number, ExpertAvailability> = {};
  
  export const expertAvailabilityService = {
    getAvailableDays(expertId: number): Promise<string[]> {
      return new Promise(resolve => {
        setTimeout(() => {
          const expertData = availabilityData[expertId] || generateInitialAvailability(expertId);
          const availableDays = expertData.availableDays
            .filter(day => day.slots.some(slot => !slot.isBooked))
            .map(day => day.date);
          resolve(availableDays);
        }, 300);
      });
    },
  
    getTimeSlots(expertId: number, date: string): Promise<TimeSlot[]> {
      return new Promise(resolve => {
        setTimeout(() => {
          const expertData = availabilityData[expertId] || generateInitialAvailability(expertId);
          const dayData = expertData.availableDays.find(day => day.date === date);
          resolve(dayData ? dayData.slots : []);
        }, 300);
      });
    },
  
    bookAppointment(expertId: number, date: string, slotId: string): Promise<boolean> {
      return new Promise(resolve => {
        setTimeout(() => {
          const expertData = availabilityData[expertId];
          if (!expertData) {
            resolve(false);
            return;
          }
  
          const dayData = expertData.availableDays.find(day => day.date === date);
          if (!dayData) {
            resolve(false);
            return;
          }
  
          const slot = dayData.slots.find(slot => slot.id === slotId);
          if (!slot || slot.isBooked) {
            resolve(false);
            return;
          }
  
          // Mark slot as booked
          slot.isBooked = true;
          resolve(true);
        }, 500);
      });
    }
  };
  
  // Generate 14 days of availability for a new expert
  function generateInitialAvailability(expertId: number): ExpertAvailability {
    const availableDays: DayAvailability[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const dateString = date.toISOString().split('T')[0];
      
      // Generate random slots between 9 AM and 5 PM
      const slots: TimeSlot[] = [];
      for (let hour = 9; hour < 17; hour++) {
        if (Math.random() > 0.3) { // 70% chance of having a slot
          slots.push({
            id: `${dateString}-${hour}`,
            time: `${hour}:00`,
            isBooked: false
          });
        }
      }
      
      availableDays.push({
        date: dateString,
        dayOfWeek,
        slots
      });
    }
    
    const availability: ExpertAvailability = {
      expertId,
      availableDays
    };
    
    availabilityData[expertId] = availability;
    return availability;
  }