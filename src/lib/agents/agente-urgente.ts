import { Noticia } from '@/types';
import { logActividad, createNoticia, updateNoticia } from '@/lib/firebase/firestore';

export async function agenteUrgente(noticia: Noticia): Promise<Noticia> {
  if (noticia.nivelPublicacion !== 'nivel1_urgente') {
    return noticia;
  }

  const urgente: Noticia = {
    ...noticia,
    estado: 'procesada',
    edicionMNO: {
      ...noticia.edicionMNO,
      cambiosRealizados: [...noticia.edicionMNO.cambiosRealizados, 'Procesada como alerta de urgencia'],
    },
    elementosVisuales: {
      ...noticia.elementosVisuales,
      emojis: ['🚨', '⚠️', '🔴'],
      ctas: ['Mantente informado', 'Comparte esta alerta', 'Síguenos para más'],
    },
  };

  await logActividad({
    accion: 'Alerta de urgencia procesada',
    agente: 'agente-urgente',
    detalles: {
      titulo: noticia.titulo,
      categoria: noticia.categoria,
      nivelRiesgo: noticia.metadata?.nivelRiesgo || 'alto',
    },
  });

  return urgente;
}
