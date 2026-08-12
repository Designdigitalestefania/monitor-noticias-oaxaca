"use client";

import { useState, useEffect } from "react";
import NewsManager from "@/components/admin/NewsManager";
import PipelineMonitor from "@/components/admin/PipelineMonitor";
import StatsCards from "@/components/admin/StatsCards";

const TABS = [
  { id: "noticias", label: "Noticias", color: "bg-blue-600" },
  { id: "pipeline", label: "Pipeline en Vivo", color: "bg-green-600" },
  { id: "stats", label: "Estadisticas", color: "bg-purple-600" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("noticias");
  const [alertas, setAlertas] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setAlertas((prev) => prev + 1);
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold text-white">Panel de Administracion MNO</h1>
                <p className="text-sm text-slate-400">Centro Inteligente de Informacion de Oaxaca</p>
              </div>
              {alertas > 0 && (
                <div className="relative">
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold animate-pulse">
                    {alertas} ALERTA{alertas > 1 ? "S" : ""}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <a href="/quienes-somos/" className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm transition border border-slate-700">
                Quienes Somos
              </a>
              <a href="/" className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm transition border border-slate-700">
                Volver al sitio
              </a>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id === "pipeline") setAlertas(0); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.id
                    ? `${tab.color} text-white shadow-lg`
                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {tab.label}
                {tab.id === "pipeline" && alertas > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px]">{alertas}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "noticias" && <NewsManager />}
        {activeTab === "pipeline" && <PipelineMonitor />}
        {activeTab === "stats" && <StatsCards />}
      </main>
    </div>
  );
}
