import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Noticia } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatFecha } from '@/lib/utils/formatters';
import { SEOHead } from '@/components/shared/SEOHead';
import { ImageVariants } from '@/components/news/ImageVariants';
import Loading from '../loading';

async function getNoticia(id: string): Promise<Noticia | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/noticias`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.noticias?.find((n: Noticia) => n.id === id) || null;
  } catch {
    return null;
  }
}

export default async function NoticiaPage({ params }: { params: { id: string } }) {
  const noticia = await getNoticia(params.id);

  if (!noticia) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Noticia no encontrada</h1>
        <p className="text-gray-500 mt-2">La noticia que buscas no existe o ha sido eliminada.</p>
        <Link href="/noticias" className="text-mno-primary hover:underline mt-4 inline-block">
          Ver todas las noticias
        </Link>
      </div>
    );
  }

  const imagenPrincipal = noticia.imagenEditada?.url || noticia.imagen?.url;

  return (
    <Suspense fallback={<Loading />}>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SEOHead
          title={`${noticia.titulo} | Monitor Noticias MNO`}
          description={noticia.resumen}
          keywords={noticia.tags.join(', ')}
          image={imagenPrincipal}
        />

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="info">{noticia.categoria}</Badge>
            <Badge variant={noticia.prioridad === 'alta' ? 'danger' : noticia.prioridad === 'media' ? 'warning' : 'default'}>
              {noticia.prioridad}
            </Badge>
            <Badge variant="default">{noticia.origen}</Badge>
            {noticia.imagenEditada?.procesada && (
              <Badge variant="success">🎨 Imagen MNO</Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {noticia.elementosVisuales.emojis.slice(0, 2).join(' ')} {noticia.titulo}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>{noticia.fuente.nombre}</span>
            <span>·</span>
            <span>{formatFecha(noticia.fechaDeteccion)}</span>
            {noticia.edicionMNO.editadoPor === 'sistema_automatico' && (
              <>
                <span>·</span>
                <span className="text-blue-500">🤖 Editado por IA</span>
              </>
            )}
          </div>
        </div>

        {/* Imagen principal */}
        {imagenPrincipal && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-200">
            <Image
              src={imagenPrincipal}
              alt={noticia.titulo}
              fill
              className="object-cover"
              priority
            />
            {noticia.imagenEditada?.procesada && (
              <div className="absolute bottom-3 right-3 bg-mno-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                🎨 Diseño MNO
              </div>
            )}
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="text-xl text-gray-600 font-medium mb-6">{noticia.resumen}</p>

          {noticia.elementosVisuales.puntosClave.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-6 my-6">
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3">Puntos clave</h3>
              <ul className="space-y-2">
                {noticia.elementosVisuales.puntosClave.map((punto, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: noticia.contenido.replace(/\n/g, '<br/>') }} />

          {noticia.elementosVisuales.quotesDestacados.length > 0 && (
            <blockquote className="border-l-4 border-mno-primary pl-6 my-8 italic text-xl text-gray-600">
              "{noticia.elementosVisuales.quotesDestacados[0]}"
            </blockquote>
          )}
        </div>

        {/* Variantes de imagen */}
        {noticia.imagenEditada?.procesada && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <ImageVariants noticia={noticia} />
          </div>
        )}

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {noticia.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Metadatos de edición */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-500">
          <p><strong>Versión:</strong> {noticia.edicionMNO.version}</p>
          <p><strong>Editado por:</strong> {noticia.edicionMNO.editadoPor === 'sistema_automatico' ? '🤖 Sistema Automático' : '👤 Editor Humano'}</p>
          <p><strong>Fecha de edición:</strong> {formatFecha(noticia.edicionMNO.fechaEdicion)}</p>
          <p><strong>Cambios:</strong> {noticia.edicionMNO.cambiosRealizados.join(', ')}</p>
        </div>
      </article>
    </Suspense>
  );
}
