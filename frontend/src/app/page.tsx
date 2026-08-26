'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, ShieldCheck, Mountain, Utensils, Sparkles, MapPin, Phone, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import RoomCard from '../components/rooms/RoomCard';
import BookingModal from '../components/ui/BookingModal';
import { fetchRooms } from '../lib/api';
import { Room } from '../types';

export default function HomePage() {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const rooms = await fetchRooms();
        setFeaturedRooms(rooms.slice(0, 3));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#1a2b20] text-white overflow-hidden">
        {/* Background Image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b20] via-transparent to-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-4xl space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Toshkent Bo'stonliq Tog' Majmuasi</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white leading-tight">
            Tog' va Archazor O'rmoni Bag'ridagi <span className="text-amber-300 italic font-serif">Halovat</span>
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Archazor Resort — toza tog' havosi, panoramali shinam kottedjlar, isitiladigan yopiq basseyn va gurme taomlar uyg'unlashgan premium maskan.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-8 py-4 rounded-xl text-base font-bold shadow-xl hover:shadow-amber-900/40 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-amber-200" />
              <span>Xonani bron qilish</span>
            </button>
            <Link
              href="/rooms"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl text-base font-bold backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Xonalar ro'yxati</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Key metrics bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-white/15">
            <div>
              <span className="block text-2xl lg:text-3xl font-serif font-bold text-amber-300">1600m</span>
              <span className="text-xs text-emerald-200">Dengiz sathidan balandlik</span>
            </div>
            <div>
              <span className="block text-2xl lg:text-3xl font-serif font-bold text-amber-300">24/7</span>
              <span className="text-xs text-emerald-200">Qabulxona & Servis</span>
            </div>
            <div>
              <span className="block text-2xl lg:text-3xl font-serif font-bold text-amber-300">100%</span>
              <span className="text-xs text-emerald-200">Tabiiy Archazor muhiti</span>
            </div>
            <div>
              <span className="block text-2xl lg:text-3xl font-serif font-bold text-amber-300">5 ★</span>
              <span className="text-xs text-emerald-200">Premium Qulayliklar</span>
            </div>
          </div>

        </div>
      </section>

      {/* RESORT OVERVIEW */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-[#ddd8ce]">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Archazor Resort Architecture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#244934] text-white p-6 rounded-2xl shadow-xl max-w-xs border border-amber-400/30">
              <Sparkles className="w-8 h-8 text-amber-400 mb-2" />
              <p className="font-serif text-lg font-bold text-amber-200">Orzuyingizdagi Hordiq</p>
              <p className="text-xs text-emerald-100 mt-1">Shahar shovqinidan yiroqda, sof tabiat bag'rida rohatlaning.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-700 font-semibold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-md">
              <Mountain className="w-4 h-4" />
              <span>Resort Haqida</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#244934] leading-snug">
              Har bir tafsiloti bilan mukammallikka erishilgan tog' kurorti
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Archazor Resort — Chimyon tog'lari etagida, asriy archalar o'rtasida joylashgan. Biz oilaviy hordiq, romantik sayohatlar hamda korporativ tadbirlar uchun zamonaviy qulayliklarni taklif etamiz.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Panoramali Svillar va Shale Kottedjlar</h4>
                  <p className="text-xs text-gray-500">Tog' manzarali terrasalar va kaminli xonalar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Yopiq Isitiladigan Basseyn va SPA</h4>
                  <p className="text-xs text-gray-500">Fin saunasi, hamom va relaks massajlar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Gurme Restoran va Milliy Taomlar</h4>
                  <p className="text-xs text-gray-500">Yevropa va o'zbek milliy oshxonasining eng sara tatlari.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#244934] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3526] transition-colors"
              >
                <span>Biz bilan bog'lanish</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED ROOMS SECTION */}
      <section className="bg-[#ebd9c0]/30 py-16 border-y border-[#ddd8ce]">
        <div className="container mx-auto px-4 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-amber-700 font-semibold text-xs uppercase tracking-widest mb-1">
                Mashhur Tanlovlar
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#244934]">
                Tanlangan Kottedj va Xonalar
              </h2>
            </div>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-[#244934] font-semibold hover:text-amber-700 transition-colors text-sm"
            >
              <span>Barcha xonalarni ko'rish ({featuredRooms.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* SPA & RESTAURANT SHOWCASE */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">
            Xizmat va Qulayliklar
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#244934]">
            Hordiq va Rohatlanish Maskani
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SPA card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-black text-white h-96 group">
            <img
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80"
              alt="SPA & Swimming Pool"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
                SPA & Wellness Center
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Yopiq Isitiladigan Basseyn va Sauna
              </h3>
              <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                Yil davomida 28°C isitiladigan basseyn, Finlyandiya saunasi va shifobaxsh massaj muolajalari.
              </p>
              <div>
                <Link
                  href="/spa"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <span>SPA sahifasiga o'tish</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Restaurant card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-black text-white h-96 group">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80"
              alt="Fine Dining Restaurant"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
                Fine Dining Restaurant
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Restoran va Kaminli Veranda
              </h3>
              <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                O'tin kaminida tayyorlangan milliy palov, tog' foreli va yevropa oshxonasining sara durdonalari.
              </p>
              <div>
                <Link
                  href="/restaurant"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <span>Menyu va Restoran</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="container mx-auto px-4">
        <div className="bg-[#244934] rounded-3xl text-white p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-[#37684b]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-amber-300 bg-white/10 px-3 py-1 rounded-md text-xs font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Lokatsiya va Manzil</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
                Toshkentdan atigi 80 km uzqlikdagi tog' jannati
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Bo'stonliq tumani, Chimyon qishlog'idagi Archazor majmuasiga asfaltlangan ravon yo'l orqali avtomobilda 1.5 soatda yetib kelishingiz mumkin.
              </p>
              <div className="pt-2 space-y-2 text-xs text-amber-200">
                <p>📌 <strong>Manzil:</strong> Toshkent viloyati, Bo'stonliq tumani, Chimyon tog' zonasi</p>
                <p>📞 <strong>Telefon:</strong> +998 90 999 88 77</p>
              </div>
            </div>

            <div className="h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg border border-white/20">
              <iframe
                title="Archazor Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47781.42845610266!2d70.0000000!3d41.5000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMwJzAwLjAiTiA3MMKwMDAnMDAuMCJF!5e0!3m2!1sen!2suz!4v1650000000000!5m2!1sen!2suz"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
}
