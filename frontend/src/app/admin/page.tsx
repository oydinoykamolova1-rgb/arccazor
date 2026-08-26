'use client';

import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  LayoutDashboard,
  Inbox,
  BedDouble,
  Utensils,
  Sparkles,
  Gamepad2,
  BookOpen,
  HelpCircle,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  UserCheck,
  XCircle,
  Archive,
  Plus
} from 'lucide-react';

import {
  fetchAdminStats,
  fetchAdminInquiries,
  updateInquiryStatus,
  fetchRooms,
  fetchMenuItems,
  fetchSpaServices,
  fetchActivities,
  fetchBlogPosts,
  fetchFaqs
} from '../../lib/api';

import {
  AdminStats,
  Inquiry,
  Room,
  MenuItem,
  SpaService,
  Activity,
  BlogPost,
  FaqItem
} from '../../types';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'stats' | 'inquiries' | 'rooms' | 'menu' | 'spa' | 'activities' | 'blog' | 'faq'
  >('stats');

  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [spaServices, setSpaServices] = useState<SpaService[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // Filtering states
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<string>('all');

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      const [
        statsData,
        inquiriesData,
        roomsData,
        menuData,
        spaData,
        activitiesData,
        blogData,
        faqData
      ] = await Promise.allSettled([
        fetchAdminStats(),
        fetchAdminInquiries(),
        fetchRooms(),
        fetchMenuItems(),
        fetchSpaServices(),
        fetchActivities(),
        fetchBlogPosts(),
        fetchFaqs()
      ]);

      if (statsData.status === 'fulfilled') setStats(statsData.value);
      if (inquiriesData.status === 'fulfilled') setInquiries(inquiriesData.value);
      if (roomsData.status === 'fulfilled') setRooms(roomsData.value);
      if (menuData.status === 'fulfilled') setMenuItems(menuData.value);
      if (spaData.status === 'fulfilled') setSpaServices(spaData.value);
      if (activitiesData.status === 'fulfilled') setActivities(activitiesData.value);
      if (blogData.status === 'fulfilled') setBlogPosts(blogData.value);
      if (faqData.status === 'fulfilled') setFaqs(faqData.value);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleInquiryStatusChange(id: number, newStatus: string) {
    setUpdatingId(id);
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    } catch (err) {
      alert("Statusni o'zgartirishda xatolik");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredInquiries = inquiries.filter(i => {
    const matchStatus = inquiryStatusFilter === 'all' || i.status.toLowerCase() === inquiryStatusFilter.toLowerCase();
    const matchType = inquiryTypeFilter === 'all' || i.type.toLowerCase() === inquiryTypeFilter.toLowerCase();
    return matchStatus && matchType;
  });

  return (
    <div className="min-h-screen bg-[#f6f3ed]">
      <div className="container mx-auto px-4 py-8 space-y-6">

        {/* Header Banner */}
        <div className="bg-[#1a2b20] text-white rounded-3xl p-6 md:p-8 border border-[#2d4d38] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-2 border border-amber-400/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Modular Monolith Admin Panel</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-amber-100">Archazor Resort Boshqaruv Tizimi</h1>
            <p className="text-xs text-emerald-200 mt-1">
              ASP.NET Core Web API 10 + Next.js — Barcha 7 ta modul va CRM Lead Pipeline boshqaruvi.
            </p>
          </div>

          <button
            onClick={loadAllData}
            className="bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/30 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Ma'lumotlarni yangilash</span>
          </button>
        </div>

        {/* Tab Navigation Grid */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-[#ddd8ce] shadow-sm">
          {[
            { id: 'stats', label: 'Statistika', icon: LayoutDashboard },
            { id: 'inquiries', label: `CRM Leads (${inquiries.length})`, icon: Inbox },
            { id: 'rooms', label: `Xonalar (${rooms.length})`, icon: BedDouble },
            { id: 'menu', label: `Restoran Menyu (${menuItems.length})`, icon: Utensils },
            { id: 'spa', label: `SPA (${spaServices.length})`, icon: Sparkles },
            { id: 'activities', label: `Faoliyatlar (${activities.length})`, icon: Gamepad2 },
            { id: 'blog', label: `Blog (${blogPosts.length})`, icon: BookOpen },
            { id: 'faq', label: `FAQ (${faqs.length})`, icon: HelpCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#244934] text-amber-300 shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500">
            <div className="w-10 h-10 border-4 border-[#244934] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-serif">Backend ma'lumotlari yuklanmoqda...</p>
          </div>
        ) : (
          <div>
            {/* 1. STATS TAB */}
            {activeTab === 'stats' && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold block uppercase">Aktiv Xonalar</span>
                    <span className="text-3xl font-serif font-bold text-[#244934] mt-2 block">
                      {stats.activeRooms} / {stats.totalRooms}
                    </span>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-sm">
                    <span className="text-xs text-amber-800 font-semibold block uppercase">Yangi CRM Leadlar</span>
                    <span className="text-3xl font-serif font-bold text-amber-700 mt-2 block">
                      {stats.newInquiriesCount} ta
                    </span>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 shadow-sm">
                    <span className="text-xs text-emerald-800 font-semibold block uppercase">Muvaffaqiyatli Bitimlar</span>
                    <span className="text-3xl font-serif font-bold text-emerald-700 mt-2 block">
                      {stats.wonInquiriesCount} ta
                    </span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold block uppercase">Jami Murojaatlar</span>
                    <span className="text-3xl font-serif font-bold text-slate-800 mt-2 block">
                      {stats.totalInquiries} ta
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-400">Restoran Menyusi</span>
                    <span className="text-xl font-bold text-slate-700 block mt-1">{stats.totalMenuItems} ta taom</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-400">SPA Xizmatlari</span>
                    <span className="text-xl font-bold text-slate-700 block mt-1">{stats.totalSpaServices} ta xizmat</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-400">Faoliyatlar</span>
                    <span className="text-xl font-bold text-slate-700 block mt-1">{stats.totalActivities} ta tur</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-400">Blog & FAQ</span>
                    <span className="text-xl font-bold text-slate-700 block mt-1">{stats.totalBlogPosts} post / {stats.totalFaqs} FAQ</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CRM INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-sm space-y-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Status filter:</span>
                    {['all', 'New', 'Contacted', 'Qualified', 'Won', 'Lost', 'Archived'].map(st => (
                      <button
                        key={st}
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          inquiryStatusFilter === st
                            ? 'bg-[#244934] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st === 'all' ? 'Barchasi' : st}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Tur filter:</span>
                    <select
                      value={inquiryTypeFilter}
                      onChange={e => setInquiryTypeFilter(e.target.value)}
                      className="border text-xs rounded-lg p-2 font-semibold"
                    >
                      <option value="all">Barcha turlar</option>
                      <option value="RoomBooking">RoomBooking</option>
                      <option value="EventInquiry">EventInquiry</option>
                      <option value="SpaReservation">SpaReservation</option>
                      <option value="GeneralContact">GeneralContact</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">Ushbu filtr bo'yicha leadlar topilmadi.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#f6f3ed] text-[#244934] font-serif uppercase tracking-wider">
                        <tr>
                          <th className="p-3">#ID</th>
                          <th className="p-3">Tur</th>
                          <th className="p-3">Mijoz (Ism / Tel)</th>
                          <th className="p-3">Sana & Odam soni</th>
                          <th className="p-3">Xabar / So'rov</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Harakatlar (Pipeline)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredInquiries.map(i => (
                          <tr key={i.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 font-mono font-bold text-slate-400">#{i.id}</td>
                            <td className="p-3">
                              <span className="bg-emerald-50 text-[#244934] px-2.5 py-1 rounded-md font-bold text-[11px] border border-emerald-200">
                                {i.type}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="font-bold text-slate-900 text-sm">{i.fullName}</div>
                              <div className="text-slate-500 font-semibold mt-0.5">📞 {i.phone}</div>
                              {i.email && <div className="text-slate-400 text-[10px]">{i.email}</div>}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <div>🗓️ {i.preferredDate || 'Ko\'rsatilmadi'}</div>
                              {i.guestsCount && <div>👥 {i.guestsCount} kishi</div>}
                              {i.roomTypeOrService && <div className="text-amber-700 font-semibold">{i.roomTypeOrService}</div>}
                            </td>
                            <td className="p-3 max-w-xs">
                              <p className="line-clamp-3 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                "{i.message}"
                              </p>
                              {i.adminNotes && (
                                <p className="text-[10px] text-amber-800 bg-amber-50 mt-1 p-1 rounded font-medium">
                                  📝 Notes: {i.adminNotes}
                                </p>
                              )}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                i.status === 'New' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                                i.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                                i.status === 'Qualified' ? 'bg-purple-100 text-purple-800' :
                                i.status === 'Won' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                                i.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {i.status}
                              </span>
                            </td>
                            <td className="p-3 whitespace-nowrap space-y-1">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleInquiryStatusChange(i.id, 'Contacted')}
                                  disabled={updatingId === i.id}
                                  className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold"
                                >
                                  Bog'lanildi
                                </button>
                                <button
                                  onClick={() => handleInquiryStatusChange(i.id, 'Qualified')}
                                  disabled={updatingId === i.id}
                                  className="bg-purple-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold"
                                >
                                  Saralandi
                                </button>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleInquiryStatusChange(i.id, 'Won')}
                                  disabled={updatingId === i.id}
                                  className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold"
                                >
                                  Won ✅
                                </button>
                                <button
                                  onClick={() => handleInquiryStatusChange(i.id, 'Lost')}
                                  disabled={updatingId === i.id}
                                  className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold"
                                >
                                  Lost ❌
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
            )}

            {/* 3. ROOMS TAB */}
            {activeTab === 'rooms' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-serif font-bold text-xl text-[#244934]">Xonalar Katalogi ({rooms.length})</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map(room => (
                    <div key={room.id} className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 bg-slate-50/50">
                      <div>
                        <img src={room.coverImage} alt={room.name} className="w-full h-40 object-cover rounded-xl mb-3" />
                        <h3 className="font-serif font-bold text-lg text-[#244934]">{room.name}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{room.shortDescription}</p>
                        <div className="mt-3 text-xs text-slate-700 space-y-1">
                          <p>💰 <strong>Narxi:</strong> {room.pricePerNight.toLocaleString()} UZS / kecha</p>
                          <p>📐 <strong>Maydoni:</strong> {room.area} m² | 👥 <strong>Sig'imi:</strong> {room.maxGuests} kishi</p>
                          <p>🏔️ <strong>Manzara:</strong> {room.viewType}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t flex justify-between items-center text-xs">
                        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                          {room.status || 'Active'}
                        </span>
                        {room.isFeatured && (
                          <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">
                            ★ Featured
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. MENU TAB */}
            {activeTab === 'menu' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-sm space-y-6">
                <h2 className="font-serif font-bold text-xl text-[#244934]">Restoran Taomlari ({menuItems.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map(item => (
                    <div key={item.id} className="border rounded-2xl p-4 flex items-center gap-4 bg-slate-50">
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 uppercase">{item.category}</span>
                        <h4 className="font-serif font-bold text-slate-800 text-sm">{item.name}</h4>
                        <p className="text-xs font-bold text-emerald-700 mt-1">{item.price.toLocaleString()} {item.currency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SPA TAB */}
            {activeTab === 'spa' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-sm space-y-6">
                <h2 className="font-serif font-bold text-xl text-[#244934]">SPA & Wellness Xizmatlari ({spaServices.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {spaServices.map(spa => (
                    <div key={spa.id} className="border rounded-2xl p-4 bg-slate-50 flex items-center gap-4">
                      <img src={spa.imageUrl} alt={spa.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 uppercase">{spa.category}</span>
                        <h4 className="font-serif font-bold text-slate-800 text-sm">{spa.name}</h4>
                        <p className="text-xs text-slate-500">{spa.durationMinutes} min | {spa.includedInStay ? 'Bepul (Stay)' : `${spa.price.toLocaleString()} UZS`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. ACTIVITIES TAB */}
            {activeTab === 'activities' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-sm space-y-6">
                <h2 className="font-serif font-bold text-xl text-[#244934]">Resort Faoliyatlari ({activities.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activities.map(act => (
                    <div key={act.id} className="border rounded-2xl p-4 bg-slate-50 flex items-center gap-4">
                      <img src={act.imageUrl} alt={act.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 uppercase">{act.season} / {act.category}</span>
                        <h4 className="font-serif font-bold text-slate-800 text-sm">{act.name}</h4>
                        <p className="text-xs text-slate-500">{act.schedule}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. BLOG TAB */}
            {activeTab === 'blog' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-sm space-y-6">
                <h2 className="font-serif font-bold text-xl text-[#244934]">Blog Maqolalari ({blogPosts.length})</h2>
                <div className="space-y-4">
                  {blogPosts.map(post => (
                    <div key={post.id} className="border rounded-2xl p-4 flex justify-between items-center bg-slate-50">
                      <div>
                        <span className="text-xs font-bold text-amber-700">{post.category}</span>
                        <h3 className="font-serif font-bold text-[#244934] text-base">{post.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{post.author} • {new Date(post.publishedAt).toLocaleDateString()}</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">Chop etilgan</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. FAQ TAB */}
            {activeTab === 'faq' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ddd8ce] shadow-sm space-y-6">
                <h2 className="font-serif font-bold text-xl text-[#244934]">FAQ Savol-Javoblar ({faqs.length})</h2>
                <div className="space-y-3">
                  {faqs.map(faq => (
                    <div key={faq.id} className="border rounded-2xl p-4 bg-slate-50">
                      <div className="font-bold text-slate-800 text-sm mb-1">{faq.question}</div>
                      <div className="text-xs text-slate-600">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
