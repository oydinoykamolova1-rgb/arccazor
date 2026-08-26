'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Calendar, ShieldCheck, Sun, Snowflake, Globe } from 'lucide-react';
import BookingModal from '../ui/BookingModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');
  const [lang, setLang] = useState<'UZ' | 'RU' | 'EN'>('UZ');
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Bosh sahifa' },
    { href: '/rooms', label: 'Xonalar' },
    { href: '/restaurant', label: 'Restoran' },
    { href: '/spa', label: 'SPA & Wellness' },
    { href: '/activities', label: 'Faoliyatlar' },
    { href: '/events', label: 'Tadbirlar' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Kontakt' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 text-white shadow-md border-b transition-colors duration-300 ${
        season === 'winter' ? 'bg-[#1e2e3b] border-[#2c4254]' : 'bg-[#244934] border-[#356147]'
      }`}>
        {/* Top announcement bar */}
        <div className={`text-xs py-1.5 px-4 flex justify-between items-center border-b ${
          season === 'winter' ? 'bg-[#15212b] text-sky-100 border-[#223545]' : 'bg-[#1a3526] text-emerald-100 border-[#2d523c]'
        }`}>
          <div className="flex items-center gap-4 container mx-auto">
            <span>📍 Toshkent viloyati, Bo'stonliq tumani, Chimyon tog' tizmasi</span>
            <span className="hidden md:inline text-amber-300">✦ 24/7 Qabulxona & Bronlash xizmati</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Seasonal Switcher */}
            <button
              onClick={() => setSeason(season === 'summer' ? 'winter' : 'summer')}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-xs transition-colors"
              title="Mavsum rejimi (Yoz / Qish)"
            >
              {season === 'summer' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Yoz mode</span>
                </>
              ) : (
                <>
                  <Snowflake className="w-3.5 h-3.5 text-sky-300" />
                  <span className="hidden sm:inline">Qish mode</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-xs">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
              >
                <option value="UZ" className="bg-slate-800 text-white">UZ</option>
                <option value="RU" className="bg-slate-800 text-white">RU</option>
                <option value="EN" className="bg-slate-800 text-white">EN</option>
              </select>
            </div>

            <a href="tel:+998909998877" className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+998 90 999 88 77</span>
            </a>

            <Link href="/admin" className="flex items-center gap-1 text-xs text-amber-200 hover:text-white transition-colors bg-white/10 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-serif text-xl font-bold group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <span className="font-serif-luxury text-2xl font-bold tracking-wider text-amber-200 block leading-none">
                ARCHAZOR
              </span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-widest block mt-0.5">
                Mountain Resort & Spa
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? 'text-amber-300 font-semibold'
                      : 'text-emerald-50 hover:text-amber-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:shadow-amber-900/30 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-200" />
              <span>Xonani bron qilish</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-emerald-100 hover:text-amber-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#1a3526] border-t border-[#2d523c] px-4 py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base font-medium border-b border-[#2d523c]/50 ${
                  pathname === link.href ? 'text-amber-300' : 'text-emerald-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full bg-amber-600 text-white py-3 rounded-lg text-center font-semibold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Xonani bron qilish</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}
