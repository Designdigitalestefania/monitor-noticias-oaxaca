import { Noticia } from '@/types';
import { FUENTES_CONFIABLES } from '@/lib/services/fuentes';
import { logActividad } from '@/lib/firebase/firestore';

export function esFuenteConfiable(nombreFuente: string): boolean {
  const todas = [
    ...FUENTES_CONFIABLES.local,
    ...FUENTES_CONFIABLES.nacional,
    ...FUENTES_CONFIABLES.internacional,
  ];
  const fuente = todas.find((f) => f.nombre === nombreFuente);
  return fuente?.confiable || false;
}

export function determinarOrigenRSS(nombreFuente: string): Noticia['origen'] {
  if (FUENTES_CONFIABLES.local.some((f) => f.nombre === nombreFuente)) return 'local';
  if (FUENTES_CONFIABLES.nacional.some((f) => f.nombre === nombreFuente)) return 'nacional';
  if (FUENTES_CONFIABLES.internacional.some((f) => f.nombre === nombreFuente)) return 'internacional';
  return 'local';
}

export async function agenteRSSConfiable(noticia: Noticia): Promise<Noticia> {
  const confiable = esFuenteConfiable(noticia.fuente.nombre);
  const origen = determinarOrigenRSS(noticia.fuente.nombre);

  const procesada: Noticia = {
    ...noticia,
    origen,
    fuente: {
      ...noticia.fuente,
      confiable,
      tipo: origen === 'local' ? 'rss_local' : origen === 'nacional' ? 'rss_nacional' : 'rss_internacional',
    },
    edicionMNO: {
      ...noticia.edicionMNO,
      cambiosRealizados: [
        ...noticia.edicionMNO.cambiosRealizados,
        `Fuente RSS verificada: ${confiable ? 'Confiable' : 'No confiable'}`,
      ],
    },
  };

  await logActividad({
    accion: 'Noticia RSS procesada',
    agente: 'agente-rss-confiable',
    detalles: {
      titulo: noticia.titulo,
      fuente: noticia.fuente.nombre,
      confiable,
      origen,
    },
  });

  return procesada;
}
