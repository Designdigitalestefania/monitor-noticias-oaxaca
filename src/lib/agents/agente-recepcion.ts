import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

export async function agenteRecepcion(datos: Partial<Noticia>): Promise<Noticia> {
  const noticia: Noticia = {
    id: '',
    titulo: datos.titulo || 'Sin título',
    tituloOriginal: datos.tituloOriginal || datos.titulo || 'Sin título',
    contenido: datos.contenido || '',
    resumen: datos.resumen || '',
    categoria: datos.categoria || 'general',
    origen: datos.origen || 'local',
    prioridad: datos.prioridad || 'media',
    nivelPublicacion: datos.nivelPublicacion || 'nivel3_editorial',
    estado: 'recibida',
    fuente: datos.fuente || {
      nombre: 'Desconocida',
      url: '',
      tipo: 'manual',
      confiable: false,
    },
    fechaPublicacion: new Date(),
    fechaDeteccion: new Date(),
    imagen: datos.imagen || { url: '' },
    tags: datos.tags || [],
    metadata: {
      vistas: 0,
      compartidos: 0,
      ...datos.metadata,
    },
    esNotaServidor: datos.esNotaServidor || false,
    contenidoOriginalServidor: datos.contenidoOriginalServidor,
    servidorPublico: datos.servidorPublico,
    edicionMNO: {
      fechaEdicion: new Date(),
      cambiosRealizados: [],
      version: 1,
      editadoPor: 'sistema_automatico',
    },
    elementosVisuales: {
      emojis: [],
      ctas: [],
      quotesDestacados: [],
      puntosClave: [],
    },
    impacto: {
      nivel: 'medio',
      puntuacion: 50,
      palabrasClave: [],
    },
  };

  await logActividad({
    accion: 'Noticia recibida',
    agente: 'agente-recepcion',
    detalles: { titulo: noticia.titulo, fuente: noticia.fuente.nombre },
  });

  return noticia;
}
