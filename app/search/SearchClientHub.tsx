"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Ban } from "lucide-react";
import { Property } from "@/types";
import PropertyCard from "@/components/ui/PropertyCard";

interface SearchClientHubProps {
  initialProperties: Property[];
  initialLocation: string;
  initialGuests: number;
  initialPrice: number | null;
  initialCategory: string;
}

export default function SearchClientHub({
  initialProperties,
  initialLocation,
  initialGuests,
  initialPrice,
  initialCategory,
}: SearchClientHubProps) {
  // Client state parameters driving instantaneous real-time sorting logic layouts
  const [location, setLocation] = useState(initialLocation);
  const [guests, setGuests] = useState(initialGuests);
  const [maxPrice, setMaxPrice] = useState(initialPrice || "");
  const [category, setCategory] = useState(initialCategory);

  const filteredProperties = initialProperties.filter((item) => {
    if (location && !item.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (item.guests < guests) return false;
    if (maxPrice && item.price > Number(maxPrice)) return false;
    if (category && item.category !== category) return false;
    return true;
  });

  return (
    <div className="w-full space-y-8">
      {/* Fast Category Strip Selector Tag Elements Row */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-6">
        {["All", "Villa", "Cabin", "Beachfront", "Heritage"].map((cat) => {
          const isSelected = cat === "All" ? !category : category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat === "All" ? "" : cat)}
              className={`text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-premium border ${
                isSelected
                  ? "bg-brand-teal text-white border-brand-teal shadow-md"
                  : "bg-white text-brand-navy border-gray-200 hover:border-brand-teal"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        
        {/* LEFT COLUMN PANEL: DYNAMIC INTERACTIVE SEARCH CONSOLE FORM */}
        <div className="bg-brand-navy p-6 rounded-3xl border border-gray-200 space-y-6 shadow-xl lg:sticky lg:top-28">
          <div className="flex items-center space-x-2 pb-3 border-b border-gray-100 text-brand-navy font-black text-sm uppercase tracking-wider">
            <SlidersHorizontal className="h-4 w-4 text-brand-teal" />
            <span>Adjust Search Metrics</span>
          </div>

          <div className="space-y-4 text-xs font-bold uppercase tracking-wider text-brand-navy">
            {/* Location selector choice control input box fields */}
            <div className="space-y-1.5">
              <label className="block text-gray-500">Destination Area</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Wayanad, Munnar"
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-semibold text-sm text-brand-navy focus:outline-none focus:border-brand-teal"
              />
            </div>

            {/* Guest capacity filter input dropdown */}
            <div className="space-y-1.5">
              <label className="block text-gray-500">Occupant Count</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-semibold text-sm text-brand-navy focus:outline-none focus:border-brand-teal appearance-none"
              >
                {[1, 2, 3, 4, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} Minimum Headcount Slot
                  </option>
                ))}
              </select>
            </div>

            {/* Budget limit capping interactive field entry box */}
            <div className="space-y-1.5">
              <label className="block text-gray-500">Max Budget Price / Night</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Budget cap limit (INR)"
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-semibold text-sm text-brand-navy focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setLocation("");
              setGuests(1);
              setMaxPrice("");
              setCategory("");
            }}
            className="w-full text-center text-xs font-black uppercase tracking-widest text-brand-teal bg-teal-50 hover:bg-brand-teal hover:text-white py-3 rounded-xl transition-premium block"
          >
            Reset All Matrix Parameters
          </button>
        </div>

        {/* RIGHT COLUMN LISTINGS DECK ROW OUTPUT FRAME */}
        <div className="lg:col-span-3">
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center max-w-xl mx-auto flex flex-col items-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                <Ban className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black text-brand-navy">No Matching Curations Found</h3>
              <p className="text-brand-muted text-sm font-medium leading-relaxed">
                We currently lack inventory matching those exact parameters. Try widening input words or reducing required minimum headcount slots to view matching assets.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}