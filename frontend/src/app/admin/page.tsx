'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Phone, Mail, Clock, RefreshCw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { fetchAdminBookings, updateBookingStatus, fetchAdminContacts, fetchAdminStats } from '../../lib/api';
import { BookingRequestResponse, ContactRequestResponse, AdminStats } from '../../types';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts'>('bookings');
  const [bookings, setBookings] = useState<BookingRequestResponse[]>([]);
  const [contacts, setContacts] = useState<ContactRequestResponse[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    setLoading(true);
    try {
      const [bookingsData, contactsData, statsData] = await Promise.allSettled([
        fetchAdminBookings(),
        fetchAdminContacts(),
        fetchAdminStats(),
      ]);

      if (bookingsData.status === 'fulfilled') setBookings(bookingsData.value);
      if (contactsData.status === 'fulfilled') setContacts(contactsData.value);
      if (statsData.status === 'fulfilled') setStats(statsData.value);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: number, newStatus: string) {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      alert("Statusni o'zgartirishda xatolik");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      
      {/* Top Admin Banner */}
      <div className="bg-[#1a2b20] text-white rounded-3xl p-8 border border-[#2d4d38] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-2 border border-amber-400/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Boshqaruv Paneli</span>
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold">Murojaatlar va Bronlar Tizimi</h1>
          <p className="text-xs text-emerald-200 mt-1">
            Backend ASP.NET Core API serveriga ulangan jonli boshqaruv paneli.
          </p>
        </div>

        <button
          onClick={loadAdminData}
          className="bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/30 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Ma'lumotlarni yangilash</span>
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#ddd8ce] shadow-sm">
            <span className="text-xs text-gray-500 font-medium block">Katalogdagi Xonalar</span>
            <span className="text-2xl font-serif font-bold text-[#244934] mt-1 block">{stats.totalRooms} ta</span>
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
            <span className="text-xs text-amber-800 font-medium block">Kutilayotgan Bronlar</span>
            <span className="text-2xl font-serif font-bold text-amber-700 mt-1 block">{stats.pendingBookings} ta</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#ddd8ce] shadow-sm">
            <span className="text-xs text-gray-500 font-medium block">Jami Bron So'rovlari</span>
            <span className="text-2xl font-serif font-bold text-[#244934] mt-1 block">{stats.totalBookings} ta</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#ddd8ce] shadow-sm">
            <span className="text-xs text-gray-500 font-medium block">Jami Aloqa Xabarlari</span>
            <span className="text-2xl font-serif font-bold text-[#244934] mt-1 block">{stats.totalContacts} ta</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#ddd8ce]">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-[#244934] text-[#244934]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Bron So'rovlari ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'contacts'
              ? 'border-[#244934] text-[#244934]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Kelgan Xabarlar ({contacts.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      {loading ? (
        <div className="py-12 text-center text-gray-500 font-serif">
          <div className="w-10 h-10 border-4 border-[#244934] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p>Admin ma'lumotlari yuklanmoqda...</p>
        </div>
      ) : activeTab === 'bookings' ? (
        
        /* BOOKINGS TABLE */
        <div className="bg-white rounded-2xl border border-[#ddd8ce] shadow-sm overflow-hidden">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">Hali hech qanday bron so'rovi kelib tushmagan.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-[#f6f3ed] text-[#244934] font-serif uppercase tracking-wider border-b border-[#ddd8ce]">
                  <tr>
                    <th className="p-4">#ID</th>
                    <th className="p-4">Foydalanuvchi</th>
                    <th className="p-4">Xona</th>
                    <th className="p-4">Sana (Check-in/out)</th>
                    <th className="p-4">Mehmonlar</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Harakat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ddd8ce]/60">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-gray-500">#{b.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-[#244934] text-sm">{b.fullName}</div>
                        <div className="text-gray-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-amber-600" />
                          <span>{b.phone}</span>
                        </div>
                        {b.email && <div className="text-gray-400 text-[11px]">{b.email}</div>}
                      </td>
                      <td className="p-4 font-semibold text-gray-800">
                        {b.roomName || (b.roomId ? `Room ID: ${b.roomId}` : 'Tanlanmagan')}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div><strong className="text-emerald-700">In:</strong> {b.checkIn}</div>
                        <div><strong className="text-amber-700">Out:</strong> {b.checkOut}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {b.adults} kattalar, {b.children} bolalar
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${
                            b.status === 'Tasdiqlangan'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : b.status === 'Rad etilgan'
                              ? 'bg-red-100 text-red-800 border border-red-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStatusChange(b.id, 'Tasdiqlangan')}
                            disabled={updatingId === b.id}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold"
                          >
                            Tasdiqlash
                          </button>
                          <button
                            onClick={() => handleStatusChange(b.id, 'Rad etilgan')}
                            disabled={updatingId === b.id}
                            className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold"
                          >
                            Rad etish
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      ) : (

        /* CONTACTS TABLE */
        <div className="bg-white rounded-2xl border border-[#ddd8ce] shadow-sm overflow-hidden">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">Hali hech qanday murojaat yo'qlamasi kelib tushmagan.</div>
          ) : (
            <div className="divide-y divide-[#ddd8ce]/60">
              {contacts.map((c) => (
                <div key={c.id} className="p-6 space-y-2 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-gray-400">#{c.id}</span>
                      <h3 className="font-serif font-bold text-lg text-[#244934]">{c.fullName}</h3>
                      <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        📞 {c.phone}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString('uz-UZ')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 bg-[#f6f3ed] p-3.5 rounded-xl border border-[#ddd8ce]/60 leading-relaxed">
                    "{c.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      )}

    </div>
  );
}
