import { NextRequest, NextResponse } from 'next/server';
import { agenteDistribucion } from '@/lib/agents/agente-distribucion';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const noticiaDistribuida = await agenteDistribucion(body);
    return NextResponse.json({ success: true, noticia: noticiaDistribuida });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
