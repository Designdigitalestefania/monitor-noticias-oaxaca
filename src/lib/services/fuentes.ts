export const FUENTES_CONFIABLES = {
  // Local (Oaxaca)
  local: [
    { nombre: 'NVI Noticias', url: 'https://www.nvinoticias.com/rss', confiable: true },
    { nombre: 'Oaxaca En Línea', url: 'https://www.oaxacaenlinea.com/rss', confiable: true },
    { nombre: 'Imparcial Oaxaca', url: 'https://www.imparcialenlinea.com/rss', confiable: true },
    { nombre: 'El Piñero', url: 'https://elpinero.com.mx/rss', confiable: true },
    { nombre: 'Noticias Oaxaca', url: 'https://noticiasoaxaca.com/rss', confiable: false },
  ],

  // Nacional
  nacional: [
    { nombre: 'El Universal', url: 'https://www.eluniversal.com.mx/rss', confiable: true },
    { nombre: 'Milenio', url: 'https://www.milenio.com/rss', confiable: true },
    { nombre: 'Reforma', url: 'https://www.reforma.com/rss', confiable: true },
    { nombre: 'La Jornada', url: 'https://www.jornada.com.mx/rss', confiable: true },
    { nombre: 'Excelsior', url: 'https://www.excelsior.com.mx/rss', confiable: true },
    { nombre: 'Aristegui Noticias', url: 'https://aristeguinoticias.com/rss', confiable: true },
    { nombre: 'Animal Político', url: 'https://www.animalpolitico.com/rss', confiable: true },
    { nombre: 'Sin Embargo', url: 'https://www.sinembargo.mx/rss', confiable: true },
    { nombre: 'Código Magenta', url: 'https://codigomagenta.com.mx/rss', confiable: true },
    { nombre: 'Reporte Índigo', url: 'https://www.reporteindigo.com/rss', confiable: false },
    { nombre: 'SDP Noticias', url: 'https://www.sdpnoticias.com/rss', confiable: false },
  ],

  // Internacional
  internacional: [
    { nombre: 'CNN México', url: 'http://rss.cnn.com/rss/cnn_mexico.rss', confiable: true },
    { nombre: 'BBC Mundo', url: 'https://www.bbc.com/mundo/rss.xml', confiable: true },
    { nombre: 'El País México', url: 'https://elpais.com/mexico/rss', confiable: true },
    { nombre: 'France 24 Español', url: 'https://www.france24.com/es/rss', confiable: true },
    { nombre: 'DW Español', url: 'https://rss.dw.com/rdf/rss-por-es', confiable: true },
    { nombre: 'RT Español', url: 'https://actualidad.rt.com/rss', confiable: false },
    { nombre: 'HispanTV', url: 'https://www.hispantv.com/rss', confiable: false },
  ]
};

export const SERVIDORES_CONVENIO = [
  { nombre: 'Secretaría de Seguridad Pública', dependencia: 'SSP Oaxaca', email: 'comunicacion@ssp.oaxaca.gob.mx' },
  { nombre: 'Secretaría de Salud', dependencia: 'SSO', email: 'prensa@salud.oaxaca.gob.mx' },
  { nombre: 'Procuraduría General de Justicia', dependencia: 'PGJE Oaxaca', email: 'prensa@pgje.oaxaca.gob.mx' },
  { nombre: 'Secretaría de Educación', dependencia: 'IEEPO', email: 'comunicacion@ieepo.oaxaca.gob.mx' },
  { nombre: 'Secretaría de Turismo', dependencia: 'SECTUR Oaxaca', email: 'prensa@turismo.oaxaca.gob.mx' },
  { nombre: 'Coordinación de Protección Civil', dependencia: 'CEPCO', email: 'alertas@cepco.oaxaca.gob.mx' },
];
