import { NextRequest, NextResponse } from 'next/server';
import { FUENTES_CONFIABLES } from '@/lib/services/fuentes';
import { procesarFuenteRSS } from '@/lib/services/rss';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fuente, url, confiable } = body;

    const noticias = await procesarFuenteRSS(fuente, url, confiable);

    return NextResponse.json({ 
      success: true, 
      fuente, 
      noticiasEncontradas: noticias.length,
      noticias 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ fuentes: FUENTES_CONFIABLES });
}
