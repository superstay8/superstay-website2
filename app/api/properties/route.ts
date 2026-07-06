import { NextRequest, NextResponse } from "next/server";
import { getProperties, saveProperties } from "@/lib/storage";
import { Property } from "@/types";

export async function GET() {
  try {
    const data = await getProperties();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to read property array layer stream" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const allPropertiesList = await getProperties();

    const newPropertyId = `prop-${allPropertiesList.length + 1}`;
    const formattedPropertyObject: Property = {
      id: newPropertyId,
      name: payload.name,
      description: payload.description,
      location: payload.location,
      price: Number(payload.price),
      rating: 5.0, // Default allocation starting ranking anchor point
      amenities: Array.isArray(payload.amenities) ? payload.amenities : [payload.amenities || "Wi-Fi Access"],
      bedrooms: Number(payload.bedrooms),
      bathrooms: Number(payload.bathrooms),
      guests: Number(payload.guests),
      images: payload.images && payload.images.length > 0 ? payload.images : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"],
      category: payload.category || "Luxury"
    };

    allPropertiesList.push(formattedPropertyObject);
    await saveProperties(allPropertiesList);

    return NextResponse.json(formattedPropertyObject, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed parsing property serialization structural data write context" }, { status: 500 });
  }
}