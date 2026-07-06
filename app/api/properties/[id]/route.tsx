import { NextRequest, NextResponse } from "next/server";
import { getProperties, saveProperties } from "@/lib/storage";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const resolvedParams = await context.params;
    const body = await request.json();
    const properties = await getProperties();
    const index = properties.findIndex((p) => p.id === resolvedParams.id);

    if (index === -1) {
      return NextResponse.json({ error: "Target asset missing from registry file records" }, { status: 404 });
    }

    properties[index] = {
      ...properties[index],
      name: body.name || properties[index].name,
      location: body.location || properties[index].location,
      price: body.price ? Number(body.price) : properties[index].price,
      category: body.category || properties[index].category,
      bedrooms: body.bedrooms ? Number(body.bedrooms) : properties[index].bedrooms,
      bathrooms: body.bathrooms ? Number(body.bathrooms) : properties[index].bathrooms,
      guests: body.guests ? Number(body.guests) : properties[index].guests,
      description: body.description || properties[index].description,
      amenities: Array.isArray(body.amenities) ? body.amenities : properties[index].amenities,
      images: body.images && body.images.length > 0 ? body.images : properties[index].images,
    };

    await saveProperties(properties);
    return NextResponse.json(properties[index], { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal compilation mutation runtime exception" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const resolvedParams = await context.params;
    const properties = await getProperties();
    const filtered = properties.filter((p) => p.id !== resolvedParams.id);

    if (properties.length === filtered.length) {
      return NextResponse.json({ error: "Target asset missing from file list records" }, { status: 404 });
    }

    await saveProperties(filtered);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal compilation delete failure exception" }, { status: 500 });
  }
}