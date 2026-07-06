import React from "react";
import Link from "next/link";
import { Hotel, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-navy text-white pt-16 pb-8 border-t border-brand-navyLight">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Hotel className="h-7 w-7 text-brand-teal" />
            <span className="text-2xl font-black tracking-tight text-white">
              Super<span className="text-brand-teal">Stay</span>
            </span>
          </div>
          <p className="text-base text-gray-400 font-medium leading-relaxed">
            Premium getaway spaces curated meticulously for travelers seeking absolute design excellence and immersive hospitality.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-black tracking-widest uppercase text-brand-teal mb-6">Explore</h4>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-wide text-gray-400">
            <li><Link href="/" className="hover:text-white transition-premium">Home Portfolio</Link></li>
            <li><Link href="/search" className="hover:text-white transition-premium">Premium Stays</Link></li>
            <li><Link href="/about" className="hover:text-white transition-premium">Our Philosophy</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-premium">Get In Touch</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black tracking-widest uppercase text-brand-teal mb-6">Stay Curations</h4>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-wide text-gray-400">
            <li><Link href="/search?category=Villa" className="hover:text-white transition-premium">Signature Villas</Link></li>
            <li><Link href="/search?category=Cabin" className="hover:text-white transition-premium">Alpine Cabins</Link></li>
            <li><Link href="/search?category=Beachfront" className="hover:text-white transition-premium">Beachfront Resorts</Link></li>
            <li><Link href="/search?category=Heritage" className="hover:text-white transition-premium">Heritage Manors</Link></li>
          </ul>
        </div>

        <div className="space-y-4 text-sm font-medium text-gray-300">
          <h4 className="text-xs font-black tracking-widest uppercase text-brand-teal mb-2">Corporate Office</h4>
          <div className="flex items-start space-x-2.5">
            <MapPin className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
            <span>Hilite Business Park, Calicut, Kerala</span>
          </div>
          <div className="flex items-start space-x-2.5">
            <Phone className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
            <span className="leading-tight">+91 95266 54118<br />+91 97782 50828</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Mail className="h-5 w-5 text-brand-teal flex-shrink-0" />
            <span>razik@supermelabs.com</span>
          </div>
        </div>
      </div>
      
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 mt-16 pt-8 border-t border-gray-800 text-center text-sm font-bold tracking-wide text-gray-500">
        © 2026 SuperStay
      </div>
    </footer>
  );
}