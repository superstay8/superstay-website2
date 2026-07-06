import React from "react";
import { ClipboardList, Calendar, User, CreditCard } from "lucide-react";
import { getBookings } from "@/lib/storage";
import Badge from "@/components/ui/Badge";

export const revalidate = 0;

export default async function AdminBookingsLogPage() {
  const bookingsDataList = await getBookings();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-brand-navy tracking-tight">Master Reservation Database Logs</h1>
        <p className="text-xs text-brand-muted font-medium mt-0.5">Comprehensive audit breakdown trace mappings detailing client stay parameters recorded inside files.</p>
      </div>

      {bookingsDataList.length === 0 ? (
        <div className="bg-brand-offWhite rounded-xl border border-dashed border-gray-300 p-12 text-center text-xs font-bold text-brand-muted uppercase tracking-widest">
          No bookings committed into files database yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-xs font-medium text-brand-navy">
            <thead>
              <tr className="bg-brand-navy text-white uppercase tracking-wider font-bold border-b border-brand-navyLight">
                <th className="p-4">ID Code</th>
                <th className="p-4">Occupant Particulars</th>
                <th className="p-4">Target Room Asset</th>
                <th className="p-4">Schedule Interval</th>
                <th className="p-4 text-right">Settled Amount</th>
                <th className="p-4 text-center">Status Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold">
              {bookingsDataList.map((log) => (
                <tr key={log.id} className="hover:bg-brand-offWhite transition-premium">
                  <td className="p-4 font-mono font-bold text-brand-teal">{log.id}</td>
                  <td className="p-4 space-y-0.5">
                    <div className="flex items-center space-x-1 font-bold text-brand-navy">
                      <User className="h-3.5 w-3.5 text-brand-muted" />
                      <span>{log.fullName}</span>
                    </div>
                    <span className="block text-brand-muted text-[11px] font-normal pl-4.5">{log.email}</span>
                  </td>
                  <td className="p-4 font-bold max-w-[180px] truncate">{log.propertyName}</td>
                  <td className="p-4 space-y-0.5">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5 text-brand-teal" />
                      <span>{log.checkIn} to {log.checkOut}</span>
                    </div>
                    <span className="block text-[10px] text-brand-muted font-normal pl-4.5">Capacity Cap: {log.guests} Heads</span>
                  </td>
                  <td className="p-4 text-right font-black text-sm text-brand-navy">
                    ₹{log.totalPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 text-center">
                    <Badge variant={log.status === "Confirmed" ? "teal" : "gray"}>{log.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}