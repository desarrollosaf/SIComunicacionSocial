"use client";

import { BASE_PATH } from "@/lib/basePath";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
const [menuAbierto, setMenuAbierto] = useState(false);
const [comunicacionAbierto, setComunicacionAbierto] = useState(false);
const [contactoAbierto, setContactoAbierto] = useState(false);

  return (
    <header className="header">
      <div className="nav-bar-structure">
        <Link href="/" className="w-nav-brand">
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

        <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
          <div className="container-3 w-container">
            <nav role="navigation" className={`nav-menu w-nav-menu ${menuAbierto ? "menu-abierto" : ""}`}>
              <div className="div-block-9">
                <Link href="/quienes-somos" className="link">
                  ¿Quiénes somos?
                </Link>

                <div data-hover="true" data-delay="100" className={`w-dropdown ${comunicacionAbierto ? "w--open" : ""}`}>
                  <div className="w-dropdown-toggle" onClick={() => setComunicacionAbierto(!comunicacionAbierto)} aria-expanded={comunicacionAbierto}>
                    <div className="w-icon-dropdown-toggle"></div>
                    <div className="menu-option">Comunicación</div>
                  </div>  

                  <nav className={`dropdown-list w-dropdown-list ${ comunicacionAbierto ? "w--open" : "" }`}>
                    <a href={`${BASE_PATH}/sala-de-prensa`} className="link-nav-menu w-dropdown-link">Sala de Prensa</a>
                    <a href={`${BASE_PATH}/galeria`} className="link-nav-menu w-dropdown-link">Banco de imagenes</a>
                    <a href={`${BASE_PATH}/comunicados`} aria-current="page"  className="link-nav-menu w-dropdown-link" >Comunicados</a>
                    <a  href={`${BASE_PATH}/sintesis-informativa`} className="link-nav-menu w-dropdown-link" >Síntesis informativa</a>
                    <a href="https://dialogo.congresoedomex.gob.mx/" target="_blank" rel="noopener noreferrer" className="link-nav-menu w-dropdown-link"> Diálogo</a>
                    <a href={`${BASE_PATH}/hora-x-hora`} className="link-nav-menu w-dropdown-link">Notas Hora x Hora</a>
                  </nav>
                </div>

                <div data-hover="true" data-delay="100" className={`w-dropdown ${contactoAbierto ? "w--open" : ""}`} >
                  <div className="w-dropdown-toggle" onClick={() => setContactoAbierto(!contactoAbierto)}  aria-expanded={contactoAbierto} >
                    <div className="w-icon-dropdown-toggle"></div>
                    <div className="menu-option">Contacto</div>
                  </div>

                  <nav className={`dropdown-list w-dropdown-list ${ contactoAbierto ? "w--open" : "" }`} >
                    <a  href={`${BASE_PATH}/contacto`} className="link-nav-menu w-dropdown-link" >Contacto</a>
                    <a href="https://administracionyfinanzasplem.gob.mx/directorio/directorio"  className="link-nav-menu w-dropdown-link" >Directorio Telefónico</a>
                  </nav>
                </div>
              </div>
            </nav>

            <div className="menu-button w-nav-button" role="button" tabIndex={0} aria-label="Abrir o cerrar menú" aria-expanded={menuAbierto} onClick={() => setMenuAbierto(!menuAbierto)}
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
