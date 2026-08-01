"use client";
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useNoticias } from '@/hooks/useNoticias';
import { NewsList } from '@/components/news/NewsList';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { SectionTitle } from '@/components/shared/SectionTitle';

export default function BuscarPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { noticias, loading } = useNoticias({ limit: 50 });

  const resultados = debouncedQuery
    ? noticias.filter(
        (n) =>
          n.titulo.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          n.contenido.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          n.tags.some((t) => t.toLowerCase().includes(debouncedQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionTitle title="Buscar noticias" />

      <div className="max-w-xl mb-8">
        <Input
          placeholder="Buscar por título, contenido o etiqueta..."
          value={query}
          onChange={setQuery}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : debouncedQuery ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} para "{debouncedQuery}"
          </p>
          <NewsList noticias={resultados} columns={3} />
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Escribe algo para buscar noticias</p>
        </div>
      )}
    </div>
  );
}
