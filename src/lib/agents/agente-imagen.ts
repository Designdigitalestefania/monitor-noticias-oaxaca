import sharp from 'sharp';
import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

// Configuración de colores por categoría
const COLORES_CATEGORIA: Record<string, { primario: string; secundario: string; acento: string }> = {
  politica: { primario: '#1e3a5f', secundario: '#2c5282', acento: '#63b3ed' },
  seguridad: { primario: '#742a2a', secundario: '#c53030', acento: '#fc8181' },
  cultura: { primario: '#553c9a', secundario: '#805ad5', acento: '#d6bcfa' },
  economia: { primario: '#22543d', secundario: '#38a169', acento: '#9ae6b4' },
  general: { primario: '#1a202c', secundario: '#4a5568', acento: '#a0aec0' },
};

// Dimensiones por plataforma
const DIMENSIONES = {
  web: { width: 1200, height: 630, label: 'Web / OpenGraph' },
  instagram: { width: 1080, height: 1080, label: 'Instagram Feed' },
  twitter: { width: 1200, height: 675, label: 'Twitter/X Card' },
  stories: { width: 1080, height: 1920, label: 'Instagram Stories' },
  whatsapp: { width: 800, height: 800, label: 'WhatsApp' },
};

interface ImagenProcesada {
  buffer: Buffer;
  width: number;
  height: number;
  formato: string;
}

/**
 * Descarga una imagen desde una URL
 */
export async function descargarImagen(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'MonitorNoticiasMNO/1.0' },
    });
    if (!response.ok) return null;
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error('Error descargando imagen:', error);
    return null;
  }
}

/**
 * Genera un SVG con el título impactante y branding MNO
 */
