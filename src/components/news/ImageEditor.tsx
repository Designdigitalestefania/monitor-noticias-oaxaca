"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Noticia } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';

interface ImageEditorProps {
  noticia: Noticia;
  onImagenProcesada?: (noticia: Noticia) => void;
}

const PLATAFORMAS = [
  { id: 'web', label: 'Web / OpenGraph', dims: '1200×630', icono: '🌐' },
  { id: 'instagram', label: 'Instagram Feed', dims: '1080×1080', icono: '📸' },
  { id: 'twitter', label: 'Twitter/X Card', dims: '1200×675', icono: '🐦' },
  { id: 'stories', label: 'Instagram Stories', dims: '1080×1920', icono: '📱' },
  { id: 'whatsapp', label: 'WhatsApp', dims: '800×800', icono: '💬' },
];

export function ImageEditor({ noticia, onImagenProcesada }: ImageEditorProps) {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [plataformaActiva, setPlataformaActiva] = useState('web');

  async function generarPreview() {
    setLoading(true);
    try {
      const res = await fetch('/api/imagen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noticia, action: 'preview' }),
      });
      const data = await res.json();
      if (data.success) {
        setPreviews(data.previews);
      }
    } catch (error) {
      console.error('Error generando preview:', error);
    } finally {
      setLoading(false);
    }
  }

  async function procesarImagen() {
    setLoading(true);
    try {
      const res = await fetch('/api/imagen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noticia, action: 'procesar' }),
      });
      const data = await res.json();
      if (data.success && onImagenProcesada) {
        onImagenProcesada(data.noticia);
      }
    } catch (error) {
      console.error('Error procesando imagen:', error);
    } finally {
      setLoading(false);
    }
  }

  const imagenActual = previews[plataformaActiva] || noticia.imagen?.url;
  const plataforma = PLATAFORMAS.find((p) => p.id === plataformaActiva);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">🎨 Editor de Imágenes MNO</h3>
          <p className="text-sm text-gray-500">Diseño editorial automático con branding</p>
        </div>
        <Badge variant={noticia.imagenEditada?.procesada ? 'success' : 'warning'}>
          {noticia.imagenEditada?.procesada ? 'Procesada' : 'Pendiente'}
        </Badge>
      </div>

      {/* Selector de plataforma */}
      <div className="flex flex-wrap gap-2">
        {PLATAFORMAS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlataformaActiva(p.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              plataformaActiva === p.id
                ? 'bg-mno-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{p.icono}</span>
            {p.label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ aspectRatio: plataformaActiva === 'stories' ? '9/16' : plataformaActiva === 'instagram' || plataformaActiva === 'whatsapp' ? '1/1' : '16/9' }}>
        {imagenActual ? (
          <Image
            src={imagenActual}
            alt={`Preview ${plataforma?.label}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <span className="text-4xl">🖼️</span>
              <p className="text-sm mt-2">Sin imagen disponible</p>
            </div>
          </div>
        )}

        {plataforma && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {plataforma.dims}
          </div>
        )}
      </div>

      {/* Info */}
      {noticia.imagenEditada?.procesada && (
        <div className="text-xs text-gray-500 space-y-1">
          <p>✅ Imagen procesada el {new Date(noticia.imagenEditada.fechaProcesamiento).toLocaleString('es-MX')}</p>
          <p>📁 Variantes: Web, Instagram, Twitter, Stories, WhatsApp</p>
        </div>
      )}

      {/* Acciones */}
      <div className="flex gap-3">
        <Button onClick={generarPreview} disabled={loading} variant="secondary">
          {loading ? <Spinner size="sm" /> : '👁️ Preview'}
        </Button>
        <Button onClick={procesarImagen} disabled={loading}>
          {loading ? <Spinner size="sm" /> : '🎨 Procesar Imagen MNO'}
        </Button>
      </div>
    </Card>
  );
}
