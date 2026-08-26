export interface EventType {
  id: number;
  title: string;
  capacity: string;
  description: string;
  features: string[];
  image: string;
}

export const eventsList: EventType[] = [
  {
    id: 1,
    title: "Biznes Konferensiyalar & Seminars",
    capacity: "120 kishigacha",
    description: "Zamonaviy proyektorlar, pro audio audio-tizim va tezkor Wi-Fi bilan jihozlangan konferens-zal.",
    features: [
      "Interaktiv LED ekran va mikrafonlar",
      "Kofe-breyk va tushlik tashkillashtirish",
      "Sinxron tarjima uskunalari",
      "Biznes markaz va bosma xizmatlar"
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Korporativ Timbuilding & Dam Olish",
    capacity: "200 kishigacha",
    description: "Jamoangiz jipsligini oshirish uchun tog'dagi ochiq maydonlarda jamoaviy o'yinlar va banket.",
    features: [
      "Ochiq havodagi sport musobaqalari",
      "Gala kechki ovqat va DJ shou",
      "Eksklyuziv kottedjlar bron qilish",
      "Shaxsiy tadbir koordinator xizmati"
    ],
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Tog' Bag'ridagi To'ylar & Marosimlar",
    capacity: "150 kishigacha",
    description: "Tog'larning ertaknamo panoramasi fonida unutilmas nikoh marosimlari va tantanalar.",
    features: [
      "Ochiq terrassadagi marosim zonasi",
      "Foto va video suratga olish uchun burchaklar",
      "Gurme banket menyusi",
      "Kelin va kuyov uchun sovg'a Prezident Sviti"
    ],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  }
];
