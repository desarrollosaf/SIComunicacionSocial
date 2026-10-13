// En servidor (SSR) se usa API_URL (URL absoluta interna); en navegador NEXT_PUBLIC_API_URL (puede ser relativa).
export function getApiUrl() {
  if (typeof window === 'undefined') {
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}
