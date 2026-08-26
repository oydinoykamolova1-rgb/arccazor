'use client';

import { useEffect, useState } from 'react';
import { Utensils, Clock, Phone, CheckCircle2, Star, AlertCircle } from 'lucide-react';
import { fetchMenuItems } from '../../lib/api';
import { MenuItem } from '../../types';

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Barchasi', 'Gazaklar', 'Asosiy Taomlar', 'Desertlar', 'Ichimliklar'];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchMenuItems(activeCategory === 'Barchasi' ? undefined : activeCategory);
      setItems(data);
      setLoading(false);
    }
    loadData();
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-12 space-y-12 bg-[#f6f3ed]">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#1a2b20] text-white p-8 md:p-16 border border-[#356147]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
            <Utensils className="w-4 h-4" />
            <span>Fine Dining Restaurant</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Archazor Restorani va Kaminli Veranda
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
            Tog' manzarasi bag'rida milliy va Yevropa taomlarining nodir uyg'unligi. Oshpazlarimiz faqatgina organik tog' mahsulotlaridan foydalanadilar.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Har kuni: 08:00 — 23:00</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <a href="tel:+998909998877" className="underline font-semibold">+998 90 999 88 77</a>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          "Tog' manzarali ochiq terras va kamin",
          "Organik va halal milliy taomlar",
          "Bolalar menyusi va maxsus stulchalar",
          "Jonli musiqa va romantik muhit"
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-[#ddd8ce] shadow-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-xs font-semibold text-[#244934] leading-snug">{feature}</span>
          </div>
        ))}
      </div>

      {/* Menu Section */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">Gurme Menyusi</span>
          <h2 className="font-serif text-3xl font-bold text-[#244934]">Bizning Maxsus Taomlar</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#244934] text-amber-300 shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#ddd8ce]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse p-4" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#ddd8ce] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                    <img src={item.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'} alt={item.name} className="w-full h-full object-cover" />
                    {item.requiresPreOrder && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <AlertCircle className="w-3 h-3" />
                        <span>Oldindan buyurtma</span>
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif font-bold text-lg text-[#244934]">{item.name}</h3>
                      <span className="text-amber-700 font-serif font-bold text-sm shrink-0">
                        {item.price.toLocaleString()} {item.currency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2">
                  <a
                    href="tel:+998909998877"
                    className="w-full block bg-[#f6f3ed] hover:bg-[#eae4d7] text-[#244934] text-xs font-bold py-2 rounded-xl text-center border border-[#ddd8ce]"
                  >
                    Stol buyurtma qilish
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
