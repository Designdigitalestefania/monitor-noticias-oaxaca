"use client";
import { useState, useEffect } from 'react';
import { Estadisticas } from '@/types';

export function useEstadisticas() {
  const [estadisticas, setEstadisticas] = useState<Partial<Estadisticas> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEstadisticas() {
      try {
        const res = await fetch('/api/estadisticas');
        const data = await res.json();
        setEstadisticas(data.estadisticas);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEstadisticas();
  }, []);

  return { estadisticas, loading, error };
}
