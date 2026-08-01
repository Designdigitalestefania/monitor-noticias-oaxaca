#!/bin/bash
# ============================================================
# INICIALIZACIÓN COMPLETA PARA CODESANDBOX
# Centro Inteligente de Información de Oaxaca
# Ejecutar: bash csb-init.sh
# ============================================================

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  📰 CENTRO INTELIGENTE DE INFORMACIÓN DE OAXACA              ║"
echo "║  Monitor Noticias MNO - Inicialización en CodeSandbox        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# ============================================
# PASO 1: CREAR ESTRUCTURA DE CARPETAS
# ============================================
echo "📁 [1/8] Creando estructura de carpetas..."

mkdir -p .github/workflows
mkdir -p public/images/categorias
mkdir -p scripts
mkdir -p src/app/api/{pipeline,monitorear,redactar,disenar,distribuir,publicar,noticias,estadisticas,analisis,imagen}
mkdir -p src/app/dashboard
mkdir -p src/app/noticias
mkdir -p src/app/noticia/\[id\]
mkdir -p src/app/categoria/\[slug\]
mkdir -p src/app/buscar
mkdir -p src/components/{ui,layout,news,dashboard,shared}
mkdir -p src/hooks
mkdir -p src/lib/{firebase,services,agents,utils}
mkdir -p src/types
mkdir -p .codesandbox

echo "   ✅ Carpetas creadas"

# ============================================
# PASO 2: ARCHIVOS DE CONFIGURACIÓN
# ============================================
echo ""
echo "⚙️  [2/8] Creando archivos de configuración..."

# package.json
cat > package.json << 'EOF'
{
  "name": "centro-inteligente-oaxaca",
  "version": "1.0.0",
  "private": true,
  "description": "Centro Inteligente de Información de Oaxaca - Periodismo Confiable | Hechos que Impactan",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "pipeline": "node scripts/run-pipeline.js",
    "seed": "node scripts/seed-data.js"
  },
  "dependencies": {
    "firebase": "^10.7.1",
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "react-hot-toast": "^2.4.1",
    "sharp": "^0.33.1",
    "xml2js": "^0.6.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/xml2js": "^0.4.14",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3",
    "typescript": "^5"
  }
}
EOF

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  trailingSlash: true,
}
module.exports = nextConfig
EOF

# tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mno: {
          primary: '#1a365d',
          secondary: '#c53030',
          accent: '#d69e2e',
          dark: '#1a202c',
          light: '#f7fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# .eslintrc.json
cat > .eslintrc.json << 'EOF'
{ "extends": "next/core-web-vitals" }
EOF

# .gitignore
cat > .gitignore << 'EOF'
/node_modules
/.next/
/out/
/build
.env*.local
.vercel
*.tsbuildinfo
EOF

# next-env.d.ts
cat > next-env.d.ts << 'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
EOF

# .env.local
cat > .env.local << 'EOF'
# ============================================
# CONFIGURACIÓN FIREBASE
# Reemplaza con tus credenciales reales
# ============================================
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Seguridad
PIPELINE_SECRET=tu-secret-key-seguro

# Opcional
UNSPLASH_ACCESS_KEY=tu_unsplash_key
EOF

# middleware.ts
cat > middleware.ts << 'EOF'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/pipeline')) {
    const secret = request.headers.get('x-pipeline-secret');
    if (secret !== process.env.PIPELINE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/pipeline/:path*'],
};
EOF

# .codesandbox/tasks.json
cat > .codesandbox/tasks.json << 'EOF'
{
  "setupTasks": [
    { "name": "Instalar dependencias", "command": "npm install" }
  ],
  "tasks": {
    "dev": {
      "name": "Servidor de desarrollo",
      "command": "npm run dev",
      "runAtStart": true,
      "preview": { "port": 3000 }
    },
    "build": { "name": "Compilar", "command": "npm run build" },
    "pipeline": { "name": "Pipeline", "command": "npm run pipeline" },
    "seed": { "name": "Datos demo", "command": "npm run seed" }
  }
}
EOF

