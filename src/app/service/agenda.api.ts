
export async function getAgendaHome() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/agenda`);
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return [];
    }
  return await res.json();
  } catch (error) {
    console.error("Failed to fetch agenda:", error);
    return [];
  }
}

export async function getAgendaAll() {
  try {
    // Intenta con paginación amplia para traer todos los registros
    const res = await fetch(`${process.env.API_URL}/api/agenda?limit=500&page=1`, { cache: "no-store" });
    if (!res.ok) {
      // Fallback sin parámetros de páginación
      const res2 = await fetch(`${process.env.API_URL}/api/agenda`, { cache: "no-store" });
      if (!res2.ok) return [];
      return await res2.json();
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch full agenda:", error);
    return [];
  }
}

export async function getSesionReciente() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/api/estadistico/ultimasesion/`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data.eventos ?? [];
  } catch (error) {
    console.error("Failed to fetch última sesión:", error);
    return [];
  }
}

export async function getOrdeDiaSesion(id: string | number) {
  try {
    const res = await fetch('https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/getordendia');
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

