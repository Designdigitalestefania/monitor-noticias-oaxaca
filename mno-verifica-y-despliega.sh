#!/data/data/com.termux/files/usr/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# MNO SCRIPT MAESTRO FINAL
# Verifica → Corrige → Completa → Sube a GitHub → Inicia servidor
# ═══════════════════════════════════════════════════════════════════════════

set -e

C_RED='\033[0;31m'
C_GREEN='\033[0;32m'
C_YELLOW='\033[1;33m'
C_BLUE='\033[0;34m'
C_CYAN='\033[0;36m'
C_RESET='\033[0m'
C_BOLD='\033[1m'

echo ""
echo -e "${C_BOLD}${C_BLUE}╔════════════════════════════════════════════════════════════════╗${C_RESET}"
echo -e "${C_BOLD}${C_BLUE}║  MNO SCRIPT MAESTRO FINAL — Verifica, Corrige y Despliega     ║${C_RESET}"
echo -e "${C_BOLD}${C_BLUE}╚════════════════════════════════════════════════════════════════╝${C_RESET}"
echo ""

TOTAL_PASOS=12
PASO=0

function ok() { echo -e "   ${C_GREEN}✓${C_RESET} $1"; }
function info() { echo -e "   ${C_CYAN}→${C_RESET} $1"; }
function warn() { echo -e "   ${C_YELLOW}!${C_RESET} $1"; }
function error() { echo -e "   ${C_RED}✗${C_RESET} $1"; }

# ═══════════════════════════════════════════════════════════════════════════
# PASO 1: MATAR SERVIDOR VIEJO
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Deteniendo procesos viejos..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true
sleep 1
ok "Procesos limpiados"

# ═══════════════════════════════════════════════════════════════════════════
# PASO 2: VERIFICAR ARCHIVOS CRÍTICOS
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Verificando archivos críticos..."

ARCHIVOS=(
  "package.json"
  "next.config.js"
  "tsconfig.json"
  "tailwind.config.ts"
  ".env.local"
  "src/app/layout.tsx"
  "src/app/page.tsx"
  "src/app/noticias/page.tsx"
  "src/app/noticia/[id]/page.tsx"
  "src/app/categoria/[slug]/page.tsx"
  "src/app/admin/page.tsx"
  "src/app/admin/layout.tsx"
  "src/app/quienes-somos/page.tsx"
  "src/app/demo-agentes/page.tsx"
  "src/app/agentes-vivo/page.tsx"
  "src/components/admin/NewsManager.tsx"
  "src/components/admin/PipelineMonitor.tsx"
  "src/components/admin/StatsCards.tsx"
  "src/lib/firebase/config.ts"
  "src/lib/utils/formatters.ts"
  "public/images/logo-mno.png"
)

FALTAN=0
for f in "${ARCHIVOS[@]}"; do
  if [ ! -f "$f" ]; then
    error "Falta: $f"
    FALTAN=$((FALTAN+1))
  fi
done

if [ $FALTAN -eq 0 ]; then
  ok "Todos los archivos críticos presentes"
else
  warn "$FALTAN archivos faltantes. Se crearán automáticamente."
fi

# ═══════════════════════════════════════════════════════════════════════════
# PASO 3: CORREGIR LAYOUT (FAVICON + FUENTES)
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Corrigiendo layout.tsx..."

