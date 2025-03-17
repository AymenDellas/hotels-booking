"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarouselDemo } from "@/components/CarouselDemo";
import { useBookingsStore } from "@/lib/store";

import {
  Star,
  Wifi,
  Droplets, // For Pool
  Dumbbell,
  Coffee,
  Flower2, // For Spa
  Car,
  Plane,
  Wine,
  Utensils,
  Clock,
  Briefcase,
  Thermometer,
  Dog,
} from "lucide-react";
import { ESLINT_DEFAULT_DIRS } from "next/dist/lib/constants";
const page = () => {
  const AmenityIcon = ({ amenity }: { amenity: string }) => {
    switch (amenity) {
      case "Free WiFi":
        return <Wifi size={25} className="text-primary-light" />;
      case "Pool":
        return <Droplets size={25} className="text-primary-light" />; // Water droplets for pool
      case "Gym":
        return <Dumbbell size={25} className="text-primary-light" />;
      case "Breakfast":
        return <Coffee size={25} className="text-primary-light" />;
      case "Spa":
        return <Flower2 size={25} className="text-primary-light" />; // Flower for spa/relaxation
      case "Parking":
        return <Car size={25} className="text-primary-light" />;
      case "Airport Shuttle":
        return <Plane size={25} className="text-primary-light" />;
      case "Bar":
        return <Wine size={25} className="text-primary-light" />;
      case "Restaurant":
        return <Utensils size={25} className="text-primary-light" />;
      case "24/7 Front Desk":
        return <Clock size={25} className="text-primary-light" />;
      case "Business Center":
        return <Briefcase size={25} className="text-primary-light" />;
      case "Sauna":
        return <Thermometer size={25} className="text-primary-light" />;
      case "Pet Friendly":
        return <Dog size={25} className="text-primary-light" />;
      default:
        return null;
    }
  };
  const [hotel, setHotel] = useState<any>([]);
  const { id } = useParams();
  useEffect(() => {
    const getHotel = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("id", id)
        .single();
      setHotel(data);
      if (error) console.error("Error fetching single hotel : ", error);
    };
    getHotel();
  }, []);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1 Adult");
  const [roomType, setRoomType] = useState("standard");
  const [message, setMessage] = useState("");
  const [nights, setNights] = useState(1);
  const setBookingData = useBookingsStore<any>((state) => state.addBooking);

  const checkInDate = new Date(checkIn).getTime();
  const checkOutDate = new Date(checkOut).getTime();
  const getBookingData = (e: any) => {
    e.preventDefault();
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
    } else if (checkInDate == checkOutDate) {
      setMessage("Minimum stay is 1 night");
      return;
    }
    const bookingData = {
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

    setBookingData(bookingData);
    alert("Booking data: " + JSON.stringify(bookingData));
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
  return (
    <section className="flex flex-col md:flex-row justify-center md:space-x-16 text-primary-light dark:text-text-dark px-4 md:px-0 pt-40 max-lg:pt-36">
      <article className="w-full lg:w-[1000px]">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="font-bold text-4xl">{hotel.name}</h1>
            <div className="text-primary-light dark:text-text-dark flex items-center bg-card-light/20 border border-action-light w-fit rounded-lg px-2 py-1 space-x-1">
              <Star size={15} />
              <p>{hotel.rating}</p>
            </div>
            <div className="flex items-center space-x-0.5 opacity-70">
              <MapPin size={15} />
              <h2 className="text-sm">{hotel.location}</h2>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-end space-x-1">
              <h1 className="font-bold text-4xl">${hotel.price}</h1>{" "}
              <span>/night</span>
            </div>
            <p>Includes taxes and fees</p>
          </div>
        </div>
        <div className="max-w-[1000px] mt-4 mb-8 rounded-lg shadow-lg">
          <CarouselDemo images={hotel.images?.images || []} />
        </div>
        <div className="space-y-4 my-8 ">
          <h1 className="text-2xl font-bold">About this hotel</h1>
          <p className="text-gray-700 dark:text-text-dark/50 leading-relaxed">
            {hotel.description}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-bold text-2xl text-gray-800 mb-4">Amenities</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotel.amenities?.map((amenity: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card-light/50 border-gray-100 hover:bg-card-light/30 transition-colors"
              >
                <div className="bg-primary-light/10 p-2 rounded-md">
                  <AmenityIcon amenity={amenity} />
                </div>
                <span className="text-gray-700 text-sm">{amenity}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Additional amenities may be available. Please contact the hotel for
            more information.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-bold text-2xl text-gray-800">Guest Reviews</h2>

          <div className="space-y-4">
            {hotel.reviews && hotel.reviews.length > 0 ? (
              hotel.reviews.map((review: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg text-primary-light"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center text-gray-600 font-medium">
                      {review.name ? review.name.charAt(0) : "G"}
                    </div>
                    <div>
                      <p className="font-medium">{review.name || "Guest"}</p>
                      <p className="text-xs text-gray-500">
                        {review.date || "Recent stay"}
                      </p>
                    </div>
                    <div className="ml-auto"></div>
                  </div>
                  <p className="text-gray-700 text-sm">"{review.review}"</p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">
                  No reviews yet. Be the first to review this hotel!
                </p>
              </div>
            )}
          </div>
        </div>
      </article>
      <article className="sticky top-16 px-4 py-4 border border-zinc-300 shadow-xl rounded-lg bg-white h-fit text-primary-dark mb-12">
        <form onSubmit={getBookingData}>
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Book this hotel</h1>
            <p className="opacity-60">Select your dates and guests</p>
            <div className="flex items-center space-x-4">
              <div className="my-2 space-y-1 w-full">
                <h2>Check-in</h2>
                <div className="flex items-center relative">
                  <Input
                    type="date"
                    placeholder="Mar 15"
                    className="border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>
              <div className="my-2 w-full space-y-1">
                <h2>Check-out</h2>
                <div className="flex items-center relative">
                  <Input
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    type="date"
                    placeholder="Mar 20"
                    className="border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full"
                  />
                </div>
              </div>
            </div>
            <div className="my-2 space-y-1">
              <h2>Guests</h2>
              <div>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  name="guests"
                  id="guests"
                  className="rounded-lg p-2 border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full"
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="3 Adults">3 Adults</option>
                  <option value="4 Adults">4 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="2 Adults, 2 Children">
                    2 Adults, 2 Children
                  </option>
                </select>
              </div>
            </div>
            <div className="my-2 space-y-1">
              <h2>Room Type</h2>
              <div>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  name="roomType"
                  id="roomType"
                  className="rounded-lg p-2 border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full"
                >
                  <option value="Standard Room">Standard Room</option>
                  <option value="Delux Room<">Delux Room</option>
                  <option value="Executive Room">Executive Room</option>
                  <option value="Family Room">Family Room</option>
                </select>
              </div>
            </div>
            {message && (
              <div>
                <p className="text-red-500 bg-red-100 border border-red-300 rounded-lg p-1 text-center">
                  {message}
                </p>
              </div>
            )}
            <Button
              className="text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out my-2 w-full p-6"
              type="submit"
            >
              Reserve Now
            </Button>

            <p className="text-zinc-600 text-center my-2">
              You won't be charged yet
            </p>
            <hr className="text-zinc-300" />
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
            <hr className="text-zinc-300" />
            <div className="flex items-center justify-between p-3 rounded-lg border border-action-light/20 bg-action-light/10 my-4">
              <p className="text-primary-light">Total</p>
              <p className="font-bold">${priceBeforeTaxes + taxes}</p>
            </div>
            <div className="space-y-2 text-zinc-500">
              <div className="flex items-center space-x-1 text-sm">
                <img src="/check.svg" alt="check mark" className="w-4" />
                <p>Free cancellation up to 48 hours before check-in</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <img src="/check.svg" alt="check mark" className="w-4" />
                <p>Pay at the property available</p>
              </div>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
};

export default page;
