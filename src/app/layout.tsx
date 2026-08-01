import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monitor Noticias MNO - Periodismo Confiable | Hechos que Impactan',
  description: 'Centro Inteligente de Información de Oaxaca. Noticias locales, nacionales e internacionales procesadas con inteligencia artificial.',
  keywords: 'noticias, oaxaca, periodismo, méxico, política, seguridad, cultura, economía',
  openGraph: {
    title: 'Monitor Noticias MNO',
    description: 'Periodismo Confiable | Hechos que Impactan',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