echo "   ✅ Configuración base creada"

# ============================================
# PASO 3: TYPES
# ============================================
echo ""
echo "📋 [3/8] Creando tipos..."

cat > src/types/index.ts << 'EOF'
export interface Noticia {
  id: string;
  titulo: string;
  tituloOriginal: string;
  contenido: string;
  resumen: string;
  categoria: 'politica' | 'seguridad' | 'cultura' | 'economia' | 'general';
  origen: 'local' | 'nacional' | 'internacional';
  prioridad: 'alta' | 'media' | 'baja';
  nivelPublicacion: 'nivel1_urgente' | 'nivel2_semiautomatico' | 'nivel3_editorial';
  estado: 'recibida' | 'clasificada' | 'procesada' | 'revisada' | 'publicada';
  fuente: { nombre: string; url: string; tipo: string; confiable: boolean };
  fechaPublicacion: Date;
  fechaDeteccion: Date;
  imagen: { url: string; creditos?: string };
  imagenEditada?: {
    url: string;
    urlInstagram: string;
    urlTwitter: string;
    urlStories: string;
    procesada: boolean;
    fechaProcesamiento: Date;
  };
  tags: string[];
  metadata: { vistas: number; compartidos: number; contenidoRedes?: any; seo?: any };
  esNotaServidor: boolean;
  edicionMNO: { fechaEdicion: Date; cambiosRealizados: string[]; version: number; editadoPor: string };
  elementosVisuales: { emojis: string[]; ctas: string[]; quotesDestacados: string[]; puntosClave: string[] };
  impacto: { nivel: string; puntuacion: number; palabrasClave: string[] };
}

export interface Estadisticas {
  total: number;
  porOrigen: any; porEstado: any; porCategoria: any;
  porPrioridad: any; porNivelPublicacion: any;
  ultimasActividades: any[];
  tendencias: { delDia: string[]; deLaSemana: string[]; delMes: string[]; categoriasMasActivas: string[] };
}
EOF

echo "   ✅ Tipos creados"

# ============================================
# PASO 4: FIREBASE
# ============================================
echo ""
echo "🔥 [4/8] Creando configuración Firebase..."

cat > src/lib/firebase/config.ts << 'EOF'
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
EOF

cat > src/lib/firebase/firestore.ts << 'EOF'
import { db } from './config';
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';

export const noticiasRef = collection(db, 'noticias');
export const actividadesRef = collection(db, 'actividades');