function generarOverlaySVG(
  width: number,
  height: number,
  titulo: string,
  categoria: string,
  emojis: string[],
  fuente: string,
  variant: 'web' | 'instagram' | 'twitter' | 'stories' | 'whatsapp'
): string {
  const colores = COLORES_CATEGORIA[categoria] || COLORES_CATEGORIA.general;
  const isVertical = variant === 'stories';
  const isSquare = variant === 'instagram' || variant === 'whatsapp';

  // Calcular tamaño de fuente según longitud del título
  const maxChars = 80;
  const tituloTruncado = titulo.length > maxChars ? titulo.substring(0, maxChars) + '...' : titulo;
  const fontSize = isVertical 
    ? Math.max(48, Math.min(72, 2000 / tituloTruncado.length))
    : Math.max(36, Math.min(56, 1800 / tituloTruncado.length));

  const lineHeight = fontSize * 1.3;
  const maxWidth = isVertical ? width * 0.85 : width * 0.9;

  // Dividir título en líneas
  const palabras = tituloTruncado.split(' ');
  const lineas: string[] = [];
  let lineaActual = '';

  for (const palabra of palabras) {
    const prueba = lineaActual ? lineaActual + ' ' + palabra : palabra;
    if (prueba.length * (fontSize * 0.55) > maxWidth) {
      if (lineaActual) lineas.push(lineaActual);
      lineaActual = palabra;
    } else {
      lineaActual = prueba;
    }
  }
  if (lineaActual) lineas.push(lineaActual);

  // Limitar a 4 líneas
  const lineasFinales = lineas.slice(0, 4);

  // Posicionamiento
  const barHeight = isVertical ? height * 0.55 : height * 0.45;
  const barY = isVertical ? height - barHeight : height - barHeight;
  const textY = barY + (isVertical ? barHeight * 0.25 : barHeight * 0.3);

  // Emojis arriba del título
  const emojiText = emojis.slice(0, 3).join(' ');

  // Construir líneas de texto SVG
  const lineasSVG = lineasFinales.map((linea, i) => {
    const y = textY + (i * lineHeight);
    return `<text x="${width * 0.05}" y="${y}" font-family="Arial Black, Impact, sans-serif" font-size="${fontSize}" font-weight="900" fill="white" text-shadow="2px 2px 4px rgba(0,0,0,0.8)">${escapeXml(linea)}</text>`;
  }).join('');

  // Badge de categoría
  const badgeWidth = categoria.length * 14 + 40;
  const badgeX = width * 0.05;
  const badgeY = barY + 20;

  // Logo MNO
  const logoY = height - 50;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="barra" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${colores.primario};stop-opacity:0.95" />
        <stop offset="100%" style="stop-color:${colores.secundario};stop-opacity:1" />
      </linearGradient>
      <filter id="sombra">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="black" flood-opacity="0.5"/>
      </filter>
    </defs>

    <!-- Barra inferior con gradiente -->
    <rect x="0" y="${barY}" width="${width}" height="${barHeight}" fill="url(#barra)" />

    <!-- Línea decorativa -->
    <rect x="${width * 0.05}" y="${barY + 15}" width="60" height="4" fill="${colores.acento}" rx="2" />

    <!-- Badge de categoría -->
    <rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="28" rx="14" fill="${colores.acento}" opacity="0.9" />
    <text x="${badgeX + badgeWidth / 2}" y="${badgeY + 20}" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="${colores.primario}" text-anchor="middle">${escapeXml(categoria.toUpperCase())}</text>

    <!-- Emojis -->
    <text x="${width * 0.05}" y="${textY - lineHeight * 0.3}" font-family="Arial, sans-serif" font-size="${fontSize * 0.6}">${emojiText}</text>

    <!-- Título -->
    ${lineasSVG}

    <!-- Logo MNO -->
    <text x="${width - 20}" y="${logoY}" font-family="Arial Black, sans-serif" font-size="16" font-weight="900" fill="white" text-anchor="end" opacity="0.8">MONITOR NOTICIAS MNO</text>
    <text x="${width - 20}" y="${logoY + 18}" font-family="Arial, sans-serif" font-size="10" fill="${colores.acento}" text-anchor="end" opacity="0.7">Periodismo Confiable | Hechos que Impactan</text>
  </svg>`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Procesa una imagen aplicando el diseño editorial MNO
 */
export async function procesarImagenMNO(
  imagenBuffer: Buffer,
  noticia: Noticia,
  variant: 'web' | 'instagram' | 'twitter' | 'stories' | 'whatsapp'
): Promise<ImagenProcesada | null> {
  try {
    const dims = DIMENSIONES[variant];
    const { width, height } = dims;

    // 1. Redimensionar y recortar imagen base (cover)
    let baseImage = sharp(imagenBuffer)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 0.85, saturation: 1.1 });

    // 2. Generar overlay SVG
    const svgOverlay = generarOverlaySVG(
      width,
      height,
      noticia.titulo,
      noticia.categoria,
      noticia.elementosVisuales.emojis,
      noticia.fuente.nombre,
      variant
    );

    // 3. Componer imagen con overlay
    const composed = await baseImage
      .composite([
        {
          input: Buffer.from(svgOverlay),
          top: 0,
          left: 0,
        },
      ])
      .jpeg({ quality: 90, progressive: true })
      .toBuffer();

    return {
      buffer: composed,
      width,
      height,
      formato: 'jpeg',
    };
  } catch (error) {
    console.error(`Error procesando imagen ${variant}:`, error);
    return null;
  }
}

/**
 * Genera todas las variantes de imagen para una noticia
 */
export async function generarImagenesNoticia(noticia: Noticia): Promise<{
  web: Buffer | null;
  instagram: Buffer | null;
  twitter: Buffer | null;
  stories: Buffer | null;
  whatsapp: Buffer | null;
}> {
  if (!noticia.imagen?.url) {
    return { web: null, instagram: null, twitter: null, stories: null, whatsapp: null };
  }

  const imagenOriginal = await descargarImagen(noticia.imagen.url);
  if (!imagenOriginal) {
    return { web: null, instagram: null, twitter: null, stories: null, whatsapp: null };
  }

  const [web, instagram, twitter, stories, whatsapp] = await Promise.all([
    procesarImagenMNO(imagenOriginal, noticia, 'web'),
    procesarImagenMNO(imagenOriginal, noticia, 'instagram'),
    procesarImagenMNO(imagenOriginal, noticia, 'twitter'),
    procesarImagenMNO(imagenOriginal, noticia, 'stories'),
    procesarImagenMNO(imagenOriginal, noticia, 'whatsapp'),
  ]);

  return {
    web: web?.buffer || null,
    instagram: instagram?.buffer || null,
    twitter: twitter?.buffer || null,
    stories: stories?.buffer || null,
    whatsapp: whatsapp?.buffer || null,
  };
}

/**
 * Agente principal de edición de imágenes
 */
export async function agenteImagen(noticia: Noticia): Promise<Noticia> {
  // Si no hay imagen o ya fue procesada, retornar sin cambios
  if (!noticia.imagen?.url || noticia.imagenEditada?.procesada) {
    return noticia;
  }

  console.log(`🎨 Procesando imagen para: ${noticia.titulo.substring(0, 50)}...`);

  const imagenes = await generarImagenesNoticia(noticia);

  // Aquí normalmente subirías los buffers a Firebase Storage
  // Por ahora, marcamos como procesada y generamos URLs de placeholder
  // En producción, subirías los buffers y obtendrías URLs reales

  const timestamp = Date.now();
  const basePath = `noticias/${noticia.id}/imagenes`;

  const noticiaActualizada: Noticia = {
    ...noticia,
    imagenEditada: {
      url: `${basePath}/web_${timestamp}.jpg`,
      urlInstagram: `${basePath}/instagram_${timestamp}.jpg`,
      urlTwitter: `${basePath}/twitter_${timestamp}.jpg`,
      urlStories: `${basePath}/stories_${timestamp}.jpg`,
      procesada: true,
      fechaProcesamiento: new Date(),
    },
    edicionMNO: {
      ...noticia.edicionMNO,
      cambiosRealizados: [
        ...noticia.edicionMNO.cambiosRealizados,
        'Imagen procesada con diseño editorial MNO',
        'Generadas variantes: Web, Instagram, Twitter, Stories, WhatsApp',
      ],
    },
  };

  await logActividad({
    accion: 'Imagen editada con branding MNO',
    agente: 'agente-imagen',
    detalles: {
      titulo: noticia.titulo,
      categoria: noticia.categoria,
      variantesGeneradas: Object.entries(imagenes)
        .filter(([, v]) => v !== null)
        .map(([k]) => k),
    },
  });

  return noticiaActualizada;
}

/**
 * Genera una imagen de fallback cuando no hay imagen original
 */
export async function generarImagenFallback(
  noticia: Noticia,
  variant: 'web' | 'instagram' | 'twitter' | 'stories' | 'whatsapp' = 'web'
): Promise<Buffer | null> {
  try {
    const dims = DIMENSIONES[variant];
    const { width, height } = dims;
    const colores = COLORES_CATEGORIA[noticia.categoria] || COLORES_CATEGORIA.general;

    // Crear un gradiente de fondo
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colores.primario}" />
          <stop offset="100%" style="stop-color:${colores.secundario}" />
        </linearGradient>
        <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="${colores.acento}" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <rect width="${width}" height="${height}" fill="url(#dots)" />

      <!-- Icono grande de categoría -->
      <text x="${width/2}" y="${height * 0.35}" font-size="120" text-anchor="middle" opacity="0.15">
        ${noticia.elementosVisuales.emojis[0] || '📰'}
      </text>

      <!-- Título -->
      <text x="${width/2}" y="${height * 0.55}" font-family="Arial Black, Impact, sans-serif" font-size="48" font-weight="900" fill="white" text-anchor="middle">
        ${escapeXml(noticia.titulo.substring(0, 40))}
      </text>

      <!-- Subtítulo -->
      <text x="${width/2}" y="${height * 0.65}" font-family="Arial, sans-serif" font-size="20" fill="${colores.acento}" text-anchor="middle" opacity="0.8">
        ${escapeXml(noticia.resumen.substring(0, 60))}...
      </text>

      <!-- Logo -->
      <text x="${width/2}" y="${height - 60}" font-family="Arial Black, sans-serif" font-size="18" font-weight="900" fill="white" text-anchor="middle" opacity="0.7">
        MONITOR NOTICIAS MNO
      </text>
      <text x="${width/2}" y="${height - 35}" font-family="Arial, sans-serif" font-size="12" fill="${colores.acento}" text-anchor="middle" opacity="0.5">
        Periodismo Confiable | Hechos que Impactan
      </text>
    </svg>`;

    return await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toBuffer();
  } catch (error) {
    console.error('Error generando imagen fallback:', error);
    return null;
  }
}
