"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Noticia } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatTiempoRelativo } from '@/lib/utils/formatters';

interface NewsCardProps {
  noticia: Noticia;
  variant?: 'default' | 'compact' | 'featured';
}

export function NewsCard({ noticia, variant = 'default' }: NewsCardProps) {
  const categoriaColors: Record<string, string> = {
    politica: 'bg-blue-100 text-blue-700',
    seguridad: 'bg-red-100 text-red-700',
    cultura: 'bg-purple-100 text-purple-700',
    economia: 'bg-green-100 text-green-700',
    general: 'bg-gray-100 text-gray-700',
  };

  // Usar imagen editada si está disponible
  const imagenUrl = noticia.imagenEditada?.url || noticia.imagen?.url || '';

  if (variant === 'featured') {
    return (
      <Link href={`/noticia/${noticia.id}`} className="group block">
        <article className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-[16/9] md:aspect-[21/9]">
          {imagenUrl ? (
            <Image
              src={imagenUrl}
              alt={noticia.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-mno-primary to-blue-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <Badge variant="info" size="sm">{noticia.categoria}</Badge>
            <h2 className="text-xl md:text-3xl font-bold text-white mt-2 leading-tight group-hover:text-blue-200 transition-colors">
              {noticia.titulo}
            </h2>
            <p className="text-gray-300 mt-2 text-sm md:text-base line-clamp-2">{noticia.resumen}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span>{noticia.fuente.nombre}</span>
              <span>·</span>
              <span>{formatTiempoRelativo(noticia.fechaDeteccion)}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/noticia/${noticia.id}`} className="group flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden relative">
          {imagenUrl ? (
            <Image src={imagenUrl} alt={noticia.titulo} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-2xl">📰</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${categoriaColors[noticia.categoria] || categoriaColors.general}`}>
            {noticia.categoria}
          </span>
          <h3 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-mno-primary transition-colors">
            {noticia.titulo}
          </h3>
          <span className="text-xs text-gray-400 mt-1">{formatTiempoRelativo(noticia.fechaDeteccion)}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/noticia/${noticia.id}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="relative aspect-[16/10] bg-gray-200">
          {imagenUrl ? (
            <Image
              src={imagenUrl}
              alt={noticia.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-4xl">📰</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoriaColors[noticia.categoria] || categoriaColors.general}`}>
              {noticia.categoria}
            </span>
          </div>
          {noticia.imagenEditada?.procesada && (
            <div className="absolute top-3 right-3">
              <span className="bg-mno-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                MNO
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-mno-primary transition-colors">
            {noticia.titulo}
          </h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{noticia.resumen}</p>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>{noticia.fuente.nombre}</span>
            <span>{formatTiempoRelativo(noticia.fechaDeteccion)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
