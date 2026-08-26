'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Mail, CheckCircle2, AlertCircle, Loader2, Info } from 'lucide-react';
import Link from 'next/link';
import { submitBookingRequest, fetchRooms } from '../../lib/api';
import { Room } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomId?: number;
  preselectedRoomName?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedRoomId,
  preselectedRoomName,
}: BookingModalProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    adults: 2,
    children: 0,
    roomId: preselectedRoomId || 0,
    specialRequests: '',
  });

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setErrorMsg('');
      if (preselectedRoomId) {
        setFormData((prev) => ({ ...prev, roomId: preselectedRoomId }));
      }
      loadRoomsList();
    }
  }, [isOpen, preselectedRoomId]);

  async function loadRoomsList() {
    setLoadingRooms(true);
    try {
      const data = await fetchRooms();
      setRooms(data);
      if (!formData.roomId && data.length > 0) {
        setFormData((prev) => ({ ...prev, roomId: data[0].id }));
      }
    } catch {
      // fallback
    } finally {
      setLoadingRooms(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg("Iltimos, shartlarga rozilik bildiring.");
      return;
    }

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg("Iltimos, ismingiz va telefon raqamingizni kiriting.");
      return;
    }

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      setErrorMsg("Ketish sanasi kelish sanasidan keyin bo'lishi kerak.");
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await submitBookingRequest({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        adults: Number(formData.adults),
        children: Number(formData.children),
        roomId: formData.roomId ? Number(formData.roomId) : undefined,
        specialRequests: formData.specialRequests,
      });

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "So'rov yuborishda xatolik yuz berdi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#ddd8ce]">
        
        {/* Header */}
        <div className="bg-[#244934] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-amber-200">Xonani bron qilish</h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              {preselectedRoomName ? `Tanlangan xona: ${preselectedRoomName}` : "Resort menejeri so'rovingizni tekshirib aloqaga chiqadi"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#244934]">Bron so'rovingiz qabul qilindi!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Rahmat, <strong>{formData.fullName}</strong>. Bizning kurort menejerimiz <strong>{formData.phone}</strong> raqami orqali xonaning mavjudligini tasdiqlash uchun tez orada bog'lanadi.
              </p>
              <div className="bg-[#f6f3ed] p-4 rounded-xl text-xs text-gray-600 text-left space-y-1">
                <p><strong>Kelish sanasi:</strong> {formData.checkIn}</p>
                <p><strong>Ketish sanasi:</strong> {formData.checkOut}</p>
                <p><strong>Mehmonlar:</strong> {formData.adults} kattalar, {formData.children} bolalar</p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 bg-[#244934] text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-[#1a3526] transition-colors"
              >
                Yopish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
              
              {/* AUDIT MANDATED DISCLAIMER BANNER */}
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong>Eslatma:</strong> So'rov yuborilishi xona bron qilinganini anglatmaydi. Menejer mavjudlikni tekshirib, siz bilan bog'lanadi.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Room Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Xona toifasi
                </label>
                <select
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                  disabled={loadingRooms}
                >
                  <option value={0}>Xonani tanlang...</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} — {room.pricePerNight.toLocaleString('uz-UZ')} UZS / kecha ({room.viewType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    F.I.SH (Ism Sharifingiz) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Jasur Rahimov"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Telefon raqamingiz *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email pochtangiz (ixtiyoriy)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="misol@domain.uz"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Kelish sanasi (Check-in)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Ketish sanasi (Check-out)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Kattalar soni
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Bolalar soni
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Qo'shimcha istak va izohlar
                </label>
                <textarea
                  rows={2}
                  placeholder="Erta kelish, bolalar karovati yoki maxsus taom istagi..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#244934] focus:outline-none"
                />
              </div>

              {/* Privacy consent checkbox */}
              <div className="flex items-start gap-2 pt-1 text-xs text-slate-600">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 accent-[#244934]"
                />
                <label htmlFor="privacyConsent">
                  Men <Link href="/privacy" className="text-[#244934] underline font-semibold" target="_blank">Maxfiylik siyosati</Link> va <Link href="/terms" className="text-[#244934] underline font-semibold" target="_blank">Foydalanish shartlari</Link> bilan tanishdim.
                </label>
              </div>

              {/* Submit btn */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-[#244934] to-[#1a3526] hover:from-[#1a3526] hover:to-[#0f2317] text-white py-3.5 rounded-xl text-base font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Yuborilmoqda...</span>
                    </>
                  ) : (
                    <span>Bron qilish so'rovini yuborish</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
