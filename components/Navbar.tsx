// src/components/Navbar.tsx (or your exact path to Navbar)
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hotel, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Properties", href: "/search" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-premium ${
        isScrolled ? "glass-effect shadow-lg py-4" : "bg-white/90 border-b border-gray-100 py-5"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo Identity */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Hotel className="h-8 w-8 text-brand-teal group-hover:scale-110 transition-premium" />
          <span className="text-2xl font-black tracking-tight text-brand-navy">
            Super<span className="text-brand-teal">Stay</span>
          </span>
        </Link>

        {/* Styled Link Matrix */}
        <div className="hidden md:flex items-center space-x-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-premium ${
                  isActive
                    ? "bg-brand-teal text-white shadow-sm"
                    : "text-brand-navy hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-navy p-2 hover:bg-gray-100 rounded-xl transition-premium"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Responsive Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden w-full bg-white border-b border-gray-200 py-4 px-6 space-y-2 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-bold uppercase tracking-wider p-3 rounded-xl ${
                pathname === link.href ? "bg-brand-teal text-white" : "text-brand-navy hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}