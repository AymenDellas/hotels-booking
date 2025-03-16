import React from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";

import { MapPin, Star } from "lucide-react";
import { whyChooseUs } from "@/lib/data";

import FeaturedHotels from "@/components/FeaturedHotels";
import Link from "next/link";

const page = () => {
  return (
    <main className="relative overflow-hidden">
      <section
        className="flex items-center justify-center px-2 py-20 lg:py-48 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/5.jpg)`,
        }}
      >
        <div className="flex flex-col items-center space-y-4 text-text-light dark:text-text-dark mt-12 lg:mt-0">
          <div className="rounded-full bg-primary-dark/20 p-3 flex items-center space-x-1 w-fit">
            <Star size={20} />
            <p>Featured Destinations for 2025</p>
          </div>
          <h1 className="text-3xl lg:text-6xl font-bold">
            Discover Your Perfect Stay
          </h1>
          <p className="lg:text-lg lg:w-[70%] text-center">
            Luxury accommodations, exclusive deals, and unforgettable
            experiences await at destinations worldwide.
          </p>
          <Button className="my-4 text-lg text-text-light bg-primary-light cursor-pointer hover:bg-primary-light transition-colors duration-200 ease-out px-8 py-6">
            <Link href="/listings">Browse Hotels</Link>
          </Button>
          {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 place-content-center mx-auto justify-center space-y-2 lg:space-y-0 lg:flex-row lg:items-center space-x-4">
            <div className="flex flex-col items-center bg-primary-light p-7 rounded-lg w-[170px] lg:w-[200px] justify-center text-center">
              <h2 className="text-xl font-bold">+100</h2>
              <p>Luxury Hotels</p>
            </div>
            <div className="flex flex-col items-center bg-primary-light p-7 rounded-lg w-[170px] lg:w-[200px] justify-center text-center">
              <h2 className="text-xl font-bold">+100</h2>
              <p>Destinations</p>
            </div>
            <div className="flex flex-col items-center bg-primary-light p-7 rounded-lg w-[170px] lg:w-[200px] justify-center text-center">
              <h2 className="text-xl font-bold">24/7</h2>
              <p>Support</p>
            </div>
          </div> */}
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2  space-x-4 mt-4 ">
            <div className="flex items-center space-x-0.5 opacity-70 bg-text-light/20 rounded-full p-2 justify-center">
              <MapPin className="" size={15} />
              <h2 className="text-sm ">Paris</h2>
            </div>
            <div className="flex items-center space-x-0.5 opacity-70 bg-text-light/20 rounded-full p-2 justify-center">
              <MapPin className="" size={15} />
              <h2 className="text-sm ">New York</h2>
            </div>
            <div className="flex items-center space-x-0.5 opacity-70 bg-text-light/20 rounded-full p-2 justify-center">
              <MapPin className="" size={15} />
              <h2 className="text-sm ">Tokyo</h2>
            </div>
            <div className="flex items-center space-x-0.5 opacity-70 bg-text-light/20 rounded-full p-2 justify-center">
              <MapPin className="" size={15} />
              <h2 className="text-sm ">London</h2>
            </div>
            <div className="flex items-center space-x-0.5 opacity-70 bg-text-light/20 rounded-full p-2 justify-center">
              <MapPin className="" size={15} />
              <h2 className="text-sm ">Dubai</h2>
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
