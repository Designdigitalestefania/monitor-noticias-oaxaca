"use client";

import Image from "next/image";
import Link from "next/link";

const AGENTES = [
  { id: 1, nombre: "Agente de Recepción", icono: "📥", color: "bg-blue-600", desc: "Recibe noticias de fuentes RSS, convenios y notas de servidor público.", tarea: "Captura y estructura la información cruda en formato noticia." },
  { id: 2, nombre: "Agente de Clasificación", icono: "🏷️", color: "bg-yellow-500", desc: "Analiza semánticamente el contenido para categorizar y priorizar.", tarea: "Detecta categoría (política, seguridad, cultura, economía) y nivel de urgencia." },
  { id: 3, nombre: "Agente de Urgencias", icono: "🚨", color: "bg-red-600", desc: "Activa protocolo de emergencia para noticias de alta prioridad.", tarea: "Publicación inmediata (< 5 min) con emojis de alerta y CTAs de emergencia." },
  { id: 4, nombre: "Agente de Convenios", icono: "🤝", color: "bg-green-600", desc: "Valida notas provenientes de servidores públicos convenidos.", tarea: "Verifica identidad, eleva prioridad y marca como fuente oficial." },
  { id: 5, nombre: "Agente RSS Confiable", icono: "📡", color: "bg-blue-500", desc: "Verifica la confiabilidad de fuentes RSS locales, nacionales e internacionales.", tarea: "Asigna nivel de confianza y determina origen geográfico." },
  { id: 6, nombre: "Agente Editorial", icono: "✏️", color: "bg-yellow-600", desc: "Optimiza títulos, resume contenido y genera elementos visuales de texto.", tarea: "Emojis estratégicos, CTAs personalizados, puntos clave y quotes destacados." },
  { id: 7, nombre: "Agente de Imágenes", icono: "🖼️", color: "bg-cyan-600", desc: "Selecciona imágenes y genera variantes para cada red social.", tarea: "Crea formatos Web, Instagram (1:1), Twitter (16:9) y Stories (9:16) con overlay MNO." },
  { id: 8, nombre: "Agente de Distribución", icono: "📤", color: "bg-green-500", desc: "Adapta el contenido para cada plataforma de redes sociales.", tarea: "Genera versiones optimizadas para Twitter, Instagram, Facebook y WhatsApp." },
  { id: 9, nombre: "Agente de Publicación", icono: "🚀", color: "bg-red-500", desc: "Publica la noticia final en la web y registra métricas.", tarea: "Guarda en Firebase, genera URL pública y registra log de actividad." },
];

const NOTICIAS_TEST = [
  { origen: "local", titulo: "🏛️ Fortalecen Sheinbaum y Jara protección del maíz nativo en Oaxaca", categoria: "politica", prioridad: "alta", agentes: ["📥","🏷️","📡","✏️","🖼️","📤","🚀"] },
  { origen: "local", titulo: "🚨 Alerta: Derrame de hidrocarburo en Salinas del Marqués", categoria: "seguridad", prioridad: "alta", agentes: ["📥","🏷️","🚨","📡","✏️","🖼️","📤","🚀"] },
  { origen: "nacional", titulo: "🚨 Diluvio con granizo en 4 entidades por monzón mexicano", categoria: "seguridad", prioridad: "alta", agentes: ["📥","🏷️","🚨","📡","✏️","🖼️","📤","🚀"] },
  { origen: "nacional", titulo: "🏛️ UNAM aplicará examen de control tras irregularidades", categoria: "politica", prioridad: "media", agentes: ["📥","🏷️","📡","✏️","🖼️","📤","🚀"] },
  { origen: "internacional", titulo: "🚨 13 turistas mueren en avioneta sobre Líneas de Nazca, Perú", categoria: "seguridad", prioridad: "alta", agentes: ["📥","🏷️","🚨","📡","✏️","🖼️","📤","🚀"] },
  { origen: "internacional", titulo: "🌍 Rusia pone a prueba defensas de la OTAN en Europa", categoria: "politica", prioridad: "media", agentes: ["📥","🏷️","📡","✏️","🖼️","📤","🚀"] },
];

