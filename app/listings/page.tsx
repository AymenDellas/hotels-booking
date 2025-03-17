"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const page = () => {
  const [priceRange, setPriceRange] = useState(500);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [featuredHotelsData, setFeaturedHotelsData] = useState<any>([]);

  const filteredHotels = featuredHotelsData
    .filter((hotel: any) => {
      const matchesPrice = hotel.price <= priceRange;
      const matchesRating =
        selectedRating === 0 ? true : hotel.rating >= selectedRating;
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesRating && matchesSearch;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
          break;
        case "price-high":
          return b.price - a.price;
          break;
        case "rating":
          return b.rating - a.rating;
          break;
        default:
          break;
      }
    });
  const getfeaturedHotels = async () => {
    const { data, error } = await supabase.from("hotels").select("*");

    if (error) console.error("Error fetching the hotel data : ", error);
    setFeaturedHotelsData(data);
  };
  useEffect(() => {
    getfeaturedHotels();
  }, []);
  return (
    <main className="mx-8 md:mx-20 xl:mx-36 2xl:mx-48 text-primary-light dark:text-text-dark pt-52 max-lg:pt-36">
      <div className=" text-center space-y-2 mb-12">
        <h1 className="font-bold text-4xl">Explore top-rated hotels</h1>
        <em className="text-sm">carefully selected for your perfect stay.</em>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search hotels or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-primary-light/10 text-primary-light dark:text-text-dark hover:bg-primary-light/20 cursor-pointer"
          >
            <SlidersHorizontal size={20} />
            Filters
          </Button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="bg-card-light/50 p-4 rounded-lg shadow-md mb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-2">
                  Max Price: ${priceRange}
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Minimum Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(Number(e.target.value))}
                  className="w-full p-2 rounded-lg border"
                >
                  <option value={0}>All Ratings</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 rounded-lg border"
                >
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-primary-light dark:text-text-dark mb-4">
        Showing {filteredHotels.length} properties
      </p>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 mb-12">
        {filteredHotels.map((hotel: any, index: any) => {
          return (
            <div
              className="min-w-72 h-fit rounded-xl overflow-hidden bg-white shadow-xl text-primary-dark "
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
                <div className="flex items-center space-x-1 bg-white rounded-full px-2  float-right m-2 shadow-lg">
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

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hotels match your current filters.</p>
          <Button
            onClick={() => {
              setPriceRange(500);
              setSearchQuery("");
              setSelectedRating(0);
              setSortBy("default");
            }}
            className="mt-4 bg-primary-light text-white"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </main>
  );
};

export default page;
