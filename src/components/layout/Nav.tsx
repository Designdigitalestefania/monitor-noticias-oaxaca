"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/categoria/politica', label: 'Política' },
  { href: '/categoria/seguridad', label: 'Seguridad' },
  { href: '/categoria/cultura', label: 'Cultura' },
  { href: '/categoria/economia', label: 'Economía' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-1 overflow-x-auto py-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            pathname === link.href
              ? 'bg-mno-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
