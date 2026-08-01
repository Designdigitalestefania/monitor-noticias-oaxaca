"use client";
import Link from 'next/link';
import { Noticia } from '@/types';

interface BreakingBannerProps {
  noticia: Noticia | null;
}

export function BreakingBanner({ noticia }: BreakingBannerProps) {
  if (!noticia) return null;

  return (
    <Link href={`/noticia/${noticia.id}`} className="block">
      <div className="bg-red-600 text-white px-4 py-2.5 animate-pulse">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="bg-white text-red-600 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
            Urgente
          </span>
          <span className="text-sm font-medium truncate">{noticia.titulo}</span>
          <span className="hidden sm:inline text-red-200 text-xs ml-auto">Ver más →</span>
        </div>
      </div>
    </Link>
  );
}
