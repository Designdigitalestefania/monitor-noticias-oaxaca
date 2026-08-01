# Centro Inteligente de Información de Oaxaca

> **Monitor Noticias MNO** — Periodismo Confiable | Hechos que Impactan

Plataforma editorial automatizada que recibe notas de servidores públicos y fuentes RSS, las procesa con un "toque editorial MNO", **edita imágenes automáticamente con branding**, y las publica en Web, Facebook, Twitter, Instagram y WhatsApp.

## 🚀 Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Firebase Firestore**
- **Sharp** (procesamiento de imágenes)
- **GitHub Actions** (automatización)
- **Unsplash API** (imágenes)

## 🎨 Agente de Edición de Imágenes MNO

El agente de imágenes (`agente-imagen.ts`) se encarga de:

1. **Descargar** la imagen original de la noticia
2. **Procesarla** con Sharp aplicando:
   - Overlay con gradiente según categoría
   - Título impactante con tipografía bold
   - Emojis decorativos
   - Badge de categoría
   - Logo y branding MNO
3. **Generar variantes** optimizadas para cada plataforma:
   - 🌐 **Web** (1200×630) — OpenGraph
   - 📸 **Instagram Feed** (1080×1080)
   - 🐦 **Twitter/X** (1200×675)
   - 📱 **Stories** (1080×1920)
   - 💬 **WhatsApp** (800×800)
4. **Generar fallback** cuando no hay imagen original

### Colores por categoría:

| Categoría | Primario | Secundario | Acento |
|-----------|----------|------------|--------|
| Política | #1e3a5f | #2c5282 | #63b3ed |
| Seguridad | #742a2a | #c53030 | #fc8181 |
| Cultura | #553c9a | #805ad5 | #d6bcfa |
| Economía | #22543d | #38a169 | #9ae6b4 |
| General | #1a202c | #4a5568 | #a0aec0 |

## 🤖 Los 9 Agentes IA

| # | Agente | Archivo | Función |
|---|--------|---------|---------|
| 1 | Recepción | `agente-recepcion.ts` | Recibe notas de todas las fuentes |
| 2 | Clasificación | `agente-clasificacion.ts` | Clasifica por origen, categoría, prioridad |
| 3 | Urgencia | `agente-urgente.ts` | Procesa alertas (Nivel 1) |
| 4 | Convenios | `agente-convenios.ts` | Procesa notas de 6 servidores públicos |
| 5 | RSS Confiable | `agente-rss-confiable.ts` | Procesa RSS de fuentes verificadas |
| 6 | Editorial | `agente-editorial.ts` | Aplica "toque MNO" + ejecuta agente-imagen |
| 7 | **Imagen** | **`agente-imagen.ts`** | **Descarga, edita y genera variantes de imagen** |
| 8 | Distribución | `agente-distribucion.ts` | Publica en Web, FB, TW, IG, WA con imágenes editadas |
| 9 | Análisis | `agente-analisis.ts` | Detecta tendencias y genera reportes |

## 📁 Estructura del Proyecto

```
centro-inteligente-oaxaca/
├── .github/workflows/pipeline.yml    # Pipeline automático cada 15 min
├── scripts/                          # Scripts de utilidad
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── imagen/route.ts      # API para procesar imágenes
│   │   │   └── ...                  # Otras APIs
│   │   ├── noticia/[id]/            # Detalle con variantes de imagen
│   │   └── ...
│   ├── components/
│   │   ├── news/
│   │   │   ├── ImageEditor.tsx      # Editor de imágenes MNO
│   │   │   ├── ImageVariants.tsx    # Muestra variantes por plataforma
│   │   │   └── NewsCard.tsx         # Usa imagenEditada cuando disponible
│   │   └── ...
│   ├── lib/
│   │   ├── agents/
│   │   │   ├── agente-imagen.ts     # 🎨 NUEVO: Procesamiento de imágenes
│   │   │   ├── agente-editorial.ts  # Integra agente-imagen
│   │   │   ├── agente-distribucion.ts # Usa imágenes editadas
│   │   │   └── ...
│   │   └── ...
│   └── types/
│       └── index.ts                 # Incluye campo imagenEditada
```

## ⚙️ Configuración

1. Clona el repositorio
2. Copia `.env.local` y configura tus credenciales de Firebase
3. Instala dependencias: `npm install`
4. **Instala Sharp** (necesario para procesamiento de imágenes): `npm install sharp`
5. Ejecuta el servidor de desarrollo: `npm run dev`
6. (Opcional) Inserta datos demo: `npm run seed`

## 📡 Fuentes RSS

- **Local (Oaxaca):** NVI Noticias, Oaxaca En Línea, Imparcial Oaxaca, El Piñero
- **Nacional:** El Universal, Milenio, Reforma, La Jornada, Aristegui Noticias, Animal Político
- **Internacional:** CNN México, BBC Mundo, El País México, France 24, DW Español

## 🔄 Pipeline Automático

El pipeline se ejecuta cada **15 minutos** vía GitHub Actions:

1. Monitorea 23 fuentes RSS
2. Clasifica y prioriza noticias
3. Aplica el toque editorial MNO
4. **🎨 Procesa imágenes con branding MNO**
5. Genera contenido para redes sociales con imágenes optimizadas
6. Publica en Firebase Firestore

## 📄 Licencia

MIT — Uso libre para fines periodísticos y educativos.
