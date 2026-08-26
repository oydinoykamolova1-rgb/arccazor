export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image?: string;
  isPopular?: boolean;
}

export const restaurantInfo = {
  title: "Archazor Fine Dining Restorani",
  description: "Tog' yon bag'rida joylashgan premium restoranimizda milliy va yevropa oshxonasining eng sara taomlaridan bahramand bo'ling. Har bir taom tabiiy va saralangan masalliqlardan tayyorlanadi.",
  workingHours: "08:00 – 23:00 (Har kuni)",
  reservationPhone: "+998 90 999 88 77",
  telegramContact: "@archazor_restaurant",
  features: [
    "Panoramali tog' manzarali zal va ochiq veranda",
    "Maxsus o'tin kaminida pishiriladigan milliy taomlar",
    "Bolalar uchun maxsus parhez menyu",
    "VIP xonalar va oilaviy shinam sohalar"
  ]
};

export const menuCategories = ["Barchasi", "Milliy Taomlar", "Yevropa Taomlari", "Salatlar", "Ichimliklar", "Dessertlar"];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Archazor Maxsus Qovurma Oshi",
    category: "Milliy Taomlar",
    description: "Tog' giyohlari va saralangan qo'y go'shtidan tayyorlangan an'anaviy palov.",
    price: "120,000 UZS",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Tog' Foreli (Grill)",
    category: "Yevropa Taomlari",
    description: "Tog' daryosidan tutilgan yangi forel balig'i, limon va maxsus sos bilan.",
    price: "180,000 UZS",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Kamin Kabobi (Assorti)",
    category: "Milliy Taomlar",
    description: "O'tin alangasida pishirilgan qo'y, mol va qiyma kaboblar jamlanmasi.",
    price: "240,000 UZS",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Burrata va Yangi Pomidorlar Salati",
    category: "Salatlar",
    description: "Iqtidorli oshpazlarimizdan Burrata pishlog'i va pesto sosli Italiya salati.",
    price: "95,000 UZS",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Tog' Giyohlari Choyi (Choynak)",
    category: "Ichimliklar",
    description: "Tog'da terilgan kiyik o'ti, jalbiy va tog' yalpizidan tayyorlangan xushbo'y choy.",
    price: "40,000 UZS",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Pista va Asal Baklavasi",
    category: "Dessertlar",
    description: "Tabiiy tog' asali va pistadan tayyorlangan sharqona shirinlik.",
    price: "65,000 UZS",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80"
  }
];
