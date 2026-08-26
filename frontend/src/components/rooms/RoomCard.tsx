'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Maximize, Mountain, Calendar, ArrowRight, Wifi, Tv, Coffee } from 'lucide-react';
import { Room } from '../../types';
import BookingModal from '../ui/BookingModal';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-[#ddd8ce] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
        
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <img
            src={room.coverImage}
            alt={room.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          {/* Badge */}
          <div className="absolute top-4 left-4 bg-[#244934]/90 backdrop-blur-md text-amber-200 text-xs px-3 py-1 rounded-full font-semibold border border-amber-400/30 flex items-center gap-1.5">
            <Mountain className="w-3.5 h-3.5" />
            <span>{room.viewType}</span>
          </div>

          {/* Price badge */}
          <div className="absolute bottom-4 right-4 text-right">
            <div className="text-2xl font-serif font-bold text-amber-300 drop-shadow-md">
              {room.pricePerNight.toLocaleString('uz-UZ')} UZS
            </div>
            <span className="text-[11px] text-gray-200 uppercase tracking-widest font-medium">/ 1 kecha uchun</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#244934] group-hover:text-amber-700 transition-colors">
              {room.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
              {room.shortDescription}
            </p>

            {/* Room specs */}
            <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-[#ddd8ce]/60 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4 text-amber-600" />
                <span><strong>{room.area} m²</strong> maydon</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Maks: <strong>{room.maxGuests} kishi</strong></span>
              </div>
            </div>

            {/* Amenities icons */}
            <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
              {room.amenities.slice(0, 4).map((a) => (
                <span key={a.id} className="bg-[#f6f3ed] text-[#244934] px-2.5 py-1 rounded-md border border-[#ddd8ce]/60 font-medium">
                  {a.name}
                </span>
              ))}
              {room.amenities.length > 4 && (
                <span className="text-xs text-gray-400 font-semibold">+{room.amenities.length - 4}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href={`/rooms/${room.slug}`}
              className="w-full bg-[#f6f3ed] hover:bg-[#eae4d7] text-[#244934] py-2.5 rounded-xl text-xs font-bold text-center border border-[#ddd8ce] transition-colors flex items-center justify-center gap-1"
            >
              <span>Batafsil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full bg-[#244934] hover:bg-[#1a3526] text-white py-2.5 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Bron qilish</span>
            </button>
          </div>
        </div>

      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedRoomId={room.id}
        preselectedRoomName={room.name}
      />
    </>
  );
}
