'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { fetchBlogPosts } from '../../lib/api';
import { BlogPost } from '../../types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Resort', 'SPA', 'Events', 'Guides'];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchBlogPosts(selectedCategory);
      setPosts(data);
      setLoading(false);
    }
    loadData();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f6f3ed]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#244934] to-[#1a3526] text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <span className="text-amber-400 font-semibold tracking-widest text-xs uppercase mb-2 block">
            Archazor Blog & Yangiliklar
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-100 mb-4">
            Tog' Hordig'i, SPA & Ekologik Maqolalar
          </h1>
          <p className="text-emerald-100 text-lg">
            Archazor Resort mutaxassislarining salomatlik, tog' sayohatlari va dam olish sirlari bo'yicha eksklyuziv maqolalari to'plami.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#244934] text-white shadow-md'
                  : 'bg-white text-[#20251f] hover:bg-emerald-50 border border-emerald-100'
              }`}
            >
              {cat === 'all' ? 'Barcha maqolalar' : cat}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                <div className="w-full h-48 bg-slate-200 rounded-xl mb-4" />
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-emerald-100">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-[#20251f]">Hozircha maqolalar mavjud emas</h3>
            <p className="text-slate-500 mt-1">Boshqa kategoriyani tanlab ko'ring.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-emerald-50 group"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#244934]/90 text-amber-300 text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        {new Date(post.publishedAt).toLocaleDateString('uz-UZ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {post.readTimeMinutes} min o'qish
                      </span>
                    </div>

                    <h2 className="text-xl font-bold font-serif text-[#20251f] group-hover:text-[#244934] transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#244934] hover:text-amber-600 transition-colors"
                    >
                      Batafsil
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
