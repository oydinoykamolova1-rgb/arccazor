import { Calendar, Users, CheckCircle2, Phone, Briefcase } from 'lucide-react';
import { eventsList } from '../../data/events';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-[#244934] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#356147] text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Briefcase className="w-4 h-4" />
          <span>Tadbirlar va Konferensiyalar</span>
        </div>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold">
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
              <Link
                href="/contact"
                className="w-full block bg-[#244934] hover:bg-[#1a3526] text-white text-xs font-bold py-2.5 rounded-xl text-center shadow-sm"
              >
                Tadbir bo'yicha so'rov yuborish
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
