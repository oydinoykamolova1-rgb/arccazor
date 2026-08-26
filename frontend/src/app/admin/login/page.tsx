'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:5144/api/v1/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: 'Login amalga oshmadi' }));
        throw new Error(data.message || "Foydalanuvchi nomi yoki parol noto'g'ri.");
      }

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('archazor_admin_token', data.token);
        router.push('/admin');
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Tizimga kirishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a2b20] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl border border-emerald-900/50">
        
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#244934] text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#244934]">Admin Tizimiga Kirish</h1>
          <p className="text-xs text-slate-500">Archazor Resort boshqaruv paneli autentifikatsiyasi</p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3 text-xs mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Email / Login</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="admin@archazor.uz"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#244934]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Parol</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#244934]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#244934] hover:bg-[#1a3526] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 mt-4"
          >
            <span>{loading ? 'Tekshirilmoqda...' : 'Tizimga kirish'}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </form>

      </div>
    </div>
  );
}
