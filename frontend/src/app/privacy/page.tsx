import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: "Maxfiylik Siyosati | Archazor Mountain Resort",
  description: "Archazor Resort foydalanuvchilarining shaxsiy ma'lumotlarini muhofaza qilish va qayta ishlash siyosati."
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f6f3ed] py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#ddd8ce] space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#244934] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Xavfsizlik va Maxfiylik</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#244934]">
            Maxfiylik Siyosati (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Oxirgi yangilanish: 2026-yil 26-avgust
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-serif font-bold text-[#244934] flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-amber-600" />
              1. Umumiy qoidalar
            </h2>
            <p>
              Ushbu Maxfiylik siyosati Archazor Mountain Resort ("Resort", "Biz") veb-sayti (archazor.uz) orqali foydalanuvchilardan to'planadigan shaxsiy ma'lumotlarni qayta ishlash va muhofaza qilish tartibini belgilaydi. Biz sizning maxfiyligingizni qadrlaymiz va ma'lumotlaringiz xavfsizligini ta'minlashga mas'uliyat bilan yondashamiz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#244934] flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-amber-600" />
              2. Qanday ma'lumotlarni to'playmiz?
            </h2>
            <p>Xonani bron qilish so'rovi yoki aloqa formalarini to'ldirishingiz jarayonida quyidagi ma'lumotlar to'planishi mumkin:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Ism va familiyangiz;</li>
              <li>Telefon raqamingiz;</li>
              <li>Elektron pochta manzilingiz (ixtiyoriy);</li>
              <li>Kutilayotgan kelish va ketish sanalari, mehmonlar soni;</li>
              <li>Maxsus istaklar va murojaat matni.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#244934] flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-amber-600" />
              3. Ma'lumotlardan foydalanish maqsadi
            </h2>
            <p>To'plangan shaxsiy ma'lumotlar faqatgina quyidagi maqsadlarda ishlatiladi:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Xona va xizmatlar bo'yicha bron so'rovlarini ko'rib chiqish va mavjudlikni tasdiqlash;</li>
              <li>Siz bilan bog'lanish va buyurtma tafsilotlarini aniqlashtirish;</li>
              <li>Mijozlarga xizmat ko'rsatish sifatini oshirish va savollaringizga javob berish.</li>
            </ul>
          </section>

          <section className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-1">Uchunchi tomonlarga oshkor qilmaslik</h3>
            <p className="text-xs text-amber-800">
              Biz sizning shaxsiy ma'lumotlaringizni uchinchi shaxslarga sotmaymiz, ijaraga bermaymiz yoki tijorat maqsadlarida uzatmaymiz. Ma'lumotlar faqat O'zbekiston Respublikasi qonunchiligida nazarda tutilgan holatlarda vakolatli davlat organlariga taqdim etilishi mumkin.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
