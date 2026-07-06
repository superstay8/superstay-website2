"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Hotel, ClipboardList, PlusCircle, LayoutDashboard } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview Insights", href: "/admin", icon: LayoutDashboard },
    { name: "Reservation Logs", href: "/admin/bookings", icon: ClipboardList },
    { name: "Inventory Matrix", href: "/admin/properties", icon: Layers },
    { name: "Insert Stay Unit", href: "/admin/properties/new", icon: PlusCircle },
  ];

  return (
    <aside className="w-full lg:w-64 bg-brand-navy text-white rounded-2xl p-6 space-y-6 border border-brand-navyLight flex-shrink-0">
      <div className="flex items-center space-x-2 pb-4 border-b border-brand-navyLight">
        <Hotel className="h-5 w-5 text-brand-teal" />
        <span className="text-base font-black tracking-wider uppercase">Console Hub</span>
      </div>

      <nav className="flex flex-row lg:flex-col flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
        {links.map((link) => {
          const IconComponent = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-premium flex-grow lg:flex-grow-0 ${
                isActive 
                  ? "bg-brand-teal text-white shadow-md" 
                  : "text-gray-400 hover:text-white hover:bg-brand-navyLight"
              }`}
            >
              <IconComponent className="h-4 w-4 flex-shrink-0" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}