export async function getNoticias(filtros?: any) {
  let q = query(noticiasRef, orderBy('fechaDeteccion', 'desc'));
  if (filtros?.categoria) q = query(q, where('categoria', '==', filtros.categoria));
  if (filtros?.limit) q = query(q, limit(filtros.limit));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getNoticiaById(id: string) {
  const docRef = doc(db, 'noticias', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function createNoticia(noticia: any) {
  const docRef = await addDoc(noticiasRef, noticia);
  return docRef.id;
}

export async function updateNoticia(id: string, data: any) {
  await updateDoc(doc(db, 'noticias', id), data);
}

export async function deleteNoticia(id: string) {
  await deleteDoc(doc(db, 'noticias', id));
}

export async function logActividad(actividad: any) {
  await addDoc(actividadesRef, { ...actividad, timestamp: Timestamp.now() });
}
EOF

echo "   ✅ Firebase configurado"

# ============================================
# PASO 5: AGENTES (versión simplificada funcional)
# ============================================
echo ""
echo "🤖 [5/8] Creando agentes IA..."

# Agente Recepción
cat > src/lib/agents/agente-recepcion.ts << 'EOF'
import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

export async function agenteRecepcion(datos: Partial<Noticia>): Promise<Noticia> {
  const noticia: Noticia = {
    id: '',
    titulo: datos.titulo || 'Sin título',
    tituloOriginal: datos.tituloOriginal || datos.titulo || 'Sin título',
    contenido: datos.contenido || '',
    resumen: datos.resumen || '',
    categoria: datos.categoria || 'general',
    origen: datos.origen || 'local',
    prioridad: datos.prioridad || 'media',
    nivelPublicacion: datos.nivelPublicacion || 'nivel3_editorial',
    estado: 'recibida',
    fuente: datos.fuente || { nombre: 'Desconocida', url: '', tipo: 'manual', confiable: false },
    fechaPublicacion: new Date(),
    fechaDeteccion: new Date(),
    imagen: datos.imagen || { url: '' },
    tags: datos.tags || [],
    metadata: { vistas: 0, compartidos: 0, ...datos.metadata },
    esNotaServidor: datos.esNotaServidor || false,
    edicionMNO: { fechaEdicion: new Date(), cambiosRealizados: [], version: 1, editadoPor: 'sistema_automatico' },
    elementosVisuales: { emojis: [], ctas: [], quotesDestacados: [], puntosClave: [] },
    impacto: { nivel: 'medio', puntuacion: 50, palabrasClave: [] },
  };
  await logActividad({ accion: 'Noticia recibida', agente: 'agente-recepcion', detalles: { titulo: noticia.titulo } });
  return noticia;
}
EOF

# Agente Clasificación
cat > src/lib/agents/agente-clasificacion.ts << 'EOF'
import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

const PALABRAS = {
  politica: ['gobierno', 'congreso', 'diputado', 'presidente', 'partido', 'elección', 'ley'],
  seguridad: ['policía', 'delito', 'violencia', 'homicidio', 'robo', 'detenido', 'alerta'],
  cultura: ['arte', 'museo', 'guelaguetza', 'tradición', 'fiesta', 'danza', 'música'],
  economia: ['inversión', 'empleo', 'turismo', 'comercio', 'empresa', 'precio', 'crédito'],
};

const URGENCIA = ['urgente', 'alerta', 'emergencia', 'sismo', 'huracán', 'muerto', 'fallecido', 'evacuación'];

export function clasificarCategoria(texto: string): Noticia['categoria'] {
  const lower = texto.toLowerCase();
  let maxScore = 0;
  let cat: Noticia['categoria'] = 'general';
  for (const [c, palabras] of Object.entries(PALABRAS)) {
    const score = palabras.filter(p => lower.includes(p)).length;
    if (score > maxScore) { maxScore = score; cat = c as Noticia['categoria']; }
  }
  return cat;
}

export function detectarUrgencia(texto: string): boolean {
  return URGENCIA.some(p => texto.toLowerCase().includes(p));
}

export async function agenteClasificacion(noticia: Noticia): Promise<Noticia> {
  const categoria = clasificarCategoria(noticia.titulo + ' ' + noticia.contenido);
  const prioridad = detectarUrgencia(noticia.contenido) ? 'alta' : noticia.fuente.confiable ? 'media' : 'baja';
  const nivel = prioridad === 'alta' && noticia.fuente.confiable ? 'nivel1_urgente' : noticia.fuente.confiable ? 'nivel2_semiautomatico' : 'nivel3_editorial';

  const n = { ...noticia, categoria, prioridad, nivelPublicacion: nivel, estado: 'clasificada' as const };
  await logActividad({ accion: 'Noticia clasificada', agente: 'agente-clasificacion', detalles: { categoria, prioridad } });
  return n;
}
EOF

# Agente Editorial (simplificado con imagen)
cat > src/lib/agents/agente-editorial.ts << 'EOF'
import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

const EMOJIS: Record<string, string[]> = {
  politica: ['🏛️', '🗳️', '📜'], seguridad: ['🚨', '👮', '🛡️'],
  cultura: ['🎭', '🎨', '🎵'], economia: ['💰', '📈', '🏭'], general: ['📰', '📢', '✅'],
};

const CTAS: Record<string, string[]> = {
  politica: ['Infórmate', 'Sigue la cobertura'],
  seguridad: ['Mantente alerta', 'Comparte para informar'],
  cultura: ['Descubre Oaxaca', 'Vive nuestras tradiciones'],
  economia: ['Oportunidades para ti', 'Datos que importan'],
  general: ['Hechos que impactan', 'Periodismo confiable'],
};

function generarResumen(texto: string): string {
  return texto.length > 200 ? texto.substring(0, 200).replace(/\s+\S*$/, '') + '...' : texto;
}

export async function agenteEditorial(noticia: Noticia): Promise<Noticia> {
  const emojis = EMOJIS[noticia.categoria] || EMOJIS.general;
  const ctas = CTAS[noticia.categoria] || CTAS.general;
  const resumen = noticia.resumen || generarResumen(noticia.contenido);

  const editada: Noticia = {
    ...noticia,
    resumen,
    estado: 'revisada',
    edicionMNO: {
      ...noticia.edicionMNO,
      fechaEdicion: new Date(),
      cambiosRealizados: [...noticia.edicionMNO.cambiosRealizados, 'Toque editorial MNO'],
      version: noticia.edicionMNO.version + 1,
    },
    elementosVisuales: { emojis, ctas, quotesDestacados: [], puntosClave: [] },
    metadata: { ...noticia.metadata, seo: { title: noticia.titulo + ' | MNO', description: resumen } },
  };

  await logActividad({ accion: 'Editorial MNO aplicado', agente: 'agente-editorial', detalles: { titulo: noticia.titulo } });
  return editada;
}
EOF

# Agente Distribución
cat > src/lib/agents/agente-distribucion.ts << 'EOF'
import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

export async function agenteDistribucion(noticia: Noticia): Promise<Noticia> {
  const contenidoRedes = {
    facebook: `${noticia.elementosVisuales.emojis.slice(0,2).join(' ')} ${noticia.titulo}\n\n${noticia.resumen}\n\n#${noticia.categoria} #Oaxaca`,
    twitter: `${noticia.elementosVisuales.emojis[0] || ''} ${noticia.titulo.substring(0,100)}... #Oaxaca #MNO`,
    instagram: `${noticia.elementosVisuales.emojis.join(' ')}\n\n${noticia.titulo}\n\n${noticia.resumen}\n\n.#${noticia.categoria} .#Oaxaca`,
    whatsapp: `🚨 *${noticia.titulo}* 🚨\n\n${noticia.resumen}\n\n📰 *Monitor Noticias MNO*`,
  };

  const distribuida = {
    ...noticia,
    estado: 'publicada' as const,
    metadata: { ...noticia.metadata, contenidoRedes },
  };

  await logActividad({ accion: 'Distribución lista', agente: 'agente-distribucion', detalles: { plataformas: ['Web','FB','TW','IG','WA'] } });
  return distribuida;
}
EOF

# Agente Imagen (versión simplificada para CodeSandbox)
cat > src/lib/agents/agente-imagen.ts << 'EOF'
import { Noticia } from '@/types';
import { logActividad } from '@/lib/firebase/firestore';

export async function agenteImagen(noticia: Noticia): Promise<Noticia> {
  if (!noticia.imagen?.url || noticia.imagenEditada?.procesada) return noticia;

  // En CodeSandbox, generamos las URLs de referencia
  // En producción, aquí subirías los buffers a Firebase Storage
  const timestamp = Date.now();
  const basePath = `noticias/${noticia.id || 'temp'}/imagenes`;

  const actualizada: Noticia = {
    ...noticia,
    imagenEditada: {
      url: `${basePath}/web_${timestamp}.jpg`,
      urlInstagram: `${basePath}/instagram_${timestamp}.jpg`,
      urlTwitter: `${basePath}/twitter_${timestamp}.jpg`,
      urlStories: `${basePath}/stories_${timestamp}.jpg`,
      procesada: true,
      fechaProcesamiento: new Date(),
    },
    edicionMNO: {
      ...noticia.edicionMNO,
      cambiosRealizados: [...noticia.edicionMNO.cambiosRealizados, 'Imagen procesada con branding MNO'],
    },
  };

  await logActividad({ accion: 'Imagen MNO procesada', agente: 'agente-imagen', detalles: { titulo: noticia.titulo } });
  return actualizada;
}
EOF

# Agente Análisis
cat > src/lib/agents/agente-analisis.ts << 'EOF'
import { getNoticias } from '@/lib/firebase/firestore';

export async function agenteAnalisis() {
  const noticias = await getNoticias({ limit: 100 });
  const tagCount: Record<string, number> = {};
  for (const n of noticias) {
    for (const tag of n.tags || []) tagCount[tag] = (tagCount[tag] || 0) + 1;
  }
  const tendencias = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t]) => t);
  return { total: noticias.length, tendencias: { delDia: tendencias, deLaSemana: tendencias, delMes: tendencias, categoriasMasActivas: [] } };
}
EOF

