'use client';

import { useState } from 'react';
import { Briefcase, CheckCircle2, Phone, Sparkles, X } from 'lucide-react';
import { submitInquiry } from '../../lib/api';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guestsCount, setGuestsCount] = useState<number>(20);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const eventsList = [
    {
      id: 1,
      title: "Korporativ Konferensiya va Seminar",
      description: "Zamonaviy proyektor, professional ovoz tizimi va tezkor Wi-Fi bilan jihozlangan 100 kishilik zal.",
      capacity: "100 kishigacha",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      features: ["Lazer proyektor va 4K ekran", "Sinxron tarjima uskunalari", "Kofe-breyk va tushlik menyusi"]
    },
    {
      id: 2,
      title: "Timbuilding va Ekstremal Sayohatlar",
      description: "Jamoangiz uchun tog' trekkinlari, kvadrotsikl musobaqalari va kamin atrofidagi kechki dastur.",
      capacity: "50 kishigacha",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
      features: ["Professional gidlar va instruktorlar", "Guruhli musobaqalar va sovg'alar", "Ochiq havodagi barbekyu"]
    },
    {
      id: 3,
      title: "Tantanalik Bayram va Marosimlar",
      description: "To'y, yubiley va tug'ilgan kunlar uchun tog' panoramali ochiq restoran va eksklyuziv bezaklar.",
      capacity: "150 kishigacha",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
      features: ["Individual menyu va fotozonalar", "Jonli ijrodagi musiqa", "Mushakbozlik va shou dasturi"]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        type: 'EventInquiry',
        fullName,
        phone,
        email,
        preferredDate: date,
        guestsCount,
        roomTypeOrService: selectedEvent || 'Tadbir',
        message: message || `${selectedEvent} bo'yicha so'rov.`
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedEvent(null);
      }, 2500);
    } catch (err) {
      alert("Xatolik yuz berdi. Iltimos aloqaga chiqing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12 bg-[#f6f3ed]">
      {/* Header */}
      <div className="bg-[#244934] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#356147] text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Briefcase className="w-4 h-4" />
          <span>Tadbirlar va Konferensiyalar</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold">
          Korporativ va Bayram Tadbirlari
        </h1>
        <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light">
          Tog'lar va tabiiy archazor bag'rida o'tkaziladigan konferensiya, timbuilding va bayram marosimlari ishtirokchilarda unutilmas taassurot qoldiradi.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {eventsList.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-[#ddd8ce] shadow-sm flex flex-col justify-between">
            <div>
              <div className="h-56 w-full relative overflow-hidden bg-gray-100">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                  Sig'imi: {event.capacity}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#244934]">{event.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{event.description}</p>
                
                <div className="space-y-2 border-t border-[#ddd8ce] pt-3">
                  <h4 className="text-xs font-bold text-[#244934]">Imkoniyatlar:</h4>
                  {event.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedEvent(event.title)}
                className="w-full block bg-[#244934] hover:bg-[#1a3526] text-white text-xs font-bold py-2.5 rounded-xl text-center shadow-sm"
              >
                Tadbir bo'yicha so'rov yuborish
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-[#244934] mb-2">{selectedEvent}</h3>
            <p className="text-xs text-slate-500 mb-6">Tadbir sanasi, mehmonlar soni va istaklaringizni qoldiring.</p>

            {success ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-center text-sm font-semibold">
                ✅ So'rov muvaffaqiyatli yuborildi! Event-menejerimiz bog'lanadi.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tashkilot / F.I.SH</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full border p-2.5 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full border p-2.5 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sana</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full border p-2.5 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mehmonlar soni</label>
                    <input
                      type="number"
                      value={guestsCount}
                      onChange={e => setGuestsCount(parseInt(e.target.value))}
                      className="w-full border p-2.5 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Qo'shimcha talablar</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Masalan: Kofe-breyk, proyektor va 2 kunlik tur..."
                    className="w-full border p-2.5 rounded-xl text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#244934] text-white font-bold py-3 rounded-xl hover:bg-[#1a3526] transition-colors text-sm"
                >
                  {submitting ? 'Yuborilmoqda...' : 'Tadbir so\'rovini yuborish'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
