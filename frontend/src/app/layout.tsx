import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'ARCHAZOR Mountain Resort & Spa | Toshkent Bo\'stonliq',
  description: 'Toshkent viloyatidagi Archazor premium tog\' resort va dam olish majmuasi. Hashamatli kottedjlar, panoramali xonalar, SPA, yopiq basseyn va fine dining restoran.',
  keywords: ['Archazor', 'Resort Uzbekistan', 'Toshkent dam olish maskani', 'Chimyon kottedj', 'Tog\' mehmonxonasi'],
  openGraph: {
    title: 'ARCHAZOR Mountain Resort & Spa',
    description: 'Toshkent viloyatidagi Archazor premium tog\' resort majmuasi.',
    images: ['/images/hero-banner.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="min-h-screen flex flex-col antialiased bg-[#f6f3ed]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
