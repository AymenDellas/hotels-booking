"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { faker } from "@faker-js/faker";

const generateHotels = (count = 20) => {
  return Array.from({ length: count }, () => {
    const city = faker.location.city();
    const country = faker.location.country();

    const randomAdjective = faker.helpers.arrayElement([
      "Grand",
      "Luxury",
      "Elite",
      "Royal",
      "Oceanview",
      "Skyline",
      "Paradise",
      "Golden",
      "Majestic",
      "Regal",
      "Serene",
      "Prestige",
      "Opulent",
      "Horizon",
      "Summit",
      "Harbor",
      "Chateau",
      "Metropolitan",
      "Sapphire",
      "Pearl",
      "Emerald",
      "Azure",
      "Aurora",
      "Velvet",
    ]);

    const reviewsList = [
      // Generic reviews
      "The staff was incredibly welcoming, and the rooms were spotless.",
      "One of the best hotels I've stayed in—excellent service and top-notch amenities.",
      "The room was spacious, well-decorated, and had a cozy atmosphere.",
      "Fantastic location, right in the heart of everything!",
      "The food was amazing, and the breakfast buffet had a great variety.",
      "I loved the spa treatments, truly a relaxing experience.",
      "Clean, modern, and luxurious—definitely worth the price.",
      "The rooftop bar was a highlight, with great cocktails and stunning views.",
      "Superb hospitality! The concierge helped us plan amazing city tours.",
      "I would stay here again without hesitation.",

      // Location-specific reviews
      `Stunning view of the skyline from my suite in ${city}!`,
      `Loved waking up to the sound of waves in ${city}, ${country}.`,
      `The historic charm of ${city} is perfectly reflected in this hotel.`,
      `A perfect place to stay while exploring ${city}. Everything was just a short walk away!`,
      `Breathtaking view of the mountains from our balcony in ${city}.`,
      `The hotel is just steps away from the best shopping and nightlife in ${city}.`,
      `If you're visiting ${city}, you MUST stay here. Unbeatable comfort and location!`,
      `The hotel's location in ${city}, ${country} made sightseeing incredibly easy.`,
      `An oasis of calm in the bustling streets of ${city}.`,
      `Had the best sunset view over the city skyline in ${city}.`,
    ];

    return {
      name: `${randomAdjective} ${city} Hotel`,
      location: `${city}, ${country}`,
      price: faker.number.int({ min: 50, max: 500 }),
      rating: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 }),
      description: `Experience luxury at ${randomAdjective} ${city} Hotel, located in the heart of ${city}, ${country}.`,
      images: [],
      amenities: faker.helpers.arrayElements(
        [
          "Free WiFi",
          "Pool",
          "Gym",
          "Breakfast",
          "Spa",
          "Parking",
          "Airport Shuttle",
          "Restaurant",
          "24/7 Front Desk",
          "Business Center",
          "Sauna",
        ],
        faker.number.int({ min: 3, max: 6 })
      ),
      reviews: Array.from(
        { length: faker.number.int({ min: 3, max: 6 }) },
        () => ({
          name: faker.person.fullName(),
          date: faker.date.past({ years: 1 }).toISOString().split("T")[0],
          review: faker.helpers.arrayElement(reviewsList),
        })
      ),
    };
  });
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
