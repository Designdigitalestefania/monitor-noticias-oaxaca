import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { noticia, plataforma } = body;

    let contenido = '';
    switch (plataforma) {
      case 'facebook':
        contenido = `${noticia.titulo}

${noticia.resumen}

#${noticia.categoria} #Oaxaca`;
        break;
      case 'twitter':
        contenido = `${noticia.titulo.substring(0, 100)}... #Oaxaca`;
        break;
      case 'instagram':
        contenido = `${noticia.titulo}

${noticia.resumen}

.#${noticia.categoria}`;
        break;
      case 'whatsapp':
        contenido = `*${noticia.titulo}*

${noticia.resumen}`;
        break;
      default:
        contenido = noticia.resumen;
    }

    return NextResponse.json({ success: true, contenido, plataforma });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
