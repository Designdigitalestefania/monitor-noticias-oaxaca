"use client";
import { useNoticias } from '@/hooks/useNoticias';
import { useEstadisticas } from '@/hooks/useEstadisticas';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { PipelineStatus } from '@/components/dashboard/PipelineStatus';
import { AgentStatus } from '@/components/dashboard/AgentStatus';
import { ChartPlaceholder } from '@/components/dashboard/ChartPlaceholder';
import { Spinner } from '@/components/ui/Spinner';
import { SectionTitle } from '@/components/shared/SectionTitle';

const AGENTS = [
  { name: 'Recepción', file: 'agente-recepcion.ts', status: 'active' as const },
  { name: 'Clasificación', file: 'agente-clasificacion.ts', status: 'active' as const },
  { name: 'Urgencia', file: 'agente-urgente.ts', status: 'active' as const },
  { name: 'Convenios', file: 'agente-convenios.ts', status: 'active' as const },
  { name: 'RSS Confiable', file: 'agente-rss-confiable.ts', status: 'active' as const },
  { name: 'Editorial', file: 'agente-editorial.ts', status: 'active' as const },
  { name: '🎨 Imagen MNO', file: 'agente-imagen.ts', status: 'active' as const },
  { name: 'Distribución', file: 'agente-distribucion.ts', status: 'active' as const },
  { name: 'Análisis', file: 'agente-analisis.ts', status: 'active' as const },
];

export default function DashboardPage() {
  const { noticias, loading: loadingNoticias } = useNoticias({ limit: 100 });
  const { estadisticas, loading: loadingStats } = useEstadisticas();

  const total = noticias.length;
  const urgentes = noticias.filter((n) => n.prioridad === 'alta').length;
  const publicadas = noticias.filter((n) => n.estado === 'publicada').length;
  const imagenesProcesadas = noticias.filter((n) => n.imagenEditada?.procesada).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionTitle title="Dashboard" subtitle="Panel de control del Centro Inteligente de Información" />

      {loadingNoticias || loadingStats ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="Total Noticias" value={total} change="+12%" changeType="positive" icon="📰" />
            <StatsCard title="Urgentes" value={urgentes} change="+3" changeType="negative" icon="🚨" />
            <StatsCard title="Publicadas" value={publicadas} change="+8%" changeType="positive" icon="✅" />
            <StatsCard title="🎨 Imágenes MNO" value={imagenesProcesadas} change="+15%" changeType="positive" icon="🎨" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ChartPlaceholder title="Noticias por categoría" />
              <ChartPlaceholder title="Tendencias de la semana" />
            </div>
            <div className="space-y-6">
              <PipelineStatus status="idle" lastRun="Hace 10 min" nextRun="En 5 min" />
              <AgentStatus agents={AGENTS} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Actividad reciente</h3>
            <ActivityFeed actividades={estadisticas?.ultimasActividades || []} />
          </div>
        </div>
      )}
    </div>
  );
}
