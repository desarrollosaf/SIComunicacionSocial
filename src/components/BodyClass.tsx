"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { bodyClassDeRuta } from "@/lib/bodyClass";

// Actualiza la clase del <body> al navegar entre páginas sin recargar.
// En la carga inicial la pone el script inline de layout.tsx (sin parpadeo).
export default function BodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.className = bodyClassDeRuta(pathname);
  }, [pathname]);

  return null;
}
