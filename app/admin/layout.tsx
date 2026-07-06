import React from "react";
import AdminSidebar from "@/components/AdminSidebar";

export const revalidate = 0;

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8 items-start">
      <AdminSidebar />
      <main className="flex-grow w-full bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm min-h-[500px]">
        {children}
      </main>
    </div>
  );
}