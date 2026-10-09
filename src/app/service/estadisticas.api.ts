export async function getEstadisticasHome() {
  try {
    const res = await fetch('https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/iniciativas/resumen');
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return [];
    }
  return await res.json();
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return [];
  }
}
