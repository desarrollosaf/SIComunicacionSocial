
export async function getBannersHome() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/banners`);
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


