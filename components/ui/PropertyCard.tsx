import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, BedDouble, Bath, Users } from "lucide-react";
import { Property } from "@/types";
import Badge from "./Badge";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-premium group flex flex-col h-full border border-gray-100">
      {/* Property Hero Image Gallery Wrapper */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-premium"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="teal">{property.category}</Badge>
        </div>
        <div className="absolute bottom-4 right-4 glass-dark text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1">
          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <span>{property.rating}</span>
        </div>
      </div>

      {/* Information Layout Matrix */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-brand-muted text-xs font-medium space-x-1 mb-2">
          <MapPin className="h-3.5 w-3.5 text-brand-teal" />
          <span>{property.location}</span>
        </div>

        <h3 className="text-lg font-bold text-brand-navy line-clamp-1 mb-2 group-hover:text-brand-teal transition-premium">
          {property.name}
        </h3>
        
        <p className="text-sm text-brand-muted line-clamp-2 mb-4 flex-grow">
          {property.description}
        </p>

        {/* Capacity specs row */}
        <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-3 mb-4 text-xs font-medium text-brand-navy/80">
          <div className="flex items-center space-x-1">
            <BedDouble className="h-4 w-4 text-brand-muted" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="h-4 w-4 text-brand-muted" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-brand-muted" />
            <span>{property.guests} Guests</span>
          </div>
        </div>

        {/* Pricing Actions Row */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-extrabold text-brand-navy">₹{property.price.toLocaleString("en-IN")}</span>
            <span className="text-xs text-brand-muted font-medium"> / night</span>
          </div>
          
          <Link
            href={`/property/${property.id}`}
            className="bg-brand-navy text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-brand-teal transition-premium uppercase tracking-wider shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}