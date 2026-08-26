import { Room, CreateBookingRequest, BookingRequestResponse, CreateContactRequest, ContactRequestResponse, AdminStats } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5144/api';

export async function fetchRooms(params?: { guests?: number; maxPrice?: number; viewType?: string }): Promise<Room[]> {
  try {
    const url = new URL(`${API_BASE}/rooms`);
    if (params?.guests) url.searchParams.append('guests', params.guests.toString());
    if (params?.maxPrice) url.searchParams.append('maxPrice', params.maxPrice.toString());
    if (params?.viewType) url.searchParams.append('viewType', params.viewType);

    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return await res.json();
  } catch (error) {
    console.warn('API error, using fallback room data', error);
    return getFallbackRooms();
  }
}

export async function fetchRoomBySlug(slug: string): Promise<Room | null> {
  try {
    const res = await fetch(`${API_BASE}/rooms/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch room');
    return await res.json();
  } catch (error) {
    console.warn('API error, using fallback single room', error);
    const fallback = getFallbackRooms().find(r => r.slug === slug);
    return fallback || null;
  }
}

export async function submitBookingRequest(data: CreateBookingRequest): Promise<BookingRequestResponse> {
  const res = await fetch(`${API_BASE}/booking-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({ message: 'Bron so\'rovini yuborishda xatolik' }));
    throw new Error(errData.message || 'Xatolik yuz berdi');
  }

  return await res.json();
}

