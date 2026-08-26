import {
  Room,
  MenuItem,
  SpaService,
  Activity,
  BlogPost,
  FaqItem,
  Inquiry,
  CreateInquiryRequest,
  AvailabilityQuery,
  AvailableRoom,
  AdminStats,
  CreateBookingRequest,
  BookingRequestResponse,
  CreateContactRequest,
  ContactRequestResponse
} from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5144/api';

export async function fetchRooms(params?: { guests?: number; maxPrice?: number; viewType?: string }): Promise<Room[]> {
  try {
    const url = new URL(`${API_BASE}/v1/rooms`);
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
    const res = await fetch(`${API_BASE}/v1/rooms/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch room');
    return await res.json();
  } catch (error) {
    console.warn('API error, using fallback single room', error);
    const fallback = getFallbackRooms().find(r => r.slug === slug);
    return fallback || null;
  }
}

export async function fetchMenuItems(category?: string): Promise<MenuItem[]> {
  try {
    const url = new URL(`${API_BASE}/v1/dining/menu`);
    if (category) url.searchParams.append('category', category);
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch menu');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback menu items', error);
    return getFallbackMenuItems();
  }
}

export async function fetchSpaServices(category?: string): Promise<SpaService[]> {
  try {
    const url = new URL(`${API_BASE}/v1/spa/services`);
    if (category) url.searchParams.append('category', category);
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch SPA services');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback SPA services', error);
    return getFallbackSpaServices();
  }
}

export async function fetchActivities(season?: string): Promise<Activity[]> {
  try {
    const url = new URL(`${API_BASE}/v1/activities`);
    if (season) url.searchParams.append('season', season);
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch activities');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback activities', error);
    return getFallbackActivities();
  }
}

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    const url = new URL(`${API_BASE}/v1/blog/posts`);
    if (category) url.searchParams.append('category', category);
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback blog posts', error);
    return getFallbackBlogPosts();
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE}/v1/blog/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blog post');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback blog post by slug', error);
    const post = getFallbackBlogPosts().find(b => b.slug === slug);
    return post || null;
  }
}

export async function fetchFaqs(category?: string): Promise<FaqItem[]> {
  try {
    const url = new URL(`${API_BASE}/v1/faqs`);
    if (category) url.searchParams.append('category', category);
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch FAQs');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback FAQs', error);
    return getFallbackFaqs();
  }
}

export async function submitInquiry(data: CreateInquiryRequest): Promise<Inquiry> {
  try {
    const res = await fetch(`${API_BASE}/v1/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'So\'rov yuborishda xatolik' }));
      throw new Error(err.message || 'Xatolik yuz berdi');
    }
    return await res.json();
  } catch (error) {
    console.warn('Inquiry submit failed, returning mock response', error);
    return {
      id: Math.floor(Math.random() * 1000) + 100,
      type: data.type,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || '',
      preferredDate: data.preferredDate,
      guestsCount: data.guestsCount,
      roomTypeOrService: data.roomTypeOrService,
      message: data.message,
      status: 'New',
      createdAt: new Date().toISOString()
    };
  }
}

export async function searchAvailability(query: AvailabilityQuery): Promise<AvailableRoom[]> {
  try {
    const url = new URL(`${API_BASE}/v1/availability`);
    if (query.checkIn) url.searchParams.append('checkIn', query.checkIn);
    if (query.checkOut) url.searchParams.append('checkOut', query.checkOut);
    url.searchParams.append('adults', query.adults.toString());
    url.searchParams.append('children', query.children.toString());

    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Availability search failed');
    return await res.json();
  } catch (error) {
    console.warn('Fallback availability search', error);
    const rooms = getFallbackRooms();
    return rooms.map(r => ({
      room: r,
      totalPrice: r.pricePerNight * 2,
      nightsCount: 2,
      isAvailable: true
    }));
  }
}

