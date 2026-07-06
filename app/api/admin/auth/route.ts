// src/app/api/admin/auth/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const allowedEmailsEnv = process.env.ALLOWED_ADMIN_EMAILS || "";
    const masterPassword = process.env.ADMIN_MASTER_PASSWORD || "";

    // Parse permitted admin emails list cleanly
    const allowedEmails = allowedEmailsEnv
      .split(",")
      .map((e) => e.trim().toLowerCase());

    if (!email || !password) {
      return NextResponse.json(
        { authenticated: false, message: "Missing credentials." },
        { status: 400 }
      ) as any;
    }

    const inputEmail = email.trim().toLowerCase();

    // Dual-layer authorization matching verification rules
    if (allowedEmails.includes(inputEmail) && password === masterPassword) {
      return NextResponse.json({ authenticated: true }) as any;
    }

    return NextResponse.json(
      { authenticated: false, message: "Access Denied: Invalid credentials or unauthorized account." },
      { status: 401 }
    ) as any;
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, message: "Internal Server Error." },
      { status: 500 }
    ) as any;
  }
}