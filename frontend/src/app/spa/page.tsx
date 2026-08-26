'use client';

import { useState } from 'react';
import { Sparkles, Clock, Phone, CheckCircle2, Waves, HeartHandshake } from 'lucide-react';
import { spaInfo, spaServices } from '../../data/spa';

export default function SpaPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#1a2b20] text-white p-8 md:p-16 border border-[#356147]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
            <Waves className="w-4 h-4" />
            <span>SPA & Wellness Center</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Tog' Bag'ridagi Rohat va Salomatlik Majmuasi
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
            {spaInfo.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Ish vaqti: {spaInfo.workingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <a href={`tel:${spaInfo.phone}`} className="underline">{spaInfo.phone}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">Xizmatlar katalogi</span>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#244934]">SPA & Basseyn Imkoniyatlari</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl overflow-hidden border border-[#ddd8ce] shadow-sm flex flex-col justify-between group">
              <div>
                <div className="h-52 w-full relative overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {service.includedInStay ? (
                    <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                      Yashash narxiga kiritilgan
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                      Alohida pullik xizmat
                    </span>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-xl text-[#244934]">{service.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{service.description}</p>
                  
                  <div className="pt-2 text-xs text-gray-500 space-y-1">
                    <p>🕒 <strong>Ish vaqti:</strong> {service.workingHours}</p>
                    {service.price && <p className="text-amber-700 font-bold">💰 <strong>Narxi:</strong> {service.price}</p>}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`tel:${spaInfo.phone}`}
                  className="w-full block bg-[#244934] hover:bg-[#1a3526] text-white text-xs font-bold py-2.5 rounded-xl text-center shadow-sm"
                >
                  SPA ma'lumot va yozilish
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
