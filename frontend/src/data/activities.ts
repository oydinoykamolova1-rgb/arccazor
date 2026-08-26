export interface Activity {
  id: number;
  title: string;
  category: string;
  description: string;
  ageGroup: string;
  image: string;
}

export const activitiesList: Activity[] = [
  {
    id: 1,
    title: "Stol Tennisi & Bilyard Lounge",
    category: "O'yinlar va Hordiq",
    description: "Professional bilyard va stol tennisi stollari bilan jihozlangan shinam o'yin zali.",
    ageGroup: "Barcha uchun",
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Bolalar Maydonchasi & Animatsiyalar",
    category: "Bolalar uchun",
    description: "Xavfsiz va quvnoq attraksionlar, arg'imchoqlar va professional animatorlar xizmati.",
    ageGroup: "3-12 yosh",
    image: "https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Ochiq Osmondagi Kinoteatr",
    category: "Madaniy Hordiq",
    description: "Kechqurun yulduzlar ostida issiq adyol va qaynoq choy bilan mashhur kinolarni tomosha qiling.",
    ageGroup: "Barcha uchun",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "PlayStation 5 & VR Gaming Zone",
    category: "Kiber O'yinlar",
    description: "Eng so'nggi PS5 o'yinlari va Virtual Reality ko'zoynaklari bilan o'yinlar olamiga sho'ng'ing.",
    ageGroup: "7+ yosh",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Tog' Piyoda Sayohati (Trekking)",
    category: "Sarguzasht",
    description: "Gid hamrohligida Archazor atrofidagi sharsharalar va tog' cho'qqilariga sayohat.",
    ageGroup: "Kattalar uchun",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
  }
];
