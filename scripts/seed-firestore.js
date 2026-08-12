const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCN6STVWaARv-e5fE89U-sE7gXLs4MZ4Ds",
  authDomain: "centro-inteligente-oaxaca.firebaseapp.com",
  projectId: "centro-inteligente-oaxaca",
  storageBucket: "centro-inteligente-oaxaca.firebasestorage.app",
  messagingSenderId: "627029349455",
  appId: "1:627029349455:web:9b74a466af6072e48a863a",
  measurementId: "G-EH1XL4FVC5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const noticias = [
  {
    id: "noticia-001",
    titulo: "🚨 Alerta: Sismo de magnitud 4.2 sacude el Istmo de Tehuantepec",
    tituloOriginal: "Sismo de magnitud 4.2 en el Istmo de Tehuantepec",
    contenido: "Un sismo de magnitud 4.2 en la escala de Richter fue registrado esta madrugada en la región del Istmo de Tehuantepec, Oaxaca. El epicentro se ubicó a 15 kilómetros al suroeste de Salina Cruz. Protección Civil estatal activó protocolos de revisión en inmuebles. Hasta el momento no se reportan daños materiales ni personas lesionadas.",
    resumen: "Sismo de 4.2 grados en el Istmo de Tehuantepec. Sin daños reportados. Protección Civil activa protocolos.",
    categoria: "seguridad",
    origen: "local",
    prioridad: "alta",
    nivelPublicacion: "nivel1_urgente",
    estado: "publicada",
    fuente: { nombre: "Protección Civil Oaxaca", url: "https://www.proteccioncivil.oaxaca.gob.mx", tipo: "rss_local", confiable: true },
    fechaPublicacion: Timestamp.fromDate(new Date("2026-08-01T08:30:00")),
    fechaDeteccion: Timestamp.fromDate(new Date("2026-08-01T08:15:00")),
    imagen: { url: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?w=800", creditos: "Unsplash" },
    tags: ["sismo", "istmo", "tehuantepec", "proteccion civil", "alerta"],
    metadata: { vistas: 1240, compartidos: 89 },
    esNotaServidor: true,
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ["Titulo optimizado con emoji"], version: 2, editadoPor: "agente-urgente" },
    elementosVisuales: { emojis: ["🚨","⚠️","🔴"], ctas: ["Mantente informado","Comparte esta alerta"], quotesDestacados: ["Protección Civil activó protocolos"], puntosClave: ["Magnitud 4.2","Epicentro: Salina Cruz","Sin daños"] },
    impacto: { nivel: "alto", puntuacion: 92, palabrasClave: ["sismo","alerta"] }
  },
  {
    id: "noticia-002",
    titulo: "🏛️ Congreso de Oaxaca aprueba presupuesto histórico de 85 mil MDP para 2027",
    tituloOriginal: "Aprueba Congreso presupuesto de egresos 2027",
    contenido: "El Congreso del Estado de Oaxaca aprobó por mayoría el Presupuesto de Egresos para el ejercicio fiscal 2027, que asciende a 85 mil millones de pesos. Destacan las partidas para educación, salud e infraestructura carretera.",
    resumen: "Presupuesto 2027 de 85,000 MDP aprobado. Incluye educación, salud e infraestructura.",
    categoria: "politica",
    origen: "local",
    prioridad: "alta",
    nivelPublicacion: "nivel2_semiautomatico",
    estado: "publicada",
    fuente: { nombre: "Congreso del Estado", url: "https://www.congresooaxaca.gob.mx", tipo: "convenio", confiable: true },
    fechaPublicacion: Timestamp.fromDate(new Date("2026-08-01T14:00:00")),
    fechaDeteccion: Timestamp.fromDate(new Date("2026-08-01T13:30:00")),
    imagen: { url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800", creditos: "Unsplash" },
    tags: ["presupuesto","congreso","oaxaca","gobierno"],
    metadata: { vistas: 856, compartidos: 42 },
    esNotaServidor: true,
    servidorPublico: { nombre: "Lic. María Elena Reyes", cargo: "Diputada", dependencia: "Congreso del Estado", contacto: "prensa@congresooaxaca.gob.mx" },
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ["Titulo con emoji"], version: 1, editadoPor: "agente-editorial" },
    elementosVisuales: { emojis: ["🏛️","🗳️","📜"], ctas: ["Informate","Sigue la cobertura"], quotesDestacados: ["Un paso firme hacia el desarrollo"], puntosClave: ["85,000 MDP","Educación y salud","PRI voto en contra"] },
    impacto: { nivel: "alto", puntuacion: 88, palabrasClave: ["presupuesto","congreso"] }
  },
  {
    id: "noticia-003",
    titulo: "🎭 La Guelaguetza 2026 rompe récord con más de 120 mil asistentes",
    tituloOriginal: "Guelaguetza 2026 supera expectativas",
    contenido: "La máxima fiesta de Oaxaca concluyó con récord histórico: más de 120 mil espectadores en sus cuatro funciones. La derrama económica se estima en 450 millones de pesos.",
    resumen: "Guelaguetza 2026 con 120,000 asistentes. Derrama económica de 450 MDP.",
    categoria: "cultura",
    origen: "local",
    prioridad: "media",
    nivelPublicacion: "nivel2_semiautomatico",
    estado: "publicada",
    fuente: { nombre: "Secretaría de Turismo", url: "https://www.turismo.oaxaca.gob.mx", tipo: "convenio", confiable: true },
    fechaPublicacion: Timestamp.fromDate(new Date("2026-07-28T18:00:00")),
    fechaDeteccion: Timestamp.fromDate(new Date("2026-07-28T17:00:00")),
    imagen: { url: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800", creditos: "Unsplash" },
    tags: ["guelaguetza","cultura","turismo","tradicion"],
    metadata: { vistas: 3420, compartidos: 567 },
    esNotaServidor: false,
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ["Titulo optimizado"], version: 1, editadoPor: "agente-editorial" },
    elementosVisuales: { emojis: ["🎭","🎨","🎵"], ctas: ["Descubre Oaxaca","Vive nuestras tradiciones"], quotesDestacados: ["Ya trabajamos en la edición 2027"], puntosClave: ["120,000 asistentes","450 MDP derrama","8 regiones"] },
    impacto: { nivel: "medio", puntuacion: 75, palabrasClave: ["guelaguetza","cultura"] }
  },
  {
    id: "noticia-004",
    titulo: "💰 Oaxaca atrae inversión extranjera por 250 MDP en sector turístico",
    tituloOriginal: "Inversión extranjera fortalece turismo",
    contenido: "Inversionistas españoles y estadounidenses anunciaron 250 millones de pesos para 5 nuevos hoteles boutique en Puerto Escondido y Huatulco. Se generarán 800 empleos directos.",
    resumen: "250 MDP de inversión extranjera. 5 hoteles boutique. 800 empleos directos.",
    categoria: "economia",
    origen: "local",
    prioridad: "media",
    nivelPublicacion: "nivel3_editorial",
    estado: "publicada",
    fuente: { nombre: "El Imparcial", url: "https://www.elimparcial.com", tipo: "rss_local", confiable: true },
    fechaPublicacion: Timestamp.fromDate(new Date("2026-07-30T10:00:00")),
    fechaDeteccion: Timestamp.fromDate(new Date("2026-07-30T09:30:00")),
    imagen: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", creditos: "Unsplash" },
    tags: ["inversion","turismo","empleo","puerto escondido"],
    metadata: { vistas: 620, compartidos: 34 },
    esNotaServidor: false,
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ["Cifras verificadas"], version: 1, editadoPor: "agente-editorial" },
    elementosVisuales: { emojis: ["💰","📈","🏭"], ctas: ["Oportunidades","Impulsa tu economia"], quotesDestacados: ["Destino de mayor crecimiento"], puntosClave: ["250 MDP","5 hoteles","800 empleos"] },
    impacto: { nivel: "medio", puntuacion: 68, palabrasClave: ["inversion","turismo"] }
  },
  {
    id: "noticia-005",
    titulo: "👮 Detienen a presunto líder de célula delictiva en la Mixteca",
    tituloOriginal: "Cae presunto líder criminal en la Mixteca",
    contenido: "La Fiscalía y Guardia Nacional detuvieron en Huajuapan de León a un presunto líder de célula delictiva dedicada al robo de combustible y extorsión. Se aseguraron armas y vehículos.",
    resumen: "Detención en Huajuapan. Operativo de 3 meses. Robo de combustible y extorsión.",
    categoria: "seguridad",
    origen: "local",
    prioridad: "alta",
    nivelPublicacion: "nivel2_semiautomatico",
    estado: "publicada",
    fuente: { nombre: "Fiscalía General", url: "https://www.fiscalia.oaxaca.gob.mx", tipo: "convenio", confiable: true },
    fechaPublicacion: Timestamp.fromDate(new Date("2026-07-31T16:00:00")),
    fechaDeteccion: Timestamp.fromDate(new Date("2026-07-31T15:30:00")),
    imagen: { url: "https://images.unsplash.com/photo-1453873419266-ec6688c2c7b9?w=800", creditos: "Unsplash" },
    tags: ["seguridad","detencion","mixteca","fiscalia"],
    metadata: { vistas: 2100, compartidos: 156 },
    esNotaServidor: true,
    servidorPublico: { nombre: "Mtro. Bernardo Rodríguez", cargo: "Fiscal", dependencia: "Fiscalía General", contacto: "prensa@fiscalia.oaxaca.gob.mx" },
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ["Contexto agregado"], version: 1, editadoPor: "agente-editorial" },
    elementosVisuales: { emojis: ["👮","🛡️","🔒"], ctas: ["Mantente alerta","Tu seguridad es primero"], quotesDestacados: ["Operativo de inteligencia de 3 meses"], puntosClave: ["Huajuapan","Robo de combustible","Armas aseguradas"] },
    impacto: { nivel: "alto", puntuacion: 85, palabrasClave: ["seguridad","detencion"] }
  },
  {
    id: "noticia-006",
    titulo: "🌎 México y EU fortalecen cooperación en seguridad fronteriza",
    tituloOriginal: "Acuerdo bilateral de seguridad fronteriza",
    contenido: "México y EU firmaron memorándum para fortalecer seguridad fronteriza. Incluye intercambio de inteligencia y capacitación conjunta. Beneficia a Oaxaca, Chiapas y Veracruz.",
    resumen: "Acuerdo México-EU en seguridad fronteriza. Intercambio de inteligencia.",
    categoria: "seguridad",
    origen: "nacional",
    prioridad: "media",
    nivelPublicacion: "nivel3_editorial",
    estado: "publicada",
    fuente: { nombre: "Reforma", url: "https://www.reforma.com", tipo: "rss_nacional", confiable: true },
    fechaPublicacion: Timestamp.fromDate(new Date("2026-07-29T09:00:00")),
    fechaDeteccion: Timestamp.fromDate(new Date("2026-07-29T08:30:00")),
    imagen: { url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800", creditos: "Unsplash" },
    tags: ["seguridad","mexico","estados unidos","frontera"],
    metadata: { vistas: 430, compartidos: 21 },
    esNotaServidor: false,
    edicionMNO: { fechaEdicion: Timestamp.now(), cambiosRealizados: ["Contexto Oaxaca agregado"], version: 1, editadoPor: "agente-editorial" },
    elementosVisuales: { emojis: ["🌎","🤝","🛡️"], ctas: ["Mantente informado"], quotesDestacados: [], puntosClave: ["Memorándum","Intercambio inteligencia","Beneficia Oaxaca"] },
    impacto: { nivel: "medio", puntuacion: 62, palabrasClave: ["seguridad","cooperacion"] }
  }
];

