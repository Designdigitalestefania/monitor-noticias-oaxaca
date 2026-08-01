"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Resumen', icon: '📊' },
  { href: '/dashboard/noticias', label: 'Gestión de Noticias', icon: '📰' },
  { href: '/dashboard/fuentes', label: 'Fuentes RSS', icon: '📡' },
  { href: '/dashboard/agentes', label: 'Agentes IA', icon: '🤖' },
  { href: '/dashboard/estadisticas', label: 'Estadísticas', icon: '📈' },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden lg:block">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Panel de Control</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-blue-50 text-mno-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
