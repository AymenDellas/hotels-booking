"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarouselDemo } from "@/components/CarouselDemo";
import {
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
  const taxes = Number((hotel.price * 0.2).toFixed(2));
  const priceBeforeTaxes = Number(hotel.price * 5);
  return (
    <section className="flex justify-center space-x-16">
      <article className="w-[1000px]">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="font-bold text-4xl">{hotel.name}</h1>
            <p>({hotel.rating}) 125 Reviews</p>
            <div className="flex items-center space-x-0.5 opacity-70">
              <MapPin size={15} />
              <h2 className="text-sm">{hotel.location}</h2>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-end space-x-1">
              <h1 className="font-bold text-4xl">${hotel.price}</h1>{" "}
              <span>/ night</span>
            </div>
            <p>Includes taxes and fees</p>
          </div>
        </div>
        <div className="max-w-[1000px] my-8 rounded-lg shadow-lg">
          <CarouselDemo images={hotel.images?.images || []} />
        </div>
        <div className="space-y-4 my-8">
          <h1 className="text-2xl font-bold">About this hotel</h1>
          <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-bold text-2xl text-gray-800 mb-4">Amenities</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(hotel.amenities || [
              "Free WiFi", 
              "Breakfast", 
              "Parking", 
              "Pool", 
              "Restaurant", 
              "24/7 Front Desk",
              "Gym",
              "Spa"
            ]).map((amenity, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="bg-primary-light/10 p-2 rounded-md">
                  <AmenityIcon amenity={amenity} />
                </div>
                <span className="text-gray-700 text-sm">{amenity}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Additional amenities may be available. Please contact the hotel for more information.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-2xl text-gray-800">Guest Reviews</h2>
            <div className="flex items-center gap-1 bg-primary-light text-white px-3 py-1 rounded-lg">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="font-bold">{hotel.rating || "4.5"}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {hotel.reviews && hotel.reviews.length > 0 ? (
              hotel.reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center text-gray-600 font-medium">
                      {review.name ? review.name.charAt(0) : "G"}
                    </div>
                    <div>
                      <p className="font-medium">{review.name || "Guest"}</p>
                      <p className="text-xs text-gray-500">{review.date || "Recent stay"}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          className={`w-4 h-4 ${star <= (review.rating || 5) ? "text-yellow-400" : "text-gray-300"} fill-current`} 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    "{review.review || "Great experience at this hotel!"}"
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">No reviews yet. Be the first to review this hotel!</p>
              </div>
            )}
            
            {hotel.reviews && hotel.reviews.length > 3 && (
              <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                View All {hotel.reviews.length} Reviews
              </button>
            )}
          </div>
        </div>
      </article>
      <article className="sticky top-16 px-4 py-4 border border-zinc-300 shadow-xl rounded-lg bg-white h-fit">
        <form>
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Book this hotel</h1>
            <p className="opacity-60">Select your dates and guests</p>
            <div className="flex items-center space-x-4">
              <div className="my-2 space-y-1 w-full">
                <h2>Check-in</h2>
                <div className="flex items-center relative">
                  <Input
                    required
                    type="date"
                    placeholder="Mar 15"
                    className="border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full"
                  />
                </div>
              </div>
              <div className="my-2 w-full space-y-1">
                <h2>Check-out</h2>
                <div className="flex items-center relative">
                  <Input
                    required
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
                  name="guests"
                  id="guests"
                  className="rounded-lg p-2 border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full"
                >
                  <option value="oneAdult">1 Adult</option>
                  <option value="twoeAdult">2 Adults</option>
                  <option value="threeAdult">3 Adults</option>
                  <option value="fourAdult">4 Adults</option>
                  <option value="twoAdultsOneChild">2 Adults, 1 Child</option>
                  <option value="twoAdultsTwoChildren">
                    2 Adults, 2 Children
                  </option>
                </select>
              </div>
            </div>
            <div className="my-2 space-y-1">
              <h2>Room Type</h2>
              <div>
                <select
                  name="roomType"
                  id="roomType"
                  className="rounded-lg p-2 border border-zinc-300 focus:ring-2 ring-action-light outline-none transition-all duration-200 ease-out w-full"
                >
                  <option value="standard">Standard Room</option>
                  <option value="delux">Delux Room</option>
                  <option value="executive">Executive Room</option>
                  <option value="family">Family Room</option>
                </select>
              </div>
            </div>
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
              <p className="text-gray-600">${hotel.price} x 5 nights</p>
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
