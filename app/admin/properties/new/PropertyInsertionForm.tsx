"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Layers, Check, ShieldAlert } from "lucide-react";

export default function PropertyInsertionForm() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Luxury");
  const [bedrooms, setBedrooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("2");
  const [guests, setGuests] = useState("4");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleFormSubmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");
    setIsLoading(true);

    // Split user amenities string array parameters cleanly 
    const amenitiesArr = amenities
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    try {
      const formPayloadData = {
        name,
        location,
        price: Number(price),
        category,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        guests: Number(guests),
        description,
        amenities: amenitiesArr.length > 0 ? amenitiesArr : ["High-Speed Wi-Fi", "Air Conditioning"],
        images: imageUrl ? [imageUrl] : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"]
      };

      const networkCallResponse = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formPayloadData)
      });

      if (!networkCallResponse.ok) {
        throw new Error("Failed to register property object trace into server filesystem data records");
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err: any) {
      setErrorText(err.message || "Unknown error framework mismatch context occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmissionSubmit} className="space-y-6 text-xs font-semibold text-brand-navy">
      {errorText && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl font-bold flex items-center space-x-2">
          <ShieldAlert className="h-4 w-4" />
          <span>{errorText}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block uppercase tracking-wider">Stay Structure Title Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Grand Horizon Infinity Manor Mansion"
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block uppercase tracking-wider">Geographic Location Address Label</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Kumarakom, Kerala"
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block uppercase tracking-wider">Tariff Cost Rate per Night (INR)</label>
          <input
            type="number"
            required
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 22000"
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block uppercase tracking-wider">Architectural Category Classification</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal appearance-none"
          >
            {["Luxury", "Villa", "Cabin", "Beachfront", "Heritage"].map((cat) => (
              <option key={cat} value={cat}>{cat} Classification Segment</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block uppercase tracking-wider">Bedrooms Count</label>
          <input
            type="number"
            required
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block uppercase tracking-wider">Bathrooms En-suite Count</label>
          <input
            type="number"
            required
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="block uppercase tracking-wider">Total Headcount Capacity Threshold Cap</label>
          <input
            type="number"
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="block uppercase tracking-wider">External Asset Display Image Cdn URL Link</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Leave blank to drop standard fallback architectural placeholder graphics view"
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="block uppercase tracking-wider">Amenities Perks Structural Tags List (Comma Separated)</label>
          <input
            type="text"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            placeholder="e.g., Infinity Pool, Private Jacuzzi, Panoramic Balcony, Private Butler Service"
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="block uppercase tracking-wider">Full Operational Narrative Brand Philosophy Description</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide architectural layout metrics breakdown descriptions here details cleanly..."
            className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-brand-teal"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-navy hover:bg-brand-teal text-white font-black py-4 rounded-xl uppercase tracking-widest transition-premium flex items-center justify-center space-x-2 shadow-md"
      >
        <Check className="h-4 w-4" />
        <span>{isLoading ? "Writing Record File Bytes..." : "Commit Asset to Live Database Inventory"}</span>
      </button>
    </form>
  );
}