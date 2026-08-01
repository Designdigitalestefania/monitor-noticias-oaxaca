import { Noticia, Estadisticas, Actividad } from '@/types';
import { logActividad, getNoticias } from '@/lib/firebase/firestore';

export async function agenteAnalisis(): Promise<Partial<Estadisticas>> {
  const noticias = await getNoticias();

  const total = noticias.length;
  const porOrigen = { local: 0, nacional: 0, internacional: 0 };
  const porEstado = { recibida: 0, clasificada: 0, procesada: 0, revisada: 0, publicada: 0 };
  const porCategoria = { politica: 0, seguridad: 0, cultura: 0, economia: 0, general: 0 };
  const porPrioridad = { alta: 0, media: 0, baja: 0 };
  const porNivelPublicacion = { nivel1: 0, nivel2: 0, nivel3: 0 };

  const tagCount: Record<string, number> = {};

  for (const n of noticias) {
    porOrigen[n.origen] = (porOrigen[n.origen] || 0) + 1;
    porEstado[n.estado] = (porEstado[n.estado] || 0) + 1;
    porCategoria[n.categoria] = (porCategoria[n.categoria] || 0) + 1;
    porPrioridad[n.prioridad] = (porPrioridad[n.prioridad] || 0) + 1;

    const nivel = n.nivelPublicacion === 'nivel1_urgente' ? 'nivel1' :
                    n.nivelPublicacion === 'nivel2_semiautomatico' ? 'nivel2' : 'nivel3';
    porNivelPublicacion[nivel] = (porNivelPublicacion[nivel] || 0) + 1;

    for (const tag of n.tags) {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
  }

  const tendenciasDelDia = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  const categoriasMasActivas = Object.entries(porCategoria)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat]) => cat);

  const estadisticas: Partial<Estadisticas> = {
    total,
    porOrigen,
    porEstado,
    porCategoria,
    porPrioridad,
    porNivelPublicacion,
    tendencias: {
      delDia: tendenciasDelDia,
      deLaSemana: tendenciasDelDia,
      delMes: tendenciasDelDia,
      categoriasMasActivas,
    },
  };

  await logActividad({
    accion: 'Análisis de tendencias completado',
    agente: 'agente-analisis',
    detalles: {
      totalNoticias: total,
      tendencias: tendenciasDelDia,
    },
  });

  return estadisticas;
}
