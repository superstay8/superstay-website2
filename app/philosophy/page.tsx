import React from "react";
import { Goal } from "lucide-react";

export default function PhilosophySimplePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20 space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-2 text-brand-teal text-xs font-black uppercase tracking-widest">
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230D9488' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='6'/><circle cx='12' cy='12' r='2'/></svg>" className="h-5 w-5 text-brand-teal" alt="target" />
        <span>Operational Standard Axioms</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">Our Simple Editorial Philosophy</h1>
      
      <div className="text-base text-brand-navy/90 font-medium leading-relaxed space-y-6 border-t border-gray-100 pt-6">
        <p>
          We operate on a straightforward premise: hospitality should feel architectural, customized, and frictionless. We omit standard tracking pixels and unnecessary analytics layers to present curated luxury properties directly to travelers.
        </p>
        <p>
          Every villa, cabin, and resort added to our platform undergoes a meticulous manual validation inspection to verify spatial layout details and asset finishes before publication.
        </p>
      </div>
    </div>
  );
}