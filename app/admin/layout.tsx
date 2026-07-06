// app/admin/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Lock, 
  Mail, 
  ShieldAlert, 
  Hotel, 
  LayoutDashboard, 
  ClipboardList, 
  Layers, 
  PlusCircle 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setError(data.message || "Access Denied.");
      }
    } catch (err) {
      setError("An unexpected server error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // 1. IF NOT AUTHENTICATED: Render ONLY the absolute standalone login screen view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-50/50 to-white z-[9999] relative">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200/80 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-brand-navy text-white rounded-2xl flex items-center justify-center shadow-md">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-black text-brand-navy tracking-tight uppercase">Gateway Authentication</h2>
            <p className="text-xs text-gray-500 font-medium">Restricted Administrative Area. Whitelist Validation Required.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3.5 rounded-xl flex items-center space-x-2">
              <ShieldAlert className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-brand-navy tracking-wider block">Administrator Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@supermelabs.com"
                  className="w-full text-sm font-medium pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/50 transition-premium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-brand-navy tracking-wider block">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm font-medium pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/50 transition-premium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-2 bg-brand-navy text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-navy/90 transition-premium shadow-md disabled:opacity-50"
            >
              {isLoading ? "Verifying Credentials..." : "Authenticate Session"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. FIXED: Links updated to match your exact directory tree paths
  const adminMenuLinks = [
    { name: "Overview Insights", href: "/admin", icon: LayoutDashboard },
    { name: "Reservation Logs", href: "/admin/bookings", icon: ClipboardList },
    { name: "Inventory Matrix", href: "/admin/properties", icon: Layers },
    { name: "Insert Stay Unit", href: "/admin/properties/new", icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-12">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* The Secured Console Hub Navigation Menu Sidebar */}
        <div className="md:col-span-1 bg-brand-navy text-white p-6 rounded-3xl shadow-xl space-y-6 h-fit">
          <div className="flex items-center space-x-2 pb-4 border-b border-brand-navyLight">
            <Hotel className="h-6 w-6 text-brand-teal" />
            <h3 className="text-lg font-black tracking-wider uppercase text-white">Console Hub</h3>
          </div>
          
          <nav className="flex flex-col space-y-2">
            {adminMenuLinks.map((item) => {
              const IconComponent = item.icon;
              // Checks if the active path matches the link
              const isCurrentActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl transition-all duration-300 ${
                    isCurrentActive
                      ? "bg-brand-teal text-white shadow-md transform scale-[1.02]"
                      : "text-gray-400 hover:bg-brand-navyLight hover:text-white"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Dynamic Functional View Sub-Page Layer */}
        <div className="md:col-span-3 bg-white border border-gray-200 p-6 sm:p-8 rounded-3xl shadow-sm min-h-[50vh]">
          {children}
        </div>

      </div>
    </div>
  );
}