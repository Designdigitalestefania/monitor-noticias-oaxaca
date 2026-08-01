import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://monitornoticiasmno.com';

  const routes = [
    '',
    '/noticias',
    '/buscar',
    '/dashboard',
    '/categoria/politica',
    '/categoria/seguridad',
    '/categoria/cultura',
    '/categoria/economia',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'hourly',
    priority: route === '' ? 1 : 0.8,
  }));
}
