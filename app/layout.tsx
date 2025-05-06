import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StayFinder | Book Hotels Easily",
  description: "Find and book your perfect stay at top-rated hotels worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light ">
      <body
        className={`${poppins.variable} ${poppins.className} antialiased bg-background-light text-foreground-light dark:text-foreground-dark dark:bg-background-dark transition-colors duration-200 ease-out`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
