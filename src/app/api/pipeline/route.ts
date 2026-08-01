import { NextRequest, NextResponse } from 'next/server';
import { agenteRecepcion } from '@/lib/agents/agente-recepcion';
import { agenteClasificacion } from '@/lib/agents/agente-clasificacion';
import { agenteUrgente } from '@/lib/agents/agente-urgente';
import { agenteConvenios } from '@/lib/agents/agente-convenios';
import { agenteRSSConfiable } from '@/lib/agents/agente-rss-confiable';
import { agenteEditorial } from '@/lib/agents/agente-editorial';
import { agenteDistribucion } from '@/lib/agents/agente-distribucion';
import { createNoticia } from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-pipeline-secret');
    if (secret !== process.env.PIPELINE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    let noticia = await agenteRecepcion(body);
    noticia = await agenteRSSConfiable(noticia);
    noticia = await agenteClasificacion(noticia);
    noticia = await agenteUrgente(noticia);
    noticia = await agenteConvenios(noticia);
    noticia = await agenteEditorial(noticia);
    noticia = await agenteDistribucion(noticia);

    const id = await createNoticia(noticia);

    return NextResponse.json({ success: true, id, noticia });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
