'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mountain, Users, Maximize, Calendar, ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Phone } from 'lucide-react';
import { fetchRoomBySlug, fetchRooms } from '../../../lib/api';
import { Room } from '../../../types';
import BookingModal from '../../../components/ui/BookingModal';

export default function RoomDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [similarRooms, setSimilarRooms] = useState<Room[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      loadRoomData();
    }
  }, [slug]);

  async function loadRoomData() {
    setLoading(true);
    try {
      const data = await fetchRoomBySlug(slug);
      setRoom(data);
      if (data) {
        setActiveImage(data.coverImage);
        const allRooms = await fetchRooms();
        setSimilarRooms(allRooms.filter((r) => r.slug !== slug).slice(0, 2));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-[#244934] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-serif">Xona ma'lumotlari yuklanmoqda...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-[#244934]">Xona topilmadi</h1>
        <p className="text-gray-600">Kechirasiz, siz qidirgan xona mavjud emas yoki o'chirilgan.</p>
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 bg-[#244934] text-white px-6 py-3 rounded-xl font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha xonalarga qaytish</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#244934]">Bosh sahifa</Link>
        <span>/</span>
        <Link href="/rooms" className="hover:text-[#244934]">Xonalar</Link>
        <span>/</span>
        <span className="text-[#244934] font-semibold">{room.name}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Image Gallery & Specs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Active Image */}
          <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-[#ddd8ce] bg-gray-100">
            <img
              src={activeImage || room.coverImage}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#244934]/90 text-amber-200 text-xs px-3.5 py-1.5 rounded-full font-semibold border border-amber-400/30 flex items-center gap-1.5 backdrop-blur-md">
              <Mountain className="w-4 h-4" />
              <span>{room.viewType}</span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {room.images && room.images.length > 0 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveImage(room.coverImage)}
                className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImage === room.coverImage ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={room.coverImage} alt="Cover" className="w-full h-full object-cover" />
              </button>
              {room.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.imageUrl)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img.imageUrl ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description & Amenities */}
          <div className="bg-white rounded-3xl p-8 border border-[#ddd8ce] shadow-sm space-y-6">
            <div>
              <h1 className="font-serif-luxury text-3xl font-bold text-[#244934] mb-2">{room.name}</h1>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{room.description}</p>
            </div>

            {/* Amenities Grid */}
            <div className="pt-4 border-t border-[#ddd8ce]">
              <h3 className="font-serif font-bold text-lg text-[#244934] mb-4">Xona qulayliklari</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center gap-2.5 bg-[#f6f3ed] p-3 rounded-xl border border-[#ddd8ce]/60 text-xs font-semibold text-[#244934]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Check-in & Policy rules */}
            <div className="pt-4 border-t border-[#ddd8ce] space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#244934]">Asosiy Qoidalar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div>
                  <p><strong>Check-in (Kelish):</strong> 14:00 dan boshlab</p>
                  <p><strong>Check-out (Ketish):</strong> 12:00 gacha</p>
                </div>
                <div>
                  <p><strong>Chekish:</strong> Xona ichida taqiqlanadi</p>
                  <p><strong>Uy hayvonlari:</strong> Shartnoma asosida</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Pricing & Booking Widget Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-xl sticky top-28 space-y-6">
            
            <div className="border-b border-[#ddd8ce] pb-4">
              <span className="text-xs text-gray-500 uppercase tracking-widest block font-medium">1 Kecha uchun narx</span>
              <div className="text-3xl font-serif font-bold text-[#244934] mt-1">
                {room.pricePerNight.toLocaleString('uz-UZ')} <span className="text-sm font-sans font-normal text-gray-600">UZS</span>
              </div>
            </div>

            {/* Key Specs */}
            <div className="space-y-3 text-xs text-gray-700 bg-[#f6f3ed] p-4 rounded-2xl border border-[#ddd8ce]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Maydoni:</span>
                <span className="font-bold text-[#244934]">{room.area} m²</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Maksimal mehmonlar:</span>
                <span className="font-bold text-[#244934]">{room.maxGuests} kishi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Manzara:</span>
                <span className="font-bold text-[#244934]">{room.viewType}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full bg-[#244934] hover:bg-[#1a3526] text-white py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Ushbu xonani bron qilish</span>
              </button>

              <a
                href="tel:+998909998877"
                className="w-full bg-white hover:bg-gray-50 text-[#244934] border border-[#244934] py-3 rounded-xl text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-700" />
                <span>Telefon orqali bog'lanish</span>
              </a>
            </div>

            <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>To'lov qabulxonada kelgandan so'ng amalga oshiriladi</span>
            </div>

          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedRoomId={room.id}
        preselectedRoomName={room.name}
      />

    </div>
  );
}
