"use client";
import { Select } from '@/components/ui/Select';

interface NewsFilterProps {
  categoria: string;
  prioridad: string;
  origen: string;
  onCategoriaChange: (v: string) => void;
  onPrioridadChange: (v: string) => void;
  onOrigenChange: (v: string) => void;
}

export function NewsFilter({
  categoria,
  prioridad,
  origen,
  onCategoriaChange,
  onPrioridadChange,
  onOrigenChange,
}: NewsFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Select
        value={categoria}
        onChange={onCategoriaChange}
        options={[
          { value: '', label: 'Todas las categorías' },
          { value: 'politica', label: 'Política' },
          { value: 'seguridad', label: 'Seguridad' },
          { value: 'cultura', label: 'Cultura' },
          { value: 'economia', label: 'Economía' },
          { value: 'general', label: 'General' },
        ]}
        className="w-48"
      />
      <Select
        value={prioridad}
        onChange={onPrioridadChange}
        options={[
          { value: '', label: 'Todas las prioridades' },
          { value: 'alta', label: 'Alta' },
          { value: 'media', label: 'Media' },
          { value: 'baja', label: 'Baja' },
        ]}
        className="w-48"
      />
      <Select
        value={origen}
        onChange={onOrigenChange}
        options={[
          { value: '', label: 'Todos los orígenes' },
          { value: 'local', label: 'Local' },
          { value: 'nacional', label: 'Nacional' },
          { value: 'internacional', label: 'Internacional' },
        ]}
        className="w-48"
      />
    </div>
  );
}
