import { NextRequest, NextResponse } from 'next/server';
import { getNoticias } from '@/lib/firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const noticias = await getNoticias({ limit: 100 });

    const tagCount: Record<string, number> = {};
    const categoriaCount: Record<string, number> = {};

    for (const n of noticias) {
      categoriaCount[n.categoria] = (categoriaCount[n.categoria] || 0) + 1;
      for (const tag of n.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    }

    const tendencias = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    return NextResponse.json({ tendencias, categorias: categoriaCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
