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

    console.log('Status HTTP:', res.status);
    console.log('Respuesta backend:', text);


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

