import React from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { whyChooseUs } from "@/lib/data";

import FeaturedHotels from "@/components/FeaturedHotels";
import Link from "next/link";
const page = () => {
  return (
    <main className="relative overflow-hidden">
      <section>
        <div className="mx-12 max-lg:mx-4 mt-10 mb-20 relative">
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(96, 63, 38, 0.3), rgba(108, 78, 49, 0.4)), url(/5.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-[70%] max-lg:w-[90%] h-[650px] max-lg:h-[400px] object-cover rounded-xl relative mx-auto z-0 p-12"
          >
            <div className="flex flex-col items-center p-4 space-y-4 rounded-xl backdrop-blur-xl w-fit mx-auto text-text-light border border-text-light/40">
              <h1 className="font-bold text-6xl max-lg:text-3xl">
                Your Next Escape Awaits
              </h1>
              <p className="text-2xl max-lg:text-lg">
                From cozy stays to luxury retreats—find the perfect place to
                stay for your next adventure.
              </p>
              <Button className="my-4 text-lg text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out px-8 py-6">
                <Link href="/listings">Explore Hotels</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <FeaturedHotels />
      <section className="flex flex-col items-center">
        <h1 className="font-bold text-4xl text-primary-light dark:text-text-dark">
          Why Book With Us?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 my-12">
          {whyChooseUs.map((reason, index) => {
            return (
              <div
                className="flex flex-col bg-white rounded-lg shadow-lg p-4 space-y-4 border border-border-light hover:-translate-y-1 transition-transform duration-300 ease-out"
                key={index}
              >
                <div className="flex items-center space-x-3">
                  <span className="p-5 rounded-lg bg-card-light border border-border-light shadow-2xl">
                    <reason.icon />
                  </span>
                  <h2 className="text-xl font-bold">{reason.title}</h2>
                </div>
                <div className="p-2">{reason.description}</div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mb-20">
        <div className="text-primary-light w-[70%] max-lg:w-[90%] mx-auto bg-card-light rounded-lg pt-8 flex flex-col items-center space-y-4 text-center px-4">
          <h1 className="font-bold text-4xl">Find Your Perfect Stay Today!</h1>
          <em className="text-sm">
            Explore thousands of hotels worldwide and book your dream getaway
            now.
          </em>

          <Button className="my-4 text-lg text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out px-8 py-6">
            <Link href="/listings">Explore Hotels</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default page;
