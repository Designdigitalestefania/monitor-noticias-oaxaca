"use client";
import { useState } from 'react';
import { useNoticias } from '@/hooks/useNoticias';
import { NewsList } from '@/components/news/NewsList';
import { NewsFilter } from '@/components/news/NewsFilter';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Spinner } from '@/components/ui/Spinner';
import { Pagination } from '@/components/shared/Pagination';

export default function NoticiasPage() {
  const [categoria, setCategoria] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [origen, setOrigen] = useState('');
  const [page, setPage] = useState(1);

  const { noticias, loading } = useNoticias({
    categoria: categoria || undefined,
    prioridad: prioridad || undefined,
    origen: origen || undefined,
    limit: 12,
  });

  const totalPages = Math.ceil(noticias.length / 12) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionTitle
        title="Todas las noticias"
        subtitle="Explora el archivo completo de noticias"
      />

      <div className="mb-6">
        <NewsFilter
          categoria={categoria}
          prioridad={prioridad}
          origen={origen}
          onCategoriaChange={setCategoria}
          onPrioridadChange={setPrioridad}
          onOrigenChange={setOrigen}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <NewsList noticias={noticias} columns={3} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
