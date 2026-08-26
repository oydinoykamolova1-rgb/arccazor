import Link from 'next/link';
import { Phone, Mail, MapPin, Send, Globe, Share2, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a2b20] text-emerald-100 border-t border-[#294232]">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-serif text-xl font-bold">
                A
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold tracking-wider text-amber-200 block leading-none">
                  ARCHAZOR
                </span>
                <span className="text-[10px] text-emerald-300 uppercase tracking-widest block mt-0.5">
                  Mountain Resort & Spa
                </span>
              </div>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              Toshkent viloyati Bo'stonliq tumanidagi tog' va archazor o'rmoni bag'rida joylashgan premium darajadagi dam olish va sog'lomlashtirish majmuasi.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#244934] border border-emerald-700/50 flex items-center justify-center text-amber-300 hover:bg-amber-600 hover:text-white transition-colors" aria-label="Web">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#244934] border border-emerald-700/50 flex items-center justify-center text-amber-300 hover:bg-amber-600 hover:text-white transition-colors" aria-label="Telegram">
                <Send className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#244934] border border-emerald-700/50 flex items-center justify-center text-amber-300 hover:bg-amber-600 hover:text-white transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-amber-200 font-serif text-lg font-semibold mb-4 border-b border-[#2d4d38] pb-2 inline-block">
              Tezkor Havolalar
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-200/90">
              <li>
                <Link href="/rooms" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> Xonalar va Kotterjlar
                </Link>
              </li>
              <li>
                <Link href="/restaurant" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> Fine Dining Restoran
                </Link>
              </li>
              <li>
                <Link href="/spa" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> SPA va Yopiq Basseyn
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> Faoliyatlar va O'yinlar
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> Konferensiyalar va To'ylar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> Aloqa va Manzil
                </Link>
              </li>
            </ul>
          </div>

          {/* Working hours */}
          <div>
            <h3 className="text-amber-200 font-serif text-lg font-semibold mb-4 border-b border-[#2d4d38] pb-2 inline-block">
              Ish Vaqti & Tartib
            </h3>
            <ul className="space-y-3 text-sm text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-emerald-100">Qabulxona (Reception)</span>
                  <span className="text-xs text-emerald-300/80">24/7 Har kuni uzluksiz</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-emerald-100">Check-in / Check-out</span>
                  <span className="text-xs text-emerald-300/80">Check-in: 14:00 | Check-out: 12:00</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-emerald-100">Restoran va SPA</span>
                  <span className="text-xs text-emerald-300/80">08:00 – 23:00 (Har kuni)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-amber-200 font-serif text-lg font-semibold mb-4 border-b border-[#2d4d38] pb-2 inline-block">
              Bog'lanish
            </h3>
            <ul className="space-y-3 text-sm text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <span>Toshkent viloyati, Bo'stonliq tumani, Chimyon, Archazor majmuasi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+998909998877" className="hover:text-amber-300 transition-colors">+998 90 999 88 77</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@archazor.uz" className="hover:text-amber-300 transition-colors">info@archazor.uz</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[#294232] flex flex-col md:flex-row items-center justify-between text-xs text-emerald-300/70 gap-4">
          <p>© {new Date().getFullYear()} ARCHAZOR Mountain Resort & Spa. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-amber-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Tizimi</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
