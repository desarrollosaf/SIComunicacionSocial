export async function getComisiones() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comisiones`, {
    cache: "no-store",
  });
  return data.json();
}

export async function getComisionById(id: string) {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/api/comisiones/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error HTTP getComisionById:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error getComisionById:", error);
    return null;
  }
}

export async function getIniciativasByComision(id: string) {
  try {
    const res = await fetch(
      `https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/comision/iniciativas?id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      if (res.status === 404) return { data: { iniciativas: [] } };
      console.error("Error HTTP:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getEventosByComision(id: string) {
  try {
    const res = await fetch(
      `https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/comision/eventos?id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      if (res.status === 404) return { data: { eventos: [] } };
      console.error("Error HTTP:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}