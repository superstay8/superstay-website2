import React from "react";
import Link from "next/link";
import { CheckCircle, Home, LayoutDashboard, Calendar, Bookmark, CreditCard } from "lucide-react";
import { getBookings } from "@/lib/storage";

export const revalidate = 0;

interface ConfirmationPageProps {
  searchParams: Promise<{
    bookingId?: string;
  }>;
}

export default async function BookingConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const resolvedParams = await searchParams;
  const currentBookingsList = await getBookings();
  const targetedBookingRecord = currentBookingsList.find((b) => b.id === resolvedParams.bookingId);

  if (!targetedBookingRecord) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
        <div className="text-red-500 text-5xl">⚠️</div>
        <h2 className="text-xl font-bold text-brand-navy">Record Trailing Context Blank</h2>
        <p className="text-xs text-brand-muted">Targeted system allocation validation ID pointer invalid or lacking inside active data registers.</p>
        <Link href="/" className="inline-block bg-brand-navy text-white text-xs font-bold px-4 py-2 rounded-xl">Return Home Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
      
      {/* SUCCESS TOP SHIELD ICON GRAPHIC HEADER */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
          <CheckCircle className="h-12 w-12 stroke-[2.5]" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Allocation Confirmed Authenticated
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
          Reservation Locked Down Perfectly!
        </h1>
        <p className="text-sm text-brand-muted max-w-md font-medium">
          Your room slot trace has been hardcoded successfully into the storage data logs under transaction ID reference code:
        </p>
        <div className="bg-brand-navy text-brand-teal font-mono font-black text-lg px-6 py-2 rounded-2xl shadow-md border border-brand-navyLight tracking-wider">
          {targetedBookingRecord.id}
        </div>
      </div>

      {/* DETAILED TRANSACTION VOUCHER CARD PANEL SUMMARY */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl text-left overflow-hidden">
        <div className="bg-brand-navy p-4 flex items-center space-x-3 text-white border-b border-brand-navyLight">
          <img
            src={targetedBookingRecord.propertyImage}
            alt={targetedBookingRecord.propertyName}
            className="w-12 h-12 object-cover rounded-lg border border-white/10"
          />
          <div>
            <h4 className="text-sm font-black tracking-tight">{targetedBookingRecord.propertyName}</h4>
            <p className="text-[11px] text-brand-teal font-semibold tracking-wider uppercase">System Registered Core Entity</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-brand-navy">
          <div className="flex items-start space-x-2">
            <Bookmark className="h-4 w-4 text-brand-teal mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted block font-normal">Primary Occupant Entity</span>
              <span className="font-bold text-sm">{targetedBookingRecord.fullName}</span>
              <span className="block text-brand-muted font-normal mt-0.5">{targetedBookingRecord.email} | {targetedBookingRecord.phone}</span>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-brand-teal mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted block font-normal">Stay Horizon Windows</span>
              <span className="font-bold">{targetedBookingRecord.checkIn} Through {targetedBookingRecord.checkOut}</span>
              <span className="block text-brand-muted font-normal mt-0.5">Headcount Cap: {targetedBookingRecord.guests} Occupants</span>
            </div>
          </div>

          <div className="sm:col-span-2 border-t border-gray-100 pt-4 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <CreditCard className="h-4 w-4 text-brand-teal" />
              <span className="font-bold text-brand-navy">Settled Evaluation Tariff Gross Balance:</span>
            </div>
            <span className="text-lg font-black text-brand-teal">₹{targetedBookingRecord.totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* CORE CONTROL HUB DIRECTION LINK BUTTON MATRIX FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="w-full sm:w-auto bg-brand-navy text-white text-xs font-bold px-6 py-4 rounded-xl hover:bg-brand-teal transition-premium flex items-center justify-center space-x-2 uppercase tracking-widest shadow-md"
        >
          <Home className="h-4 w-4" />
          <span>Browse More Stays</span>
        </Link>
        <Link
          href="/admin"
          className="w-full sm:w-auto bg-white text-brand-navy border border-gray-300 text-xs font-bold px-6 py-4 rounded-xl hover:bg-brand-offWhite transition-premium flex items-center justify-center space-x-2 uppercase tracking-widest shadow-sm"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Inspect Log Ledger</span>
        </Link>
      </div>

    </div>
  );
}