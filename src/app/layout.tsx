import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Monitor Noticias MNO | Periodismo Confiable - Hechos que Impactan',
  description: 'Centro Inteligente de Informacion de Oaxaca. 9 Agentes IA procesando noticias locales, nacionales e internacionales.',
  icons: {
    icon: [{ url: '/images/logo-mno.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/images/logo-mno.png',
    apple: '/images/logo-mno.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/images/logo-mno.png" sizes="512x512" />
        <link rel="shortcut icon" type="image/png" href="/images/logo-mno.png" />
        <link rel="apple-touch-icon" href="/images/logo-mno.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-mno-light text-mno-dark" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
