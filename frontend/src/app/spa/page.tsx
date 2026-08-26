'use client';

import { useEffect, useState } from 'react';
import { Waves, Clock, Phone, CheckCircle2, Calendar, X, Sparkles } from 'lucide-react';
import { fetchSpaServices, submitInquiry } from '../../lib/api';
import { SpaService } from '../../types';

export default function SpaPage() {
  const [services, setServices] = useState<SpaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<SpaService | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchSpaServices();
      setServices(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitInquiry({
        type: 'SpaReservation',
        fullName,
        phone,
        preferredDate: date,
        roomTypeOrService: selectedService?.name,
        message: `SPA Xizmati: ${selectedService?.name || 'SPA'} uchun yozilish.`
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedService(null);
        setFullName('');
        setPhone('');
        setDate('');
      }, 2500);
    } catch (err) {
      alert("Xatolik yuz berdi. Iltimos telefonga qo'ng'iroq qiling.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12 bg-[#f6f3ed]">
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
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Tog' Bag'ridagi Rohat va Salomatlik Majmuasi
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
            Fin saunasi, isitiladigan panoramali basseyn, turk hamomi va eksklyuziv fitosmes massajlar orqali tanangiz va ruhingizga unutilmas rohat bag'ishlang.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Ish vaqti: Har kuni 09:00 — 22:00</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <a href="tel:+998909998877" className="underline font-semibold">+998 90 999 88 77</a>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">Xizmatlar katalogi</span>
          <h2 className="font-serif text-3xl font-bold text-[#244934]">SPA & Basseyn Imkoniyatlari</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse p-4" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden border border-[#ddd8ce] shadow-sm flex flex-col justify-between group">
                <div>
                  <div className="h-52 w-full relative overflow-hidden bg-gray-100">
                    <img
                      src={service.imageUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'}
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
                      <p>⏱️ <strong>Davomiyligi:</strong> {service.durationMinutes} daqiqa</p>
                      {service.price > 0 ? (
                        <p className="text-amber-700 font-bold">💰 <strong>Narxi:</strong> {service.price.toLocaleString()} UZS</p>
                      ) : (
                        <p className="text-emerald-700 font-bold">🎁 <strong>Bepul (Stay Included)</strong></p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full block bg-[#244934] hover:bg-[#1a3526] text-white text-xs font-bold py-2.5 rounded-xl text-center shadow-sm"
                  >
                    SPA muolajasiga yozilish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl animate-scaleIn">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">SPA Yozilish</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#244934] mb-1">{selectedService.name}</h3>
            <p className="text-xs text-slate-500 mb-6">Muolaja vaqtini va aloqa ma'lumotlaringizni kiriting.</p>

            {success ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-center text-sm font-semibold">
                ✅ So'rovingiz qabul qilindi! SPA administratorimiz tez orada bog'lanadi.
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ism va Familiya</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor Karimov"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Telefon raqam</label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Afzal qilingan sana va vaqt</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#244934] text-white font-bold py-3 rounded-xl hover:bg-[#1a3526] transition-colors text-sm shadow-md"
                >
                  {submitting ? 'Yuborilmoqda...' : 'Yozilishni tasdiqlash'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
