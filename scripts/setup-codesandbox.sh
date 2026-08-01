#!/bin/bash
set -e

echo "🚀 Configurando Centro Inteligente de Información de Oaxaca en CodeSandbox"
echo "======================================================================="
echo ""

# Verificar que estamos en CodeSandbox
if [ -n "$CSB_SANDBOX_ID" ]; then
    echo "✅ Detectado entorno CodeSandbox"
else
    echo "⚠️  No se detectó CodeSandbox, pero continuamos..."
fi

echo ""
echo "📦 Paso 1: Instalando dependencias..."
npm install

echo ""
echo "🔧 Paso 2: Verificando sharp..."
npm install sharp

echo ""
echo "📁 Paso 3: Verificando estructura..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  Creando .env.local de ejemplo..."
    cat > .env.local << 'EOF'
# Firebase - REEMPLAZA CON TUS CREDENCIALES
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Seguridad
PIPELINE_SECRET=tu-secret-key-muy-seguro-123

# Opcional
UNSPLASH_ACCESS_KEY=tu_unsplash_key
EOF
    echo "✅ .env.local creado. Edítalo con tus credenciales de Firebase."
else
    echo "✅ .env.local ya existe"
fi

echo ""
echo "🎨 Paso 4: Verificando agente de imágenes..."
if [ -f "src/lib/agents/agente-imagen.ts" ]; then
    echo "✅ Agente de imágenes MNO encontrado"
else
    echo "❌ Agente de imágenes no encontrado"
fi

echo ""
echo "📊 Paso 5: Resumen del proyecto..."
echo "   - Total de archivos: $(find src -type f | wc -l)"
echo "   - Agentes IA: $(find src/lib/agents -name '*.ts' | wc -l)"
echo "   - Componentes: $(find src/components -name '*.tsx' | wc -l)"
echo "   - APIs: $(find src/app/api -name 'route.ts' | wc -l)"
echo "   - Hooks: $(find src/hooks -name '*.ts' | wc -l)"

echo ""
echo "======================================================================="
echo "✅ CONFIGURACIÓN COMPLETADA"
echo ""
echo "📝 SIGUIENTES PASOS:"
echo "   1. Edita .env.local con tus credenciales de Firebase"
echo "   2. Ejecuta: npm run dev"
echo "   3. Abre la URL que aparece (normalmente http://localhost:3000)"
echo ""
echo "🔥 COMANDOS ÚTILES:"
echo "   npm run dev      → Inicia servidor de desarrollo"
echo "   npm run build    → Compila para producción"
echo "   npm run seed     → Inserta datos de demostración"
echo "   npm run pipeline → Ejecuta pipeline manualmente"
echo ""
echo "📚 DOCUMENTACIÓN:"
echo "   Lee README.md para más detalles"
echo "======================================================================="
