import { Gamepad2, Compass, Film, Users, Sparkles } from 'lucide-react';
import { activitiesList } from '../../data/activities';

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-[#244934] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#356147] text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Gamepad2 className="w-4 h-4" />
          <span>Faoliyatlar va Hordiq</span>
        </div>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold">
          Har Bir Yosh Uchun Maroqli Faoliyatlar
        </h1>
        <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light">
          Archazor resortida zerikishga vaqt qolmaydi. Bolalardan tortib kattalargacha barcha uchun qiziqarli o'yin va ko'ngilochar zonalar mavjud.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activitiesList.map((activity) => (
          <div key={activity.id} className="bg-white rounded-2xl overflow-hidden border border-[#ddd8ce] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="h-52 w-full relative overflow-hidden bg-gray-100">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#244934] text-amber-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-amber-400/30">
                  {activity.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif font-bold text-xl text-[#244934]">{activity.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{activity.description}</p>
                <div className="pt-2 text-xs text-amber-800 font-semibold bg-[#f6f3ed] p-2.5 rounded-lg inline-block border border-[#ddd8ce]">
                  👥 Yosh chegarasi: {activity.ageGroup}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
