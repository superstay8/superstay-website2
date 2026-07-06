import React from "react";
import { Building2, Layers, Goal, HelpCircle } from "lucide-react";

export default function AboutPage() {
  const secondaryBusinesses = [
    { name: "SuperMe Labs", niche: "Advanced Digital Infrastructure", desc: "Crafting specialized elite digital frameworks and software ecosystems for luxury-tier consumer service pipelines globally." },
    { name: "SuperCuration Ventures", niche: "Interior Architecture & Design", desc: "Meticulous structural concept layout blueprints mapping space styling choices directly to premium commercial real estates." }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-16 animate-fadeIn">
      
      {/* Core Brand Corporate Statement Identity Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-brand-teal">Our Core Philosophy</span>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-navy tracking-tight">Redefining Hospitality Through Elite Curation Standards</h1>
        <p className="text-brand-muted text-lg font-medium leading-relaxed">
          SuperStay was forged out of an architectural imperative: to build an integrated boutique portfolio linking distinct elite lodgings directly with modern tech experiences.
        </p>
      </div>

      {/* Corporate Diversified Ecosystem Sub-group section layouts */}
      <div className="space-y-6 border-t border-gray-200 pt-12">
        <div className="flex items-center space-x-2 text-brand-navy font-black text-sm uppercase tracking-wider">
          <Building2 className="h-5 w-5 text-brand-teal" />
          <span>Ecosystem & Subsidiary Diversified Group Elements</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryBusinesses.map((biz) => (
            <div key={biz.name} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3 hover:shadow-md transition-premium">
              <span className="text-xs font-black uppercase tracking-wider bg-teal-50 text-brand-teal px-3 py-1 rounded-md border border-teal-100 inline-block">
                {biz.niche}
              </span>
              <h3 className="text-xl font-black text-brand-navy">{biz.name}</h3>
              <p className="text-sm text-brand-muted font-medium leading-relaxed">{biz.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* General Information Extraction Notice callout block panel */}
      <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-brand-teal font-black text-xs uppercase tracking-widest">
            <HelpCircle className="h-4 w-4" />
            <span>Corporate Profiling Synchronization</span>
          </div>
          <h4 className="text-lg font-bold">Need additional operational details or secondary branding links added?</h4>
          <p className="text-xs text-gray-400 font-medium">
            Contact us directly or send over structural descriptions to let the architecture team append secondary information tracks directly.
          </p>
        </div>
      </div>

    </div>
  );
}