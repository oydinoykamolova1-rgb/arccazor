export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface RoomImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

export interface Room {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  pricePerNight: number;
  area: number;
  maxGuests: number;
  viewType: string;
  coverImage: string;
  isAvailable: boolean;
  images: RoomImage[];
  amenities: Amenity[];
}

export interface CreateBookingRequest {
  fullName: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId?: number;
  specialRequests?: string;
}

export interface BookingRequestResponse {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId?: number;
  roomName?: string;
  specialRequests: string;
  status: string;
  createdAt: string;
}

export interface CreateContactRequest {
  fullName: string;
  phone: string;
  email?: string;
  message: string;
}

export interface ContactRequestResponse {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
  message: string;
  createdAt: string;
}

export interface AdminStats {
  totalRooms: number;
  pendingBookings: number;
  totalBookings: number;
  totalContacts: number;
}
