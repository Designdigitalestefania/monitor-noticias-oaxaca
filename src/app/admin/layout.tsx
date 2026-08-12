export const metadata = {
  title: 'Panel Admin | Monitor Noticias MNO',
  description: 'Administracion del Centro Inteligente de Informacion de Oaxaca',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "'Inter', sans-serif", background: '#0f172a', color: '#e2e8f0' }}>
        {children}
      </body>
    </html>
  );
}
