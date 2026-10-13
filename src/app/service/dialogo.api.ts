import { getApiUrl } from './apiUrl';

export async function getDialogo() {
  try {
    const res = await fetch(`${getApiUrl()}/api/dialogos`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend dialogos:', res.status, text);
      return null;
    }

    const json = await res.json();
    // El backend puede regresar el objeto, un arreglo o { data: ... }; se normaliza a un solo diálogo
    const data = json?.data ?? json;
    const dialogo = Array.isArray(data) ? data[0] : data;
    if (!dialogo) console.error('Respuesta de dialogos sin datos:', json);
    return dialogo ?? null;
  } catch (error) {
    console.error("Failed to fetch dialogo:", error);
    return null;
  }
}
