"use client";
import { Noticia } from '@/types';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  noticias: Noticia[];
  columns?: 1 | 2 | 3 | 4;
}

export function NewsList({ noticias, columns = 3 }: NewsListProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (noticias.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">No hay noticias disponibles</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {noticias.map((noticia) => (
        <NewsCard key={noticia.id} noticia={noticia} />
      ))}
    </div>
  );
}
