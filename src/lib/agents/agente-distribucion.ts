import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

interface ContenidoRedes {
  facebook: string;
  twitter: string;
  instagram: string;
  whatsapp: string;
}

interface ImagenRedes {
  facebook: string;
  twitter: string;
  instagram: string;
  stories: string;
  whatsapp: string;
}

function generarContenidoFacebook(noticia: Noticia): string {
  const emojis = noticia.elementosVisuales.emojis.slice(0, 2).join(' ');
  const cta = noticia.elementosVisuales.ctas[0] || 'Síguenos para más';
  return `${emojis} ${noticia.titulo}

${noticia.resumen}

📰 Monitor Noticias MNO - Periodismo Confiable | Hechos que Impactan

👉 ${cta}

#${noticia.categoria} #Oaxaca #Noticias #MonitorNoticiasMNO`;
}

function generarContenidoTwitter(noticia: Noticia): string {
  const emojis = noticia.elementosVisuales.emojis[0] || '';
  const texto = `${emojis} ${noticia.titulo}

${noticia.resumen.substring(0, 120)}...

🔗 Lee más: ${noticia.fuente.url || 'monitornoticiasmno.com'}

#${noticia.categoria} #Oaxaca #MNO`;
  return texto.length > 280 ? texto.substring(0, 277) + '...' : texto;
}

function generarContenidoInstagram(noticia: Noticia): string {
  const emojis = noticia.elementosVisuales.emojis.join(' ');
  const cta = noticia.elementosVisuales.ctas[0] || 'Hechos que impactan';
  return `${emojis}

${noticia.titulo}

${noticia.resumen}

✨ ${cta}

🔗 Enlace en bio

.
#${noticia.categoria} 
#Oaxaca 
#MonitorNoticiasMNO 
#PeriodismoConfiable 
#HechosQueImpactan 
#NoticiasOaxaca 
#OaxacaMexico`;
}

function generarContenidoWhatsApp(noticia: Noticia): string {
  const emojis = noticia.elementosVisuales.emojis.slice(0, 2).join(' ');
  return `🚨 *${noticia.titulo}* 🚨

${emojis} ${noticia.resumen}

📰 *Monitor Noticias MNO*
Periodismo Confiable | Hechos que Impactan

👉 ${noticia.fuente.url || 'Síguenos para más información'}

_Compártelo para mantener informada a tu comunidad_`;
}

function obtenerImagenesRedes(noticia: Noticia): ImagenRedes {
  const base = noticia.imagenEditada;
  const original = noticia.imagen?.url || '';

  return {
    facebook: base?.url || original,
    twitter: base?.urlTwitter || original,
    instagram: base?.urlInstagram || original,
    stories: base?.urlStories || original,
    whatsapp: base?.url || original,
  };
}

export async function agenteDistribucion(noticia: Noticia): Promise<Noticia> {
  const contenidoRedes: ContenidoRedes = {
    facebook: generarContenidoFacebook(noticia),
    twitter: generarContenidoTwitter(noticia),
    instagram: generarContenidoInstagram(noticia),
    whatsapp: generarContenidoWhatsApp(noticia),
  };

  const imagenesRedes = obtenerImagenesRedes(noticia);

  const distribuida: Noticia = {
    ...noticia,
    estado: 'publicada',
    metadata: {
      ...noticia.metadata,
      contenidoRedes: {
        ...contenidoRedes,
        imagenes: imagenesRedes,
      },
    },
    edicionMNO: {
      ...noticia.edicionMNO,
      cambiosRealizados: [
        ...noticia.edicionMNO.cambiosRealizados,
        'Contenido generado para redes sociales',
        'Imágenes optimizadas para cada plataforma',
        'Listo para distribución multiplataforma',
      ],
    },
  };

  await logActividad({
    accion: 'Noticia lista para distribución',
    agente: 'agente-distribucion',
    detalles: {
      titulo: noticia.titulo,
      plataformas: ['Web', 'Facebook', 'Twitter', 'Instagram', 'WhatsApp'],
      imagenEditada: noticia.imagenEditada?.procesada || false,
    },
  });

  return distribuida;
}
