import { getApiUrl } from './apiUrl';

export async function getTrabajoLegislativo() {
  const data = await fetch(`${getApiUrl()}/api/trabajo-legislativo`, {
    cache: "no-store",
  });
  return data.json();
}