import { Noticia } from '@/types';
import { SERVIDORES_CONVENIO } from '@/lib/services/fuentes';
import { logActividad } from '@/lib/firebase/firestore';

export function validarServidorPublico(email: string): boolean {
  return SERVIDORES_CONVENIO.some((s) => s.email === email);
}

export function obtenerServidorPorEmail(email: string) {
  return SERVIDORES_CONVENIO.find((s) => s.email === email) || null;
}

export async function agenteConvenios(noticia: Noticia): Promise<Noticia> {
  if (!noticia.esNotaServidor) {
    return noticia;
  }

  const servidor = noticia.servidorPublico;
  if (!servidor) {
    return noticia;
  }

  const procesada: Noticia = {
    ...noticia,
    prioridad: 'alta',
    nivelPublicacion: 'nivel1_urgente',
    estado: 'procesada',
    edicionMNO: {
      ...noticia.edicionMNO,
      cambiosRealizados: [
        ...noticia.edicionMNO.cambiosRealizados,
        `Nota validada de ${servidor.dependencia}`,
      ],
    },
    metadata: {
      ...noticia.metadata,
      origenEspecifico: servidor.dependencia,
      verificadoPor: servidor.nombre,
    },
  };

  await logActividad({
    accion: 'Nota de servidor público procesada',
    agente: 'agente-convenios',
    detalles: {
      titulo: noticia.titulo,
      dependencia: servidor.dependencia,
      servidor: servidor.nombre,
    },
  });

  return procesada;
}