export async function submitContactRequest(data: CreateContactRequest): Promise<ContactRequestResponse> {
  const res = await fetch(`${API_BASE}/contact-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({ message: 'Xabar yuborishda xatolik' }));
    throw new Error(errData.message || 'Xatolik yuz berdi');
  }

  return await res.json();
}

// Admin APIs
export async function fetchAdminBookings(): Promise<BookingRequestResponse[]> {
  const res = await fetch(`${API_BASE}/admin/booking-requests`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Admin booking requests error');
  return await res.json();
}

export async function updateBookingStatus(id: number, status: string): Promise<void> {
  const res = await fetch(`${API_BASE}/admin/booking-requests/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Status update error');
}

export async function fetchAdminContacts(): Promise<ContactRequestResponse[]> {
  const res = await fetch(`${API_BASE}/admin/contact-requests`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Admin contact requests error');
  return await res.json();
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await fetch(`${API_BASE}/admin/stats`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Admin stats error');
  return await res.json();
}

// Fallback static data if API server is not running during render
function getFallbackRooms(): Room[] {
  return [
    {
      id: 1,
      slug: 'presidential-mountain-suite',
      name: "Prezident Tog' Sviti",
      shortDescription: "Tog'larning afsonaviy panoramasi bilan eng hashamatli 2 qavatli svit.",
      description: "Prezident tog' sviti — Archazor resort'ining eng oliy toifadagi xonasi hisoblanadi. U keng panoramali derazalar, xususiy kaminli mehmonxona va xususiy terrace bilan jihozlangan. Oila va premium dam olish uchun eng mukammal tanlov.",
      pricePerNight: 3500000,
      area: 120,
      maxGuests: 4,
      viewType: "Tog' va O'rmon Manzarasi",
      coverImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      images: [
        { id: 1, imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 },
        { id: 2, imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", sortOrder: 2 },
        { id: 3, imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", sortOrder: 3 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 2, name: "Smart TV 55\"", icon: "tv" },
        { id: 3, name: "Mini-bar", icon: "coffee" },
        { id: 4, name: "Tog' manzarali terras", icon: "mountain" },
        { id: 5, name: "Jakuazi", icon: "bath" },
        { id: 6, name: "Kamin", icon: "flame" },
        { id: 9, name: "Nonushta kiritilgan", icon: "utensils" }
      ]
    },
    {
      id: 2,
      slug: 'deluxe-chalet-villa',
      name: "Deluks Shale Villa",
      shortDescription: "Sharshara va archazor o'rmoni bag'ridagi shinam yog'och kottedj.",
      description: "Yog'ochdan qurilgan eko-chalet villa sizga tabiat bilan to'liq uyg'unlik va sokinlik baxsh etadi. Shaxsiy barbekyu zonasi, jakuzi va keng veranda mavjud.",
      pricePerNight: 2800000,
      area: 95,
      maxGuests: 6,
      viewType: "Archa O'rmoni Manzarasi",
      coverImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      images: [
        { id: 4, imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 },
        { id: 5, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", sortOrder: 2 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 4, name: "Tog' manzarali terras", icon: "mountain" },
        { id: 5, name: "Jakuazi", icon: "bath" },
        { id: 6, name: "Kamin", icon: "flame" },
        { id: 9, name: "Nonushta kiritilgan", icon: "utensils" }
      ]
    },
    {
      id: 3,
      slug: 'junior-mountain-suite',
      name: "Junior Tog' Sviti",
      shortDescription: "Er-xotin va juftliklar uchun romantik va shinam panoramali xona.",
      description: "Katta qirollik karovati, panoramali oyna va zamonaviy interyerga ega Junior Suite. Ertalabki quyosh va tog' shabadasini xonangiz terrassasidan his qiling.",
      pricePerNight: 1800000,
      area: 60,
      maxGuests: 2,
      viewType: "Panoramali Tog' Manzarasi",
      coverImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      images: [
        { id: 6, imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 2, name: "Smart TV 55\"", icon: "tv" },
        { id: 4, name: "Tog' manzarali terras", icon: "mountain" },
        { id: 9, name: "Nonushta kiritilgan", icon: "utensils" }
      ]
    },
    {
      id: 4,
      slug: 'standard-double-room',
      name: "Standart Standart Xona",
      shortDescription: "Barcha qulayliklarga ega shinam va zamonaviy 2 kishilik xona.",
      description: "Qulay karovatlar, zamonaviy dush va ish stoli bilan ta'minlangan standart xonamiz qisqa muddatli dam olish va biznes sayohatlar uchun mos keladi.",
      pricePerNight: 1200000,
      area: 40,
      maxGuests: 2,
      viewType: "Basseyn Manzarasi",
      coverImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      images: [
        { id: 7, imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 2, name: "Smart TV 55\"", icon: "tv" },
        { id: 7, name: "Konditsioner", icon: "wind" }
      ]
    },
    {
      id: 5,
      slug: 'family-duplex-suite',
      name: "Oilaviy Dupleks Svit",
      shortDescription: "Katta oilalar uchun 2 qavatli, 2 alohida yotoqxonali keng xona.",
      description: "Bolalar va kattalar uchun alohida hududlarga ega dupleks xona. 2 ta sanuzel, keng mehmonxona va barcha zamonaviy maishiy texnikalar mavjud.",
      pricePerNight: 2400000,
      area: 85,
      maxGuests: 5,
      viewType: "Tog' va Basseyn Manzarasi",
      coverImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      images: [
        { id: 8, imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 2, name: "Smart TV 55\"", icon: "tv" },
        { id: 4, name: "Tog' manzarali terras", icon: "mountain" },
        { id: 9, name: "Nonushta kiritilgan", icon: "utensils" }
      ]
    },
    {
      id: 6,
      slug: 'spa-wellness-villa',
      name: "SPA & Wellness Villa",
      shortDescription: "Shaxsiy saunasi va jakuzisi bo'lgan eksklyuziv dam olish kottedji.",
      description: "Ushbu villada dam olish jarayonida shaxsiy sauna va gidromassajli saunadan bahramand bo'lishingiz mumkin. SPA muolajalari xonaning o'zida ham taqdim etiladi.",
      pricePerNight: 3100000,
      area: 100,
      maxGuests: 4,
      viewType: "Shaxsiy Bog' va Tog' Manzarasi",
      coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      images: [
        { id: 9, imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 3, name: "Mini-bar", icon: "coffee" },
        { id: 5, name: "Jakuazi", icon: "bath" },
        { id: 9, name: "Nonushta kiritilgan", icon: "utensils" }
      ]
    }
  ];
}
