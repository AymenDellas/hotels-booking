"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
const FeaturedHotels = () => {
  const [featuredHotelsData, setFeaturedHotelsData] = useState<any>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase.from("hotels").select("*");
      if (error) console.error(error);
      else setFeaturedHotelsData(data || []);
    };

    fetchHotels();
  }, []);

  return (
    <section className="flex flex-col items-center text-primary-light dark:text-text-dark my-8">
      <div className=" text-center space-y-2">
        <h1 className="font-bold text-4xl">Top Picks for You</h1>
        <em className="text-sm">
          Discover the best-rated stays, handpicked just for you.
        </em>
      </div>
      {featuredHotelsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-12">
          {featuredHotelsData
            .slice(-3)

            .map((hotel: any, index: any) => {
              return (
                <div
                  className="w-96 h-[410px]  rounded-xl overflow-hidden bg-white shadow-xl text-primary-light"
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage: `url(${hotel.images?.images?.[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="min-h-[250px] max-h-[250px] w-full"
                  >
                    <div className="flex items-center space-x-1 bg-white rounded-full px-2 float-right m-2 shadow-lg">
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
                      <div className="text-action-light font-semibold flex items-end space-x-0.5">
                        <p className="text-lg">${hotel.price}</p>
                        <span className="text-sm">/night</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-0.5 opacity-70 text-gray-900">
                      <MapPin className="" size={15} />
                      <h2 className="text-sm ">{hotel.location}</h2>
                    </div>
                    <Link href={`/listings/hotel/${hotel.id}`} className="">
                      <Button className="my-2 w-full text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out ">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p className="text center my-24 text-4xl font-bold animate-pulse text-primary-light">
          Loading...
        </p>
      )}
    </section>
  );
};

export default FeaturedHotels;
