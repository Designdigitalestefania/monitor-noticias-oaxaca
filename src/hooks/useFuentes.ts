"use client";
import { useState, useEffect } from 'react';

export function useFuentes() {
  const [fuentes, setFuentes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFuentes() {
      try {
        const res = await fetch('/api/monitorear');
        const data = await res.json();
        setFuentes(data.fuentes);
      } catch {
        setFuentes(null);
      } finally {
        setLoading(false);
      }
    }
    fetchFuentes();
  }, []);

  return { fuentes, loading };
}
