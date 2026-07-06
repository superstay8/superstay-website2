export interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  category: "Luxury" | "Villa" | "Cabin" | "Beachfront" | "Heritage";
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  specialRequest?: string;
  totalPrice: number;
  status: "Confirmed" | "Cancelled";
  createdAt: string;
}