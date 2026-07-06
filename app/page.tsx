import React from "react";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Zap, Quote } from "lucide-react";
import { getProperties } from "@/lib/storage";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/ui/PropertyCard";

export const revalidate = 0;

export default async function HomePage() {
  const allProperties = await getProperties();
  const displayProperties = allProperties.slice(0, 3);

  const testimonials = [
    { name: "Ananya Nair", location: "Bangalore", text: "The architectural fidelity of the Wayanad villa left us breathless. True luxury execution from booking to stay.", score: 5 },
    { name: "Rohan Malhotra", location: "Mumbai", text: "Obsidian Cabin provided perfect minimalist luxury. An absolute escape masterpiece from corporate hustle.", score: 5 }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80"
  ];

  return (
    <div className="w-full space-y-28 pb-28">
      
      {/* Expanded Luxury Hero Canvas Section */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center bg-brand-navy overflow-hidden px-4">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=80"
            alt="SuperStay Resort Premium View"
            className="w-full h-full object-cover scale-102 transform animate-pulse"
          />
        </div>
        
        {/* Soft blue to clean pure white continuous gradient map anchor */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/40 via-brand-navy/90 to-brand-offWhite pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center flex flex-col items-center space-y-8 pt-12">
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-[1.1]">
            Detoxify Luxury. Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-teal-300">Architectural Perfection</span>.
          </h1>
          <p className="text-gray-300 text-lg sm:text-2xl max-w-3xl font-medium leading-relaxed">
            Secure stunning structural villas, edge cabins, and beach estates designed around premium living experiences.
          </p>
          
          <div className="w-full pt-8 transform hover:scale-[1.01] transition-premium">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="w-full max-w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-teal">The Premier Selection</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy mt-1">Featured Portfolio Masterpieces</h2>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center space-x-2 text-base font-bold text-brand-teal hover:text-brand-navy transition-premium group border-b-2 border-brand-teal/20 pb-1"
          >
            <span>Browse Complete Portfolio</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-premium" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Real Verified Customer Reviews Workspace */}
      <section className="w-full bg-brand-navy py-24 px-4 sm:px-8 lg:px-12 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-teal">Verified Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-black">Words From Our Respected Guests</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((t, index) => (
              <div key={index} className="glass-dark p-8 rounded-3xl relative space-y-6 hover:border-brand-teal/50 transition-premium">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-teal/30" />
                <div className="flex space-x-1 text-amber-400">
                  {Array.from({ length: t.score }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-base sm:text-lg italic text-gray-200 font-medium leading-relaxed">"{t.text}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">{t.name}</h4>
                  <span className="text-xs text-brand-teal font-bold">{t.location} Resident</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Customers Experiential Gallery Frame Grid */}
      <section className="w-full max-w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        <div className="text-center sm:text-left">
          <span className="text-xs font-black uppercase tracking-widest text-brand-teal">Moments Captured</span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-1">Our Happy Guest Community</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((src, i) => (
            <div key={i} className="h-72 rounded-3xl overflow-hidden shadow-sm group relative border border-gray-100 bg-gray-100">
              <img
                src={src}
                alt="Happy Customer Vacation Snapshot Frame"
                className="w-full h-full object-cover group-hover:scale-105 transition-premium filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-premium flex items-end p-6">
                <span className="text-white text-xs font-black uppercase tracking-widest">Verified Guest Curation</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assurance Values Grid section */}
      <section className="w-full max-w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-slate-100 border border-gray-200 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-inner">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">Locked Allocations & Zero Delay Constraints</h3>
            <p className="text-base text-brand-muted font-medium leading-relaxed">
              SuperStay runs directly on static architectural file operations, eliminating database connection layer lag states.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
              <ShieldCheck className="h-6 w-6 text-brand-teal" />
              <h4 className="text-sm font-black text-brand-navy uppercase tracking-wider">100% Escrow Escapade</h4>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
              <Zap className="h-6 w-6 text-brand-teal" />
              <h4 className="text-sm font-black text-brand-navy uppercase tracking-wider">Instant Local Writes</h4>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}