export default function DemoAgentesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      <header className="border-b border-blue-800/50 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <Image src="/images/logo-mno.png" alt="Logo MNO" width={48} height={48} className="object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Monitor Noticias MNO</h1>
              <p className="text-xs text-blue-300">Centro Inteligente de Información de Oaxaca</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-blue-300 hover:text-white transition">← Volver al inicio</Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Sistema operativo — 1 de agosto de 2026
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            🤖 Los 9 Agentes IA en Acción
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Demostración en vivo del pipeline inteligente procesando noticias reales del día.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-amber-600/5 p-6 md:p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-32 h-40 rounded-xl overflow-hidden border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/20 flex-shrink-0">
                <Image src="/images/credencial-director.png" alt="Credencial Director General" fill className="object-cover" />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold mb-2 border border-yellow-500/30">
                  👤 DIRECTOR GENERAL
                </div>
                <h3 className="text-2xl font-bold text-white">Carlos Salazar Hernández</h3>
                <p className="text-yellow-400 font-medium">Monitor Noticias MNO</p>
                <p className="text-slate-400 text-sm mt-2">Folio: MN-2026-001 | Vigencia: 2026 | PRENSA</p>
                <p className="text-slate-500 text-xs mt-1">Periodismo Confiable. Hechos que Impactan.</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <span>🧠</span> Arquitectura de Agentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {AGENTES.map((agente) => (
            <div key={agente.id} className="group relative rounded-xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-300 p-5 hover:scale-[1.02]">
              <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${agente.color}`}></div>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${agente.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                  {agente.icono}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-500">#{agente.id}</span>
                    <h4 className="font-bold text-white">{agente.nombre}</h4>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">{agente.desc}</p>
                  <div className="text-xs text-blue-300 bg-blue-500/10 rounded px-2 py-1 border border-blue-500/20">
                    <span className="font-semibold">Tarea:</span> {agente.tarea}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <span>⚡</span> Pipeline en Acción — Noticias Reales del 1 Ago 2026
        </h3>
        <div className="space-y-4 mb-16">
          {NOTICIAS_TEST.map((noticia, idx) => (
            <div key={idx} className="rounded-xl border border-slate-700/50 bg-slate-800/40 overflow-hidden">
              <div className="p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    noticia.origen === "local" ? "bg-green-500/20 text-green-300 border border-green-500/30" :
                    noticia.origen === "nacional" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                    "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  }`}>
                    {noticia.origen.toUpperCase()}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    noticia.prioridad === "alta" ? "bg-red-500/20 text-red-300 border border-red-500/30" :
                    "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                  }`}>
                    {noticia.prioridad.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300 border border-slate-600">
                    {noticia.categoria}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-lg mb-3">{noticia.titulo}</h4>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-500 mr-1">Pipeline:</span>
                  {noticia.agentes.map((icono, i) => (
                    <div key={i} className="flex items-center">
                      <span className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm hover:bg-blue-600 hover:border-blue-400 transition" title={`Paso ${i + 1}`}>
                        {icono}
                      </span>
                      {i < noticia.agentes.length - 1 && (
                        <span className="text-slate-600 mx-0.5">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-amber-600/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✏️</span>
              <h4 className="text-xl font-bold text-yellow-300">Agente Editorial — Diseño de Texto</h4>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <div className="text-xs text-slate-500 mb-1">Título optimizado</div>
                <div className="font-bold text-white">🚨 Alerta: Derrame de hidrocarburo amenaza ecosistema en Salinas del Marqués</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <div className="text-xs text-slate-500 mb-1">Resumen para redes (180 chars)</div>
                <div className="text-sm text-slate-300">Derrame de hidrocarburo detectado en Salinas del Marqués, Oaxaca. Afecta 2km de costa. Población exige atención de Pemex y Protección Civil...</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <div className="text-xs text-slate-500 mb-1">Emojis + CTAs asignados</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-sm">🚨</span>
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-sm">👮</span>
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-sm">🛡️</span>
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-sm">🔒</span>
                </div>
                <div className="mt-2 text-xs text-green-300">💬 &quot;Mantente alerta&quot; | &quot;Comparte para informar&quot; | &quot;Tu seguridad es primero&quot;</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🖼️</span>
              <h4 className="text-xl font-bold text-cyan-300">Agente de Imágenes — Variantes</h4>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded">WEB</span>
                  <span className="text-xs text-slate-500">1200 × 800 px</span>
                </div>
                <div className="aspect-video rounded bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-xs">🌊</span>
                      </div>
                      <span className="text-xs font-bold text-white bg-red-600 px-1.5 rounded">SEGURIDAD</span>
                    </div>
                    <div className="text-xs text-white font-semibold">🚨 Derrame de hidrocarburo en Salinas del Marqués</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2">
                  <div className="text-xs text-center text-slate-400 mb-1">Instagram</div>
                  <div className="aspect-square rounded bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <span className="text-2xl">📷</span>
                  </div>
                  <div className="text-[10px] text-center text-slate-500 mt-1">1080×1080</div>
                </div>
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2">
                  <div className="text-xs text-center text-slate-400 mb-1">Twitter/X</div>
                  <div className="aspect-video rounded bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <span className="text-2xl">🐦</span>
                  </div>
                  <div className="text-[10px] text-center text-slate-500 mt-1">1200×675</div>
                </div>
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2">
                  <div className="text-xs text-center text-slate-400 mb-1">Stories</div>
                  <div className="aspect-[9/16] rounded bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div className="text-[10px] text-center text-slate-500 mt-1">1080×1920</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800 border border-slate-700">
            <Image src="/images/logo-mno.png" alt="MNO" width={32} height={32} className="rounded-full" />
            <div className="text-left">
              <div className="text-sm font-bold text-white">Monitor Noticias MNO</div>
              <div className="text-xs text-slate-400">Centro Inteligente de Información de Oaxaca</div>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Periodismo Confiable. Hechos que Impactan. — Director General: Carlos Salazar Hernández
          </p>
        </div>
      </section>
    </div>
  );
}
