import { getApiUrl } from './apiUrl';


export async function getBoletinesAll(pagina: number) {
  try {

    const res = await fetch(`${getApiUrl()}/api/boletines/boletinesAll/${pagina}`, { next: { revalidate: 10 } });
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return [];
    }
  return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletines:", error);
    return [];
  }
}