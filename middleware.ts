import { NextResponse } from 'next/server';
import type { NextRequest };

export function middleware(request: NextRequest) {
  // Proteger rutas de API del pipeline
  if (request.nextUrl.pathname.startsWith('/api/pipeline')) {
    const secret = request.headers.get('x-pipeline-secret');
    if (secret !== process.env.PIPELINE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/pipeline/:path*'],
};
