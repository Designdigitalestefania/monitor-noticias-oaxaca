import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

const PALABRAS_CLAVE_CATEGORIA: Record<string, string[]> = {
  politica: ['gobierno', 'congreso', 'diputado', 'senador', 'presidente', 'partido', 'elección', 'campaña', 'voto', 'ley', 'decreto', 'política'],
  seguridad: ['policía', 'delito', 'violencia', 'homicidio', 'secuestro', 'robo', 'narcotráfico', 'arma', 'detenido', 'fiscalía', 'investigación', 'alerta'],
  cultura: ['arte', 'museo', 'guelaguetza', 'tradición', 'fiesta', 'danza', 'música', 'literatura', 'cine', 'teatro', 'exposición', 'patrimonio'],
  economia: ['inversión', 'empleo', 'turismo', 'comercio', 'empresa', 'pib', 'inflación', 'precio', 'dólar', 'peso', 'crédito', 'exportación'],
};

const PALABRAS_CLAVE_URGENCIA: string[] = [
  'urgente', 'alerta', 'emergencia', 'sismo', 'terremoto', 'huracán', 'inundación',
  'incendio', 'accidente', 'explosión', 'tiroteo', 'manifestación', 'bloqueo',
  'muerto', 'fallecido', 'víctima', 'rescate', 'evacuación'
];

export function clasificarCategoria(texto: string): Noticia['categoria'] {
  const lower = texto.toLowerCase();
  let maxScore = 0;
  let categoria: Noticia['categoria'] = 'general';

  for (const [cat, palabras] of Object.entries(PALABRAS_CLAVE_CATEGORIA)) {
    const score = palabras.filter((p) => lower.includes(p)).length;
    if (score > maxScore) {
      maxScore = score;
      categoria = cat as Noticia['categoria'];
    }
  }

  return categoria;
}

export function detectarUrgencia(texto: string): boolean {
  const lower = texto.toLowerCase();
  return PALABRAS_CLAVE_URGENCIA.some((p) => lower.includes(p));
}

export function determinarPrioridad(noticia: Noticia): Noticia['prioridad'] {
  if (noticia.esNotaServidor && detectarUrgencia(noticia.contenido)) return 'alta';
  if (noticia.fuente.tipo === 'convenio') return 'alta';
  if (detectarUrgencia(noticia.contenido)) return 'alta';
  if (noticia.fuente.confiable) return 'media';
  return 'baja';
}

export function determinarNivelPublicacion(noticia: Noticia): Noticia['nivelPublicacion'] {
  if (noticia.prioridad === 'alta' && noticia.fuente.confiable) return 'nivel1_urgente';
  if (noticia.fuente.confiable) return 'nivel2_semiautomatico';
  return 'nivel3_editorial';
}

export async function agenteClasificacion(noticia: Noticia): Promise<Noticia> {
  const categoria = clasificarCategoria(noticia.titulo + ' ' + noticia.contenido);
  const prioridad = determinarPrioridad(noticia);
  const nivelPublicacion = determinarNivelPublicacion({ ...noticia, categoria, prioridad });

  const clasificada: Noticia = {
    ...noticia,
    categoria,
    prioridad,
    nivelPublicacion,
    estado: 'clasificada',
    impacto: {
      ...noticia.impacto,
      nivel: prioridad === 'alta' ? 'alto' : prioridad === 'media' ? 'medio' : 'bajo',
      puntuacion: prioridad === 'alta' ? 85 : prioridad === 'media' ? 60 : 30,
    },
  };

  await logActividad({
    accion: 'Noticia clasificada',
    agente: 'agente-clasificacion',
    detalles: {
      titulo: noticia.titulo,
      categoria,
      prioridad,
      nivelPublicacion,
    },
  });

  return clasificada;
}
