"use client";
import React, { useState } from "react";
import { Building, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const [toggleSiderBar, setToggleSiderBar] = useState<boolean>(false);
  const [toggleDarkMode, setToggleDarkMode] = useState<string>("dark");
  const toggleTheme = () => {
    setToggleDarkMode(toggleDarkMode === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };
  return (
    <nav className="fixed w-full z-50 p-4 bg-primary-light dark:bg-text-dark  text-text-light dark:text-primary-dark overflow-x-hidden   shadow-lg">
      <div className="hidden lg:flex items-center justify-between">
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
            <li className="hover:text-text-light/50 dark:hover:text-primary-dark/50 transition-colors duration-200 ease-out ">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-text-light/50 dark:hover:text-primary-dark/50 transition-colors duration-200 ease-out ">
              <Link href="/listings">Hotels</Link>
            </li>
            <li className="hover:text-text-light/50 dark:hover:text-primary-dark/50 transition-colors duration-200 ease-out ">
              <Link href="/bookings">Bookings</Link>
            </li>
          </ul>
        </div>
        <div>
          <Button
            onClick={toggleTheme}
            className={` text-text-dark dark:text-primary-dark py-3 rounded-lg relative cursor-pointer   transition-colors duration-200 ease-out`}
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
      <div className="flex justify-between lg:hidden">
        <div>
          {" "}
          <div>
            <Link
              href="/"
              className="flex items-center space-x-1 text-lg lg:text-2xl font-bold"
            >
              <Building />
              <p>StayFinder</p>
            </Link>
          </div>
        </div>
        <div
          className="text-text-light dark:text-text-dark cursor-pointer lg:hidden"
          onClick={() => setToggleSiderBar(true)}
        >
          <Menu size={24} />
        </div>

        <div
          className={`fixed inset-0  z-40 ${
            toggleSiderBar ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-out`}
        >
          <div className="absolute right-0 top-0 bg-text-light dark:bg-primary-light text-primary-light p-2 pt-8 rounded-lg shadow-lg h-full w-64 transition-transform transform translate-x-0">
            <div
              className="cursor-pointer mb-4"
              onClick={() => setToggleSiderBar(false)}
            >
              <X size={24} />
            </div>
            <ul className="flex flex-col space-y-4">
              <li className="hover:text-primary-light dark:hover:text-text-dark/50 transition-colors duration-200 ease-out bg-card-light dark:bg-text-dark/10  rounded-lg p-2 w-full cursor-pointer">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-primary-light dark:hover:text-text-dark/50 transition-colors duration-200 ease-out bg-card-light dark:bg-text-dark/10 rounded-lg p-2 w-full cursor-pointer">
                <Link href="/listings">Hotels</Link>
              </li>
              <li className="hover:text-primary-light dark:hover:text-text-dark/50 transition-colors duration-200 ease-out bg-card-light dark:bg-text-dark/10 rounded-lg p-2 w-full cursor-pointer">
                <Link href="/bookings">Bookings</Link>
              </li>
              <li>
                {" "}
                <Button
                  onClick={toggleTheme}
                  className={`hover:text-primary-light dark:hover:text-text-dark/50 transition-colors duration-200 ease-out bg-card-light dark:bg-text-dark/10  rounded-lg p-2 w-full cursor-pointer`}
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
