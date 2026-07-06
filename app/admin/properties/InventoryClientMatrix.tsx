"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit3, X, Check, Star, MapPin } from "lucide-react";
import { Property } from "@/types";

interface InventoryClientMatrixProps {
  initialProperties: Property[];
}

export default function InventoryClientMatrix({ initialProperties }: InventoryClientMatrixProps) {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form management tracking state objects mapping
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const startEditing = (p: Property) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditLocation(p.location);
    setEditPrice(p.price.toString());
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditMutation = async (id: string) => {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, location: editLocation, price: editPrice }),
      });

      if (!response.ok) throw new Error();

      setProperties(
        properties.map((p) =>
          p.id === id ? { ...p, name: editName, location: editLocation, price: Number(editPrice) } : p
        )
      );
      setEditingId(null);
      router.refresh();
    } catch {
      alert("Failed to commit mutation modifications down to files.");
    }
  };

  const executeDeleteRemoval = async (id: string) => {
    if (!confirm("Are you entirely certain you want to purge this asset curation trace from records?")) return;

    try {
      const response = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();

      setProperties(properties.filter((p) => p.id !== id));
      router.refresh();
    } catch {
      alert("Purge sequence operation exception crash.");
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-left border-collapse text-xs font-bold text-brand-navy">
        <thead>
          <tr className="bg-brand-navy text-white uppercase tracking-wider border-b border-brand-navyLight">
            <th className="p-4">Reference ID</th>
            <th className="p-4">Asset Particulars & Visual Designation</th>
            <th className="p-4">Geographic Label</th>
            <th className="p-4 text-right">Tariff / Night</th>
            <th className="p-4 text-center">Action Handlers</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-semibold">
          {properties.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <tr key={item.id} className="hover:bg-brand-offWhite transition-premium">
                <td className="p-4 font-mono text-brand-teal">{item.id}</td>
                <td className="p-4 flex items-center space-x-3">
                  <img src={item.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
                  <div className="w-full">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-white border border-gray-300 rounded p-1.5 w-full font-medium"
                      />
                    ) : (
                      <span className="block max-w-[200px] truncate">{item.name}</span>
                    )}
                    <div className="flex items-center text-[10px] text-amber-600 space-x-0.5 mt-0.5">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="bg-white border border-gray-300 rounded p-1.5 w-full font-medium"
                    />
                  ) : (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-teal" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </td>
                <td className="p-4 text-right text-sm">
                  {isEditing ? (
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="bg-white border border-gray-300 rounded p-1.5 w-24 text-right font-medium"
                    />
                  ) : (
                    <span>₹{item.price.toLocaleString("en-IN")}</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    {isEditing ? (
                      <>
                        <button onClick={() => saveEditMutation(item.id)} className="bg-emerald-500 text-white p-2 rounded-lg">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={cancelEditing} className="bg-gray-400 text-white p-2 rounded-lg">
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEditing(item)} className="bg-brand-navy hover:bg-brand-teal text-white p-2 rounded-lg transition-premium">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button onClick={() => executeDeleteRemoval(item.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-premium">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}