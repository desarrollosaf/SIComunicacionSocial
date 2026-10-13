'use client';

import { BASE_PATH } from "@/lib/basePath";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type DropdownKey = 'identidad' | 'comunicacion' | 'contacto' | null;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<DropdownKey>(null);
  const [menuOpen, setMenuOpen] = useState(false); // ← estado del menú móvil
  const headerRef = useRef<HTMLElement>(null);

  // Cerrar dropdown al cambiar de ruta
  useEffect(() => {
    setOpen(null);
    setMenuOpen(false); // ← también cerrar menú móvil al navegar
  }, [pathname]);

  // Cerrar al hacer click fuera del header
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (key: DropdownKey) => setOpen(prev => prev === key ? null : key);

  const Dropdown = ({ id, label, children }: { id: DropdownKey; label: string; children: React.ReactNode }) => (
    <div className={`w-dropdown${open === id ? ' w--open' : ''}`}>
      <div className="w-dropdown-toggle" onClick={() => toggle(id)} style={{ cursor: 'pointer' }}>
        <div className="w-icon-dropdown-toggle"></div>
        <div className="menu-option">{label}</div>
      </div>
      {open === id && (
        <nav className="dropdown-list w-dropdown-list w--open" onClick={() => setOpen(null)}>
          {children}
        </nav>
      )}
    </div>
  );

  return (
    <header className="section-2" ref={headerRef}>
      <div className="div-block-8">
        <Link href="/" aria-current="page" className="w-inline-block w--current">
          <img
            src={`${BASE_PATH}/images/DGCS.png`}
            loading="lazy"
            sizes="100vw"
            srcSet={`${BASE_PATH}/images/DGCS-p-500.png 500w, ${BASE_PATH}/images/DGCS-p-800.png 800w, ${BASE_PATH}/images/DGCS-p-1080.png 1080w, ${BASE_PATH}/images/DGCS-p-1600.png 1600w, ${BASE_PATH}/images/DGCS-p-2000.png 2000w, ${BASE_PATH}/images/DGCS-p-2600.png 2600w, ${BASE_PATH}/images/DGCS-p-3200.png 3200w, ${BASE_PATH}/images/DGCS.png 6697w`}
            alt="Logo"
            className="img-h-50"
          />
        </Link>
        

        {/* Menú desktop — se oculta en móvil con CSS */}
        <div className={`div-block-9 ${menuOpen ? 'menu-movil-abierto' : ''}`}>
          <Link href="/quienes-somos" className="link-block-3 w-inline-block" onClick={() => setOpen(null)}>
            <div className="menu-option">¿Quienes somos?</div>
          </Link>

          <Dropdown id="comunicacion" label="Comunicación">
            <Link href="/sala-de-prensa" className="link-nav-menu w-dropdown-link">Sala de prensa</Link>
            <Link href="/galeria" className="link-nav-menu w-dropdown-link">Banco de imagenes</Link>
            <Link href="/comunicados" className="link-nav-menu w-dropdown-link">Comunicados</Link>
            <Link href="/sintesis-informativa" className="link-nav-menu w-dropdown-link">Síntesis informativa</Link>
            <Link href="https://dialogo.congresoedomex.gob.mx" className="link-nav-menu w-dropdown-link">Diálogo</Link>
            <Link href="/hora-x-hora" className="link-nav-menu w-dropdown-link">Notas Hora x Hora</Link>
          </Dropdown>

          <Dropdown id="contacto" label="Contacto">
            <Link href="/contacto" className="link-nav-menu w-dropdown-link">Contacto</Link>
            <Link href="https://administracionyfinanzasplem.gob.mx/directorio/directorio" className="link-nav-menu w-dropdown-link">Directorio telefónico</Link>
          </Dropdown>
        </div>

        {/* Botón hamburguesa — solo visible en móvil */}
        <img
          src={`${BASE_PATH}/images/menu_24dp_96134B_FILL0_wght400_GRAD0_opsz24.png`}
          loading="lazy"
          alt="Menú"
          className="image-12"
          onClick={() => setMenuOpen(prev => !prev)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </header>
  );
}