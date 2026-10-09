export async function getJunta() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/junta`, {
    cache: "no-store",
  });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch diputados:", error);
    return [];
  }
}