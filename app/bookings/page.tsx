"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Home,
  Star,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const BookingsPage = () => {
  const router = useRouter();

  interface Booking {
    currency: string;
    id: string;
    hotelName: string;
    hotelImage: string;
    hotelLocation: string;
    hotelRating: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
    price: number;
    status: string;
  }

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check authentication and fetch bookings
  useEffect(() => {
    const fetchUserAndBookings = async () => {
      setIsLoading(true);

      // Get current user
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Redirect to login if not authenticated
        router.push("/login");
        return;
      }

      setUser(session.user);

      // Fetch bookings for the current user
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .order("checkIn", { ascending: true });

      if (error) {
        console.error("Error fetching bookings:", error);
      } else {
        setBookings(data || []);
      }

      setIsLoading(false);
    };

    fetchUserAndBookings();
  }, [router]);

  // Calculate nights between check-in and check-out
  const calculateNights = (checkIn: string, checkOut: string) => {
    try {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    } catch (e) {
      return 1;
    }
  };

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Function to initiate booking cancellation
  const initiateCancel = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setShowConfirmModal(true);
  };

  // Function to cancel a booking
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      // Update the booking status to 'cancelled' in Supabase
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", selectedBooking)
        .eq("user_id", user.id); // Make sure it's the user's booking

      if (error) {
        console.error("Error cancelling booking:", error);
        return;
      }

      // Update local state to remove the cancelled booking
      setBookings(bookings.filter((booking) => booking.id !== selectedBooking));
    } catch (error) {
      console.error("Error in cancellation process:", error);
    } finally {
      // Close the modal
      setShowConfirmModal(false);
      setSelectedBooking(null);
    }
  };

  // Modal component for confirmation
  const ConfirmationModal = () => {
    if (!showConfirmModal || !selectedBooking) return null;

    const booking = bookings.find((b) => b.id === selectedBooking);
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
          <p className="mb-6">
            Are you sure you want to cancel your booking at{" "}
            <span className="font-semibold">{booking.hotelName}</span>?
            <span className="block mt-2 text-red-500">
              This may result in cancellation fees according to the hotel's
              policy.
            </span>
          </p>
          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Keep Booking
            </button>
            <button
              onClick={handleCancelBooking}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-primary-light dark:text-text-dark mx-8 md:mx-20 xl:mx-36 2xl:mx-48 pt-52 max-lg:pt-36">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-primary-light dark:text-text-dark mx-8 md:mx-20 xl:mx-36 2xl:mx-48 pt-52 max-lg:pt-36 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Bookings</h1>
        <button
          onClick={() => router.push("/listings")}
          className="flex items-center text-sm gap-2 py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-primary-dark"
        >
          <ArrowLeft size={16} />
          Back to Listings
        </button>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const nights = calculateNights(booking.checkIn, booking.checkOut);

            return (
              <div
                key={booking.id}
                className="overflow-hidden rounded-xl bg-card-light/50 dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl"
              >
                <div className="flex max-md:flex-col">
                  <div
                    style={{
                      backgroundImage: `url(${booking.hotelImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="md:w-1/3 h-60 md:h-auto relative"
                  >
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 py-1 px-2 rounded-md shadow-sm flex items-center">
                      <Star
                        className="text-yellow-400 mr-1"
                        size={14}
                        fill="currentColor"
                      />
                      <span className="text-sm font-medium">
                        {booking.hotelRating}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-bold">
                            {booking.hotelName}
                          </h2>
                          <div className="text-right">
                            <p className="text-lg font-semibold">
                              {booking.currency === "USD"
                                ? "$"
                                : booking.currency}{" "}
                              {booking.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              for {nights} {nights === 1 ? "night" : "nights"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                          <MapPin size={16} className="flex-shrink-0" />
                          <p className="ml-1 text-sm">
                            {booking.hotelLocation}
                          </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <Calendar
                              size={18}
                              className="text-gray-500 mr-2"
                            />
                            <div>
                              <p className="text-xs text-gray-500">
                                Check-in / Check-out
                              </p>
                              <p className="font-medium">
                                {formatDate(booking.checkIn)} -{" "}
                                {formatDate(booking.checkOut)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Users size={18} className="text-gray-500 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Guests</p>
                              <p className="font-medium">
                                {booking.guests}{" "}
                                {booking.guests === 1 ? "guest" : "guests"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Home size={18} className="text-gray-500 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Room Type</p>
                              <p className="font-medium">{booking.roomType}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => initiateCancel(booking.id)}
                          className="flex items-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            <Calendar size={24} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            You haven't made any hotel reservations yet. Explore our selection
            of hotels and find your perfect stay.
          </p>
          <a
            href="/listings"
            className="inline-block bg-primary-light text-white px-6 py-3 rounded-md hover:bg-primary-light/90 transition-colors font-medium"
          >
            Browse Hotels
          </a>
        </div>
      )}

      {/* Render the modal */}
      <ConfirmationModal />
    </div>
  );
};

export default BookingsPage;
