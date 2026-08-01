"use client";
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
      <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
        {error.message || 'Ha ocurrido un error inesperado. Por favor intenta de nuevo.'}
      </p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}
