export interface SpaService {
  id: number;
  name: string;
  description: string;
  workingHours: string;
  includedInStay: boolean;
  price?: string;
  image: string;
}

export const spaInfo = {
  title: "SPA & Wellness Majmuasi",
  description: "Organizmingizni qayta tiklash va to'liq hordiq chiqarish uchun mo'ljallangan Archazor SPA majmuasi. Tog' toza havosi va shifobaxsh muolajalar bilan tanangiz va ruhingizga orom bering.",
  workingHours: "09:00 – 21:00 (Har kuni)",
  phone: "+998 90 999 88 66"
};

export const spaServices: SpaService[] = [
  {
    id: 1,
    name: "Yopiq Panoramali Basseyn",
    description: "Yil davomida isitiladigan, tog' panoramasi ko'rinib turadigan 25-metrlik suzish havzasi.",
    workingHours: "09:00 – 21:00",
    includedInStay: true,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Fin Finlyandiya Saunasi",
    description: "Tabiiy qarag'ay yog'ochidan tayyorlangan va harorati 90°C bo'lgan quruq bug' saunasi.",
    workingHours: "10:00 – 20:00",
    includedInStay: true,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Turk Hamomi (Xammom)",
    description: "Marmar toshli, nam bug'li va an'anaviy ko'pik massajiga mo'ljallangan klassik hamom.",
    workingHours: "10:00 – 20:00",
    includedInStay: false,
    price: "250,000 UZS / soat",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Relaks va Tailand Massaji",
    description: "Malakali mutaxassislar tomonidan tog' moylari va efirlari yordamida bajariladigan davolovchi massaj.",
    workingHours: "Kelishuv asosida",
    includedInStay: false,
    price: "350,000 UZS / 60 daqiqa",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Fitnes va Sport Zali",
    description: "Zamonaviy kardio va kuch mashqlari trenajyorlari bilan jihozlangan zal.",
    workingHours: "07:00 – 22:00",
    includedInStay: true,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
  }
];