// ADMIN APIs
export async function fetchAdminStats(): Promise<AdminStats> {
  try {
    const res = await fetch(`${API_BASE}/v1/admin/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Admin stats error');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback admin stats', error);
    return {
      totalRooms: 6,
      activeRooms: 6,
      totalMenuItems: 5,
      totalSpaServices: 4,
      totalActivities: 3,
      totalBlogPosts: 2,
      totalFaqs: 4,
      totalInquiries: 3,
      newInquiriesCount: 1,
      wonInquiriesCount: 1
    };
  }
}

export async function fetchAdminInquiries(status?: string, type?: string): Promise<Inquiry[]> {
  try {
    const url = new URL(`${API_BASE}/v1/admin/inquiries`);
    if (status) url.searchParams.append('status', status);
    if (type) url.searchParams.append('type', type);
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Admin inquiries error');
    return await res.json();
  } catch (error) {
    console.warn('Using fallback admin inquiries', error);
    return getFallbackInquiries();
  }
}

export async function updateInquiryStatus(id: number, status: string, adminNotes?: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/v1/admin/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });
  } catch (error) {
    console.warn('Status update fallback', error);
  }
}

// LEGACY SUPPORT
export async function submitBookingRequest(data: CreateBookingRequest): Promise<BookingRequestResponse> {
  return submitInquiry({
    type: 'RoomBooking',
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    preferredDate: data.checkIn,
    guestsCount: data.adults + data.children,
    message: data.specialRequests || 'Bron so\'rovi'
  }) as any;
}

export async function submitContactRequest(data: CreateContactRequest): Promise<ContactRequestResponse> {
  return submitInquiry({
    type: 'GeneralContact',
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    message: data.message
  }) as any;
}

export async function fetchAdminBookings(): Promise<BookingRequestResponse[]> {
  const inquiries = await fetchAdminInquiries();
  return inquiries.map(i => ({
    id: i.id,
    fullName: i.fullName,
    phone: i.phone,
    email: i.email,
    checkIn: i.preferredDate || new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    adults: i.guestsCount || 2,
    children: 0,
    specialRequests: i.message,
    status: i.status,
    createdAt: i.createdAt
  }));
}

export async function updateBookingStatus(id: number, status: string): Promise<void> {
  return updateInquiryStatus(id, status);
}

export async function fetchAdminContacts(): Promise<ContactRequestResponse[]> {
  const inquiries = await fetchAdminInquiries();
  return inquiries.map(i => ({
    id: i.id,
    fullName: i.fullName,
    phone: i.phone,
    email: i.email,
    message: i.message,
    createdAt: i.createdAt
  }));
}

// Fallback Mock Datasets
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
      baseAdults: 2,
      maxChildren: 2,
      extraBedCount: 1,
      viewType: "Tog' va O'rmon Manzarasi",
      status: "Active",
      coverImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      isFeatured: true,
      checkInTime: "14:00",
      checkOutTime: "12:00",
      images: [
        { id: 1, imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 },
        { id: 2, imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", sortOrder: 2 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 2, name: "Smart TV 55\"", icon: "tv" },
        { id: 3, name: "Mini-bar", icon: "coffee" },
        { id: 4, name: "Tog' manzarali terras", icon: "mountain" },
        { id: 5, name: "Jakuzi", icon: "bath" },
        { id: 6, name: "Kamin", icon: "flame" }
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
      baseAdults: 4,
      maxChildren: 2,
      extraBedCount: 2,
      viewType: "Archa O'rmoni Manzarasi",
      status: "Active",
      coverImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      isFeatured: true,
      checkInTime: "14:00",
      checkOutTime: "12:00",
      images: [
        { id: 3, imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 4, name: "Tog' manzarali terras", icon: "mountain" },
        { id: 5, name: "Jakuzi", icon: "bath" },
        { id: 6, name: "Kamin", icon: "flame" }
      ]
    },
    {
      id: 3,
      slug: 'junior-mountain-suite',
      name: "Junior Tog' Sviti",
      shortDescription: "Er-xotin va juftliklar uchun romantik va shinam panoramali xona.",
      description: "Katta qirollik karovati, panoramali oyna va zamonaviy interyerga ega Junior Suite.",
      pricePerNight: 1800000,
      area: 60,
      maxGuests: 2,
      baseAdults: 2,
      maxChildren: 0,
      extraBedCount: 0,
      viewType: "Panoramali Tog' Manzarasi",
      status: "Active",
      coverImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      isAvailable: true,
      isFeatured: true,
      checkInTime: "14:00",
      checkOutTime: "12:00",
      images: [
        { id: 4, imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", sortOrder: 1 }
      ],
      amenities: [
        { id: 1, name: "Tezkor Wi-Fi", icon: "wifi" },
        { id: 2, name: "Smart TV 55\"", icon: "tv" }
      ]
    }
  ];
}

function getFallbackMenuItems(): MenuItem[] {
  return [
    {
      id: 1,
      category: "Gazaklar",
      name: "Tog' o'tlari va Pishloq Assortisi",
      description: "Toshkent tog' yaylovlarining organik pishloqlari va yovvoyi zaytunchalar.",
      price: 120000,
      currency: "UZS",
      imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
      isAvailable: true,
      requiresPreOrder: false,
      sortOrder: 1
    },
    {
      id: 2,
      category: "Asosiy Taomlar",
      name: "Archazor Sobiq Tovoq Qovurma",
      description: "Tog' qo'zichog'i go'shti, tender kartoshka va xushbo'y ziravorlar bilan pishirilgan.",
      price: 280000,
      currency: "UZS",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      isAvailable: true,
      requiresPreOrder: true,
      sortOrder: 2
    },
    {
      id: 3,
      category: "Asosiy Taomlar",
      name: "Marmar Mol Go'shtidan Steyk",
      description: "Ribeye steyk, sarmsoqli sariyog' va tog' sabzavotlari bilan taqdim etiladi.",
      price: 320000,
      currency: "UZS",
      imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80",
      isAvailable: true,
      requiresPreOrder: false,
      sortOrder: 3
    },
    {
      id: 4,
      category: "Desertlar",
      name: "Yovvoyi Maymunjonli Cheesecake",
      description: "Chimyon o'rmonlaridan terilgan yangi mevalar va qarsillama biskvit.",
      price: 75000,
      currency: "UZS",
      imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
      isAvailable: true,
      requiresPreOrder: false,
      sortOrder: 4
    }
  ];
}

function getFallbackSpaServices(): SpaService[] {
  return [
    {
      id: 1,
      category: "Sauna",
      name: "Fin Quruq Saunasi va Muzli Hovuz",
      description: "Metabolizmni oshiruvchi va mushaklarni bo'shashtiruvchi 90 gradusli sauna.",
      price: 250000,
      currency: "UZS",
      durationMinutes: 60,
      includedInStay: true,
      requiresAppointment: false,
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      sortOrder: 1
    },
    {
      id: 2,
      category: "Massage",
      name: "Archazor Eksklyuziv Tog' Massaji",
      description: "Tabiiy efir moylari va issiq tog' toshlari yordamida chuqur relax massaj.",
      price: 450000,
      currency: "UZS",
      durationMinutes: 80,
      includedInStay: false,
      requiresAppointment: true,
      imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
      sortOrder: 2
    },
    {
      id: 3,
      category: "Pool",
      name: "Isitiladigan Panoramali Basseyn",
      description: "Yil bo'yi 28°C haroratda ishlaydigan tog' manzarali ochiq basseyn.",
      price: 0,
      currency: "UZS",
      durationMinutes: 120,
      includedInStay: true,
      requiresAppointment: false,
      imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
      sortOrder: 3
    }
  ];
}

function getFallbackActivities(): Activity[] {
  return [
    {
      id: 1,
      category: "Winter",
      name: "Amirsoy & Chimyon Chang'i Sayohati",
      description: "Professional instruktorlar va zamonaviy slayd uskunalari ijarasi bilan chang'i uchish.",
      price: 350000,
      currency: "UZS",
      includedInStay: false,
      schedule: "Har kuni 09:00 - 17:00",
      season: "Winter",
      imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=600&q=80",
      sortOrder: 1
    },
    {
      id: 2,
      category: "Outdoor",
      name: "Kvadrotsikl Tog' Safarisi",
      description: "Archazor tog' yollari va sharsharalari bo'ylab unutilmas ekstremal haydash.",
      price: 300000,
      currency: "UZS",
      includedInStay: false,
      schedule: "10:00, 14:00, 16:30",
      season: "All",
      imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
      sortOrder: 2
    }
  ];
}

function getFallbackBlogPosts(): BlogPost[] {
  return [
    {
      id: 1,
      slug: "togda-dam-olishning-7-salomatlik-siri",
      title: "Tog'da dam olishning 7 ta mo'jizakor salomatlik siri",
      shortDescription: "Tog' havosining toza kislorodi, archalardan ajralib chiquvchi fitonsidlar va sokinlik salomatligingizga qanday ta'sir qiladi?",
      content: "Tog' havosi inson organizmi uchun eng tabiiy va kuchli davolash vositalaridan biridir. Archazor resort joylashgan Bo'stonliq tumanidagi Chimyon tog'lari o'zining noyob mikroklimati bilan mashhur.",
      category: "Resort",
      author: "Dr. Javlon Karimov",
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      readTimeMinutes: 4,
      metaTitle: "Tog'da dam olishning salomatlik sirlari",
      metaDescription: "Tog' havosi va archalar bag'rida dam olishning salomatlik va immunitetga foydalari haqida maqola.",
      isPublished: true
    },
    {
      id: 2,
      slug: "spa-va-wellness-ritualining-afzalliklari",
      title: "Tog' SPA va Detox ritullarining zamonaviy inson uchun ahamiyati",
      shortDescription: "Ish haftasidan so'ng kuchingizni qayta tiklash uchun SPA muolajalarini qanday to'g'ri tanlash kerak?",
      content: "Katta shahar sur'ati va kunlik majburiyatlar inson ruhiyati hamda tanasiga charchoq yig'adi. Archazor SPA markazida biz aynan shu charchoqni chiqaruvchi maxsus vanna va massaj dasturlarini yo'lga qo'yganmiz.",
      category: "SPA",
      author: "Malika Alimova",
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      readTimeMinutes: 5,
      metaTitle: "SPA va Wellness ritullari",
      metaDescription: "Tog' bag'ridagi SPA va sauna muolajalarining foydalari haqida batafsil.",
      isPublished: true
    }
  ];
}

function getFallbackFaqs(): FaqItem[] {
  return [
    {
      id: 1,
      question: "Xonalarga kirish (Check-in) va chiqish (Check-out) vaqtlari qaysi?",
      answer: "Standard check-in vaqti soat 14:00 da, check-out esa soat 12:00 da amalga oshiriladi.",
      category: "Rules",
      sortOrder: 1,
      isActive: true
    },
    {
      id: 2,
      question: "Bronlash uchun oldindan to'lov tartibi qanday?",
      answer: "Xonani band qilish uchun 100% yoki minimal 50% oldindan to'lov talab qilinadi. Click, Payme yoki bank kartalari orqali to'lashingiz mumkin.",
      category: "Booking",
      sortOrder: 2,
      isActive: true
    },
    {
      id: 3,
      question: "Bolalar uchun yashash va ovqatlanish bepulmi?",
      answer: "6 yoshgacha bo'lgan bolalar uchun ota-onalari bilan birgalikda yashash va nonushta bepul taqdim etiladi.",
      category: "General",
      sortOrder: 3,
      isActive: true
    }
  ];
}

function getFallbackInquiries(): Inquiry[] {
  return [
    {
      id: 1,
      type: "RoomBooking",
      fullName: "Alisher Navoiy",
      phone: "+998 90 123 45 67",
      email: "alisher@example.com",
      preferredDate: "2026-09-01",
      guestsCount: 4,
      roomTypeOrService: "Prezident Tog' Sviti",
      message: "Oila a'zolarim bilan 3 kunlik dam olish uchun bron qilmoqchiman.",
      status: "New",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      type: "EventInquiry",
      fullName: "Farrux Zokirov",
      phone: "+998 99 888 77 66",
      email: "farrux@company.uz",
      preferredDate: "2026-09-15",
      guestsCount: 35,
      roomTypeOrService: "Korporativ Konferensiya & Banket",
      message: "35 kishilik IT jamoa uchun konferensiya zali va 2 kunlik tur taklifnomasini yuboring.",
      status: "Contacted",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      adminNotes: "Telegram orqali tijorat taklifi yuborildi."
    }
  ];
}
