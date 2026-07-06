// src/app/admin/AdminOverviewPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ClipboardList, Layers, IndianRupee, TrendingUp } from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({ propertiesCount: 0, bookingsCount: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTelemetry() {
      try {
        // Fetch operations targeting data/ inventory layers synchronously
        const propsRes = await fetch("/api/properties");
        const booksRes = await fetch("/api/bookings");
        
        const properties = await propsRes.json();
        const bookings = await booksRes.json();

        const grossCalculatedRevenue = bookings
          .filter((b: any) => b.status === "Confirmed")
          .reduce((accum: number, curr: any) => accum + curr.totalPrice, 0);

        setStats({
          propertiesCount: properties.length,
          bookingsCount: bookings.length,
          revenue: grossCalculatedRevenue
        });
      } catch (err) {
        console.error("Telemetry mapping failure", err);
      } finally {
        setLoading(false);
      }
    }
    loadTelemetry();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs font-bold tracking-widest uppercase text-brand-muted animate-pulse">
        Loading Operational Control Assets...
      </div>
    );
  }

  const statsMetricsCards = [
    { label: "Total Asset Inherent Units", value: stats.propertiesCount, icon: Layers, color: "text-blue-500 bg-blue-50" },
    { label: "Tracked Transaction Logs", value: stats.bookingsCount, icon: ClipboardList, color: "text-brand-teal bg-teal-50" },
    { label: "Gross Aggregated Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-emerald-500 bg-emerald-50" },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-brand-navy tracking-tight">Executive Management Overview</h1>
        <p className="text-xs text-brand-muted font-medium mt-0.5">Real-time telemetry indicators reflecting values committed across the mock tracking file layers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statsMetricsCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div key={card.label} className="bg-brand-offWhite border border-gray-200 p-5 rounded-2xl flex items-center justify-between shadow-inner">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">{card.label}</span>
                <span className="text-2xl font-black text-brand-navy block">{card.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <IconComponent className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border border-gray-100 rounded-xl p-6 bg-white space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-2 text-brand-navy font-bold text-sm uppercase tracking-wider">
          <TrendingUp className="h-4 w-4 text-brand-teal" />
          <span>Operational Control Guidelines Verification Protocol</span>
        </div>
        <p className="text-xs text-brand-muted leading-relaxed">
          This system dashboard runs natively atop serverless file reading nodes. Manual configuration mutations, deletion sequences, or insertions reflected across alternative tabular sub-panels execute structural local updates instantaneously without compilation delays.
        </p>
      </div>
    </div>
  );
}