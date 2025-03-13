"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
const page = () => {
  const [featuredHotelsData, setFeaturedHotelsData] = useState<any>([]);
  const [priceRange, setPriceRange] = useState(500); // Default max price
  const filteredHotels = featuredHotelsData.filter(
    (hotel: any) => hotel.price <= priceRange
  );

  const getfeaturedHotels = async () => {
    const { data, error } = await supabase.from("hotels").select("*");

    if (error) console.error("Error fetching the hotel data : ", error);
    setFeaturedHotelsData(data);
  };
  useEffect(() => {
    getfeaturedHotels();
  }, []);
  return (
    <main className="mx-auto max-lg:mx-72">
      <div className="text-primary-light text-center space-y-2 mb-12">
        <h1 className="font-bold text-4xl">Top Picks for You</h1>
        <em className="text-sm">
          Discover the best-rated stays, handpicked just for you.
        </em>
      </div>
      <section className="flex justify-center space-x-4">
        <div className="mb-4 w-40 max-w-md text-center">
          <label htmlFor="price" className="block font-semibold mb-2">
            Max Price: ${priceRange}
          </label>
          <input
            type="range"
            id="price"
            min="100"
            max="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mb-12">
          {filteredHotels.reverse().map((hotel: any, index: any) => {
            return (
              <div
                className="min-w-72 h-fit rounded-xl overflow-hidden bg-white shadow-xl "
                key={index}
              >
                <div
                  style={{
                    backgroundImage: `url(${hotel.images?.images?.[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="min-h-[250px] w-full"
                >
                  <div className="flex items-center space-x-1 bg-white rounded-full px-1 float-right m-2 shadow-lg">
                    <img
                      src="/star.svg"
                      alt="star"
                      className="w-5"
                      draggable="false"
                    />
                    <h2>{hotel.rating}</h2>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center space-x-4 justify-between">
                    <h1 className="text-lg font-semibold">{hotel.name}</h1>
                    <div className="flex items-center space-x-0.5 opacity-70">
                      <MapPin className="" size={15} />
                      <h2 className="text-sm">{hotel.location}</h2>
                    </div>
                  </div>
                  <p className="text-action-light font-semibold underline text-pretty ">
                    From ${hotel.price} per night
                  </p>
                  <Link href={`/listings/hotel/${hotel.id}`}>
                    <Button className="my-2 w-full text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default page;
