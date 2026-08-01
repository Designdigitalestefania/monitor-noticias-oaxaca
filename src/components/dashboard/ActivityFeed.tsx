"use client";
import { Actividad } from '@/types';
import { formatTiempoRelativo } from '@/lib/utils/formatters';

interface ActivityFeedProps {
  actividades: Actividad[];
}

const agenteIcons: Record<string, string> = {
  'agente-recepcion': '📥',
  'agente-clasificacion': '🏷️',
  'agente-urgente': '🚨',
  'agente-convenios': '🤝',
  'agente-rss-confiable': '📡',
  'agente-editorial': '✏️',
  'agente-distribucion': '🚀',
  'agente-analisis': '📊',
};

export function ActivityFeed({ actividades }: ActivityFeedProps) {
  if (actividades.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        No hay actividades recientes
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {actividades.map((act) => (
        <div key={act.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-lg flex-shrink-0">{agenteIcons[act.agente] || '🤖'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{act.accion}</p>
            <p className="text-xs text-gray-500 mt-0.5">{act.agente}</p>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {formatTiempoRelativo(act.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
}
