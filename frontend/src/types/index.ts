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
  baseAdults?: number;
  maxChildren?: number;
  extraBedCount?: number;
  viewType: string;
  status?: string;
  coverImage: string;
  isAvailable: boolean;
  isFeatured?: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  images: RoomImage[];
  amenities: Amenity[];
}

export interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  isAvailable: boolean;
  requiresPreOrder: boolean;
  sortOrder: number;
}

export interface SpaService {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  durationMinutes: number;
  includedInStay: boolean;
  requiresAppointment: boolean;
  imageUrl: string;
  sortOrder: number;
}

export interface Activity {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  includedInStay: boolean;
  schedule: string;
  season: string;
  imageUrl: string;
  sortOrder: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  readTimeMinutes: number;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Inquiry {
  id: number;
  type: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate?: string;
  guestsCount?: number;
  roomTypeOrService?: string;
  message: string;
  status: string;
  createdAt: string;
  adminNotes?: string;
}

export interface CreateInquiryRequest {
  type: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  guestsCount?: number;
  roomTypeOrService?: string;
  message: string;
}

export interface AvailabilityQuery {
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  viewType?: string;
}

export interface AvailableRoom {
  room: Room;
  totalPrice: number;
  nightsCount: number;
  isAvailable: boolean;
}

export interface AdminStats {
  totalRooms: number;
  activeRooms: number;
  totalMenuItems: number;
  totalSpaServices: number;
  totalActivities: number;
  totalBlogPosts: number;
  totalFaqs: number;
  totalInquiries: number;
  newInquiriesCount: number;
  wonInquiriesCount: number;
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
