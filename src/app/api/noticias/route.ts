import { NextRequest, NextResponse } from 'next/server';
import { getNoticias, createNoticia } from '@/lib/firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filtros = {
      categoria: searchParams.get('categoria') || undefined,
      estado: searchParams.get('estado') || undefined,
      prioridad: searchParams.get('prioridad') || undefined,
      origen: searchParams.get('origen') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
    };

    const noticias = await getNoticias(filtros);
    return NextResponse.json({ noticias });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = await createNoticia(body);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
