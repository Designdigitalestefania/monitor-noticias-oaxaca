interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export function SEOHead({
  title = 'Monitor Noticias MNO - Periodismo Confiable | Hechos que Impactan',
  description = 'Centro Inteligente de Información de Oaxaca. Noticias locales, nacionales e internacionales procesadas con inteligencia artificial.',
  keywords = 'noticias, oaxaca, periodismo, méxico, política, seguridad, cultura',
  image = '/images/og-default.jpg',
}: SEOHeadProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
