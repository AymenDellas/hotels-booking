import { Tag, BadgeCheck, CalendarCheck, Headphones } from "lucide-react";
export const featuredHotels = [
  {
    name: "Grand Plaza Hotel",
    location: "New York, USA",
    rating: 4.8,
    pricePerNight: 120,
    image: "/2.jpg",
    amenities: ["Free WiFi", "Pool", "Parking", "Breakfast Included"],
  },
  {
    name: "Seaside Resort",
    location: "Malibu, USA",
    rating: 4.7,
    pricePerNight: 180,
    image: "/3.jpg",
    amenities: ["Beachfront", "Free WiFi", "Spa", "Ocean View"],
  },
  {
    name: "Skyline Tower Hotel",
    location: "Dubai, UAE",
    rating: 4.9,
    pricePerNight: 250,
    image: "/4.jpg",
    amenities: [
      "Infinity Pool",
      "City View",
      "Luxury Suites",
      "24/7 Concierge",
    ],
  },
];

export const whyChooseUs = [
  {
    icon: Tag,
    title: "Best Price Guarantee",
    description: "Get the lowest prices on top hotels.",
  },

  {
    icon: CalendarCheck,
    title: "Hassle-Free Booking",
    description: "Easy and fast reservation process.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Assistance whenever you need it.",
  },
];