const actividades = [
  { id: "act-001", accion: "Noticia recibida", agente: "agente-recepcion", timestamp: Timestamp.fromDate(new Date("2026-08-01T08:15:00")), detalles: { titulo: "Sismo...", fuente: "Protección Civil" } },
  { id: "act-002", accion: "Noticia clasificada", agente: "agente-clasificacion", timestamp: Timestamp.fromDate(new Date("2026-08-01T08:16:00")), detalles: { categoria: "seguridad", prioridad: "alta" } },
  { id: "act-003", accion: "Alerta urgente procesada", agente: "agente-urgente", timestamp: Timestamp.fromDate(new Date("2026-08-01T08:17:00")), detalles: { titulo: "Sismo...", categoria: "seguridad" } },
  { id: "act-004", accion: "Noticia publicada", agente: "agente-publicacion", timestamp: Timestamp.fromDate(new Date("2026-08-01T08:30:00")), detalles: { noticiaId: "noticia-001" } },
  { id: "act-005", accion: "Noticia recibida", agente: "agente-recepcion", timestamp: Timestamp.fromDate(new Date("2026-08-01T13:30:00")), detalles: { titulo: "Presupuesto...", fuente: "Congreso" } },
  { id: "act-006", accion: "Noticia clasificada", agente: "agente-clasificacion", timestamp: Timestamp.fromDate(new Date("2026-08-01T13:31:00")), detalles: { categoria: "politica", prioridad: "alta" } },
  { id: "act-007", accion: "Nota de servidor procesada", agente: "agente-convenios", timestamp: Timestamp.fromDate(new Date("2026-08-01T13:32:00")), detalles: { titulo: "Presupuesto...", dependencia: "Congreso" } },
  { id: "act-008", accion: "Edición editorial aplicada", agente: "agente-editorial", timestamp: Timestamp.fromDate(new Date("2026-08-01T14:20:00")), detalles: { noticiaId: "noticia-002", cambios: 3 } },
  { id: "act-009", accion: "Pipeline completado", agente: "pipeline-maestro", timestamp: Timestamp.fromDate(new Date("2026-08-01T14:30:00")), detalles: { noticiasProcesadas: 2, duracionSegundos: 120 } },
  { id: "act-010", accion: "Monitoreo RSS ejecutado", agente: "agente-rss-confiable", timestamp: Timestamp.fromDate(new Date("2026-08-01T07:00:00")), detalles: { fuentesEscaneadas: 23, noticiasDetectadas: 8 } }
];

