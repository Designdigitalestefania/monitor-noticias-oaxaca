const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const noticiasDemo = [
  {
    titulo: 'Gobierno de Oaxaca anuncia nuevo programa de seguridad ciudadana',
    tituloOriginal: 'Gobierno de Oaxaca anuncia nuevo programa de seguridad ciudadana',
    contenido: 'El gobierno estatal presentó un nuevo programa integral de seguridad que incluye patrullaje inteligente, cámaras de videovigilancia y capacitación policial. La inversión total asciende a 500 millones de pesos.',
    resumen: 'Nuevo programa de seguridad con inversión de 500 MDP.',
    categoria: 'seguridad',
    origen: 'local',
    prioridad: 'alta',
    nivelPublicacion: 'nivel1_urgente',
    estado: 'publicada',
    fuente: { nombre: 'NVI Noticias', url: 'https://nvinoticias.com', tipo: 'rss_local', confiable: true },
    fechaPublicacion: Timestamp.now(),
    fechaDeteccion: Timestamp.now(),
    imagen: { url: 'https://images.unsplash.com/photo-1453873419266-ec65171f8dcb?w=800' },
    tags: ['seguridad', 'oaxaca', 'gobierno'],
    metadata: { vistas: 1240, compartidos: 85 },
    esNotaServidor: false,
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ['Procesada automáticamente'], version: 1, editadoPor: 'sistema_automatico' },
    elementosVisuales: { emojis: ['🚨', '👮'], ctas: ['Mantente informado'], quotesDestacados: [], puntosClave: [] },
    impacto: { nivel: 'alto', puntuacion: 85, palabrasClave: ['seguridad', 'oaxaca'] },
  },
  {
    titulo: 'La Guelaguetza 2024 rompe récord de asistencia',
    tituloOriginal: 'La Guelaguetza 2024 rompe récord de asistencia',
    contenido: 'Más de 150,000 visitantes asistieron a las presentaciones de la Guelaguetza este año, superando todas las expectativas. La feria del mezcal y el mercado de artesanías también registraron cifras históricas.',
    resumen: '150,000 visitantes en la Guelaguetza 2024.',
    categoria: 'cultura',
    origen: 'local',
    prioridad: 'media',
    nivelPublicacion: 'nivel2_semiautomatico',
    estado: 'publicada',
    fuente: { nombre: 'Oaxaca En Línea', url: 'https://oaxacaenlinea.com', tipo: 'rss_local', confiable: true },
    fechaPublicacion: Timestamp.now(),
    fechaDeteccion: Timestamp.now(),
    imagen: { url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800' },
    tags: ['guelaguetza', 'cultura', 'turismo'],
    metadata: { vistas: 3200, compartidos: 410 },
    esNotaServidor: false,
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ['Aplicado toque editorial'], version: 2, editadoPor: 'sistema_automatico' },
    elementosVisuales: { emojis: ['🎭', '🎨', '🎵'], ctas: ['Vive nuestras tradiciones'], quotesDestacados: [], puntosClave: [] },
    impacto: { nivel: 'medio', puntuacion: 70, palabrasClave: ['guelaguetza', 'cultura'] },
  },
  {
    titulo: 'Inflación en México se estabiliza al 4.5% anual',
    tituloOriginal: 'Inflación en México se estabiliza al 4.5% anual',
    contenido: 'El INEGI reportó que la inflación anual se ubicó en 4.5%, dentro del rango objetivo del Banco de México. Los analistas proyectan una reducción gradual durante el segundo semestre del año.',
    resumen: 'Inflación se estabiliza en 4.5% según INEGI.',
    categoria: 'economia',
    origen: 'nacional',
    prioridad: 'media',
    nivelPublicacion: 'nivel2_semiautomatico',
    estado: 'publicada',
    fuente: { nombre: 'El Universal', url: 'https://eluniversal.com.mx', tipo: 'rss_nacional', confiable: true },
    fechaPublicacion: Timestamp.now(),
    fechaDeteccion: Timestamp.now(),
    imagen: { url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800' },
    tags: ['inflación', 'economía', 'méxico'],
    metadata: { vistas: 890, compartidos: 120 },
    esNotaServidor: false,
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ['Procesada automáticamente'], version: 1, editadoPor: 'sistema_automatico' },
    elementosVisuales: { emojis: ['💰', '📈'], ctas: ['Datos que importan'], quotesDestacados: [], puntosClave: [] },
    impacto: { nivel: 'medio', puntuacion: 65, palabrasClave: ['inflación', 'economía'] },
  },
];

async function seedData() {
  console.log('🌱 Insertando datos de demostración...');

  for (const noticia of noticiasDemo) {
    try {
      await addDoc(collection(db, 'noticias'), noticia);
      console.log(`✅ Noticia agregada: ${noticia.titulo}`);
    } catch (error) {
      console.error(`❌ Error agregando noticia:`, error);
    }
  }

  console.log('✅ Datos de demostración insertados correctamente.');
}

seedData().catch(console.error);
