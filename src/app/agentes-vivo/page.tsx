"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AGENTES = [
  { id: 1, nombre: "Recepcion", icono: "R", color: "bg-blue-600", tiempo: 800, accion: "Detectando fuentes RSS..." },
  { id: 2, nombre: "Clasificacion", icono: "C", color: "bg-yellow-500", tiempo: 1200, accion: "Analizando categoria y prioridad..." },
  { id: 3, nombre: "Urgencias", icono: "U", color: "bg-red-600", tiempo: 600, accion: "Evaluando nivel de alerta..." },
  { id: 4, nombre: "Convenios", icono: "V", color: "bg-green-600", tiempo: 500, accion: "Verificando fuente oficial..." },
  { id: 5, nombre: "RSS Confiable", icono: "S", color: "bg-blue-500", tiempo: 700, accion: "Calculando indice de confianza..." },
  { id: 6, nombre: "Editorial", icono: "E", color: "bg-yellow-600", tiempo: 1500, accion: "Optimizando titulo y resumen..." },
  { id: 7, nombre: "Imagenes", icono: "I", color: "bg-cyan-600", tiempo: 2000, accion: "Generando variantes visuales..." },
  { id: 8, nombre: "Distribucion", icono: "D", color: "bg-green-500", tiempo: 1000, accion: "Adaptando para redes sociales..." },
  { id: 9, nombre: "Publicacion", icono: "P", color: "bg-red-500", tiempo: 800, accion: "Publicando y registrando metricas..." },
];

export default function AgentesVivoPage() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("politica");
  const [ejecutando, setEjecutando] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const [resultado, setResultado] = useState<any>(null);
  const [log, setLog] = useState<string[]>([]);

  async function ejecutarPipeline() {
    if (!titulo.trim()) return;
    setEjecutando(true);
    setPasoActual(0);
    setLog([]);
    setResultado(null);

    const hora = new Date().toLocaleTimeString("es-MX");
    const nuevoLog: string[] = ["[" + hora + "] Iniciando pipeline para: " + titulo];

    for (let i = 0; i < AGENTES.length; i++) {
      const agente = AGENTES[i];
      setPasoActual(i + 1);
      nuevoLog.push("[" + new Date().toLocaleTimeString("es-MX") + "] " + agente.nombre + ": " + agente.accion);
      setLog([...nuevoLog]);
      await new Promise(r => setTimeout(r, agente.tiempo));
    }

    const emojis = categoria === "seguridad" ? ["!","X","O"] : categoria === "politica" ? ["P","D","H"] : ["N","*","B"];
    const ctas = ["Mantente informado", "Comparte la noticia", "Tu opinion cuenta"];
    
    setResultado({
      tituloOptimizado: emojis[0] + " " + titulo,
      resumen: contenido ? contenido.substring(0, 180) + "..." : "Resumen generado automaticamente...",
      categoria: categoria,
      prioridad: contenido.length > 300 ? "alta" : "media",
      emojis: emojis,
      ctas: ctas,
      variantes: [
        { nombre: "Web", tamano: "1200x800", color: "bg-slate-700" },
        { nombre: "Instagram", tamano: "1080x1080", color: "bg-slate-600" },
        { nombre: "Twitter", tamano: "1200x675", color: "bg-slate-700" },
        { nombre: "Stories", tamano: "1080x1920", color: "bg-slate-800" },
      ],
      tiempoTotal: (AGENTES.reduce((s, a) => s + a.tiempo, 0) / 1000) + "s"
    });

    nuevoLog.push("[" + new Date().toLocaleTimeString("es-MX") + "] Publicacion completada. URL: /noticias/nueva-noticia/");
    setLog([...nuevoLog]);
    setEjecutando(false);
    setPasoActual(0);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      <header className="border-b border-blue-800/50 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <Image src="/images/logo-mno.png" alt="Logo MNO" width={40} height={40} className="object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Agentes en Vivo</h1>
              <p className="text-xs text-blue-300">Pipeline inteligente MNO</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-blue-300 hover:text-white transition">Volver al inicio</Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            9 Agentes IA en Accion
          </h2>
          <p className="text-slate-300">Escribe una noticia y observa como cada agente la procesa en tiempo real.</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Titulo de la noticia</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Sismo de magnitud 5.1 en Oaxaca" className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Contenido</label>
              <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} rows={4} placeholder="Escribe el cuerpo de la noticia aqui..." className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-400 mb-1">Categoria</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm">
                  <option value="politica">Politica</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="cultura">Cultura</option>
                  <option value="economia">Economia</option>
                  <option value="deportes">Deportes</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={ejecutarPipeline} disabled={ejecutando || !titulo.trim()} className={ejecutando ? "px-6 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed" : "px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg text-sm font-medium"}>
                  {ejecutando ? "Procesando..." : "Ejecutar Pipeline"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {ejecutando && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-400">Progreso: {pasoActual} de {AGENTES.length} agentes</span>
              <span className="text-xs text-blue-400 animate-pulse">Procesando...</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
              {AGENTES.map((a, i) => (
                <div key={a.id} className={i < pasoActual ? a.color + " text-white shadow-lg scale-105 rounded-lg p-3 text-center transition-all" : i === pasoActual ? "bg-slate-700 border-2 border-blue-400 text-white animate-pulse rounded-lg p-3 text-center" : "bg-slate-800/50 border border-slate-700 text-slate-500 rounded-lg p-3 text-center"}>
                  <div className="text-lg font-bold">{a.icono}</div>
                  <div className="text-[10px] mt-1 font-medium">{a.nombre}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-blue-300 bg-blue-500/10 rounded-lg px-4 py-2 border border-blue-500/20">
              {AGENTES[pasoActual - 1]?.accion || "Iniciando..."}
            </div>
          </div>
        )}

        {log.length > 0 && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-8">
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs font-bold text-slate-300">Log del sistema</div>
            <div className="p-4 space-y-1 max-h-[200px] overflow-y-auto font-mono text-xs">
              {log.map((l, i) => (<div key={i} className="text-slate-400">{l}</div>))}
            </div>
          </div>
        )}

        {resultado && (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                <span>OK</span> Pipeline completado en {resultado.tiempoTotal}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="font-bold text-yellow-300 mb-4">Resultado Editorial</h3>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-slate-500 mb-1">Titulo optimizado</div>
                    <div className="font-bold text-white">{resultado.tituloOptimizado}</div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-slate-500 mb-1">Resumen (180 chars)</div>
                    <div className="text-sm text-slate-300">{resultado.resumen}</div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-slate-500 mb-1">Emojis + CTAs</div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {resultado.emojis.map((e: string, i: number) => (<span key={i} className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-sm">{e}</span>))}
                    </div>
                    <div className="text-xs text-green-300">{resultado.ctas.join(" | ")}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="font-bold text-cyan-300 mb-4">Variantes de Imagen</h3>
                <div className="space-y-3">
                  {resultado.variantes.map((v: any, i: number) => (
                    <div key={i} className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded">{v.nombre}</span>
                        <span className="text-xs text-slate-500">{v.tamano}</span>
                      </div>
                      <div className={"aspect-video rounded " + v.color + " flex items-center justify-center"}>
                        <span className="text-slate-500 text-xs">[Imagen generada]</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
