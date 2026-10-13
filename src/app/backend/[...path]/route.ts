// Proxy en tiempo de ejecución: /DGCS/backend/* -> API_URL/*
// Permite que el navegador use NEXT_PUBLIC_API_URL=/DGCS/backend sin regla extra en el proxy inverso.
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return Response.json({ error: 'API_URL no configurada' }, { status: 500 });
  }

  const { path } = await params;
  const target = `${apiUrl.replace(/\/$/, '')}/${path.join('/')}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete('host');

  const hasBody = !['GET', 'HEAD'].includes(req.method);
  const res = await fetch(target, {
    method: req.method,
    headers,
    body: hasBody ? await req.arrayBuffer() : undefined,
    cache: 'no-store',
  });

  const resHeaders = new Headers(res.headers);
  resHeaders.delete('content-encoding');
  resHeaders.delete('content-length');

  return new Response(res.body, { status: res.status, headers: resHeaders });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
