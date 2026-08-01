"use client";
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface PipelineStatusProps {
  status: 'running' | 'idle' | 'error';
  lastRun?: string;
  nextRun?: string;
}

export function PipelineStatus({ status, lastRun, nextRun }: PipelineStatusProps) {
  const statusConfig = {
    running: { label: 'Ejecutando', variant: 'info' as const },
    idle: { label: 'En espera', variant: 'success' as const },
    error: { label: 'Error', variant: 'danger' as const },
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Estado del Pipeline</h3>
        <Badge variant={statusConfig[status].variant}>{statusConfig[status].label}</Badge>
      </div>
      <div className="space-y-2 text-sm">
        {lastRun && (
          <div className="flex justify-between text-gray-600">
            <span>Última ejecución:</span>
            <span className="font-medium">{lastRun}</span>
          </div>
        )}
        {nextRun && (
          <div className="flex justify-between text-gray-600">
            <span>Próxima ejecución:</span>
            <span className="font-medium">{nextRun}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
