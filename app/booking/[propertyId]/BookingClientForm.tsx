"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, User, Mail, Phone, Users, MessageSquare, ShieldAlert } from "lucide-react";
import { Property } from "@/types";

interface BookingClientFormProps {
  property: Property;
}

export default function BookingClientForm({ property }: BookingClientFormProps) {
  const router = useRouter();
  
  // Interactive frontend core dynamic state tracking parameters
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guestsCount, setGuestsCount] = useState("1");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Automated absolute stay duration day tally calculating formula routine
  let totalCalculatedNights = 0;
  if (checkInDate && checkOutDate) {
    const openDate = new Date(checkInDate);
    const closeDate = new Date(checkOutDate);
    const differenceInTimeMs = closeDate.getTime() - openDate.getTime();
    if (differenceInTimeMs > 0) {
      totalCalculatedNights = Math.ceil(differenceInTimeMs / (1000 * 60 * 60 * 24));
    }
  }

  const absoluteFinalInvoicePrice = totalCalculatedNights > 0 
    ? totalCalculatedNights * property.price 
    : property.price;

  const handleBookingTransactionSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!checkInDate || !checkOutDate || totalCalculatedNights <= 0) {
      setErrorMessage("Please ensure a valid forward-facing calendar stay schedule mapping window range.");
      return;
    }

    setIsSubmitting(true);

    try {
      const targetApiPayload = {
        propertyId: property.id,
        propertyName: property.name,
        propertyImage: property.images[0],
        fullName,
        email,
        phone,
        guests: Number(guestsCount),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        specialRequest,
        totalPrice: absoluteFinalInvoicePrice,
      };

      const serverNetworkResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetApiPayload),
      });

      if (!serverNetworkResponse.ok) {
        const structuralErrorPayload = await serverNetworkResponse.json();
        throw new Error(structuralErrorPayload.error || "API Route operation write exception failure");
      }

      const generatedBookingRecordData = await serverNetworkResponse.json();
      
      // Transfer contextual application user path cleanly across to targeted confirmation landing plate
      router.push(`/confirmation?bookingId=${generatedBookingRecordData.id}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went haywire in processing data stream packets.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
      
      {/* LEFT AREA BLOCK FORM: CUSTOMER FIELDS ENTRY PORTAL */}
      <form
        onSubmit={handleBookingTransactionSubmission}
        className="lg:col-span-2 bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6"
      >
        <h2 className="text-xl font-black text-brand-navy tracking-tight uppercase text-xs border-b border-gray-100 pb-3">
          Occupant Identification Credentials
        </h2>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs font-bold flex items-center space-x-2">
            <ShieldAlert className="h-4 w-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Input Text Grid Fields Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-navy block">Full Guest Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="enter your name"
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal text-brand-navy"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-navy block">Email Identity Channel</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superstay@example.com"
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal text-brand-navy"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-navy block">Contact Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal text-brand-navy"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-navy block">Active Party Headcount</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal text-brand-navy appearance-none"
              >
                {Array.from({ length: property.guests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} Head{n > 1 ? "s" : ""} Allocation Slot
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Check In / Out Framework Date Selection Grid block Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-navy block">Check-In Calendar Window</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
              <input
                type="date"
                required
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal text-brand-navy"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-navy block">Check-Out Calendar Expiration</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
              <input
                type="date"
                required
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal text-brand-navy"
              />
            </div>
          </div>
        </div>

        {/* Special instructions block segment area */}
        <div className="space-y-1.5 border-t border-gray-100 pt-4">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-navy block">Special Accommodation Custom Directives</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-brand-teal" />
            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="e.g., Early morning flight arrival room key coordination notes, dietary guidelines..."
              rows={3}
              className="w-full bg-brand-offWhite border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-brand-teal text-brand-navy"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-navy hover:bg-brand-teal disabled:bg-brand-muted text-white text-sm font-black py-4 rounded-xl uppercase tracking-widest transition-premium shadow-md"
        >
          {isSubmitting ? "Finalizing Internal Database Handshakes..." : "Lock Immediate Room Confirmation"}
        </button>
      </form>

      {/* RIGHT SIDE AREA PANEL: REAL-TIME SUMMARY ACCOUNTING LEDGER STICKY INVOICE */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xl space-y-4 lg:sticky lg:top-24">
        <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider border-b border-gray-100 pb-2">
          Tariff Ledger Overview
        </h3>

        <div className="flex items-center space-x-3 bg-brand-offWhite p-3 rounded-xl border border-gray-100">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
          <div>
            <h4 className="text-sm font-bold text-brand-navy line-clamp-1">{property.name}</h4>
            <span className="text-xs text-brand-muted font-medium">{property.location}</span>
          </div>
        </div>

        <div className="space-y-2 text-xs font-semibold text-brand-navy/90 pt-2">
          <div className="flex justify-between">
            <span>Room Base Unit Tariff Rate</span>
            <span>₹{property.price.toLocaleString("en-IN")} / night</span>
          </div>
          <div className="flex justify-between">
            <span>Evaluated Length of Stay</span>
            <span className="text-brand-teal">
              {totalCalculatedNights > 0 ? `${totalCalculatedNights} Night slots` : "1 Night Minimum Anchor"}
            </span>
          </div>
          
          <div className="flex justify-between border-t border-dashed border-gray-200 pt-3 text-base font-black text-brand-navy">
            <span>Total Gross Invoice</span>
            <span className="text-brand-teal">₹{absoluteFinalInvoicePrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

    </div>
  );
}