"use client";
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-mno-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">MNO</span>
            <span className="hidden sm:inline text-sm text-blue-200">Monitor Noticias Oaxaca</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-200 transition-colors">Inicio</Link>
            <Link href="/noticias" className="text-sm font-medium hover:text-blue-200 transition-colors">Noticias</Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-200 transition-colors">Dashboard</Link>
            <Link href="/buscar" className="text-sm font-medium hover:text-blue-200 transition-colors">Buscar</Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800">
          <div className="px-4 py-3 space-y-2">
            <Link href="/" className="block py-2 text-sm hover:text-blue-200">Inicio</Link>
            <Link href="/noticias" className="block py-2 text-sm hover:text-blue-200">Noticias</Link>
            <Link href="/dashboard" className="block py-2 text-sm hover:text-blue-200">Dashboard</Link>
            <Link href="/buscar" className="block py-2 text-sm hover:text-blue-200">Buscar</Link>
          </div>
        </div>
      )}
    </header>
  );
}
