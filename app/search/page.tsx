import React from "react";
import { getProperties } from "@/lib/storage";
import SearchClientHub from "./SearchClientHub";

export const revalidate = 0;

interface SearchPageProps {
  searchParams: Promise<{
    location?: string;
    guests?: string;
    price?: string;
    category?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const allProperties = await getProperties();

  const initialLocation = resolvedParams.location || "";
  const initialGuests = parseInt(resolvedParams.guests || "1", 10);
  const initialPrice = resolvedParams.price ? parseInt(resolvedParams.price, 10) : null;
  const initialCategory = resolvedParams.category || "";

  return (
    <div className="w-full max-w-full mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">Available Curated Stays</h1>
        <p className="text-brand-muted text-base font-medium mt-1">
          Tweak criteria tags inside the live parameters console panel framework to check matching luxury inventory fields instantly.
        </p>
      </div>

      <SearchClientHub
        initialProperties={allProperties}
        initialLocation={initialLocation}
        initialGuests={initialGuests}
        initialPrice={initialPrice}
        initialCategory={initialCategory}
      />
    </div>
  );
}