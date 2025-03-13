"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarouselDemo } from "@/components/CarouselDemo";
const page = () => {
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
              <div className="flex items-center space-x-1">
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
