"use client";
import React, { useState } from "react";
import { Building, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
const Navbar = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState<string>("dark");
  const toggleTheme = () => {
    setToggleDarkMode(toggleDarkMode === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };
  return (
    <nav className="sticky z-50 p-8 text-primary-light dark:text-text-dark  ">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center space-x-1 text-lg lg:text-2xl font-bold"
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
              <Link href="/bookings">Bookings</Link>
            </li>
          </ul>
        </div>
        <div>
          <Button
            onClick={toggleTheme}
            className={`bg-primary-light dark:bg-primary-dark text-text-dark py-3 rounded-lg relative cursor-pointer  w-12 dark:hover:bg-primary-dark/90 hover:bg-primary-light/90 transition-colors duration-200 ease-out`}
          >
            <Moon
              className={`${
                toggleDarkMode === "dark"
                  ? "rotate-0 opacity-100 visible"
                  : "rotate-180 opacity-0 invisible"
              } transition-all duration-300 ease-out absolute`}
            />
            <Sun
              className={`${
                toggleDarkMode === "light"
                  ? "rotate-0 opacity-100 "
                  : "-rotate-180 opacity-0 "
              } transition-all duration-300 ease-out absolute`}
            />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
