"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setDropdownAbierto(dropdownAbierto === menu ? null : menu);
  };

  return (
    <header className="header">
      <div className="nav-bar-structure">
        <Link href="/" aria-current="page" className="w-nav-brand w--current">
          <img src="/images/DGCS.png" alt="Dirección General de Comunicación Social" className="img-h-50"  loading="lazy"/>
        </Link>

        <div
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar w-nav"
        >
          <div className="container-3 w-container">
            <nav
              role="navigation"
              className={`nav-menu w-nav-menu ${menuAbierto ? "menu-abierto" : ""}`}
            >
              <div className="div-block-9">
                <Link href="/quienes-somos" className="link">
                  ¿Quiénes somos?
                </Link>

                {/* Menú Comunicación */}
                <div data-hover="true" data-delay="100" className="w-dropdown">
                  <div className="w-dropdown-toggle" aria-expanded={dropdownAbierto === "comunicacion"} onClick={() => toggleDropdown("comunicacion")}>
                    <span className="w-icon-dropdown-toggle" />
                    <span className="menu-option">Comunicación</span>
                  </div>

                  <nav
                    className={`dropdown-list w-dropdown-list ${
                      dropdownAbierto === "comunicacion" ? "dropdown-abierto" : ""
                    }`}
                  >
                    <Link href="/sala-de-prensa" className="link-nav-menu w-dropdown-link">
                      Sala de Prensa
                    </Link>

                    <Link href="/galeria" className="link-nav-menu w-dropdown-link">
                      Banco de imágenes
                    </Link>

                    <Link href="/comunicados" className="link-nav-menu w-dropdown-link">
                      Comunicados
                    </Link>

                    <Link
                      href="/sintesis-informativa"
                      className="link-nav-menu w-dropdown-link"
                    >
                      Síntesis informativa
                    </Link>

                    <a
                      href="https://dialogo.congresoedomex.gob.mx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-nav-menu w-dropdown-link"
                    >
                      Diálogo
                    </a>

                    <Link
                      href="/hora-x-hora"
                      className="link-nav-menu w-dropdown-link"
                    >
                      Notas Hora x Hora
                    </Link>
                  </nav>
                </div>

                {/* Menú Contacto */}
                <div data-hover="true" data-delay="100" className="w-dropdown">
                  <div className="w-dropdown-toggle" aria-expanded={dropdownAbierto === "contacto"} onClick={() => toggleDropdown("contacto")}>
                    <span className="w-icon-dropdown-toggle" />
                    <span className="menu-option">Contacto</span>
                  </div>

                  <nav
                    className={`dropdown-list w-dropdown-list ${
                      dropdownAbierto === "contacto" ? "dropdown-abierto" : ""
                    }`}
                  >
                    <Link href="/contacto" className="link-nav-menu w-dropdown-link">
                      Contacto
                    </Link>

                    <a
                      href="https://administracionyfinanzasplem.gob.mx/directorio/directorio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-nav-menu w-dropdown-link"
                    >
                      Directorio Telefónico
                    </a>
                  </nav>
                </div>
              </div>
            </nav>

            {/* Botón del menú móvil */}
          
            <div className="menu-button w-nav-button" aria-label="Abrir o cerrar menú" aria-expanded={menuAbierto}onClick={() => setMenuAbierto(!menuAbierto)}>
              <div className="w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