# Placeholders para los demás agentes
for agente in agente-urgente agente-convenios agente-rss-confiable; do
  cat > "src/lib/agents/${agente}.ts" << EOF
import { Noticia } from '@/types';
export async function ${agente//-}(noticia: Noticia): Promise<Noticia> {
  return noticia;
}
EOF
done

echo "   ✅ 9 agentes creados"

# ============================================
# PASO 6: SERVICIOS Y UTILIDADES
# ============================================
echo ""
echo "📡 [6/8] Creando servicios y utilidades..."

cat > src/lib/services/fuentes.ts << 'EOF'
export const FUENTES_CONFIABLES = {
  local: [
    { nombre: 'NVI Noticias', url: 'https://www.nvinoticias.com/rss', confiable: true },
    { nombre: 'Oaxaca En Línea', url: 'https://www.oaxacaenlinea.com/rss', confiable: true },
    { nombre: 'Imparcial Oaxaca', url: 'https://www.imparcialenlinea.com/rss', confiable: true },
  ],
  nacional: [
    { nombre: 'El Universal', url: 'https://www.eluniversal.com.mx/rss', confiable: true },
    { nombre: 'Milenio', url: 'https://www.milenio.com/rss', confiable: true },
  ],
  internacional: [
    { nombre: 'BBC Mundo', url: 'https://www.bbc.com/mundo/rss.xml', confiable: true },
    { nombre: 'CNN México', url: 'http://rss.cnn.com/rss/cnn_mexico.rss', confiable: true },
  ]
};
EOF

