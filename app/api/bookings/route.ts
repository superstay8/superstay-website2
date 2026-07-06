import { NextRequest, NextResponse } from "next/server";
import { getBookings, saveBookings } from "@/lib/storage";
import { Booking } from "@/types";

export async function GET() {
  try {
    const data = await getBookings();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to read bookings stream layer" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const { propertyId, propertyName, propertyImage, fullName, email, phone, guests, checkIn, checkOut, specialRequest, totalPrice } = rawBody;

    // Direct rigorous MVP field validation assertion constraints
    if (!propertyId || !fullName || !email || !phone || !checkIn || !checkOut || !guests || !totalPrice) {
      return NextResponse.json({ error: "Missing required core processing fields" }, { status: 400 });
    }

    const currentBookingsList = await getBookings();
    
    // Auto-incremental alphanumeric booking ID algorithm generation mechanics
    const generatedNumericPrefix = currentBookingsList.length > 0 
      ? parseInt(currentBookingsList[currentBookingsList.length - 1].id.replace("BK", ""), 10) + 1 
      : 1001;
    
    const configuredNewBookingPayload: Booking = {
      id: `BK${generatedNumericPrefix}`,
      propertyId,
      propertyName,
      propertyImage,
      fullName,
      email,
      phone,
      guests: Number(guests),
      checkIn,
      checkOut,
      specialRequest: specialRequest || "",
      totalPrice: Number(totalPrice),
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    currentBookingsList.push(configuredNewBookingPayload);
    await saveBookings(currentBookingsList);

    return NextResponse.json(configuredNewBookingPayload, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal operational data engine write crash" }, { status: 500 });
  }
}