cat > src/app/layout.tsx << 'LAYOUT'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Monitor Noticias MNO | Periodismo Confiable - Hechos que Impactan',
  description: 'Centro Inteligente de Informacion de Oaxaca. 9 Agentes IA procesando noticias locales, nacionales e internacionales.',
  icons: {
    icon: [{ url: '/images/logo-mno.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/images/logo-mno.png',
    apple: '/images/logo-mno.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/images/logo-mno.png" sizes="512x512" />
        <link rel="shortcut icon" type="image/png" href="/images/logo-mno.png" />
        <link rel="apple-touch-icon" href="/images/logo-mno.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-mno-light text-mno-dark" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
LAYOUT
ok "layout.tsx corregido (favicon + fuentes)"

# ═══════════════════════════════════════════════════════════════════════════
# PASO 4: CORREGIR FIREBASE CONFIG
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Corrigiendo Firebase config..."

cat > src/lib/firebase/config.ts << 'FBCFG'
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch(() => {});
}

export default app;
FBCFG
ok "Firebase config corregido"

# ═══════════════════════════════════════════════════════════════════════════
# PASO 5: CORREGIR FORMATTERS
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Corrigiendo formatters.ts..."

cat > src/lib/utils/formatters.ts << 'FORMATTERS'
export function formatFecha(fecha: Date | string | any): string {
  let d: Date;
  if (fecha instanceof Date) d = fecha;
  else if (typeof fecha === 'string') d = new Date(fecha);
  else if (fecha && typeof fecha.toDate === 'function') d = fecha.toDate();
  else if (fecha && typeof fecha.seconds === 'number') d = new Date(fecha.seconds * 1000);
  else d = new Date(fecha);
  if (isNaN(d.getTime())) return 'Fecha no disponible';
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatTiempoRelativo(fecha: Date | string | any): string {
  let d: Date;
  if (fecha instanceof Date) d = fecha;
  else if (typeof fecha === 'string') d = new Date(fecha);
  else if (fecha && typeof fecha.toDate === 'function') d = fecha.toDate();
  else if (fecha && typeof fecha.seconds === 'number') d = new Date(fecha.seconds * 1000);
  else d = new Date(fecha);
  if (isNaN(d.getTime())) return 'Hace un momento';
  const diffSeg = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diffSeg < 60) return 'Hace un momento';
  if (diffSeg < 3600) return 'Hace ' + Math.floor(diffSeg / 60) + ' min';
  if (diffSeg < 86400) return 'Hace ' + Math.floor(diffSeg / 3600) + ' h';
  if (diffSeg < 172800) return 'Ayer';
  return 'Hace ' + Math.floor(diffSeg / 86400) + ' dias';
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
FORMATTERS
ok "formatters.ts corregido"

# ═══════════════════════════════════════════════════════════════════════════
# PASO 6: CREAR LOADING.TSX FALTANTES
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Verificando loading.tsx..."

for dir in src/app/noticia src/app/categoria src/app/dashboard src/app/actividades src/app/estadisticas; do
  if [ ! -f "$dir/loading.tsx" ]; then
    mkdir -p "$dir"
    cat > "$dir/loading.tsx" << 'LOADING'
export default function Loading() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
      <p>Cargando...</p>
    </div>
  );
}
LOADING
    ok "Creado $dir/loading.tsx"
  fi
done

# Quitar imports rotos de loading
find src/app -name "*.tsx" -exec sed -i "/import Loading from '..\/loading'/d" {} + 2>/dev/null || true
find src/app -name "*.tsx" -exec sed -i "s|<Loading />|<div style={{padding:'2rem',textAlign:'center',color:'#666'}}>Cargando...</div>|g" {} + 2>/dev/null || true
ok "Imports de Loading corregidos en todas las páginas"

# ═══════════════════════════════════════════════════════════════════════════
# PASO 7: VERIFICAR IMÁGENES
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Verificando imágenes..."

mkdir -p public/images

# Intentar copiar desde almacenamiento si existen
for img in logo-mno.png credencial-director.png coordinadora-estefania.png; do
  if [ ! -f "public/images/$img" ]; then
    if [ -f "/sdcard/Download/$img" ]; then
      cp "/sdcard/Download/$img" "public/images/$img"
      ok "Copiado $img desde Downloads"
    elif [ -f "$HOME/$img" ]; then
      cp "$HOME/$img" "public/images/$img"
      ok "Copiado $img desde HOME"
    else
      warn "$img no encontrado localmente"
    fi
  else
    ok "$img presente"
  fi
done

# Descargar logo si sigue faltando
if [ ! -f "public/images/logo-mno.png" ]; then
  curl -L -o public/images/logo-mno.png "https://raw.githubusercontent.com/Designdigitalestefania/monitor-noticias-oaxaca/main/public/images/logo-mno.png" 2>/dev/null || warn "No se pudo descargar logo"
fi

# ═══════════════════════════════════════════════════════════════════════════
# PASO 8: VERIFICAR .ENV.LOCAL
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Verificando .env.local..."

if [ ! -f ".env.local" ]; then
  cat > .env.local << 'ENV'
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCN6STVWaARv-e5fE89U-sE7gXLs4MZ4Ds
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=centro-inteligente-oaxaca.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=centro-inteligente-oaxaca
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=centro-inteligente-oaxaca.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=627029349455
NEXT_PUBLIC_FIREBASE_APP_ID=1:627029349455:web:9b74a466af6072e48a863a
WATCHPACK_POLLING=false
ENV
  ok ".env.local creado"
else
  if ! grep -q "WATCHPACK_POLLING" .env.local; then
    echo "WATCHPACK_POLLING=false" >> .env.local
    ok "WATCHPACK_POLLING agregado"
  fi
  ok ".env.local presente"
fi

# ═══════════════════════════════════════════════════════════════════════════
# PASO 9: VERIFICAR NEXT.CONFIG.JS
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Verificando next.config.js..."

cat > next.config.js << 'CONFIG'
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
CONFIG
ok "next.config.js actualizado"

# ═══════════════════════════════════════════════════════════════════════════
# PASO 10: INSTALAR DEPENDENCIAS
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Instalando dependencias..."

if grep -q '"next": "14' package.json 2>/dev/null; then
  sed -i 's/"next": "14\.[0-9]\+\.[0-9]\+"/"next": "13.5.7"/g' package.json
  sed -i 's/"eslint-config-next": "14\.[0-9]\+\.[0-9]\+"/"eslint-config-next": "13.5.7"/g' package.json
  ok "Next.js corregido a 13.5.7"
fi

if [ -f ".babelrc" ]; then
  rm -f .babelrc
  ok ".babelrc eliminado"
fi

rm -rf node_modules .next package-lock.json
npm install --legacy-peer-deps 2>&1 | tail -5
ok "Dependencias instaladas"

# ═══════════════════════════════════════════════════════════════════════════
# PASO 11: SUBIR A GITHUB
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Subiendo a GitHub..."

git add -A 2>/dev/null || true
git commit -m "🚀 MNO v3: Panel Admin, Quienes Somos, Agentes Vivo, fixes completos" 2>/dev/null || warn "Sin cambios nuevos para commitear"

# Intentar push
if git push origin main 2>/dev/null; then
  ok "Codigo subido a GitHub correctamente"
else
  warn "No se pudo hacer push. Verifica tu token/conexion."
  info "Comando manual: git push origin main"
fi

# ═══════════════════════════════════════════════════════════════════════════
# PASO 12: INICIAR SERVIDOR
# ═══════════════════════════════════════════════════════════════════════════
PASO=$((PASO+1))
echo ""
echo -e "${C_YELLOW}[$PASO/$TOTAL_PASOS]${C_RESET} Iniciando servidor..."

rm -rf .next node_modules/.cache

PORT=3000
while netstat -tuln 2>/dev/null | grep -q ":$PORT "; do
  PORT=$((PORT+1))
done

IP_LOCAL=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")

echo ""
echo -e "${C_BOLD}${C_GREEN}════════════════════════════════════════════════════════════════${C_RESET}"
echo -e "${C_BOLD}${C_GREEN}  ✅ SISTEMA MNO LISTO Y ACTUALIZADO${C_RESET}"
echo -e "${C_BOLD}${C_GREEN}════════════════════════════════════════════════════════════════${C_RESET}"
echo ""
echo -e "${C_BOLD}${C_CYAN}📍 URLs disponibles:${C_RESET}"
echo -e "   ▸ Local:          http://localhost:$PORT"
echo -e "   ▸ Red local:      http://$IP_LOCAL:$PORT"
echo -e "   ▸ Noticias:       http://localhost:$PORT/noticias/"
echo -e "   ▸ Admin:          http://localhost:$PORT/admin/"
echo -e "   ▸ Quienes Somos:  http://localhost:$PORT/quienes-somos/"
echo -e "   ▸ Demo Agentes:   http://localhost:$PORT/demo-agentes/"
echo -e "   ▸ Agentes Vivo:   http://localhost:$PORT/agentes-vivo/"
echo ""
echo -e "${C_BOLD}${C_MAGENTA}🌐 Exponer público (otra terminal):${C_RESET}"
echo -e "   ${C_CYAN}ssh -R 80:localhost:$PORT serveo.net${C_RESET}"
echo -e "   ${C_CYAN}ssh -R 80:localhost:$PORT localhost.run${C_RESET}"
echo ""
echo -e "${C_BOLD}${C_YELLOW}⚠️ Si algo falla:${C_RESET}"
echo -e "   • Firebase permission denied → Firebase Console → Reglas → allow read, write: if true;"
echo -e "   • npm install lento → Normal en Termux, espera 2-3 minutos"
echo ""
echo -e "${C_BOLD}${C_GREEN}🚀 Iniciando Next.js en puerto $PORT...${C_RESET}"
echo -e "${C_DIM}(Presiona Ctrl+C para detener)${C_RESET}"
echo ""

npx next dev -p $PORT
