"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, doc, updateDoc, deleteDoc, Timestamp, query, orderBy, setDoc } from "firebase/firestore";
import Link from "next/link";

interface Noticia {
  id: string;
  titulo: string;
  categoria: string;
  origen: string;
  prioridad: string;
  estado: string;
  fechaPublicacion: any;
  metadata?: { vistas?: number; compartidos?: number };
  contenido?: string;
  resumen?: string;
}

const CATEGORIAS = ["todas", "politica", "seguridad", "cultura", "economia", "deportes"];
const ORIGENES = ["todos", "local", "nacional", "internacional"];
const ESTADOS = ["todos", "publicada", "borrador", "revision", "archivada"];

export default function NewsManager() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [papelera, setPapelera] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroOrigen, setFiltroOrigen] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Noticia>>({});
  const [mostrarPapelera, setMostrarPapelera] = useState(false);
  const [nuevaNoticia, setNuevaNoticia] = useState({ titulo: "", contenido: "", categoria: "politica", prioridad: "media" });
  const [mostrarFormNueva, setMostrarFormNueva] = useState(false);

  useEffect(() => {
    cargarNoticias();
    cargarPapelera();
  }, []);

  async function cargarNoticias() {
    setLoading(true);
    try {
      const q = query(collection(db, "noticias"), orderBy("fechaPublicacion", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Noticia));
      setNoticias(data);
    } catch (e) {
      console.error("Error cargando noticias:", e);
    }
    setLoading(false);
  }

  async function cargarPapelera() {
    try {
      const snap = await getDocs(collection(db, "papelera"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Noticia));
      setPapelera(data);
    } catch (e) {
      console.error("Error cargando papelera:", e);
    }
  }

  const noticiasFiltradas = noticias.filter((n) => {
    const matchCat = filtroCategoria === "todas" || n.categoria === filtroCategoria;
    const matchOrg = filtroOrigen === "todos" || n.origen === filtroOrigen;
    const matchEst = filtroEstado === "todos" || n.estado === filtroEstado;
    const matchBus = !busqueda || n.titulo?.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchOrg && matchEst && matchBus;
  });

  async function guardarEdicion(id: string) {
    try {
      await updateDoc(doc(db, "noticias", id), {
        ...formData,
        edicionMNO: {
          fechaEdicion: Timestamp.now(),
          cambiosRealizados: ["Edicion desde panel admin"],
          version: 3,
          editadoPor: "admin-panel",
        },
      });
      setEditando(null);
      cargarNoticias();
      alert("Noticia actualizada correctamente");
    } catch (e) {
      alert("Error al guardar: " + (e as Error).message);
    }
  }

  async function archivarNoticia(n: Noticia) {
    if (!confirm("Archivar esta noticia? Se movera a la papelera.")) return;
    try {
      await setDoc(doc(db, "papelera", n.id), { ...n, fechaArchivado: Timestamp.now() });
      await deleteDoc(doc(db, "noticias", n.id));
      cargarNoticias();
      cargarPapelera();
      alert("Noticia archivada");
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  }

  async function restaurarNoticia(n: Noticia) {
    try {
      await setDoc(doc(db, "noticias", n.id), n);
      await deleteDoc(doc(db, "papelera", n.id));
      cargarNoticias();
      cargarPapelera();
      alert("Noticia restaurada");
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  }

  async function eliminarPermanente(id: string) {
    if (!confirm("Eliminar permanentemente? Esta accion no se puede deshacer.")) return;
    try {
      await deleteDoc(doc(db, "papelera", id));
      cargarPapelera();
      alert("Noticia eliminada permanentemente");
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  }

  async function publicarAhora() {
    if (!nuevaNoticia.titulo.trim()) {
      alert("Escribe un titulo");
      return;
    }
    try {
      const id = "noticia-" + Date.now();
      const noticia = {
        id,
        titulo: nuevaNoticia.titulo,
        contenido: nuevaNoticia.contenido || "",
        resumen: (nuevaNoticia.contenido || "").substring(0, 180) + "...",
        categoria: nuevaNoticia.categoria,
        prioridad: nuevaNoticia.prioridad,
        origen: "local",
        estado: "publicada",
        nivelPublicacion: nuevaNoticia.prioridad === "alta" ? "nivel1_urgente" : "nivel2_importante",
        fechaPublicacion: Timestamp.now(),
        fechaDeteccion: Timestamp.now(),
        fuente: { nombre: "Redaccion MNO", url: "", tipo: "manual", confiable: true },
        metadata: { vistas: 0, compartidos: 0 },
        esNotaServidor: false,
        edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ["Publicacion manual desde admin"], version: 1, editadoPor: "admin-panel" },
        elementosVisuales: { emojis: ["N"], ctas: ["Comparte la noticia"], quotesDestacados: [], puntosClave: [] },
        impacto: { nivel: "medio", puntuacion: 70, palabrasClave: [] },
        imagen: { url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800", creditos: "Unsplash" },
        tags: [nuevaNoticia.categoria],
      };
      await setDoc(doc(db, "noticias", id), noticia);
      setNuevaNoticia({ titulo: "", contenido: "", categoria: "politica", prioridad: "media" });
      setMostrarFormNueva(false);
      cargarNoticias();
      alert("Noticia publicada exitosamente");
    } catch (e) {
      alert("Error al publicar: " + (e as Error).message);
    }
  }

  function emojisCategoria(cat: string) {
    const map: Record<string, string> = { politica: "P", seguridad: "!", cultura: "C", economia: "$", deportes: "D" };
    return map[cat] || "N";
  }

  function colorPrioridad(p: string) {
    if (p === "alta") return "bg-red-500/20 text-red-300 border-red-500/30";
    if (p === "media") return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-green-500/20 text-green-300 border-green-500/30";
  }

  if (loading) return <div className="p-8 text-center text-slate-400">Cargando noticias...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800">
        <input type="text" placeholder="Buscar noticia..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm min-w-[200px]" />
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c === "todas" ? "Todas" : emojisCategoria(c) + " " + c}</option>)}
        </select>
        <select value={filtroOrigen} onChange={(e) => setFiltroOrigen(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
          {ORIGENES.map((o) => <option key={o} value={o}>{o === "todos" ? "Todos" : o}</option>)}
        </select>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
          {ESTADOS.map((e) => <option key={e} value={e}>{e === "todos" ? "Todos" : e}</option>)}
        </select>
        <button onClick={cargarNoticias} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition">Recargar</button>
        <button onClick={() => setMostrarFormNueva(true)} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition">+ Publicar Ahora</button>
        <button onClick={() => setMostrarPapelera(!mostrarPapelera)} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition border border-slate-600">
          Papelera ({papelera.length})
        </button>
      </div>

      {mostrarFormNueva && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <h3 className="font-bold text-green-300 mb-3">Publicar Noticia Ahora</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input type="text" placeholder="Titulo de la noticia" value={nuevaNoticia.titulo} onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, titulo: e.target.value })} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm" />
            <select value={nuevaNoticia.categoria} onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, categoria: e.target.value })} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
              <option value="politica">Politica</option>
              <option value="seguridad">Seguridad</option>
              <option value="cultura">Cultura</option>
              <option value="economia">Economia</option>
              <option value="deportes">Deportes</option>
            </select>
          </div>
          <div className="mb-3">
            <textarea placeholder="Contenido completo..." value={nuevaNoticia.contenido} onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, contenido: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={publicarAhora} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition">Publicar</button>
            <button onClick={() => setMostrarFormNueva(false)} className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm transition">Cancelar</button>
          </div>
        </div>
      )}

      {!mostrarPapelera && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-slate-400">
                <tr><th className="px-4 py-3 text-left">Noticia</th><th className="px-4 py-3 text-left">Cat</th><th className="px-4 py-3 text-left">Origen</th><th className="px-4 py-3 text-left">Prioridad</th><th className="px-4 py-3 text-left">Estado</th><th className="px-4 py-3 text-left">Vistas</th><th className="px-4 py-3 text-left">Acciones</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {noticiasFiltradas.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-800/50 transition">
                    <td className="px-4 py-3"><div className="font-medium text-white max-w-xs truncate">{n.titulo}</div><div className="text-xs text-slate-500">ID: {n.id}</div></td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs">{emojisCategoria(n.categoria)} {n.categoria}</span></td>
                    <td className="px-4 py-3 text-slate-300 capitalize">{n.origen}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs border ${colorPrioridad(n.prioridad)}`}>{n.prioridad}</span></td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${n.estado === "publicada" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}>{n.estado}</span></td>
                    <td className="px-4 py-3 text-slate-400">{n.metadata?.vistas || 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href="/noticias/" className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs transition border border-slate-700">Ver</Link>
                        <button onClick={() => { setEditando(n.id); setFormData({ ...n }); }} className="px-2 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs transition border border-blue-500/30">Editar</button>
                        <button onClick={() => archivarNoticia(n)} className="px-2 py-1 rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs transition border border-red-500/30">Archivar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {noticiasFiltradas.length === 0 && <div className="p-8 text-center text-slate-500">No hay noticias</div>}
        </div>
      )}

      {mostrarPapelera && (
        <div className="bg-slate-900 rounded-xl border border-red-900/30 overflow-hidden">
          <div className="px-4 py-3 bg-red-900/20 border-b border-red-900/30">
            <h3 className="font-bold text-red-300 text-sm">Papelera ({papelera.length} noticias archivadas)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-slate-400"><tr><th className="px-4 py-3 text-left">Noticia</th><th className="px-4 py-3 text-left">Acciones</th></tr></thead>
              <tbody className="divide-y divide-slate-800">
                {papelera.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-800/50 transition opacity-60">
                    <td className="px-4 py-3"><div className="font-medium text-white">{n.titulo}</div><div className="text-xs text-slate-500">ID: {n.id}</div></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => restaurarNoticia(n)} className="px-2 py-1 rounded bg-green-600/20 hover:bg-green-600/30 text-green-300 text-xs transition border border-green-500/30">Restaurar</button>
                        <button onClick={() => eliminarPermanente(n.id)} className="px-2 py-1 rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs transition border border-red-500/30">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {papelera.length === 0 && <div className="p-8 text-center text-slate-500">Papelera vacia</div>}
        </div>
      )}

      {editando && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Editar Noticia</h3>
              <button onClick={() => setEditando(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs text-slate-400 mb-1">Titulo</label><input type="text" value={formData.titulo || ""} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-slate-400 mb-1">Categoria</label><select value={formData.categoria || ""} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">{CATEGORIAS.filter(c => c !== "todas").map((c) => <option key={c} value={c}>{emojisCategoria(c)} {c}</option>)}</select></div>
                <div><label className="block text-xs text-slate-400 mb-1">Prioridad</label><select value={formData.prioridad || ""} onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm"><option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option></select></div>
              </div>
              <div><label className="block text-xs text-slate-400 mb-1">Estado</label><select value={formData.estado || ""} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">{ESTADOS.filter(e => e !== "todos").map((e) => <option key={e} value={e}>{e}</option>)}</select></div>
              <div><label className="block text-xs text-slate-400 mb-1">Contenido</label><textarea value={(formData as any).contenido || ""} onChange={(e) => setFormData({ ...formData, contenido: e.target.value })} rows={6} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Resumen</label><textarea value={(formData as any).resumen || ""} onChange={(e) => setFormData({ ...formData, resumen: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => guardarEdicion(editando)} className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition">Guardar cambios</button>
              <button onClick={() => setEditando(null)} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
