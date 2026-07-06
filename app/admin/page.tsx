import React from "react";
import { ClipboardList, Layers, IndianRupee, TrendingUp } from "lucide-react";
import { getBookings, getProperties } from "@/lib/storage";

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const allBookings = await getBookings();
  const allProperties = await getProperties();

  // Accumulate transactional numeric statistics sums dynamically out of current files data lines
  const grossCalculatedRevenue = allBookings
    .filter((b) => b.status === "Confirmed")
    .reduce((accum, curr) => accum + curr.totalPrice, 0);

  const statsMetricsCards = [
    { label: "Total Asset Inherent Units", value: allProperties.length, icon: Layers, color: "text-blue-500 bg-blue-50" },
    { label: "Tracked Transaction Logs", value: allBookings.length, icon: ClipboardList, color: "text-brand-teal bg-teal-50" },
    { label: "Gross Aggregated Revenue", value: `₹${grossCalculatedRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-emerald-500 bg-emerald-50" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-brand-navy tracking-tight">Executive Management Overview</h1>
        <p className="text-xs text-brand-muted font-medium mt-0.5">Real-time telemetry indicators reflecting values committed across the mock tracking file layers.</p>
      </div>

      {/* Grid statistics display wrapper component strip row */}
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

      {/* Inner Sub-panel detailing quick procedural check paths */}
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