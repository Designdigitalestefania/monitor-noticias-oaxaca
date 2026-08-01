export function Footer() {
  return (
    <footer className="bg-mno-dark text-gray-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Monitor Noticias MNO</h3>
            <p className="text-sm leading-relaxed">
              Centro Inteligente de Información de Oaxaca. Periodismo confiable, hechos que impactan.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/categoria/politica" className="hover:text-white transition-colors">Política</a></li>
              <li><a href="/categoria/seguridad" className="hover:text-white transition-colors">Seguridad</a></li>
              <li><a href="/categoria/cultura" className="hover:text-white transition-colors">Cultura</a></li>
              <li><a href="/categoria/economia" className="hover:text-white transition-colors">Economía</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <p className="text-sm">Oaxaca, México</p>
            <p className="text-sm mt-1">contacto@monitornoticiasmno.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Monitor Noticias MNO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