async function seed() {
  console.log("🌱 Sembrando Firestore...\\n");

  for (const n of noticias) {
    await setDoc(doc(db, "noticias", n.id), n);
    console.log("   ✅ noticias/" + n.id);
  }

  for (const a of actividades) {
    await setDoc(doc(db, "actividades", a.id), a);
    console.log("   ✅ actividades/" + a.id);
  }

  await setDoc(doc(db, "estadisticas", "general"), {
    total: 6,
    porOrigen: { local: 4, nacional: 1, internacional: 1 },
    porEstado: { publicada: 6 },
    porCategoria: { politica: 1, seguridad: 3, cultura: 1, economia: 1, general: 0 },
    porPrioridad: { alta: 3, media: 3, baja: 0 },
    porNivelPublicacion: { nivel1_urgente: 1, nivel2_semiautomatico: 3, nivel3_editorial: 2 },
    ultimasActividades: actividades.slice(-5),
    tendencias: { delDia: ["sismo","presupuesto"], deLaSemana: ["seguridad","turismo"], delMes: ["cultura","politica"], categoriasMasActivas: ["seguridad","politica","cultura"] },
    actualizado: Timestamp.now()
  });
  console.log("   ✅ estadisticas/general");

  await setDoc(doc(db, "configuracion", "pipeline"), {
    intervaloMinutos: 30,
    fuentesActivas: 23,
    ultimaEjecucion: Timestamp.now(),
    estado: "activo"
  });
  console.log("   ✅ configuracion/pipeline");

  console.log("\\n✅ ¡Firestore poblado con éxito! Recarga tu app.");
}

seed().catch(e => { console.error("❌", e); process.exit(1); });
