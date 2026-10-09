export async function getTrabajoLegislativo() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trabajo-legislativo`, {
    cache: "no-store",
  });
  return data.json();
}