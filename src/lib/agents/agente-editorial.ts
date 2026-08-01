import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';
import { agenteImagen } from './agente-imagen';

const EMOJIS_POR_CATEGORIA: Record<string, string[]> = {
  politica: ['🏛️', '🗳️', '📜', '⚖️'],
  seguridad: ['🚨', '👮', '🛡️', '🔒'],
  cultura: ['🎭', '🎨', '🎵', '📚'],
  economia: ['💰', '📈', '🏭', '🌾'],
  general: ['📰', '📢', '✅', '🔍'],
};

const CTAS_POR_CATEGORIA: Record<string, string[]> = {
  politica: ['Infórmate sobre las decisiones que te afectan', 'Sigue la cobertura completa', 'Tu voz cuenta'],
  seguridad: ['Mantente alerta', 'Comparte para informar', 'Tu seguridad es primero'],
  cultura: ['Descubre más de Oaxaca', 'Vive nuestras tradiciones', 'Cultura que une'],
  economia: ['Oportunidades para ti', 'Impulsa tu economía', 'Datos que importan'],
  general: ['Hechos que impactan', 'Periodismo confiable', 'Síguenos para más'],
};

function generarResumen(contenido: string, maxChars: number = 200): string {
  if (contenido.length <= maxChars) return contenido;
  const corte = contenido.lastIndexOf(' ', maxChars);
  return contenido.substring(0, corte > 0 ? corte : maxChars) + '...';
}

function extraerPuntosClave(contenido: string): string[] {
  const oraciones = contenido.split(/[.!?]+/).filter((s) => s.trim().length > 20);
  return oraciones.slice(0, 3).map((s) => s.trim());
}

function extraerQuotes(contenido: string): string[] {
  const regex = /[""]([^""]+)[""]/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(contenido)) !== null) {
    if (match[1].length > 30 && match[1].length < 200) {
      matches.push(match[1]);
    }
  }
  return matches.slice(0, 2);
}

export async function agenteEditorial(noticia: Noticia): Promise<Noticia> {
  const emojis = EMOJIS_POR_CATEGORIA[noticia.categoria] || EMOJIS_POR_CATEGORIA.general;
  const ctas = CTAS_POR_CATEGORIA[noticia.categoria] || CTAS_POR_CATEGORIA.general;
  const resumen = noticia.resumen || generarResumen(noticia.contenido);
  const puntosClave = extraerPuntosClave(noticia.contenido);
  const quotes = extraerQuotes(noticia.contenido);

  let editada: Noticia = {
    ...noticia,
    resumen,
    estado: 'revisada',
    edicionMNO: {
      ...noticia.edicionMNO,
      fechaEdicion: new Date(),
      cambiosRealizados: [
        ...noticia.edicionMNO.cambiosRealizados,
        'Aplicado toque editorial MNO',
        'Generado resumen automático',
        'Extraídos puntos clave',
      ],
      version: noticia.edicionMNO.version + 1,
    },
    elementosVisuales: {
      emojis,
      ctas,
      quotesDestacados: quotes,
      puntosClave,
    },
    metadata: {
      ...noticia.metadata,
      seo: {
        title: `${noticia.titulo} | Monitor Noticias MNO`,
        description: resumen,
        keywords: noticia.tags.join(', '),
        image: noticia.imagen?.url,
      },
    },
  };

  // Ejecutar agente de imágenes después del editorial
  editada = await agenteImagen(editada);

  await logActividad({
    accion: 'Toque editorial MNO aplicado',
    agente: 'agente-editorial',
    detalles: {
      titulo: noticia.titulo,
      version: editada.edicionMNO.version,
      cambios: editada.edicionMNO.cambiosRealizados,
      imagenProcesada: editada.imagenEditada?.procesada || false,
    },
  });

  return editada;
}
