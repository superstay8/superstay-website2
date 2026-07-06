import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "teal" | "navy" | "gray";
}

export default function Badge({ children, variant = "teal" }: BadgeProps) {
  const styles = {
    teal: "bg-brand-teal/10 text-brand-teal border border-brand-teal/20",
    navy: "bg-brand-navy/10 text-brand-navy border border-brand-navy/20",
    gray: "bg-gray-100 text-gray-600 border border-gray-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
}