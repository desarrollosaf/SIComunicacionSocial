import { getApiUrl } from './apiUrl';

export async function getSintesisInformativa(pagina: number = 1, fecha?: string) {
  try {
    const params = new URLSearchParams();
    params.set('page', String(pagina));
    if (fecha) params.set('fecha', fecha);

    const res = await fetch(`${getApiUrl()}/api/sintesis-informativa?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return { rows: [], count: 0 };
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch sintesis informativa:', error);
    return { rows: [], count: 0 };
  }
}
