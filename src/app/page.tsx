import { Suspense } from 'react';
import { Noticia } from '@/types';
import { FeaturedNews } from '@/components/news/FeaturedNews';
import { NewsList } from '@/components/news/NewsList';
import { BreakingBanner } from '@/components/news/BreakingBanner';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Nav } from '@/components/layout/Nav';
import Loading from './loading';

async function getNoticias(): Promise<Noticia[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/noticias?limit=20`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.noticias || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const noticias = await getNoticias();
  const urgentes = noticias.filter((n) => n.prioridad === 'alta');
  const destacadas = noticias.slice(0, 4);
  const recientes = noticias.slice(4, 10);

  return (
    <div>
      {urgentes.length > 0 && <BreakingBanner noticia={urgentes[0]} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Nav />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
        <Suspense fallback={<Loading />}>
          <section>
            <SectionTitle title="Destacadas" subtitle="Las noticias más relevantes del momento" />
            <FeaturedNews noticias={destacadas} />
          </section>
        </Suspense>

        <Suspense fallback={<Loading />}>
          <section>
            <SectionTitle title="Más noticias" />
            <NewsList noticias={recientes} columns={3} />
          </section>
        </Suspense>
      </div>
    </div>
  );
}
