import React from "react";
import { notFound } from "next/navigation";
import { Star, MapPin, BedDouble, Bath, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { getProperties } from "@/lib/storage";
import Badge from "@/components/ui/Badge";

export const revalidate = 0;

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const resolvedParams = await params;
  const allProperties = await getProperties();
  const property = allProperties.find((p) => p.id === resolvedParams.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-10 animate-fadeIn">
      
      {/* 1. CRUMB HEADER STRIP ROUTE INDEX TRACK */}
      <div className="space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-brand-muted">
          <span>Portfolio Collections</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{property.category}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-brand-teal font-extrabold">{property.location}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight max-w-4xl">{property.name}</h1>
        <div className="flex items-center space-x-4 pt-1 text-sm font-bold text-brand-navy/80">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-brand-teal" />
            <span>{property.location}</span>
          </div>
          <div className="flex items-center space-x-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-lg text-xs font-extrabold">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>{property.rating} Score</span>
          </div>
        </div>
      </div>

      {/* 2. RESPONSIVE EXTENDED MULTI-ANGLE VISUAL PORTFOLIO GRID GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl overflow-hidden shadow-md">
        <div className="md:col-span-2 h-[350px] sm:h-[500px] w-full bg-gray-200">
          <img
            src={property.images[0]}
            alt={`${property.name} Master View Screen Component Layout`}
            className="w-full h-full object-cover transform hover:scale-[1.01] transition-premium"
          />
        </div>
        <div className="hidden md:flex flex-col h-[500px] gap-6">
          <div className="h-1/2 w-full bg-gray-200 overflow-hidden">
            <img
              src={property.images[1] || property.images[0]}
              alt="Alternative space layout angle"
              className="w-full h-full object-cover hover:scale-105 transition-premium"
            />
          </div>
          <div className="h-1/2 w-full bg-gray-200 overflow-hidden relative">
            <img
              src={property.images[0]}
              alt="Alternative layout angle landscape"
              className="w-full h-full object-cover filter brightness-75 hover:scale-105 transition-premium"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs uppercase tracking-widest font-black pointer-events-none">
              SuperStay Curation Verified
            </div>
          </div>
        </div>
      </div>

      {/* 3. CORE ALLOCATION DETAILS AND BOOKING TRIGGER ACCESS MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-10">
          
          <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm grid grid-cols-3 gap-4 text-center font-bold text-brand-navy">
            <div className="flex flex-col items-center space-y-1 border-r border-gray-100">
              <BedDouble className="h-5 w-5 text-brand-teal" />
              <span className="text-sm font-black">{property.bedrooms} Beds</span>
            </div>
            <div className="flex flex-col items-center space-y-1 border-r border-gray-100">
              <Bath className="h-5 w-5 text-brand-teal" />
              <span className="text-sm font-black">{property.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Users className="h-5 w-5 text-brand-teal" />
              <span className="text-sm font-black">{property.guests} Guests Max</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-muted border-b border-gray-200 pb-2">
              Stay Philosophy & Description
            </h3>
            <p className="text-brand-navy text-base font-medium leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-muted border-b border-gray-200 pb-2">
              Included Premium Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((item) => (
                <div key={item} className="flex items-center space-x-2 bg-white px-4 py-3.5 rounded-2xl border border-gray-100 text-xs font-bold text-brand-navy shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl lg:sticky lg:top-28 space-y-6">
          <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
            <div>
              <span className="text-3xl font-black text-brand-navy">₹{property.price.toLocaleString("en-IN")}</span>
              <span className="text-xs text-brand-muted font-black"> / night</span>
            </div>
            <Badge variant="teal">Inclusive Rate</Badge>
          </div>

          <a
            href={`/booking/${property.id}`}
            className="block w-full text-center bg-brand-navy hover:bg-brand-teal text-white font-black py-4 px-6 rounded-xl transition-premium uppercase tracking-widest text-xs shadow-md"
          >
            Initiate Booking Allocation
          </a>
        </div>
      </div>

    </div>
  );
}