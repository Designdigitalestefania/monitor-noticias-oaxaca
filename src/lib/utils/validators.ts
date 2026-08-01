export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isEmptyString(str: string): boolean {
  return !str || str.trim().length === 0;
}

export function sanitizeHTML(html: string): string {
  return html
    .replace(/<script[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '');
}

export function validarNoticia(noticia: any): string[] {
  const errores: string[] = [];
  if (isEmptyString(noticia.titulo)) errores.push('El título es obligatorio');
  if (isEmptyString(noticia.contenido)) errores.push('El contenido es obligatorio');
  if (!noticia.fuente?.nombre) errores.push('La fuente es obligatoria');
  return errores;
}
