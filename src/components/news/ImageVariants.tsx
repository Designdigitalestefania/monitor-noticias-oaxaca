"use client";
import Image from 'next/image';
import { Noticia } from '@/types';
import { Card } from '@/components/ui/Card';

interface ImageVariantsProps {
  noticia: Noticia;
}

const VARIANTES = [
  { key: 'url', label: 'Web / OpenGraph', dims: '1200×630', desc: 'Para la web y compartir en redes' },
  { key: 'urlInstagram', label: 'Instagram Feed', dims: '1080×1080', desc: 'Cuadrado para feed de Instagram' },
  { key: 'urlTwitter', label: 'Twitter/X Card', dims: '1200×675', desc: 'Formato tarjeta para Twitter' },
  { key: 'urlStories', label: 'Instagram Stories', dims: '1080×1920', desc: 'Vertical para stories y reels' },
];

export function ImageVariants({ noticia }: ImageVariantsProps) {
  if (!noticia.imagenEditada?.procesada) {
    return (
      <Card className="p-6 text-center">
        <span className="text-3xl">🖼️</span>
        <p className="text-gray-500 text-sm mt-2">La imagen aún no ha sido procesada con el diseño editorial MNO</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">📐 Variantes de Imagen</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VARIANTES.map((v) => {
          const url = (noticia.imagenEditada as any)?.[v.key];
          if (!url) return null;

          return (
            <Card key={v.key} className="overflow-hidden">
              <div className="relative bg-gray-100" style={{ aspectRatio: v.key === 'urlStories' ? '9/16' : v.key === 'urlInstagram' ? '1/1' : '16/9' }}>
                <Image
                  src={url}
                  alt={v.label}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{v.label}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{v.dims}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
