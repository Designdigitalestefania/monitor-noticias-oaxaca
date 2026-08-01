export interface Noticia {
  id: string;
  titulo: string;
  tituloOriginal: string;
  contenido: string;
  resumen: string;
  categoria: 'politica' | 'seguridad' | 'cultura' | 'economia' | 'general';
  origen: 'local' | 'nacional' | 'internacional';
  prioridad: 'alta' | 'media' | 'baja';
  nivelPublicacion: 'nivel1_urgente' | 'nivel2_semiautomatico' | 'nivel3_editorial';
  estado: 'recibida' | 'clasificada' | 'procesada' | 'revisada' | 'publicada';
  fuente: {
    nombre: string;
    url: string;
    tipo: 'convenio' | 'rss_local' | 'rss_nacional' | 'rss_internacional' | 'manual';
    confiable: boolean;
  };
  fechaPublicacion: Date;
  fechaDeteccion: Date;
  imagen: { url: string; creditos?: string };
  imagenEditada?: {
    url: string;
    urlInstagram: string;
    urlTwitter: string;
    urlStories: string;
    procesada: boolean;
    fechaProcesamiento: Date;
  };
  tags: string[];
  metadata: {
    vistas: number;
    compartidos: number;
    contenidoRedes?: any;
    seo?: any;
    origenEspecifico?: string;
    nivelRiesgo?: 'bajo' | 'medio' | 'alto';
    verificadoPor?: string;
  };
  esNotaServidor: boolean;
  contenidoOriginalServidor?: string;
  servidorPublico?: {
    nombre: string;
    cargo: string;
    dependencia: string;
    fechaEnvio: Date;
  };
  edicionMNO: {
    fechaEdicion: Date;
    cambiosRealizados: string[];
    version: number;
    editadoPor: 'sistema_automatico' | 'editor_humano';
  };
  elementosVisuales: {
    emojis: string[];
    ctas: string[];
    quotesDestacados: string[];
    puntosClave: string[];
  };
  impacto: {
    nivel: 'alto' | 'medio' | 'bajo';
    puntuacion: number;
    palabrasClave: string[];
  };
}

export interface Estadisticas {
  total: number;
  porOrigen: { local: number; nacional: number; internacional: number };
  porEstado: { recibida: number; clasificada: number; procesada: number; revisada: number; publicada: number };
  porCategoria: { politica: number; seguridad: number; cultura: number; economia: number; general: number };
  porPrioridad: { alta: number; media: number; baja: number };
  porNivelPublicacion: { nivel1: number; nivel2: number; nivel3: number };
  ultimasActividades: Actividad[];
  tendencias: {
    delDia: string[];
    deLaSemana: string[];
    delMes: string[];
    categoriasMasActivas: string[];
  };
}

export interface Actividad {
  id: string;
  accion: string;
  agente: string;
  timestamp: Date;
  detalles: any;
}

export interface FiltrosNoticia {
  estado?: string;
  categoria?: string;
  prioridad?: string;
  origen?: 'local' | 'nacional' | 'internacional';
  nivelPublicacion?: 'nivel1' | 'nivel2' | 'nivel3';
  limit?: number;
}
