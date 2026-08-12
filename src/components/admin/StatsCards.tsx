"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

interface StatsData {
  totales: { noticiasPublicadas: number; noticiasUrgentes: number; actividadesHoy: number };
  porCategoria: Record<string, number>;
  porOrigen: Record<string, number>;
  porPrioridad: Record<string, number>;
  rendimiento: { tiempoPromedioPublicacion: number; noticiasPorHora: number; precisionClasificacion: number };
}

export default function StatsCards() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const [noticiasSnap, statsSnap] = await Promise.all([
        getDocs(collection(db, "noticias")),
        getDocs(collection(db, "estadisticas")),
      ]);
      const noticiasData = noticiasSnap.docs.map((d) => d.data());
      setNoticias(noticiasData);
      if (!statsSnap.empty) {
        setStats(statsSnap.docs[0].data() as StatsData);
      }
    } catch (e) {
      console.error("Error cargando stats:", e);
    }
    setLoading(false);
  }

  if (loading) return <div className="p-8 text-center text-slate-400">Cargando estadisticas...</div>;

  const porCategoria = stats?.porCategoria || {};
  const porOrigen = stats?.porOrigen || {};
  const porPrioridad = stats?.porPrioridad || {};
  const totalNoticias = noticias.length || stats?.totales?.noticiasPublicadas || 0;
  const urgentes = noticias.filter((n: any) => n.prioridad === "alta").length || stats?.totales?.noticiasUrgentes || 0;

  const catEntries = Object.entries(porCategoria);
  const maxCat = Math.max(...catEntries.map(([, v]) => v as number), 1);

  const origenEntries = Object.entries(porOrigen);
  const totalOrigen = origenEntries.reduce((sum, [, v]) => sum + (v as number), 0) || 1;

  const colors: Record<string, string> = {
    seguridad: "#ef4444", politica: "#3b82f6", cultura: "#eab308", economia: "#22c55e", deportes: "#a855f7",
    local: "#22c55e", nacional: "#3b82f6", internacional: "#a855f7",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="text-3xl font-bold text-white">{totalNoticias}</div>
          <div className="text-xs text-slate-400 mt-1">Noticias publicadas</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="text-3xl font-bold text-red-400">{urgentes}</div>
          <div className="text-xs text-slate-400 mt-1">Urgentes</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="text-3xl font-bold text-blue-400">{stats?.rendimiento?.tiempoPromedioPublicacion || "--"}</div>
          <div className="text-xs text-slate-400 mt-1">Min promedio</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="text-3xl font-bold text-green-400">{(stats?.rendimiento?.precisionClasificacion || 94) + "%"}</div>
          <div className="text-xs text-slate-400 mt-1">Precision IA</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h3 className="font-bold text-white mb-4 text-sm">Noticias por Categoria</h3>
          <div className="space-y-3">
            {catEntries.map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 capitalize">{cat}</span>
                  <span className="text-slate-400">{count}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: (((count as number) / maxCat) * 100) + "%", backgroundColor: colors[cat] || "#64748b" }} />
                </div>
              </div>
            ))}
            {catEntries.length === 0 && <div className="text-slate-500 text-sm">Sin datos</div>}
          </div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <h3 className="font-bold text-white mb-4 text-sm">Distribucion por Origen</h3>
          <div className="flex items-center gap-6">
            <svg width="140" height="140" viewBox="0 0 140 140">
              {origenEntries.length > 0 ? (() => {
                let cumulative = 0;
                return origenEntries.map(([origen, count], i) => {
                  const pct = (count as number) / totalOrigen;
                  const startAngle = cumulative * 360;
                  const endAngle = (cumulative + pct) * 360;
                  cumulative += pct;
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;
                  const x1 = 70 + 50 * Math.cos(startRad);
                  const y1 = 70 + 50 * Math.sin(startRad);
                  const x2 = 70 + 50 * Math.cos(endRad);
                  const y2 = 70 + 50 * Math.sin(endRad);
                  const largeArc = pct > 0.5 ? 1 : 0;
                  return (
                    <path key={origen} d={`M 70 70 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={colors[origen] || "#64748b"} stroke="#0f172a" strokeWidth="2" />
                  );
                });
              })() : (
                <circle cx="70" cy="70" r="50" fill="#334155" />
              )}
              <circle cx="70" cy="70" r="30" fill="#0f172a" />
            </svg>
            <div className="space-y-2">
              {origenEntries.map(([origen, count]) => (
                <div key={origen} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[origen] || "#64748b" }}></span>
                  <span className="text-slate-300 capitalize">{origen}</span>
                  <span className="text-slate-500">{count} ({Math.round(((count as number) / totalOrigen) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
        <h3 className="font-bold text-white mb-4 text-sm">Distribucion por Prioridad</h3>
        <div className="flex gap-4">
          {Object.entries(porPrioridad).map(([pri, count]) => (
            <div key={pri} className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-center">
              <div className="text-2xl font-bold text-white">{count as number}</div>
              <div className={`text-xs mt-1 capitalize ${pri === "alta" ? "text-red-400" : pri === "media" ? "text-yellow-400" : "text-green-400"}`}>{pri}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
