#!/bin/bash
set -e

echo "🚀 Configurando Centro Inteligente de Información de Oaxaca"

# Crear proyecto Next.js
echo "📦 Creando proyecto Next.js..."
npx create-next-app@latest centro-inteligente-oaxaca --typescript --tailwind --app --eslint --no-turbopack

cd centro-inteligente-oaxaca

# Instalar dependencias
echo "📥 Instalando dependencias..."
npm install firebase react-hot-toast xml2js
npm install -D @types/node @types/xml2js

# Crear estructura de carpetas
echo "📁 Creando estructura de carpetas..."
mkdir -p .github/workflows
mkdir -p public/images/categorias
mkdir -p scripts
mkdir -p src/app/api/{pipeline,monitorear,redactar,disenar,distribuir,publicar,noticias,estadisticas,analisis}
mkdir -p src/app/dashboard
mkdir -p src/app/noticias
mkdir -p src/app/noticia/\[id\]
mkdir -p src/app/categoria/\[slug\]
mkdir -p src/app/buscar
mkdir -p src/components/{ui,layout,news,dashboard,shared}
mkdir -p src/hooks
mkdir -p src/lib/{firebase,services,agents,utils}
mkdir -p src/types

echo "✅ Configuración completada. Ahora copia los archivos del proyecto."
