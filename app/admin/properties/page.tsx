import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getProperties } from "@/lib/storage";
import InventoryClientMatrix from "./InventoryClientMatrix";

export const revalidate = 0;

export default async function AdminPropertiesInventoryListRootPage() {
  const currentPropertiesInventory = await getProperties();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Asset Inventory Registry Portfolio</h1>
          <p className="text-xs text-brand-muted font-medium mt-0.5">Manage live records inside properties file database parameters directly.</p>
        </div>
        
        <Link
          href="/admin/properties/new"
          className="bg-brand-teal text-white text-xs font-bold px-4 py-3 rounded-xl hover:bg-brand-tealHover transition-premium flex items-center space-x-1 uppercase tracking-wider self-start sm:self-auto shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Structural Stay</span>
        </Link>
      </div>

      <InventoryClientMatrix initialProperties={currentPropertiesInventory} />
    </div>
  );
}