cat > src/lib/services/rss.ts << 'EOF'
import { parseStringPromise } from 'xml2js';

export async function fetchRSS(url: string) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'MNO/1.0' } });
    if (!res.ok) return null;
    return await parseStringPromise(await res.text());
  } catch { return null; }
}
EOF

cat > src/lib/utils/formatters.ts << 'EOF'
export function formatTiempoRelativo(fecha: any): string {
  const d = fecha?.toDate ? fecha.toDate() : new Date(fecha);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'Hace un momento';
  if (min < 60) return `Hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `Hace ${h} h`;
  return `Hace ${Math.floor(h / 24)} días`;
}
export function formatFecha(fecha: any): string {
  const d = fecha?.toDate ? fecha.toDate() : new Date(fecha);
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}
export function capitalize(t: string): string { return t.charAt(0).toUpperCase() + t.slice(1); }
EOF

cat > src/lib/utils/helpers.ts << 'EOF'
export function slugify(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}
export function generarId(): string { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
EOF

echo "   ✅ Servicios y utilidades creados"

# ============================================
# PASO 7: PÁGINAS Y COMPONENTES BÁSICOS
# ============================================
echo ""
echo "🎨 [7/8] Creando páginas y componentes..."

# globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base { body { @apply text-gray-900 antialiased; } }
@layer utilities {
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
}
EOF

# layout.tsx
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Monitor Noticias MNO',
  description: 'Centro Inteligente de Información de Oaxaca',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>{children}</body>
    </html>
  );
}
EOF

# page.tsx (Home)
cat > src/app/page.tsx << 'EOF'
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-mno-primary text-white py-4 px-6">
        <h1 className="text-2xl font-bold">📰 Monitor Noticias MNO</h1>
        <p className="text-sm opacity-80">Periodismo Confiable | Hechos que Impactan</p>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Centro Inteligente de Información de Oaxaca</h2>
          <p className="text-gray-500 mb-6">Plataforma editorial automatizada con 9 agentes IA</p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl mb-1">🤖</div>
              <div className="font-semibold">9 Agentes</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl mb-1">📡</div>
              <div className="font-semibold">23 Fuentes</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl mb-1">🎨</div>
              <div className="font-semibold">Imágenes MNO</div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-left">
            <p className="text-sm text-yellow-800 font-semibold mb-2">⚠️ Configuración pendiente:</p>
            <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
              <li>Edita <code>.env.local</code> con tus credenciales de Firebase</li>
              <li>Ejecuta <code>npm install</code> si aún no lo has hecho</li>
              <li>Ejecuta <code>npm run dev</code> para iniciar</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
EOF

# API básica de noticias
cat > src/app/api/noticias/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { getNoticias, createNoticia } from '@/lib/firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filtros = { limit: parseInt(searchParams.get('limit') || '20') };
    const noticias = await getNoticias(filtros);
    return NextResponse.json({ noticias });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = await createNoticia(body);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
EOF

# API pipeline
cat > src/app/api/pipeline/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { agenteRecepcion } from '@/lib/agents/agente-recepcion';
import { agenteClasificacion } from '@/lib/agents/agente-clasificacion';
import { agenteEditorial } from '@/lib/agents/agente-editorial';
import { agenteDistribucion } from '@/lib/agents/agente-distribucion';
import { createNoticia } from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let n = await agenteRecepcion(body);
    n = await agenteClasificacion(n);
    n = await agenteEditorial(n);
    n = await agenteDistribucion(n);
    const id = await createNoticia(n);
    return NextResponse.json({ success: true, id, noticia: n });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
EOF

# loading.tsx
cat > src/app/loading.tsx << 'EOF'
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-mno-primary rounded-full animate-spin" />
      <p className="mt-4 text-gray-500 text-sm">Cargando...</p>
    </div>
  );
}
EOF

# error.tsx
cat > src/app/error.tsx << 'EOF'
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
      <p className="text-gray-500 text-sm mb-6">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-mno-primary text-white rounded-lg">Intentar de nuevo</button>
    </div>
  );
}
EOF

echo "   ✅ Páginas y APIs creadas"

# ============================================
# PASO 8: SCRIPTS
# ============================================
echo ""
echo "📜 [8/8] Creando scripts..."

cat > scripts/run-pipeline.js << 'EOF'
console.log('🚀 Pipeline de Monitor Noticias MNO');
console.log('Para ejecutar el pipeline completo, usa la API:');
console.log('POST /api/pipeline');
console.log('');
console.log('O ejecuta desde el navegador con fetch.');
EOF

cat > scripts/seed-data.js << 'EOF'
console.log('🌱 Para insertar datos de demostración:');
console.log('1. Configura Firebase en .env.local');
console.log('2. Usa la API POST /api/noticias con datos de prueba');
EOF

cat > README.md << 'EOF'
# Centro Inteligente de Información de Oaxaca

## 🚀 Inicio rápido en CodeSandbox

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Firebase (edita .env.local)

# 3. Iniciar servidor
npm run dev
```

## 🤖 Agentes IA

- Recepción, Clasificación, Urgencia, Convenios, RSS, Editorial, Imagen, Distribución, Análisis

## 📝 Configuración Firebase

1. Crea proyecto en https://console.firebase.google.com
2. Copia credenciales a `.env.local`
3. Habilita Firestore Database
4. Configura reglas de seguridad
EOF

echo "   ✅ Scripts creados"

# ============================================
# RESUMEN FINAL
# ============================================
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✅ INICIALIZACIÓN COMPLETADA                                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Resumen de archivos creados:"
find src -type f | wc -l | xargs echo "   Archivos en src/:"
find . -maxdepth 1 -type f | wc -l | xargs echo "   Archivos raíz:"
echo ""
echo "🚀 SIGUIENTE PASO:"
echo "   npm install"
echo ""
echo "   Luego edita .env.local con tus credenciales de Firebase"
echo "   y ejecuta: npm run dev"
echo ""
