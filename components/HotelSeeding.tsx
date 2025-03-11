"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { faker } from "@faker-js/faker";

const generateHotels = (count = 20) => {
  return Array.from({ length: count }, () => ({
    name: faker.company.name() + " Hotel",
    location: faker.location.city() + ", " + faker.location.country(),
    price: faker.number.int({ min: 50, max: 500 }),
    rating: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 }),
    description: faker.lorem.sentence(),
    image: null, // Manually upload later
  }));
};

export default function HotelSeeding() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const insertHotels = async () => {
    setLoading(true);
    setMessage("");

    const hotels = generateHotels(20);
    const { data, error } = await supabase.from("hotels").insert(hotels);

    if (error) {
      setMessage("Error inserting hotels: " + error.message);
    } else {
      setMessage("Hotels inserted successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={insertHotels}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Hotels"}
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
