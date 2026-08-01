"use client";
import { useState, useEffect, useCallback } from 'react';
import { Noticia, FiltrosNoticia } from '@/types';

export function useNoticias(filtros?: FiltrosNoticia) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filtros?.categoria) params.set('categoria', filtros.categoria);
      if (filtros?.estado) params.set('estado', filtros.estado);
      if (filtros?.prioridad) params.set('prioridad', filtros.prioridad);
      if (filtros?.origen) params.set('origen', filtros.origen);
      if (filtros?.limit) params.set('limit', filtros.limit.toString());

      const res = await fetch(`/api/noticias?${params}`);
      const data = await res.json();
      setNoticias(data.noticias || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filtros)]);

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  return { noticias, loading, error, refetch: fetchNoticias };
}
