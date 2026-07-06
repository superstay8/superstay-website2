import fs from "fs/promises";
import path from "path";
import { Property, Booking } from "@/types";

const propertiesPath = path.join(process.cwd(), "data", "properties.json");
const bookingsPath = path.join(process.cwd(), "data", "bookings.json");

// Helper to ensure files exist
async function ensureFilesExist() {
  try {
    await fs.access(propertiesPath);
  } catch {
    await fs.writeFile(propertiesPath, JSON.stringify([], null, 2));
  }
  
  try {
    await fs.access(bookingsPath);
  } catch {
    await fs.writeFile(bookingsPath, JSON.stringify([], null, 2));
  }
}

export async function getProperties(): Promise<Property[]> {
  await ensureFilesExist();
  const data = await fs.readFile(propertiesPath, "utf-8");
  return JSON.parse(data);
}

export async function saveProperties(properties: Property[]): Promise<void> {
  await ensureFilesExist();
  await fs.writeFile(propertiesPath, JSON.stringify(properties, null, 2), "utf-8");
}

export async function getBookings(): Promise<Booking[]> {
  await ensureFilesExist();
  const data = await fs.readFile(bookingsPath, "utf-8");
  return JSON.parse(data);
}

export async function saveBookings(bookings: Booking[]): Promise<void> {
  await ensureFilesExist();
  await fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 2), "utf-8");
}