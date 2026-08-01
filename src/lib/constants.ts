export const APP_NAME = 'Monitor Noticias MNO';
export const APP_TAGLINE = 'Periodismo Confiable | Hechos que Impactan';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://monitornoticiasmno.com';

export const CATEGORIAS = [
  { slug: 'politica', label: 'Política', color: 'bg-blue-100 text-blue-700', emoji: '🏛️' },
  { slug: 'seguridad', label: 'Seguridad', color: 'bg-red-100 text-red-700', emoji: '🚨' },
  { slug: 'cultura', label: 'Cultura', color: 'bg-purple-100 text-purple-700', emoji: '🎭' },
  { slug: 'economia', label: 'Economía', color: 'bg-green-100 text-green-700', emoji: '💰' },
  { slug: 'general', label: 'General', color: 'bg-gray-100 text-gray-700', emoji: '📰' },
] as const;

export const PRIORIDADES = [
  { value: 'alta', label: 'Alta', color: 'text-red-600' },
  { value: 'media', label: 'Media', color: 'text-yellow-600' },
  { value: 'baja', label: 'Baja', color: 'text-gray-500' },
] as const;

export const NIVELES_PUBLICACION = [
  { value: 'nivel1_urgente', label: 'Nivel 1 - Urgente', description: 'Publicación automática inmediata' },
  { value: 'nivel2_semiautomatico', label: 'Nivel 2 - Semi-automático', description: 'Revisión rápida antes de publicar' },
  { value: 'nivel3_editorial', label: 'Nivel 3 - Editorial', description: 'Revisión completa por editor humano' },
] as const;

export const ESTADOS_NOTICIA = [
  'recibida',
  'clasificada',
  'procesada',
  'revisada',
  'publicada',
] as const;

export const PLATAFORMAS_REDES = [
  { id: 'web', nombre: 'Web', icono: '🌐' },
  { id: 'facebook', nombre: 'Facebook', icono: '👍' },
  { id: 'twitter', nombre: 'Twitter/X', icono: '🐦' },
  { id: 'instagram', nombre: 'Instagram', icono: '📸' },
  { id: 'whatsapp', nombre: 'WhatsApp', icono: '💬' },
] as const;

export const RSS_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutos en ms
export const MAX_NOTICIAS_POR_FUENTE = 5;
export const RESUMEN_MAX_CHARS = 200;
