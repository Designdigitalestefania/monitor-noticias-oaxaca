"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";

interface Actividad {
  id: string;
  tipo: string;
  agente: string;
  mensaje: string;
  timestamp: any;
  nivel: string;
}

const AGENTES = [
  { id: "agente-recepcion", nombre: "Recepcion", icono: "R", color: "bg-blue-600", desc: "Captura noticias de fuentes RSS y notas de servidor" },
  { id: "agente-clasificacion", nombre: "Clasificacion", icono: "C", color: "bg-yellow-500", desc: "Categoriza y asigna prioridad" },
  { id: "agente-urgente", nombre: "Urgencias", icono: "U", color: "bg-red-600", desc: "Activa protocolos de emergencia" },
  { id: "agente-convenios", nombre: "Convenios", icono: "V", color: "bg-green-600", desc: "Valida notas de servidores publicos" },
  { id: "agente-rss", nombre: "RSS Confiable", icono: "S", color: "bg-blue-500", desc: "Verifica confiabilidad de fuentes" },
  { id: "agente-editorial", nombre: "Editorial", icono: "E", color: "bg-yellow-600", desc: "Optimiza titulos y contenido" },
  { id: "agente-imagenes", nombre: "Imagenes", icono: "I", color: "bg-cyan-600", desc: "Genera variantes para redes sociales" },
  { id: "agente-distribucion", nombre: "Distribucion", icono: "D", color: "bg-green-500", desc: "Adapta contenido por plataforma" },
  { id: "agente-publicacion", nombre: "Publicacion", icono: "P", color: "bg-red-500", desc: "Publica y registra metricas" },
];

export default function PipelineMonitor() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());

  useEffect(() => {
    cargarActividades();
    const interval = setInterval(cargarActividades, 10000);
    return () => clearInterval(interval);
  }, []);

  async function cargarActividades() {
    try {
      const q = query(collection(db, "actividades"), orderBy("timestamp", "desc"), limit(20));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Actividad));
      setActividades(data);
      setUltimaActualizacion(new Date());
    } catch (e) {
      console.error("Error cargando actividades:", e);
    }
    setLoading(false);
  }

  function formatearHora(ts: any): string {
    if (!ts) return "--:--";
    let d: Date;
    if (ts instanceof Timestamp) d = ts.toDate();
    else if (typeof ts.toDate === "function") d = ts.toDate();
    else if (ts.seconds) d = new Date(ts.seconds * 1000);
    else d = new Date(ts);
    return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  function tiempoRelativo(ts: any): string {
    if (!ts) return "";
    let d: Date;
    if (ts instanceof Timestamp) d = ts.toDate();
    else if (typeof ts.toDate === "function") d = ts.toDate();
    else if (ts.seconds) d = new Date(ts.seconds * 1000);
    else d = new Date(ts);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return "ahora";
    if (diff < 3600) return "hace " + Math.floor(diff / 60) + " min";
    return "hace " + Math.floor(diff / 3600) + " h";
  }

  function colorNivel(nivel: string) {
    const map: Record<string, string> = {
      error: "bg-red-500/20 text-red-300 border-red-500/30",
      warning: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      success: "bg-green-500/20 text-green-300 border-green-500/30",
      info: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    };
    return map[nivel] || map.info;
  }

  function iconoNivel(nivel: string) {
    const map: Record<string, string> = { error: "X", warning: "!", success: "OK", info: "i" };
    return map[nivel] || "-";
  }

  const agentesActivos = new Set<string>();
  actividades.forEach((a) => {
    let d: Date;
    if (a.timestamp instanceof Timestamp) d = a.timestamp.toDate();
    else if (typeof a.timestamp?.toDate === "function") d = a.timestamp.toDate();
    else if (a.timestamp?.seconds) d = new Date(a.timestamp.seconds * 1000);
    else d = new Date(a.timestamp);
    if (Date.now() - d.getTime() < 30 * 60 * 1000) {
      agentesActivos.add(a.agente);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-white font-medium">Sistema operativo</span>
          <span className="text-slate-500 text-sm">Ultima actualizacion: {ultimaActualizacion.toLocaleTimeString("es-MX")}</span>
        </div>
        <button onClick={cargarActividades} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition">
          Refrescar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AGENTES.map((agente) => {
          const activo = agentesActivos.has(agente.id);
          const ultimaAct = actividades.find((a) => a.agente === agente.id);
          return (
            <div key={agente.id} className={`relative rounded-xl border p-4 transition ${activo ? "border-slate-700 bg-slate-800/80" : "border-slate-800 bg-slate-900/50 opacity-70"}`}>
              <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${agente.color} ${activo ? "opacity-100" : "opacity-30"}`}></div>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${agente.color} ${activo ? "" : "grayscale"} flex items-center justify-center text-lg font-bold text-white`}>
                  {agente.icono}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">{agente.nombre}</h4>
                    <span className={`w-2 h-2 rounded-full ${activo ? "bg-green-400 animate-pulse" : "bg-slate-600"}`}></span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{agente.desc}</p>
                  {ultimaAct && (
                    <p className="text-xs text-slate-500 mt-2">Ultima actividad: {tiempoRelativo(ultimaAct.timestamp)}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Log de Actividades (en vivo)</h3>
          <span className="text-xs text-slate-500">{actividades.length} registros</span>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Cargando actividades...</div>
          ) : actividades.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No hay actividades registradas</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {actividades.map((a) => (
                <div key={a.id} className="px-4 py-3 hover:bg-slate-800/50 transition flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs border ${colorNivel(a.nivel)} flex-shrink-0 mt-0.5`}>
                    {iconoNivel(a.nivel)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200">{a.mensaje}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="font-mono">{formatearHora(a.timestamp)}</span>
                      <span>|</span>
                      <span className="text-slate-400">{a.agente}</span>
                      <span>|</span>
                      <span>{tiempoRelativo(a.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
