// store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define proper types
interface Booking {
  id: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  price: number;
}

interface BookingsStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  removeBookingAtIndex: (index: number) => void;
}

export const useBookingsStore = create<BookingsStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      
      addBooking: (booking: Booking) => {
        const bookingWithId = {
          ...booking,
          id: booking.id || Math.random().toString(36).substring(2, 9)
        };
        
        set((state) => ({ 
          bookings: [...state.bookings, bookingWithId] 
        }));
        
        console.log("Added booking:", bookingWithId);
        console.log("Current bookings:", get().bookings);
      },
      
      cancelBooking: (bookingId: string) => {
        console.log("Attempting to cancel booking with ID:", bookingId);
        console.log("Current bookings before cancellation:", get().bookings);
        
        set((state) => {
          const updatedBookings = state.bookings.filter(booking => booking.id !== bookingId);
          console.log("Bookings after cancellation:", updatedBookings);
          return { bookings: updatedBookings };
        });
      },
      
      removeBookingAtIndex: (index: number) => {
        console.log("Attempting to remove booking at index:", index);
        console.log("Current bookings before removal:", get().bookings);
        
        set((state) => {
          if (index < 0 || index >= state.bookings.length) {
            console.error("Invalid index:", index);
            return state;
          }
          
          const updatedBookings = [...state.bookings];
          updatedBookings.splice(index, 1);
          
          console.log("Bookings after removal:", updatedBookings);
          return { bookings: updatedBookings };
        });
      }
    }),
    {
      name: "bookings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
