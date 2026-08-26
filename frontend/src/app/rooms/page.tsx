'use client';

import { useState, useEffect } from 'react';
import { Mountain, Filter, RefreshCw, SlidersHorizontal } from 'lucide-react';
import RoomCard from '../../components/rooms/RoomCard';
import { fetchRooms } from '../../lib/api';
import { Room } from '../../types';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [guestsFilter, setGuestsFilter] = useState<number>(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(5000000);
  const [viewTypeFilter, setViewTypeFilter] = useState<string>('');

  useEffect(() => {
    loadRooms();
  }, [guestsFilter, maxPriceFilter, viewTypeFilter]);

  async function loadRooms() {
    setLoading(true);
    try {
      const data = await fetchRooms({
        guests: guestsFilter > 0 ? guestsFilter : undefined,
        maxPrice: maxPriceFilter < 5000000 ? maxPriceFilter : undefined,
        viewType: viewTypeFilter ? viewTypeFilter : undefined,
      });
      setRooms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function resetFilters() {
    setGuestsFilter(0);
    setMaxPriceFilter(5000000);
    setViewTypeFilter('');
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      
      {/* Header banner */}
      <div className="bg-[#244934] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#356147] text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Mountain className="w-4 h-4" />
          <span>Resort Xonalari</span>
        </div>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold">
          Hashamatli Kottedj va Svitlar Katalogi
        </h1>
        <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light">
          Har bir xona shaxsiy terrasaga, panoramali tog' manzarasiga hamda barcha zamonaviy qulayliklarga ega. Sizga mos keladiganini tanlang.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#ddd8ce] space-y-4">
        <div className="flex items-center justify-between border-b border-[#ddd8ce]/60 pb-4">
          <div className="flex items-center gap-2 text-[#244934] font-serif font-bold text-lg">
            <SlidersHorizontal className="w-5 h-5 text-amber-600" />
            <span>Xonalarni Filtrlash</span>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Filtrlarni tozalash</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
          
          {/* Guests Filter */}
          <div>
            <label className="block font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Mehmonlar soni
            </label>
            <select
              value={guestsFilter}
              onChange={(e) => setGuestsFilter(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
            >
              <option value={0}>Barchasi (Har qanday sig'im)</option>
              <option value={2}>Kamida 2 kishilik</option>
              <option value={4}>Kamida 4 kishilik</option>
              <option value={6}>Kamida 6 kishilik</option>
            </select>
          </div>

          {/* View Type Filter */}
          <div>
            <label className="block font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Manzara toifasi
            </label>
            <select
              value={viewTypeFilter}
              onChange={(e) => setViewTypeFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
            >
              <option value="">Barcha manzaralar</option>
              <option value="Tog'">Tog' manzarali</option>
              <option value="O'rmon">Archa O'rmon manzarali</option>
              <option value="Basseyn">Basseyn manzarali</option>
            </select>
          </div>

          {/* Max Price Filter */}
          <div>
            <div className="flex justify-between font-semibold text-gray-700 uppercase tracking-wider mb-2">
              <span>Maksimal narx</span>
              <span className="text-amber-700">{maxPriceFilter.toLocaleString('uz-UZ')} UZS</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={5000000}
              step={200000}
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-full accent-[#244934]"
            />
          </div>

        </div>
      </div>

      {/* Rooms Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[420px] bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#ddd8ce] space-y-4">
          <p className="text-lg font-serif text-gray-600">Tanlangan filtrlarga mos keluvchi xona topilmadi.</p>
          <button
            onClick={resetFilters}
            className="bg-[#244934] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a3526]"
          >
            Barcha xonalarni ko'rsatish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

    </div>
  );
}
