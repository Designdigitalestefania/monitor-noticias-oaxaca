import { Suspense } from 'react';
import { Noticia } from '@/types';
import { NewsList } from '@/components/news/NewsList';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { capitalize } from '@/lib/utils/formatters';
import Loading from '../loading';

async function getNoticiasPorCategoria(categoria: string): Promise<Noticia[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/noticias?categoria=${categoria}&limit=30`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data.noticias || [];
  } catch {
    return [];
  }
}

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  const noticias = await getNoticiasPorCategoria(params.slug);

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          title={capitalize(params.slug)}
          subtitle={`${noticias.length} noticias en esta categoría`}
        />
        <NewsList noticias={noticias} columns={3} />
      </div>
    </Suspense>
  );
}
