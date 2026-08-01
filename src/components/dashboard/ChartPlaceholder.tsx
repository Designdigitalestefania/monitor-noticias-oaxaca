"use client";
import { Card } from '@/components/ui/Card';

interface ChartPlaceholderProps {
  title: string;
  children?: React.ReactNode;
}

export function ChartPlaceholder({ title, children }: ChartPlaceholderProps) {
  return (
    <Card className="h-64">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
        {children || <span className="text-gray-400 text-sm">Gráfico en construcción</span>}
      </div>
    </Card>
  );
}
