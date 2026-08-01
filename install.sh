#!/bin/bash
# ============================================================
# INSTALADOR RÁPIDO PARA CODESANDBOX
# Centro Inteligente de Información de Oaxaca
# ============================================================

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  📰 CENTRO INTELIGENTE DE INFORMACIÓN DE OAXACA            ║"
echo "║  Monitor Noticias MNO - Periodismo Confiable               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar entorno
echo -e "${BLUE}🔍 Verificando entorno...${NC}"
node -v && echo -e "${GREEN}✅ Node.js OK${NC}" || echo -e "${RED}❌ Node.js no encontrado${NC}"
npm -v && echo -e "${GREEN}✅ npm OK${NC}" || echo -e "${RED}❌ npm no encontrado${NC}"

# 2. Instalar dependencias
echo ""
echo -e "${BLUE}📦 Instalando dependencias principales...${NC}"
npm install
echo -e "${GREEN}✅ Dependencias instaladas${NC}"

# 3. Instalar sharp
echo ""
echo -e "${BLUE}🎨 Instalando Sharp (procesamiento de imágenes)...${NC}"
npm install sharp
echo -e "${GREEN}✅ Sharp instalado${NC}"

# 4. Crear .env.local si no existe
echo ""
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Creando .env.local de ejemplo...${NC}"
    cat > .env.local << 'EOF'
# ============================================
# CONFIGURACIÓN FIREBASE
# Reemplaza estos valores con tus credenciales
# ============================================
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# ============================================
# SEGURIDAD
# ============================================
PIPELINE_SECRET=tu-secret-key-muy-seguro-aleatorio-123456

# ============================================
# OPCIONAL
# ============================================
UNSPLASH_ACCESS_KEY=tu_unsplash_key
EOF
    echo -e "${GREEN}✅ .env.local creado${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE: Edita .env.local con tus credenciales de Firebase${NC}"
else
    echo -e "${GREEN}✅ .env.local ya existe${NC}"
fi

# 5. Verificar estructura
echo ""
echo -e "${BLUE}📁 Verificando estructura del proyecto...${NC}"
AGENTES=$(find src/lib/agents -name "*.ts" 2>/dev/null | wc -l)
COMPONENTES=$(find src/components -name "*.tsx" 2>/dev/null | wc -l)
APIS=$(find src/app/api -name "route.ts" 2>/dev/null | wc -l)
HOOKS=$(find src/hooks -name "*.ts" 2>/dev/null | wc -l)

echo -e "   ${GREEN}🤖 Agentes IA: $AGENTES${NC}"
echo -e "   ${GREEN}🎨 Componentes: $COMPONENTES${NC}"
echo -e "   ${GREEN}📡 APIs: $APIS${NC}"
echo -e "   ${GREEN}⚡ Hooks: $HOOKS${NC}"

# 6. Verificar agente de imágenes
if [ -f "src/lib/agents/agente-imagen.ts" ]; then
    echo -e "   ${GREEN}🖼️  Agente de Imágenes MNO: OK${NC}"
else
    echo -e "   ${RED}❌ Agente de Imágenes MNO: No encontrado${NC}"
fi

# 7. Resumen final
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  ✅ INSTALACIÓN COMPLETADA                                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🚀 Para iniciar el servidor:${NC}"
echo "   npm run dev"
echo ""
echo -e "${GREEN}📊 Otros comandos útiles:${NC}"
echo "   npm run seed      → Insertar datos de demostración"
echo "   npm run pipeline  → Ejecutar pipeline manualmente"
echo "   npm run build     → Compilar para producción"
echo ""
echo -e "${YELLOW}⚠️  NO OLVIDES:${NC}"
echo "   1. Editar .env.local con tus credenciales de Firebase"
echo "   2. Crear un proyecto en https://console.firebase.google.com"
echo "   3. Habilitar Firestore Database"
echo ""
echo -e "${BLUE}📖 Documentación:${NC}"
echo "   README.md        → Documentación general"
echo "   CODESANDBOX.md   → Guía específica para CodeSandbox"
echo ""
