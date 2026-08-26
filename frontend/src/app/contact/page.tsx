'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactRequest } from '../../lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await submitContactRequest({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        message: formData.message,
      });

      setSuccess(true);
      setFormData({ fullName: '', phone: '', email: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || "Xabar yuborishda xatolik yuz berdi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-[#244934] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#356147] text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Phone className="w-4 h-4" />
          <span>Aloqa va Lokatsiya</span>
        </div>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold">
          Biz Bilan Bog'laning
        </h1>
        <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light">
          Savollaringiz bormi? Taklif yoki maxsus bronlash shartlari bo'yicha bizga murojaat yo'llang.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Form connected to API */}
        <div className="bg-white rounded-3xl p-8 border border-[#ddd8ce] shadow-xl space-y-6">
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#244934]">Xabar Yo'llash</h2>
            <p className="text-xs text-gray-500 mt-1">Formani to'ldiring va menejerimiz tez orada javob beradi.</p>
          </div>

          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-xs animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Xabaringiz muvaffaqiyatli yuborildi!</p>
                <p className="text-emerald-700">Rahmat, menejerimiz tez orada ko'rib chiqadi.</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 uppercase tracking-wider mb-1">
                F.I.SH (Ism-sharifingiz) *
              </label>
              <input
                type="text"
                required
                placeholder="Nodir Ergashev"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Telefon raqam *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email pochtangiz
                </label>
                <input
                  type="email"
                  placeholder="misol@domain.uz"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Murojaat matni *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Savolingiz yoki taklifingizni bu yerga yozing..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#244934] hover:bg-[#1a3526] text-white py-3.5 rounded-xl text-sm font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Xabarni yuborish</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info & Location details */}
        <div className="space-y-6">
          <div className="bg-[#244934] text-white rounded-3xl p-8 shadow-xl border border-[#356147] space-y-6">
            <h2 className="font-serif-luxury text-2xl font-bold text-amber-200">Resort Kontaktlari</h2>
            
            <div className="space-y-4 text-sm text-emerald-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Manzil</h4>
                  <p className="text-xs text-emerald-200">Toshkent viloyati, Bo'stonliq tumani, Chimyon tog' zonasi, Archazor resort majmuasi</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Telefon</h4>
                  <p className="text-xs text-emerald-200">+998 90 999 88 77 (24/7 Reception)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Elektron Pochta</h4>
                  <p className="text-xs text-emerald-200">info@archazor.uz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="h-72 rounded-3xl overflow-hidden shadow-lg border border-[#ddd8ce]">
            <iframe
              title="Archazor Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47781.42845610266!2d70.0000000!3d41.5000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMwJzAwLjAiTiA3MMKwMDAnMDAuMCJF!5e0!3m2!1sen!2suz!4v1650000000000!5m2!1sen!2suz"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
