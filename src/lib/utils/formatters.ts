export function formatFecha(fecha: Date | string | any): string {
  let d: Date;
  if (fecha instanceof Date) d = fecha;
  else if (typeof fecha === 'string') d = new Date(fecha);
  else if (fecha && typeof fecha.toDate === 'function') d = fecha.toDate();
  else if (fecha && typeof fecha.seconds === 'number') d = new Date(fecha.seconds * 1000);
  else d = new Date(fecha);
  if (isNaN(d.getTime())) return 'Fecha no disponible';
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatTiempoRelativo(fecha: Date | string | any): string {
  let d: Date;
  if (fecha instanceof Date) d = fecha;
  else if (typeof fecha === 'string') d = new Date(fecha);
  else if (fecha && typeof fecha.toDate === 'function') d = fecha.toDate();
  else if (fecha && typeof fecha.seconds === 'number') d = new Date(fecha.seconds * 1000);
  else d = new Date(fecha);
  if (isNaN(d.getTime())) return 'Hace un momento';
  const diffSeg = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diffSeg < 60) return 'Hace un momento';
  if (diffSeg < 3600) return 'Hace ' + Math.floor(diffSeg / 60) + ' min';
  if (diffSeg < 86400) return 'Hace ' + Math.floor(diffSeg / 3600) + ' h';
  if (diffSeg < 172800) return 'Ayer';
  return 'Hace ' + Math.floor(diffSeg / 86400) + ' dias';
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
