"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { MapPin, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarouselDemo } from "@/components/CarouselDemo";
import { useBookingsStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  Star,
  Wifi,
  Droplets,
  Dumbbell,
  Coffee,
  Flower2,
  Car,
  Plane,
  Wine,
  Utensils,
  Clock,
  Briefcase,
  Thermometer,
  Dog,
} from "lucide-react";

const Page = () => {
  const AmenityIcon = ({ amenity }: { amenity: string }) => {
    switch (amenity) {
      case "Free WiFi":
        return <Wifi size={20} className="text-primary-light" />;
      case "Pool":
        return <Droplets size={20} className="text-primary-light" />;
      case "Gym":
        return <Dumbbell size={20} className="text-primary-light" />;
      case "Breakfast":
        return <Coffee size={20} className="text-primary-light" />;
      case "Spa":
        return <Flower2 size={20} className="text-primary-light" />;
      case "Parking":
        return <Car size={20} className="text-primary-light" />;
      case "Airport Shuttle":
        return <Plane size={20} className="text-primary-light" />;
      case "Bar":
        return <Wine size={20} className="text-primary-light" />;
      case "Restaurant":
        return <Utensils size={20} className="text-primary-light" />;
      case "24/7 Front Desk":
        return <Clock size={20} className="text-primary-light" />;
      case "Business Center":
        return <Briefcase size={20} className="text-primary-light" />;
      case "Sauna":
        return <Thermometer size={20} className="text-primary-light" />;
      case "Pet Friendly":
        return <Dog size={20} className="text-primary-light" />;
      default:
        return null;
    }
  };
  const router = useRouter();
  const [hotel, setHotel] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const getHotel = async () => {
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
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("id", id)
        .single();
      setHotel(data);
      if (error) console.error("Error fetching single hotel : ", error);
    };
    getHotel();
  }, [id]);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1 Adult");
  const [roomType, setRoomType] = useState("Standard Room");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nights, setNights] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // State to store user ID
  const setBookingData = useBookingsStore<any>((state) => state.addBooking);

  const checkInDate = new Date(checkIn).getTime();
  const checkOutDate = new Date(checkOut).getTime();
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      }
    };
    checkUser();
  }, []);
  const getBookingData = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset messages
    setMessage("");
    setSuccessMessage("");

    // Validate form inputs
    if (checkIn === "" || checkOut === "" || guests === "" || roomType === "") {
      setMessage("Please fill in all fields");
      return;
    }
    if (checkInDate >= checkOutDate) {
      setMessage("Check-out date must be after check-in date");
      return;
    } else if ((checkOutDate - checkInDate) / (1000 * 3600 * 24) > 5) {
      setMessage("Maximum stay is 5 nights");
      return;
    } else if (checkOutDate <= checkInDate) {
      setMessage("Check-out date must be after check-in date");
      return;
    } else if (checkInDate === checkOutDate) {
      setMessage("Minimum stay is 1 night");
      return;
    }

    // Create booking data object
    const bookingData = {
      user_id: userId,
      status: "active",
      hotelId: id,
      checkIn,
      checkOut,
      guests,
      roomType,
      price: priceBeforeTaxes + taxes,
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      hotelRating: hotel.rating,
      hotelImage: hotel.images?.images?.[0],
    };

    // Set loading state
    setIsBooking(true);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData]);

      if (error) {
        setMessage("Error creating booking");
        console.error("Error creating booking: ", error);
      } else {
        // Store booking data
        setBookingData(bookingData);

        // Show success message
        setSuccessMessage(
          `Booking confirmed! Your ${roomType} has been reserved at ${
            hotel.name
          } from ${new Date(checkIn).toLocaleDateString()} to ${new Date(
            checkOut
          ).toLocaleDateString()}.`
        );
      }
    } catch (err) {
      console.error("Error in booking process:", err);
      setMessage("An unexpected error occurred");
    } finally {
      // Reset loading state
      setIsBooking(false);
    }
  };

  const taxes = Number((hotel.price * 0.2).toFixed(2));
  const priceBeforeTaxes = Number(hotel.price * nights);

  useEffect(() => {
    if (checkIn && checkOut) {
      const timeDiff = checkOutDate - checkInDate;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      if (daysDiff > 0 && daysDiff <= 5) {
        setNights(daysDiff);
      }
    }
  }, [checkIn, checkOut, checkInDate, checkOutDate]);

  // Clear success message when form inputs change
  useEffect(() => {
    if (successMessage) {
      setSuccessMessage("");
    }
  }, [checkIn, checkOut, guests, roomType]);
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
    <section className="flex flex-col lg:flex-row justify-center items-start gap-6 text-primary-light dark:text-text-dark px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 lg:pt-40 max-w-7xl mx-auto">
      {/* Main content column */}
      <article className="w-full lg:w-2/3">
        {/* Hotel title and rating section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
              {hotel.name}
            </h1>
            <div className="text-primary-light dark:text-text-dark flex items-center bg-card-light/20 border border-action-light w-fit rounded-lg px-2 py-1 space-x-1">
              <Star size={15} />
              <p>{hotel.rating}</p>
            </div>
            <div className="flex items-center space-x-0.5 opacity-70">
              <MapPin size={15} />
              <h2 className="text-sm">{hotel.location}</h2>
            </div>
          </div>
          <div className="space-y-1 mt-2 sm:mt-0">
            <div className="flex items-end space-x-1">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                ${hotel.price}
              </h1>
              <span className="text-sm sm:text-base">/night</span>
            </div>
            <p className="text-xs sm:text-sm">Includes taxes and fees</p>
          </div>
        </div>

        {/* Image carousel */}
        <div className="w-full mb-8 rounded-lg shadow-lg overflow-hidden">
          <CarouselDemo images={hotel.images?.images || []} />
        </div>

        {/* Hotel description */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">About this hotel</h2>
          <p className="text-gray-700 dark:text-text-dark/50 leading-relaxed text-sm sm:text-base">
            {hotel.description}
          </p>
        </div>

        {/* Amenities section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <h2 className="font-bold text-xl sm:text-2xl text-gray-800 mb-4">
            Amenities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hotel.amenities?.map((amenity: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border bg-card-light/50 border-gray-100 hover:bg-card-light/30 transition-colors"
              >
                <div className="bg-primary-light/10 p-1.5 sm:p-2 rounded-md">
                  <AmenityIcon amenity={amenity} />
                </div>
                <span className="text-gray-700 text-xs sm:text-sm">
                  {amenity}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            Additional amenities may be available. Please contact the hotel for
            more information.
          </p>
        </div>

        {/* Reviews section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <h2 className="font-bold text-xl sm:text-2xl text-gray-800 mb-4">
            Guest Reviews
          </h2>

          <div className="space-y-4">
            {hotel.reviews && hotel.reviews.length > 0 ? (
              hotel.reviews.map((review: any, index: number) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-gray-50 rounded-lg text-primary-light"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center text-gray-600 font-medium">
                      {review.name ? review.name.charAt(0) : "G"}
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {review.name || "Guest"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.date || "Recent stay"}
                      </p>
                    </div>
                    <div className="ml-auto"></div>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    "{review.review}"
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600 text-sm">
                  No reviews yet. Be the first to review this hotel!
                </p>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Booking form column */}
      <article className="w-full lg:w-1/3 sticky top-20 px-4 py-4 border border-zinc-300 shadow-xl rounded-lg bg-white h-fit text-primary-dark mb-12 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <form onSubmit={getBookingData} className="space-y-4">
          <div>
            <h2 className="font-bold text-xl sm:text-2xl">Book this hotel</h2>
            <p className="text-sm opacity-60">Select your dates and guests</p>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 flex items-start space-x-2 text-sm">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
              <p>{successMessage}</p>
            </div>
          )}

          {/* Check-in/Check-out dates */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full space-y-1">
              <h3 className="text-sm font-medium">Check-in</h3>
              <Input
                type="date"
                placeholder="Check-in date"
                className="border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full text-sm"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="w-full space-y-1">
              <h3 className="text-sm font-medium">Check-out</h3>
              <Input
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                type="date"
                placeholder="Check-out date"
                className="border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full text-sm"
              />
            </div>
          </div>

          {/* Guests selection */}
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Guests</h3>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              name="guests"
              id="guests"
              className="rounded-lg p-2 border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full text-sm"
            >
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults">2 Adults</option>
              <option value="3 Adults">3 Adults</option>
              <option value="4 Adults">4 Adults</option>
              <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
              <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
            </select>
          </div>

          {/* Room type selection */}
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Room Type</h3>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              name="roomType"
              id="roomType"
              className="rounded-lg p-2 border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full text-sm"
            >
              <option value="Standard Room">Standard Room</option>
              <option value="Delux Room">Delux Room</option>
              <option value="Executive Room">Executive Room</option>
              <option value="Family Room">Family Room</option>
            </select>
          </div>

          {/* Error message */}
          {message && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-2 text-red-500 text-center text-sm">
              {message}
            </div>
          )}

          {/* Reserve button */}
          <Button
            className="text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out w-full p-5 text-base disabled:opacity-70 disabled:cursor-not-allowed"
            type="submit"
            disabled={isBooking}
          >
            {isBooking ? "Processing..." : "Reserve Now"}
          </Button>

          <p className="text-zinc-600 text-center text-xs sm:text-sm">
            You won't be charged yet
          </p>

          <hr className="text-zinc-300" />

          {/* Price breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                ${hotel.price} x {nights} nights
              </p>
              <p className="font-bold">${priceBeforeTaxes}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600">Taxes and fees</p>
              <p className="font-bold">${taxes}</p>
            </div>
          </div>

          <hr className="text-zinc-300" />

          {/* Total price */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-action-light/20 bg-action-light/10">
            <p className="text-primary-light font-medium">Total</p>
            <p className="font-bold">${priceBeforeTaxes + taxes}</p>
          </div>

          {/* Additional information */}
          <div className="space-y-2 text-zinc-500">
            <div className="flex items-start space-x-2 text-xs sm:text-sm">
              <img
                src="/check.svg"
                alt="check mark"
                className="w-4 h-4 mt-0.5"
              />
              <p>Free cancellation up to 48 hours before check-in</p>
            </div>
            <div className="flex items-start space-x-2 text-xs sm:text-sm">
              <img
                src="/check.svg"
                alt="check mark"
                className="w-4 h-4 mt-0.5"
              />
              <p>Pay at the property available</p>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Page;
