"use client";
import React, { useState, useEffect } from "react";
import { Building, Menu, X, Sun, Moon, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
const Navbar = () => {
  const pathname = usePathname();
  const [toggleSiderBar, setToggleSiderBar] = useState<boolean>(false);
  const [toggleDarkMode, setToggleDarkMode] = useState<string>("dark");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    checkUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
  const formattedCreatedAt = new Date(user?.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setToggleDarkMode(toggleDarkMode === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleSiderBar && e.target instanceof Element) {
        const sidebarContent = document.getElementById("sidebar-content");
        const clickedInsideSidebar = sidebarContent?.contains(e.target);

        if (!clickedInsideSidebar) {
          setToggleSiderBar(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleSiderBar]);

  return (
    <nav
      className={`fixed w-full z-50 p-4 ${
        isScrolled ? "shadow-md" : "shadow-lg"
      } 
      bg-primary-light dark:bg-text-dark text-text-light dark:text-primary-dark 
   transition-shadow duration-300`}
    >
      {/* Desktop Navigation */}
      <div className=" hidden lg:flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition-opacity"
          >
            <Building className="stroke-current stroke-2" />
            <p>StayFinder</p>
          </Link>
        </div>
        <div>
          <ul className="flex space-x-8 mx-8">
            {[
              { href: "/", label: "Home" },
              { href: "/listings", label: "Hotels" },
              { href: "/bookings", label: "Bookings" },
            ].map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`py-2 hover:text-text-light/50 dark:hover:text-primary-dark/50 
                    transition-colors duration-200 ease-out relative ${
                      pathname === link.href ? "font-medium" : ""
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-text-light dark:bg-primary-dark rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-text-light/10 dark:bg-primary-dark/10 hover:bg-text-light/20 
              dark:hover:bg-primary-dark/20 text-text-dark dark:text-primary-dark relative overflow-hidden
              transition-all duration-200 cursor-pointer"
            aria-label={`Switch to ${
              toggleDarkMode === "dark" ? "light" : "dark"
            } mode`}
          >
            <Moon
              className={`absolute inset-0 m-auto ${
                toggleDarkMode === "dark"
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0"
              } transition-all duration-300 ease-out`}
              size={20}
            />
            <Sun
              className={`absolute inset-0 m-auto ${
                toggleDarkMode === "light"
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0"
              } transition-all duration-300 ease-out`}
              size={20}
            />
          </Button>
          {user ? (
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-text-light dark:border-primary-dark text-text-dark dark:text-primary-dark cursor-pointer hover:bg-text-dark/10 dark:hover:bg-primary-dark/20 transition-colors duration-200 ease-out"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <User className="w-5 h-5" />
              </div>

              {isOpen && (
                <div className="flex flex-col absolute mt-2 right-0 bg-text-dark  dark:bg-primary-dark text-gray-800 dark:text-text-dark rounded-lg shadow-xl   p-4 w-64 z-50 transition-all duration-200 ease-in-out">
                  <div className="border-b border-gray-200 dark:border-white/40  pb-3 mb-3">
                    <h3 className="text-lg font-semibold truncate">
                      {user.email}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-text-light/70 mt-1">
                      Created: {formattedCreatedAt}
                    </p>
                  </div>

                  <button
                    className="mt-2 flex items-center text-text-light bg-primary-dark  dark:text-primary-dark dark:bg-text-dark hover:bg-primary-dark/80 dark:hover:bg-text-dark/80 px-4 py-2  rounded-md transition-colors duration-200 cursor-pointer"
                    onClick={() => supabase.auth.signOut()}
                    aria-label="Log out"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="font-medium">Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button className="border border-text-light dark:border-primary-dark text-lg  text-text-dark dark:text-primary-dark cursor-pointer hover:bg-text-dark/20 dark:hover:bg-primary-dark/10 transition-colors duration-200 ease-out px-4 py-2">
                <Link href="/login">Login</Link>
              </Button>
              <Button className=" text-lg bg-text-light text-primary-light dark:text-text-light dark:bg-primary-light cursor-pointer hover:bg-text-dark/80 dark:hover:bg-primary-dark/90 transition-colors duration-200 ease-out px-4 py-2">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-between items-center lg:hidden">
        <Link
          href="/"
          className="flex items-center space-x-2 text-lg font-bold hover:opacity-90 transition-opacity"
        >
          <Building className="stroke-current stroke-2" />
          <p>StayFinder</p>
        </Link>

        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-text-light/10 
            dark:bg-primary-dark/10 hover:bg-text-light/20 dark:hover:bg-primary-dark/20 text-text-light 
            dark:text-primary-dark transition-colors duration-200 cursor-pointer"
          onClick={() => setToggleSiderBar(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 
            ${toggleSiderBar ? "opacity-100" : "opacity-0 pointer-events-none"} 
            transition-opacity duration-300 ease-out`}
        />

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-50 
            ${toggleSiderBar ? "translate-x-0" : "translate-x-full"} 
            transition-transform duration-300 ease-out`}
        >
          <div
            id="sidebar-content"
            className="bg-text-light dark:bg-primary-light text-primary-light dark:text-text-dark 
              h-full w-72 shadow-xl rounded-l-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-primary-light/10 dark:border-text-dark/10">
              <Link
                href="/"
                className="flex items-center space-x-2 text-lg font-bold"
              >
                <Building />
                <p>StayFinder</p>
              </Link>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full 
                  hover:bg-primary-light/10 dark:hover:bg-text-dark/10 transition-colors"
                onClick={() => setToggleSiderBar(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="flex flex-col p-4 space-y-2 flex-1">
              {[
                { href: "/", label: "Home", icon: "🏠" },
                { href: "/listings", label: "Hotels", icon: "🏨" },
                { href: "/bookings", label: "Bookings", icon: "📅" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl w-full
                      ${
                        pathname === link.href
                          ? "bg-primary-light/15 dark:bg-text-dark/15 font-medium"
                          : "hover:bg-primary-light/5 dark:hover:bg-text-dark/5"
                      } 
                      transition-colors duration-200`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth buttons in mobile sidebar */}
            <div className="p-4 border-t border-primary-light/10 dark:border-text-dark/10 space-y-3">
              {user ? (
                <Button
                  onClick={() => supabase.auth.signOut()}
                  className="w-full border border-primary-light/20 dark:border-text-dark/20 text-lg text-primary-light dark:text-text-dark cursor-pointer hover:bg-primary-light/5 dark:hover:bg-text-dark/5 transition-colors duration-200 ease-out py-2"
                >
                  Log out
                </Button>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button className="w-full border border-primary-light/20 dark:border-text-dark/20 text-lg text-primary-light dark:text-text-dark cursor-pointer hover:bg-primary-light/5 dark:hover:bg-text-dark/5 transition-colors duration-200 ease-out py-2">
                    <Link href="/login" className="w-full block">
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full text-lg bg-primary-light text-text-light dark:bg-text-dark dark:text-primary-light cursor-pointer hover:bg-primary-light/90 dark:hover:bg-text-dark/90 transition-colors duration-200 ease-out py-2">
                    <Link href="/register" className="w-full block">
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-primary-light/10 dark:border-text-dark/10">
              <Button
                onClick={toggleTheme}
                className="flex items-center justify-between w-full p-3 rounded-xl
                  bg-primary-light/5 dark:bg-text-dark/5 hover:bg-primary-light/10 
                  dark:hover:bg-text-dark/10 transition-colors"
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">
                    {toggleDarkMode === "dark" ? "🌙" : "☀️"}
                  </span>
                  <span>
                    {toggleDarkMode === "dark" ? "Dark Mode" : "Light Mode"}
                  </span>
                </span>
                <div className="relative w-10 h-5 bg-primary-light/20 dark:bg-text-dark/20 rounded-full cursor-pointer">
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary-light dark:bg-text-dark
                      transition-all duration-300 ${
                        toggleDarkMode === "dark" ? "left-5" : "left-0.5"
                      }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
