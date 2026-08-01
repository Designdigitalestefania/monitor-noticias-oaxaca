# 🚀 Guía Rápida: CodeSandbox

## Opción 1: Importar desde GitHub (RECOMENDADO)

### Paso 1: Crear repositorio en GitHub
```bash
# En tu terminal local (o en CodeSandbox terminal)
git init
git add .
git commit -m "Primer commit - Centro Inteligente de Información de Oaxaca"

# Crea un repo nuevo en GitHub (sin README, sin .gitignore)
# Luego ejecuta:
git remote add origin https://github.com/TU_USUARIO/centro-inteligente-oaxaca.git
git branch -M main
git push -u origin main
```

### Paso 2: Abrir en CodeSandbox
1. Ve a [codesandbox.io](https://codesandbox.io)
2. Haz clic en **"Import from GitHub"**
3. Pega la URL de tu repo: `https://github.com/TU_USUARIO/centro-inteligente-oaxaca`
4. ¡Listo! CodeSandbox detectará automáticamente Next.js y ejecutará `npm run dev`

---

## Opción 2: Crear Sandbox desde cero

1. Ve a [codesandbox.io](https://codesandbox.io)
2. Crea un **Blank sandbox** (Node.js)
3. En la terminal de CodeSandbox, ejecuta:

```bash
# Descargar el proyecto
curl -L -o proyecto.zip "URL_DEL_ZIP"
unzip proyecto.zip
mv centro-inteligente-oaxaca/* .
mv centro-inteligente-oaxaca/.* . 2>/dev/null || true
rmdir centro-inteligente-oaxaca
rm proyecto.zip

# Configurar
bash scripts/setup-codesandbox.sh
```

---

## Opción 3: Usar esta plantilla directamente

Haz clic en este botón para abrir el proyecto en CodeSandbox:

[![Abrir en CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/TU_USUARIO/centro-inteligente-oaxaca)

*(Reemplaza `TU_USUARIO` con tu usuario de GitHub después de subir el repo)*

---

## ⚙️ Configuración en CodeSandbox

### 1. Variables de entorno
En CodeSandbox, ve a:
- **Menu** → **Environment Variables**
- Agrega las variables de Firebase (las mismas de `.env.local`)

O edita directamente el archivo `.env.local` en el editor.

### 2. Firebase
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Copia las credenciales a las variables de entorno
3. Crea las colecciones: `noticias`, `actividades`, `estadisticas`

### 3. Puerto
CodeSandbox detecta automáticamente el puerto 3000 de Next.js.
Si no, ve a la pestaña **Ports** y haz clic en el puerto 3000.

---

## 🖥️ Comandos en la terminal de CodeSandbox

```bash
# Instalar todo (ya se hace automático)
npm install

# Instalar sharp (procesamiento de imágenes)
npm install sharp

# Iniciar servidor de desarrollo
npm run dev

# Insertar datos de demostración
npm run seed

# Ejecutar pipeline manualmente
npm run pipeline

# Compilar para producción
npm run build
```

---

## 🎨 Agente de Imágenes en CodeSandbox

El agente de imágenes MNO funciona perfectamente en CodeSandbox porque:
- **Sharp** está incluido en las dependencias
- El procesamiento es 100% server-side (API routes)
- No requiere GPU ni librerías del sistema operativo

---

## 🆘 Solución de problemas

### "Cannot find module 'sharp'"
```bash
npm install sharp
```

### "Firebase error: permission denied"
Configura las reglas de Firestore en modo prueba:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Puerto no se abre
Ve a la pestaña **Ports** (abajo) y haz clic en el enlace del puerto 3000.

---

## 📞 Soporte

¿Problemas? Revisa:
1. `README.md` principal
2. Archivos en `src/lib/agents/` para entender cada agente
3. Consola del navegador (F12) para errores frontend
