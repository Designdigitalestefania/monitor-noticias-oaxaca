import { NextRequest, NextResponse } from 'next/server';
import { agenteAnalisis } from '@/lib/agents/agente-analisis';

export async function GET(request: NextRequest) {
  try {
    const estadisticas = await agenteAnalisis();
    return NextResponse.json({ estadisticas });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
