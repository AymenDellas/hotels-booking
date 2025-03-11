import { supabase } from "./lib/supabase.js";
import { faker } from "@faker-js/faker";

const generateHotels = (count = 20) => {
  return Array.from({ length: count }, () => ({
    name: faker.company.name() + " Hotel",
    location: faker.location.city() + ", " + faker.location.country(),
    price: faker.number.int({ min: 50, max: 500 }),
    rating: faker.number.float({ min: 3.0, max: 5.0, precision: 0.1 }),
    description: faker.lorem.sentence(),
    image: null, // Will be added manually later
  }));
};

export const insertHotels = async () => {
  const hotels = generateHotels(20);

  const { data, error } = await supabase.from("hotels").insert(hotels);

  if (error) {
    console.error("Error inserting hotels:", error);
  } else {
    console.log("Hotels inserted successfully:", data);
    console.log("Now manually upload images in Supabase.");
  }
};

// Run this function manually when needed
insertHotels();
