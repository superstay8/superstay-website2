import React from "react";
import PropertyInsertionForm from "./PropertyInsertionForm";

export const revalidate = 0;

export default function AdminNewPropertyMainWrapperPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-brand-navy tracking-tight">Insert Premium Property Asset</h1>
        <p className="text-xs text-brand-muted font-medium mt-0.5">Fill criteria parameters correctly below to appending structural rows inside static files data vectors immediately.</p>
      </div>

      <PropertyInsertionForm />
    </div>
  );
}