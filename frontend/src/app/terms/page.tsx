import { FileCheck, Clock, CreditCard, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: "Foydalanish va Bron Qilish Shartlari | Archazor Mountain Resort",
  description: "Archazor Resort xonalarini bron qilish, to'lovlar, bekor qilish va yashash qoidalari."
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f6f3ed] py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#ddd8ce] space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-200">
            <FileCheck className="w-4 h-4 text-amber-600" />
            <span>Foydalanish Qoidalari</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#244934]">
            Foydalanish va Bron Qilish Shartlari
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Oxirgi yangilanish: 2026-yil 26-avgust
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm leading-relaxed">
          <section className="bg-[#244934] text-white p-6 rounded-2xl border border-emerald-800">
            <h3 className="font-bold text-amber-300 text-base mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Muhim eslatma (Booking MVP Disclaimer)
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Veb-sayt orqali so'rov yuborilishi xona avtomatik bron qilinganini anglatmaydi. So'rov yuborilganidan so'ng, resort menejeri xonaning mavjudligini tekshiradi va siz kiritgan telefon raqami orqali bog'lanib, bronni tasdiqlaydi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#244934] flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              1. Kirish va Chiqish Vaqtlari (Check-in / Check-out)
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Check-in (Xonaga kirish):</strong> Soat 14:00 dan boshlab.</li>
              <li><strong>Check-out (Xonadan chiqish):</strong> Soat 12:00 gacha.</li>
              <li>Erta kirish yoki kech chiqish xonalarning bo'shligiga qarab qo'shimcha to'lov evaziga ko'rib chiqiladi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#244934] flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-amber-600" />
              2. To'lov va Bekor qilish shartlari
            </h2>
            <p>
              Xona band qilinganidan so'ng, minimal 50% yoki 100% oldindan to'lov amalga oshirilishi kerak. Kelish sanasiga 3 kundan ko'p vaqt qolganda bekor qilinsa, to'lov to'liq qaytariladi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#244934] mb-3">
              3. Yashash Qoidalari
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Xonalarda tamaki mahsulotlarini chekish qat'iyan man etiladi;</li>
              <li>Resort hududiga uy hayvonlarini olib kelish taqiqlanadi;</li>
              <li>Tungi soat 22:00 dan so'ng shovqin ko'tarish cheklanadi.</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}
