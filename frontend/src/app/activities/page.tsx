'use client';

import { useEffect, useState } from 'react';
import { Gamepad2, Calendar } from 'lucide-react';
import { fetchActivities } from '../../lib/api';
import { Activity } from '../../types';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [season, setSeason] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchActivities(season === 'all' ? undefined : season);
      setActivities(data);
      setLoading(false);
    }
    loadData();
  }, [season]);

  return (
    <div className="container mx-auto px-4 py-12 space-y-12 bg-[#f6f3ed]">
      {/* Header */}
      <div className="bg-[#244934] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#356147] text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Gamepad2 className="w-4 h-4" />
          <span>Faoliyatlar va Hordiq</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold">
          Har Bir Yosh Uchun Maroqli Faoliyatlar
        </h1>
        <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light">
          Archazor resortida zerikishga vaqt qolmaydi. Bolalardan tortib kattalargacha barcha uchun qiziqarli o'yin va ko'ngilochar zonalar mavjud.
        </p>

        {/* Season Filter */}
        <div className="flex justify-center gap-2 pt-2">
          {[
            { key: 'all', label: 'Barcha faoliyatlar' },
            { key: 'Summer', label: '🌿 Yozgi faoliyatlar' },
            { key: 'Winter', label: '❄️ Qishki faoliyatlar' }
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setSeason(s.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                season === s.key ? 'bg-amber-500 text-white' : 'bg-white/10 text-emerald-100 hover:bg-white/20'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl h-64 animate-pulse p-4" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-2xl overflow-hidden border border-[#ddd8ce] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="h-52 w-full relative overflow-hidden bg-gray-100">
                  <img src={activity.imageUrl || 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=600&q=80'} alt={activity.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#244934] text-amber-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-amber-400/30">
                    {activity.category}
                  </span>
                  {activity.includedInStay && (
                    <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                      Yashash narxida
                    </span>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-xl text-[#244934]">{activity.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{activity.description}</p>
                  <div className="pt-2 text-xs text-amber-800 font-semibold bg-[#f6f3ed] p-2.5 rounded-lg inline-block border border-[#ddd8ce] w-full">
                    🗓️ Jadval: {activity.schedule || 'Har kuni'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
