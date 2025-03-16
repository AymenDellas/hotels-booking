"use client";
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const BookingsPage = () => {
  interface Booking {
    hotelImage: string;
    hotelName: string;
    hotelLocation: string;
    hotelRating: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  }

  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage when component mounts
  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings-storage");
    if (storedBookings) {
      try {
        const parsedData = JSON.parse(storedBookings);
        if (parsedData.state && parsedData.state.bookings) {
          setBookings(parsedData.state.bookings);
        }
      } catch (error) {
        console.error("Error parsing bookings:", error);
      }
    }
  }, []);

  // Function to cancel a booking
  const handleCancelBooking = (indexToRemove: number) => {
    // Create a new array without the booking at the specified index
    const updatedBookings = bookings.filter(
      (_, index) => index !== indexToRemove
    );

    // Update state
    setBookings(updatedBookings);

    // Save to localStorage - maintain the same structure Zustand was using
    const dataToStore = {
      state: { bookings: updatedBookings },
      version: 0,
    };
    localStorage.setItem("bookings-storage", JSON.stringify(dataToStore));
  };

  return (
    <div className="text-primary-light mx-8 md:mx-20 xl:mx-36 2xl:mx-48">
      <h1 className="text-2xl font-bold my-6">Your Bookings</h1>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="h-fit flex space-x-4 overflow-hidden rounded-lg bg-card-light/50 shadow-lg"
            >
              <div
                style={{
                  backgroundImage: `url(${booking.hotelImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="min-h-[200px] w-1/3"
              ></div>
              <div className="flex item-center justify-between w-full p-4">
                <div className="flex flex-col space-y-1">
                  <h1 className="text-xl font-semibold">{booking.hotelName}</h1>
                  <div className="flex items-center space-x-0.5 opacity-70">
                    <MapPin className="" size={15} />
                    <h2 className="text-sm">{booking.hotelLocation}</h2>
                  </div>
                  <p>{booking.hotelRating}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-1">
                    <p>{booking.checkIn}</p>-<p>{booking.checkOut}</p>
                  </div>
                  <p>{booking.guests}</p>
                  <p>{booking.roomType}</p>

                  {/* Cancel booking button */}
                  <button
                    onClick={() => handleCancelBooking(index)}
                    className="mt-4 bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No bookings yet. Check out our hotel listings!
          </p>
          <a
            href="/listings"
            className="mt-4 inline-block bg-primary-light text-white px-4 py-2 rounded-md hover:bg-primary-light/90 transition-colors"
          >
            Browse Hotels
          </a>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
