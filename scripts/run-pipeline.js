const { agenteRecepcion } = require('./src/lib/agents/agente-recepcion');
const { agenteClasificacion } = require('./src/lib/agents/agente-clasificacion');
const { agenteUrgente } = require('./src/lib/agents/agente-urgente');
const { agenteConvenios } = require('./src/lib/agents/agente-convenios');
const { agenteRSSConfiable } = require('./src/lib/agents/agente-rss-confiable');
const { agenteEditorial } = require('./src/lib/agents/agente-editorial');
const { agenteDistribucion } = require('./src/lib/agents/agente-distribucion');
const { agenteAnalisis } = require('./src/lib/agents/agente-analisis');
const { FUENTES_CONFIABLES } = require('./src/lib/services/fuentes');
const { procesarFuenteRSS } = require('./src/lib/services/rss');
const { createNoticia } = require('./src/lib/firebase/firestore');

async function ejecutarPipeline() {
  console.log('🚀 Iniciando pipeline automático de noticias...');
  console.log('🎨 Agente de imágenes MNO activo');
  console.log(new Date().toISOString());

  const todasLasFuentes = [
    ...FUENTES_CONFIABLES.local.map(f => ({ ...f, origen: 'local' })),
    ...FUENTES_CONFIABLES.nacional.map(f => ({ ...f, origen: 'nacional' })),
    ...FUENTES_CONFIABLES.internacional.map(f => ({ ...f, origen: 'internacional' })),
  ];

  let totalProcesadas = 0;
  let totalImagenes = 0;

  for (const fuente of todasLasFuentes) {
    try {
      console.log(`📡 Procesando: ${fuente.nombre}`);
      const noticiasRSS = await procesarFuenteRSS(fuente.nombre, fuente.url, fuente.confiable);

      for (const noticia of noticiasRSS.slice(0, 5)) {
        console.log(`  📝 ${noticia.titulo.substring(0, 60)}...`);

        let n = await agenteRecepcion(noticia);
        n = await agenteRSSConfiable(n);
        n = await agenteClasificacion(n);
        n = await agenteUrgente(n);
        n = await agenteConvenios(n);
        n = await agenteEditorial(n); // Esto incluye agenteImagen
        n = await agenteDistribucion(n);

        await createNoticia(n);
        totalProcesadas++;

        if (n.imagenEditada?.procesada) {
          totalImagenes++;
          console.log(`  🎨 Imagen MNO generada: ${n.imagenEditada.url}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error con ${fuente.nombre}:`, error.message);
    }
  }

  console.log(`✅ Pipeline completado.`);
  console.log(`   📰 ${totalProcesadas} noticias procesadas`);
  console.log(`   🎨 ${totalImagenes} imágenes editadas con branding MNO`);

  // Ejecutar análisis
  try {
    await agenteAnalisis();
    console.log('📊 Análisis de tendencias completado.');
  } catch (error) {
    console.error('❌ Error en análisis:', error.message);
  }
}

ejecutarPipeline().catch(console.error);
