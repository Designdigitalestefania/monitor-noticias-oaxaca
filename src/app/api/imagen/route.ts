import { NextRequest, NextResponse } from 'next/server';
import { agenteImagen, generarImagenesNoticia, descargarImagen, generarImagenFallback } from '@/lib/agents/agente-imagen';
import { updateNoticia } from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { noticia, action = 'procesar' } = body;

    if (action === 'procesar') {
      const noticiaProcesada = await agenteImagen(noticia);

      if (noticia.id) {
        await updateNoticia(noticia.id, {
          imagenEditada: noticiaProcesada.imagenEditada,
          edicionMNO: noticiaProcesada.edicionMNO,
        });
      }

      return NextResponse.json({ 
        success: true, 
        noticia: noticiaProcesada,
        imagenEditada: noticiaProcesada.imagenEditada,
      });
    }

    if (action === 'preview') {
      const imagenes = await generarImagenesNoticia(noticia);

      const previews: Record<string, string> = {};
      for (const [key, buffer] of Object.entries(imagenes)) {
        if (buffer) {
          previews[key] = `data:image/jpeg;base64,${buffer.toString('base64')}`;
        }
      }

      return NextResponse.json({ success: true, previews });
    }

    if (action === 'fallback') {
      const buffer = await generarImagenFallback(noticia, body.variant || 'web');
      if (!buffer) {
        return NextResponse.json({ error: 'No se pudo generar imagen fallback' }, { status: 500 });
      }

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error: any) {
    console.error('Error en API de imagen:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
    }

    const buffer = await descargarImagen(url);
    if (!buffer) {
      return NextResponse.json({ error: 'No se pudo descargar la imagen' }, { status: 404 });
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
