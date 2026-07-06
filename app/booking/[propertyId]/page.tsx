import React from "react";
import { notFound } from "next/navigation";
import { getProperties } from "@/lib/storage";
import BookingClientForm from "./BookingClientForm";

export const revalidate = 0;

interface BookingPageProps {
  params: Promise<{
    propertyId: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const resolvedParams = await params;
  const allProperties = await getProperties();
  const currentProperty = allProperties.find((p) => p.id === resolvedParams.propertyId);

  if (!currentProperty) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-navy tracking-tight">Checkout Infrastructure Curation</h1>
        <p className="text-brand-muted text-sm font-medium mt-0.5">
          Review targeted parameters securely below to store record traces straight down into standard structural JSON fields.
        </p>
      </div>

      <BookingClientForm property={currentProperty} />
    </div>
  );
}