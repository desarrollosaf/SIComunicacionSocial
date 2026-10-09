import * as https from 'https';

function getApiUrl() {
  if (typeof window === 'undefined') {
    return process.env.API_URL || 'http://localhost:4000';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

function getExternalApiUrl() {
  if (typeof window === 'undefined') {
    return process.env.EXTERNAL_API_URL || 'http://localhost:3013';
  }
  return process.env.NEXT_PUBLIC_EXTERNAL_API_URL || 'http://localhost:3013';
}

export async function getDiputados() {
  try {
    const data = await fetch(`${getApiUrl()}/api/diputados`, {



      cache: "no-store",
    });
    if (!data.ok) {
      const text = await data.text();
      console.error('Error backend en getDiputados:', text);
      return [];
    }
    return await data.json();
  } catch (error) {
    console.error('Error de red en getDiputados:', error);
    return [];
  }
}

export async function getDiputadoPerfil(id: string) {
  try {

    const res = await fetch(`${getApiUrl()}/api/diputados/${id}/perfil`, {

      cache: 'no-store'
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error de red en getDiputadoPerfil:', error);
    return null;
  }
}

export async function getDiputadosHome() {
  try {

    const res = await fetch(`${getApiUrl()}/api/diputados`, { next: { revalidate: 60 } });

    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend en getDiputadosHome:', text);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error de red en getDiputadosHome:', error);
    return [];
  }
}

export async function getComunicadosHome() {
  try {

    const res = await fetch(`${getApiUrl()}/api/comunicados`, { next: { revalidate: 60 } });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getAllComunicadosFromProfiles(arrDiputados: any[]) {
  try {
    const extractedComunicados: any[] = [];
    const apiUrl = getApiUrl();
    
    // Chunking de 10 en 10 para evitar rechazos del servidor (ECONNRESET o fallos de fetch)
    const chunkSize = 10;
    for (let i = 0; i < arrDiputados.length; i += chunkSize) {
      const chunk = arrDiputados.slice(i, i + chunkSize);
      
      const chunkPromises = chunk.map((d: any) => 
        fetch(`${apiUrl}/api/diputados/${d.id}/perfil`, { next: { revalidate: 60 } })
          .then(res => res.ok ? res.json() : null)
          .catch(() => null)
      );
      
      const chunkProfiles = await Promise.all(chunkPromises);
      
      chunkProfiles.forEach(profile => {
        if (profile?.integrantes?.[0]?.autores_comunicados) {
          profile.integrantes[0].autores_comunicados.forEach((ac: any) => {
            if (ac.comunicado && ac.comunicado.id) {
              extractedComunicados.push(ac.comunicado);
            }
          });
        }
      });
    }

    const uniqueMap = new Map();
    extractedComunicados.forEach(c => uniqueMap.set(c.id, c));
    return Array.from(uniqueMap.values());
  } catch (error) {
    console.error('Error extrayendo comunicados completos:', error);
    return [];
  }
}

export async function fetchIniciativasDiputado(diputadoId: string, page: number = 1): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ id: diputadoId });

    const options = {
      hostname: 'parlamentario.congresoedomex.gob.mx',
      port: 443,
      path: '/backend/api/estadistico/diputado/iniciativas',
      method: 'GET', // The API expects GET but requires a JSON body for filters
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        
        try {
          // Attempt to parse JSON
          const result = JSON.parse(responseBody);
          if (result && result.ok && result.data) {
            const autor_ella = result.data.autor_ella?.data || [];
            const autor_grupo = result.data.autor_grupo?.data || [];
            
            const map = new Map();
            autor_ella.forEach((i: any) => map.set(i.id, i));
            autor_grupo.forEach((i: any) => map.set(i.id, i));
            
            const allItems = Array.from(map.values())
              .sort((a, b) => new Date(b.fecha_evento_raw).getTime() - new Date(a.fecha_evento_raw).getTime());
              
            resolve(allItems);
          } else if (result && result.api && result.api.exito) {
            // fallback for the general layout
            resolve(result.api.respuesta.iniciativas || []);
          } else {
            resolve([]);
          }
        } catch (error) {
          console.error('Error parsing iniciativas response:', error);
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error fetching iniciativas:', error);
      resolve(null);
    });

    // Write the JSON body
    req.write(data);
    req.end();
  });
}


export async function getVotosPunto(id: string | number) {
  try {
    const res = await fetch(`/api/votaciones/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Error backend en getVotosPunto:', await res.text());
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error de red en getVotosPunto:', error);
    return null;
  }
}