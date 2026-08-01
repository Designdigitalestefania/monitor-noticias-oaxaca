"use client";
import { Noticia } from '@/types';
import { NewsCard } from './NewsCard';

interface FeaturedNewsProps {
  noticias: Noticia[];
}

export function FeaturedNews({ noticias }: FeaturedNewsProps) {
  if (noticias.length === 0) return null;

  const [principal, ...resto] = noticias;

  return (
    <div className="space-y-6">
      <NewsCard noticia={principal} variant="featured" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resto.slice(0, 3).map((n) => (
          <NewsCard key={n.id} noticia={n} variant="compact" />
        ))}
      </div>
    </div>
  );
}
