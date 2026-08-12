"use client";

import Image from "next/image";
import Link from "next/link";

const EQUIPO = [
  {
    nombre: "Carlos Salazar Hernandez",
    cargo: "Director General",
    folio: "MN-2026-001",
    descripcion: "Periodista con 15 anos de experiencia en medios de comunicacion. Lidera la vision estrategica del Centro Inteligente de Informacion de Oaxaca, garantizando periodismo confiable y hechos que impactan.",
    imagen: "/images/credencial-director.png",
    color: "border-yellow-500/50",
    badge: "DIRECTOR GENERAL"
  },
  {
    nombre: "Estefania Perez Vazquez",
    cargo: "Coordinadora General",
    folio: "MN-2026-002",
    descripcion: "Especialista en comunicacion digital y gestion de contenidos. Coordina el equipo editorial y supervisa la calidad de las noticias publicadas en todas las plataformas del MNO.",
    imagen: "/images/coordinadora-estefania.png",
    color: "border-blue-500/50",
    badge: "COORDINADORA"
  },
];

const VALORES = [
  { icono: "V", titulo: "Veracidad", desc: "Cada noticia es verificada por multiples fuentes antes de su publicacion." },
  { icono: "R", titulo: "Rapidez", desc: "Nuestros 9 agentes IA procesan informacion en tiempo real, 24/7." },
  { icono: "I", titulo: "Impacto", desc: "Priorizamos noticias que afectan directamente a la poblacion de Oaxaca." },
  { icono: "T", titulo: "Transparencia", desc: "Fuente, fecha y metodologia siempre visibles para el lector." },
];

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      <header className="border-b border-blue-800/50 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <Image src="/images/logo-mno.png" alt="Logo MNO" width={40} height={40} className="object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Monitor Noticias MNO</h1>
              <p className="text-xs text-blue-300">Centro Inteligente de Informacion de Oaxaca</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-blue-300 hover:text-white transition">Volver al inicio</Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Conoce al equipo detras del periodismo inteligente
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            Quienes Somos
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Somos el Centro Inteligente de Informacion de Oaxaca, un equipo de periodistas y tecnologos 
            que combinan el rigor del periodismo tradicional con el poder de la inteligencia artificial 
            para llevarte noticias confiables, rapidas y relevantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <h3 className="text-xl font-bold text-blue-300 mb-3">Mision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Informar a la poblacion de Oaxaca y Mexico con veracidad, rapidez y profundidad, 
              utilizando tecnologia de inteligencia artificial para procesar, verificar y distribuir 
              noticias locales, nacionales e internacionales que impactan la vida cotidiana.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-amber-600/5">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ser el medio de comunicacion de referencia en Oaxaca para el ano 2030, reconocido 
              por la precision de su informacion, la innovacion tecnologica de sus procesos y 
              el impacto positivo en la sociedad oaxaquena.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">Nuestros Valores</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {VALORES.map((v, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/50 text-center hover:bg-slate-800/80 transition">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl font-bold text-blue-300 mx-auto mb-3">
                {v.icono}
              </div>
              <h4 className="font-bold text-white text-sm mb-1">{v.titulo}</h4>
              <p className="text-xs text-slate-400">{v.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">Nuestro Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {EQUIPO.map((miembro, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden border-2 ${miembro.color} bg-slate-800/50`}>
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative w-40 h-52 rounded-xl overflow-hidden border-2 border-slate-600 shadow-lg flex-shrink-0">
                    <Image src={miembro.imagen} alt={miembro.nombre} fill className="object-cover" />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold mb-2 border border-yellow-500/30">
                      {miembro.badge}
                    </div>
                    <h4 className="text-xl font-bold text-white">{miembro.nombre}</h4>
                    <p className="text-blue-400 font-medium text-sm">{miembro.cargo}</p>
                    <p className="text-slate-400 text-xs mt-2">Folio: {miembro.folio} | Vigencia: 2026 | PRENSA</p>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">{miembro.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 mb-16">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">Tecnologia: 9 Agentes IA</h3>
          <p className="text-slate-300 text-sm mb-4">
            Nuestro sistema esta compuesto por 9 agentes de inteligencia artificial que trabajan 
            en conjunto para ofrecerte la mejor experiencia informativa:
          </p>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
            {["Recepcion","Clasificacion","Urgencias","Convenios","RSS","Editorial","Imagenes","Distribucion","Publicacion"].map((a, i) => (
              <div key={i} className="text-center p-2 rounded-lg bg-slate-800/50 border border-slate-700">
                <div className="text-xs font-bold text-white">{i + 1}</div>
                <div className="text-[10px] text-slate-400">{a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800 border border-slate-700">
            <Image src="/images/logo-mno.png" alt="MNO" width={32} height={32} className="rounded-full" />
            <div className="text-left">
              <div className="text-sm font-bold text-white">Monitor Noticias MNO</div>
              <div className="text-xs text-slate-400">Centro Inteligente de Informacion de Oaxaca</div>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Periodismo Confiable. Hechos que Impactan.
          </p>
        </div>
      </section>
    </div>
  );
}
