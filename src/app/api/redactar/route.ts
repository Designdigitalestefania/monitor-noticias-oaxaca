import { NextRequest, NextResponse } from 'next/server';
import { agenteEditorial } from '@/lib/agents/agente-editorial';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const noticiaEditada = await agenteEditorial(body);
    return NextResponse.json({ success: true, noticia: noticiaEditada });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
