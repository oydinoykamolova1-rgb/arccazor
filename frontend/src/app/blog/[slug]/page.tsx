'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { fetchBlogPostBySlug } from '../../../lib/api';
import { BlogPost } from '../../../types';

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      setLoading(true);
      const data = await fetchBlogPostBySlug(slug);
      setPost(data);
      setLoading(false);
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f3ed] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#244934] border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f6f3ed] py-20 text-center px-4">
        <h1 className="text-3xl font-bold text-[#20251f] mb-4">Maqola topilmadi</h1>
        <p className="text-slate-600 mb-6">Siz qidirgan blog post mavjud emas yoki o'chirilgan.</p>
        <Link href="/blog" className="bg-[#244934] text-white px-6 py-2.5 rounded-lg inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Blog ro'yxatiga qaytish</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f3ed]">
      {/* Article Header */}
      <section className="bg-[#244934] text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-amber-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Barcha maqolalarga qaytish</span>
          </Link>
          <div className="inline-block bg-amber-600/30 border border-amber-400/30 text-amber-200 text-xs px-3 py-1 rounded-full font-medium mb-3">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-100 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-emerald-100 border-t border-emerald-800/60 pt-4">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              {new Date(post.publishedAt).toLocaleDateString('uz-UZ')}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              {post.readTimeMinutes} daqiqa o'qish
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-8">
          <Image
            src={post.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-emerald-50">
          <p className="text-xl font-medium text-[#20251f] mb-6 leading-relaxed border-l-4 border-amber-500 pl-4 bg-amber-50/50 py-2">
            {post.shortDescription}
          </p>

          <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {post.content}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-sm text-slate-500">Ushbu maqolani ulashing:</span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Maqola havolasi nusxalandi!");
                }
              }}
              className="flex items-center gap-2 bg-emerald-50 text-[#244934] px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              <span>Ulashish</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
