import { parseStringPromise } from 'xml2js';
import { Noticia } from '@/types';
import { agenteRecepcion } from '@/lib/agents/agente-recepcion';

interface RSSItem {
  title?: string[];
  description?: string[];
  link?: string[];
  pubDate?: string[];
  category?: string[];
  'media:content'?: any[];
  enclosure?: any[];
}

interface RSSChannel {
  item?: RSSItem[];
}

interface RSSFeed {
  rss?: {
    channel?: RSSChannel[];
  };
}

export async function fetchRSS(url: string): Promise<RSSFeed | null> {
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'MonitorNoticiasMNO/1.0' },
      next: { revalidate: 300 }
    });
    if (!response.ok) return null;
    const xml = await response.text();
    return await parseStringPromise(xml);
  } catch (error) {
    console.error(`Error fetching RSS ${url}:`, error);
    return null;
  }
}

export function parseRSSItems(feed: RSSFeed): Partial<Noticia>[] {
  const items = feed?.rss?.channel?.[0]?.item || [];

  return items.map((item: RSSItem) => {
    const titulo = item.title?.[0] || 'Sin título';
    const contenido = item.description?.[0] || '';
    const url = item.link?.[0] || '';
    const fecha = item.pubDate?.[0] ? new Date(item.pubDate[0]) : new Date();

    let imagenUrl = '';
    if (item['media:content']?.[0]?.$?.url) {
      imagenUrl = item['media:content'][0].$.url;
    } else if (item.enclosure?.[0]?.$?.url) {
      imagenUrl = item.enclosure[0].$.url;
    }

    return {
      titulo,
      tituloOriginal: titulo,
      contenido,
      resumen: contenido.substring(0, 200),
      fuente: {
        nombre: '',
        url,
        tipo: 'rss_local' as const,
        confiable: false,
      },
      fechaDeteccion: fecha,
      fechaPublicacion: fecha,
      imagen: { url: imagenUrl },
      tags: item.category?.map((c: any) => typeof c === 'string' ? c : c._) || [],
      esNotaServidor: false,
    };
  });
}

export async function procesarFuenteRSS(
  nombre: string, 
  url: string, 
  confiable: boolean
): Promise<Noticia[]> {
  const feed = await fetchRSS(url);
  if (!feed) return [];

  const items = parseRSSItems(feed);
  const noticias: Noticia[] = [];

  for (const item of items) {
    const noticia = await agenteRecepcion({
      ...item,
      fuente: {
        nombre,
        url: item.fuente?.url || '',
        tipo: 'rss_local',
        confiable,
      },
    });
    noticias.push(noticia);
  }

  return noticias;
}
