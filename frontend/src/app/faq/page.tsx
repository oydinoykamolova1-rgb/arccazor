'use client';

import { useEffect, useState } from 'react';
import { Search, ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { fetchFaqs } from '../../lib/api';
import { FaqItem } from '../../types';

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: 'all', label: 'Barcha savollar' },
    { key: 'Rules', label: 'Yashash qoidalari' },
    { key: 'Booking', label: 'Bronlash & To\'lov' },
    { key: 'General', label: 'Umumiy ma\'lumotlar' },
  ];

  useEffect(() => {
    async function loadFaqs() {
      setLoading(true);
      const data = await fetchFaqs(selectedCategory);
      setFaqs(data);
      setLoading(false);
    }
    loadFaqs();
  }, [selectedCategory]);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f6f3ed]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#244934] to-[#1a3526] text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <span className="text-amber-400 font-semibold tracking-widest text-xs uppercase mb-2 block">
            Savol-Javoblar & Qoidalar
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-100 mb-4">
            Ko'p Beriladigan Savollar (FAQ)
          </h1>
          <p className="text-emerald-100 text-lg mb-8">
            Archazor Resort'da yashash, bron qilish, to'lovlar va qo'shimcha xizmatlar haqida tezkor javoblar.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Savolingizni izlang (masalan: Check-in, oldindan to'lov, bolalar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-[#20251f] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="container mx-auto max-w-4xl px-4 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-[#244934] text-white shadow-md'
                  : 'bg-white text-[#20251f] hover:bg-emerald-50 border border-emerald-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-2xl h-16 animate-pulse" />
            ))}
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-emerald-50">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#20251f]">Ushbu so'rov bo'yicha savol topilmadi</h3>
            <p className="text-slate-500 mt-1 text-sm">Savolingizga javob topa olmadingizmi? Biz bilan bog'laning.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-emerald-50/80 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left font-serif font-bold text-lg text-[#20251f] flex justify-between items-center gap-4 hover:text-[#244934] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm border-t border-slate-100 pt-4 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Banner */}
        <div className="mt-14 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-2xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-serif font-bold mb-2">Boshqa savolingiz bormi?</h3>
          <p className="text-amber-100 text-sm mb-6 max-w-xl mx-auto">
            Bizning 24/7 ishlaydigan aloqa markazimiz har qanday savolingizga javob berishga tayyor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+998909998877"
              className="bg-white text-amber-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-amber-100 transition-colors inline-flex items-center gap-2 shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+998 90 999 88 77</span>
            </a>
            <Link
              href="/contact"
              className="bg-[#244934] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3526] transition-colors inline-flex items-center gap-2"
            >
              <span>Xabar yuborish</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
