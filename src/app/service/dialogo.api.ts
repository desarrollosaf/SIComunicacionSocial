export async function getDialogo() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dialogo`, {
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