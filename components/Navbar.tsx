"use client";
import React, { useState } from "react";
import { Building, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
const Navbar = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <nav className="sticky z-50 p-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center space-x-1 text-2xl font-bold"
          >
            <Building />
            <p>StayFinder</p>
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4 mx-8">
            <li className="hover:text-primary-light transition-colors duration-200 ease-out ">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-primary-light transition-colors duration-200 ease-out ">
              <Link href="/listings">Hotels</Link>
            </li>
            <li className="hover:text-primary-light transition-colors duration-200 ease-out ">
              <Link href="/">Bookings</Link>
            </li>
            <li className="hover:text-primary-light transition-colors duration-200 ease-out ">
              <Link href="/">Contacts</Link>
            </li>
          </ul>
        </div>
        <div>
          <Button className="text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
