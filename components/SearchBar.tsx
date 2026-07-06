"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Users, IndianRupee } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("1");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearchExecution = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParameters = new URLSearchParams();
    
    if (location) queryParameters.append("location", location);
    if (guests) queryParameters.append("guests", guests);
    if (maxPrice) queryParameters.append("price", maxPrice);

    router.push(`/search?${queryParameters.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearchExecution}
      className="w-full max-w-5xl bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
    >
      {/* Destination Location Input Column */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">Where to?</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-teal h-5 w-5" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Wayanad, Munnar"
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal transition-premium text-brand-navy placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Guest Count Selector Column */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">Guests capacity</label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-teal h-5 w-5" />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal transition-premium text-brand-navy appearance-none cursor-pointer"
          >
            {[1, 2, 3, 4, 6, 8, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Maximum Price Cap Input Column */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">Max Price / Night</label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-teal h-4 w-4" />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Budget ceiling (INR)"
            min="0"
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal transition-premium text-brand-navy placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Submit Action Action Trigger Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-brand-navy text-white font-bold py-3.5 px-6 rounded-xl hover:bg-brand-teal transition-premium flex items-center justify-center space-x-2 shadow-md uppercase tracking-wider text-sm"
        >
          <Search className="h-4 w-4" />
          <span>Search Stays</span>
        </button>
      </div>
    </form>
  );
}