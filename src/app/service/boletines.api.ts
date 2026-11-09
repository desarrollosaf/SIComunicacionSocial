import { getApiUrl } from './apiUrl';

export async function getBoletin(id: string) {
  try {
    const res = await fetch(`${getApiUrl()}/api/boletines/${id}`, {
    cache: "no-store",
  });
     if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletin:", error);
    return [];
  }
}

export async function getBoletinesRandom() {
  try {
    const res = await fetch(`${getApiUrl()}/api/boletines/random`);
     if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletin:", error);
    return [];
  }
}

export async function getBoletines() {
  try {
    const res = await fetch(`${getApiUrl()}/api/boletines`, { next: { revalidate: 10 } });
    const text = await res.text();

    if (!res.ok) {
      console.error('Error backend:', text);
      return [];
    }
    if (!text.trim()) {
      console.error('El backend devolvió una respuesta vacía');
      return [];
    }
    try {
      // El body ya se leyó con res.text(); no se puede volver a leer con res.json()
      return JSON.parse(text);
    } catch {
      console.error('El backend no devolvió un JSON válido:', text);
      return [];
    }
  // return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletines:", error);
    return [];
  }
}

export interface GaleriaFoto {
  id: string;
  path: string;
}

export interface GaleriaComunicado {
  id: string;
  fecha: string;
  titulo: string;
  comunicado?: string;
  fotos: GaleriaFoto[];
}

export interface GaleriaPagina {
  count: number;
  rows: GaleriaComunicado[];
}

// Galería: comunicados con fotos, paginados de 20 en 20 por el backend.
export async function getBoletinesTodos(pagina = 1): Promise<GaleriaPagina> {
  const vacio: GaleriaPagina = { count: 0, rows: [] };
  try {
    const res = await fetch(`${getApiUrl()}/api/boletines/boletinesTodos?pagina=${pagina}`, { cache: 'no-store' });
    const text = await res.text();

    if (!res.ok) {
      console.error('Error backend:', text);
      return vacio;
    }
    if (!text.trim()) return vacio;

    const data = JSON.parse(text);
    // Compatibilidad: si el backend desplegado aún regresa el arreglo completo,
    // se pagina aquí mismo para no romper la galería.
    if (Array.isArray(data)) {
      const conFotos = data.filter((c: GaleriaComunicado) => c?.fotos?.length);
      return { count: conFotos.length, rows: conFotos.slice((pagina - 1) * 20, pagina * 20) };
    }
    return { count: data.count ?? 0, rows: data.rows ?? [] };
  } catch (error) {
    console.error('Failed to fetch boletines:', error);
    return vacio;
  }
}
