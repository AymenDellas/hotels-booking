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

    const descriptions = [
      `Located in the vibrant heart of ${city}, ${country}, the ${randomAdjective} ${city} Hotel offers a luxurious escape for travelers seeking world-class hospitality. Our elegantly designed rooms and suites provide breathtaking views of the city skyline, while our five-star amenities ensure a stay filled with comfort. Enjoy fine dining at our rooftop restaurant, unwind in our infinity pool, or explore the cultural and historical gems just steps away from our doors.`,

      `Nestled along the pristine coastline of ${city}, ${country}, the ${randomAdjective} ${city} Hotel is a haven for beach lovers and luxury seekers alike. Wake up to the sound of waves crashing against the shore, indulge in a relaxing spa day, or take part in thrilling water activities. With direct access to private beaches and an award-winning seafood restaurant, this is the perfect retreat for those looking to soak in the sun and serenity.`,

      `In the heart of the bustling metropolis of ${city}, ${country}, the ${randomAdjective} ${city} Hotel stands as a symbol of elegance and modern comfort. Our hotel caters to both business and leisure travelers, featuring state-of-the-art conference facilities, a fully equipped business center, and luxurious accommodations. Enjoy our fine dining options, rooftop cocktail lounge, and easy access to the city's financial and entertainment hubs.`,

      `Surrounded by lush greenery and breathtaking mountain views, the ${randomAdjective} ${city} Hotel in ${city}, ${country} is a nature lover’s paradise. Experience the serenity of our eco-friendly retreat, where you can hike scenic trails, enjoy organic farm-to-table dining, and relax in our wellness spa. Whether you're here for adventure or relaxation, our resort offers an unforgettable escape from city life.`,

      `For those seeking the ultimate urban luxury experience, the ${randomAdjective} ${city} Hotel in ${city}, ${country} delivers sophistication at every turn. Our stylish accommodations feature floor-to-ceiling windows with panoramic views, while our exclusive club lounge offers premium services for discerning guests. Located just minutes from high-end shopping districts, art galleries, and entertainment venues, our hotel is the perfect base for exploring the best of ${city}.`,

      `Step into a world of old-world charm and modern luxury at the ${randomAdjective} ${city} Hotel in ${city}, ${country}. Located in a historic district, our boutique hotel blends timeless elegance with contemporary comforts. Guests can explore cobblestone streets lined with cafes and artisan shops, unwind in our cozy library lounge, or savor gourmet meals crafted with locally sourced ingredients. A true hidden gem in the heart of ${city}.`,

      `Perched on a stunning cliffside overlooking the ocean, the ${randomAdjective} ${city} Hotel in ${city}, ${country} offers an unparalleled coastal retreat. Guests can indulge in private beach access, breathtaking sunset views, and exclusive spa treatments. With an infinity pool that seems to merge with the sea and world-class seafood dining, this is the perfect getaway for honeymooners and luxury travelers alike.`,

      `Tucked away in the heart of ${city}, ${country}, the ${randomAdjective} ${city} Hotel is a sanctuary of peace amid the hustle and bustle. With its lush garden terraces, cozy fire-lit lounges, and artisanal coffee shop, our hotel is ideal for travelers looking for a tranquil retreat. Enjoy yoga sessions at sunrise, sip on handcrafted cocktails at our speakeasy-style bar, and immerse yourself in the rich culture of ${city}.`,

      `A beacon of modern luxury in ${city}, ${country}, the ${randomAdjective} ${city} Hotel caters to the sophisticated traveler. Featuring an exclusive rooftop pool, state-of-the-art fitness center, and designer suites, our hotel offers an experience like no other. Whether you're here for business or pleasure, our dedicated concierge team ensures every detail of your stay is flawless.`,

      `Set against the backdrop of majestic mountains, the ${randomAdjective} ${city} Hotel in ${city}, ${country} is a retreat for adventure enthusiasts and relaxation seekers. Spend your days exploring nearby hiking trails, skiing in the winter, or enjoying the warmth of our fireside lounges. With a farm-to-table restaurant and a spa offering holistic wellness treatments, our hotel is the perfect blend of adventure and tranquility.`,

      `Overlooking a breathtaking skyline, the ${randomAdjective} ${city} Hotel is the epitome of contemporary elegance in ${city}, ${country}. Our luxury suites are designed with sleek, modern interiors and offer stunning cityscape views. Guests can unwind at our rooftop bar, indulge in signature spa treatments, or explore the vibrant nightlife just outside our doors.`,

      `Experience timeless grandeur at the ${randomAdjective} ${city} Hotel, where classic design meets five-star comfort. Located in the heart of ${city}, ${country}, our hotel offers exquisite architecture, a world-class spa, and gourmet dining experiences. From grand ballrooms to intimate lounges, every corner of our hotel exudes sophistication and charm.`,

      `Surrounded by rolling vineyards and scenic countryside, the ${randomAdjective} ${city} Hotel in ${city}, ${country} is the perfect escape for wine lovers and nature enthusiasts. Guests can enjoy exclusive wine tastings, gourmet farm-to-table dining, and countryside walks. Our boutique resort offers a tranquil setting for relaxation and indulgence in the finer things in life.`,

      `An elegant fusion of tradition and modernity, the ${randomAdjective} ${city} Hotel in ${city}, ${country} is a masterpiece of luxury. With suites that blend rich cultural heritage with contemporary design, our hotel is perfect for those looking to experience the true essence of ${city}. Enjoy authentic local cuisine, explore historic sites, and unwind in our opulent spa.`,

      `Indulge in ultimate luxury at the ${randomAdjective} ${city} Hotel, where breathtaking views and five-star service create a one-of-a-kind experience. Nestled in the scenic surroundings of ${city}, ${country}, our hotel offers private villas, infinity pools, and fine dining restaurants that redefine hospitality. Escape to paradise and let us take care of the rest.`,

      `The ${randomAdjective} ${city} Hotel in ${city}, ${country} is a landmark of hospitality and excellence. With its iconic design, top-tier service, and an array of high-end amenities, our hotel offers a stay that is both comfortable and luxurious. Guests can enjoy world-class dining, personalized spa treatments, and easy access to the city's most famous attractions.`,

      `A tranquil oasis in the heart of ${city}, ${country}, the ${randomAdjective} ${city} Hotel is designed for those who appreciate the finer things in life. From elegant suites to an award-winning wellness center, every detail is curated to provide the ultimate relaxation experience. Explore the vibrant surroundings or simply enjoy a quiet retreat in the lap of luxury.`,

      `Located in one of the most sought-after destinations in ${city}, ${country}, the ${randomAdjective} ${city} Hotel offers an experience of unmatched elegance. Whether you're here for a romantic getaway or a business trip, our luxury accommodations and exceptional service will make your stay truly memorable.`,

      `At the ${randomAdjective} ${city} Hotel, every stay is an experience to remember. Situated in the lively district of ${city}, ${country}, our hotel boasts premium accommodations, exquisite dining, and personalized services. Discover the energy of the city while enjoying the peaceful comforts of our world-class hotel.`,
    ];

    return {
      name: `${randomAdjective} ${city} Hotel`,
      location: `${city}, ${country}`,
      price: faker.number.int({ min: 50, max: 500 }),
      rating: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 }),
      description: faker.helpers.arrayElement(descriptions),
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
          "Bar",
          "Restaurant",
          "24/7 Front Desk",
          "Business Center",
          "Sauna",
          "Pet Friendly",
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
