import { db } from './config';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { Noticia, Actividad } from '@/types';

const noticiaConverter = {
  toFirestore: (noticia: Noticia): DocumentData => {
    return { ...noticia };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Noticia => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      fechaPublicacion: data.fechaPublicacion?.toDate?.() || new Date(),
      fechaDeteccion: data.fechaDeteccion?.toDate?.() || new Date(),
    } as Noticia;
  },
};

export const noticiasRef = collection(db, 'noticias').withConverter(noticiaConverter);
export const actividadesRef = collection(db, 'actividades');
export const estadisticasRef = collection(db, 'estadisticas');

export async function getNoticias(filtros?: any) {
  let q = query(noticiasRef, orderBy('fechaDeteccion', 'desc'));

  if (filtros?.categoria) {
    q = query(q, where('categoria', '==', filtros.categoria));
  }
  if (filtros?.estado) {
    q = query(q, where('estado', '==', filtros.estado));
  }
  if (filtros?.prioridad) {
    q = query(q, where('prioridad', '==', filtros.prioridad));
  }
  if (filtros?.limit) {
    q = query(q, limit(filtros.limit));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

export async function getNoticiaById(id: string) {
  const docRef = doc(db, 'noticias', id).withConverter(noticiaConverter);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function createNoticia(noticia: Omit<Noticia, 'id'>) {
  const docRef = await addDoc(noticiasRef, noticia as any);
  return docRef.id;
}

export async function updateNoticia(id: string, data: Partial<Noticia>) {
  const docRef = doc(db, 'noticias', id);
  await updateDoc(docRef, data as DocumentData);
}

export async function deleteNoticia(id: string) {
  const docRef = doc(db, 'noticias', id);
  await deleteDoc(docRef);
}

export async function logActividad(actividad: Omit<Actividad, 'id'>) {
  await addDoc(actividadesRef, {
    ...actividad,
    timestamp: Timestamp.now(),
  });
}
