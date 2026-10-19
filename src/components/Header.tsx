"use client";

import { BASE_PATH } from "@/lib/basePath";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Reproduce en React lo que hacía webflow.js con el navbar y los dropdowns,
// usando las mismas clases (w--open, data-nav-menu-open, w--current...) para
// que apliquen tal cual los estilos del export de Webflow.

// data-collapse="medium" en Webflow: el menú se colapsa a 991px o menos.
const MEDIA_ESCRITORIO = "(min-width: 992px)";
const DELAY_HOVER = 100; // data-delay="100"

type Enlace = { href: string; texto: string; externo?: boolean };
type Dropdown = { id: string; titulo: string; enlaces: Enlace[] };

const DROPDOWNS: Dropdown[] = [
  {
    id: "comunicacion",
    titulo: "Comunicación",
    enlaces: [
      { href: "/sala-de-prensa", texto: "Sala de Prensa" },
      { href: "/galeria", texto: "Banco de imagenes" },
      { href: "/comunicados", texto: "Comunicados" },
      { href: "/sintesis-informativa", texto: "Síntesis informativa" },
      { href: "https://dialogo.congresoedomex.gob.mx/", texto: "Diálogo", externo: true },
      { href: "/hora-x-hora", texto: "Notas Hora x Hora" },
    ],
  },
  {
    id: "contacto",
    titulo: "Contacto",
    enlaces: [
      { href: "/contacto", texto: "Contacto" },
      { href: "https://administracionyfinanzasplem.gob.mx/directorio/directorio", texto: "Directorio Telefónico", externo: true },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timerHover = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cerrarTodo = () => {
    setMenuAbierto(false);
    setDropdownAbierto(null);
  };

  // Al cambiar de página se cierra el menú
  useEffect(() => {
    cerrarTodo();
  }, [pathname]);

  // Clic fuera del navbar o tecla Escape cierran todo
  useEffect(() => {
    const clicFuera = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) cerrarTodo();
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarTodo();
    };
    document.addEventListener("mousedown", clicFuera);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", clicFuera);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  // Si se agranda la ventana a escritorio, el menú móvil se cierra
  useEffect(() => {
    const mq = window.matchMedia(MEDIA_ESCRITORIO);
    const alCambiar = () => mq.matches && cerrarTodo();
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, []);

  useEffect(() => () => {
    if (timerHover.current) clearTimeout(timerHover.current);
  }, []);

  // data-hover="true": en escritorio el dropdown se abre al pasar el mouse
  const esEscritorio = () => window.matchMedia(MEDIA_ESCRITORIO).matches;

  const hoverEntra = (id: string) => {
    if (!esEscritorio()) return;
    if (timerHover.current) clearTimeout(timerHover.current);
    setDropdownAbierto(id);
  };

  const hoverSale = () => {
    if (!esEscritorio()) return;
    if (timerHover.current) clearTimeout(timerHover.current);
    timerHover.current = setTimeout(() => setDropdownAbierto(null), DELAY_HOVER);
  };

  const alternarDropdown = (id: string) =>
    setDropdownAbierto((actual) => (actual === id ? null : id));

  const esActual = (href: string) => pathname === href;

  // Clases que webflow.js agrega a los dropdowns cuando el menú móvil está abierto
  const claseMenuMovil = (clase: string) => (menuAbierto ? ` ${clase}` : "");

  return (
    <header className="header">
      <div className="nav-bar-structure">
        <Link href="/" aria-current={esActual("/") ? "page" : undefined} className={`w-nav-brand${esActual("/") ? " w--current" : ""}`}>
          <img src={`${BASE_PATH}/images/DGCS.png`} loading="lazy" sizes="100vw"
          srcSet={`${BASE_PATH}/images/DGCS-p-500.png 500w,
            ${BASE_PATH}/images/DGCS-p-800.png 800w,
            ${BASE_PATH}/images/DGCS-p-1080.png 1080w,
            ${BASE_PATH}/images/DGCS-p-1600.png 1600w,
            ${BASE_PATH}/images/DGCS-p-2000.png 2000w,
            ${BASE_PATH}/images/DGCS-p-2600.png 2600w,
            ${BASE_PATH}/images/DGCS-p-3200.png 3200w,
            ${BASE_PATH}/images/DGCS.png 6697w`} alt="" className="img-h-50"/>
        </Link>

        <div ref={navRef} data-animation="default" data-collapse="medium" role="banner" className="navbar w-nav">
          <div className="container-3 w-container">
            <nav role="navigation" className="nav-menu w-nav-menu" {...(menuAbierto ? { "data-nav-menu-open": "" } : {})}>
              <div className="div-block-9">
                <Link href="/quienes-somos" aria-current={esActual("/quienes-somos") ? "page" : undefined} className={`link${esActual("/quienes-somos") ? " w--current" : ""}`} onClick={cerrarTodo}>
                  ¿Quiénes somos?
                </Link>

                {DROPDOWNS.map((dropdown) => {
                  const abierto = dropdownAbierto === dropdown.id;
                  return (
                    <div
                      key={dropdown.id}
                      className={`w-dropdown${claseMenuMovil("w--nav-dropdown-open")}`}
                      style={abierto ? { zIndex: 901 } : undefined}
                      onMouseEnter={() => hoverEntra(dropdown.id)}
                      onMouseLeave={hoverSale}
                    >
                      <div
                        className={`w-dropdown-toggle${abierto ? " w--open" : ""}${claseMenuMovil("w--nav-dropdown-toggle-open")}`}
                        role="button"
                        tabIndex={0}
                        aria-haspopup="menu"
                        aria-expanded={abierto}
                        onClick={() => alternarDropdown(dropdown.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            alternarDropdown(dropdown.id);
                          }
                        }}
                      >
                        <div className="w-icon-dropdown-toggle" aria-hidden="true"></div>
                        <div className="menu-option">{dropdown.titulo}</div>
                      </div>

                      <nav className={`dropdown-list w-dropdown-list${abierto ? " w--open" : ""}${claseMenuMovil("w--nav-dropdown-list-open")}`}>
                        {dropdown.enlaces.map((enlace) =>
                          enlace.externo ? (
                            <a key={enlace.href} href={enlace.href} target="_blank" rel="noopener noreferrer" className="link-nav-menu w-dropdown-link">
                              {enlace.texto}
                            </a>
                          ) : (
                            <Link
                              key={enlace.href}
                              href={enlace.href}
                              aria-current={esActual(enlace.href) ? "page" : undefined}
                              className={`link-nav-menu w-dropdown-link${esActual(enlace.href) ? " w--current" : ""}`}
                              onClick={cerrarTodo}
                            >
                              {enlace.texto}
                            </Link>
                          )
                        )}
                      </nav>
                    </div>
                  );
                })}
              </div>
            </nav>

            <div className={`menu-button w-nav-button${menuAbierto ? " w--open" : ""}`} role="button" tabIndex={0} aria-label="Abrir o cerrar menú" aria-expanded={menuAbierto}
              onClick={() => setMenuAbierto(!menuAbierto)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMenuAbierto(!menuAbierto);
                }
              }}
            >
              <div className="w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
