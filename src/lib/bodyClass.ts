// Cada página del export de Webflow trae su propia clase en <body>
// (body, body-2, body-flex...) y cada una tiene estilos distintos en el CSS.
export const BODY_CLASS_POR_RUTA: Record<string, string> = {
  "/kit-de-prensa": "body-2",
  "/acreditaciones": "body-3",
  "/hora-x-hora": "body-4",
  "/comunicados": "body-5",
  "/contacto": "body-6",
  "/galeria": "body-flex",
};

export const BODY_CLASS_DEFAULT = "body";

export function bodyClassDeRuta(pathname: string): string {
  const ruta = pathname.replace(/\/+$/, "") || "/";
  return BODY_CLASS_POR_RUTA[ruta] ?? BODY_CLASS_DEFAULT;
}
