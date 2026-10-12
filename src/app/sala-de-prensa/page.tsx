"use client";

import { BASE_PATH } from "@/lib/basePath";
import { useState} from "react";

const imagenes = [
  {
    src: BASE_PATH + "/images/IMG_Sala_de_prensa_4.webp",
    srcSet:
      BASE_PATH + "/images/IMG_Sala_de_prensa_4-p-500.webp 500w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_4-p-800.webp 800w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_4-p-1080.webp 1080w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_4.webp 1600w",
    alt: "Sala de prensa, imagen 4",
  },
  {
    src: BASE_PATH + "/images/IMG_Sala_de_prensa_2.webp",
    srcSet:
      BASE_PATH + "/images/IMG_Sala_de_prensa_2-p-500.webp 500w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_2-p-800.webp 800w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_2-p-1080.webp 1080w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_2.webp 1600w",
    alt: "Sala de prensa, imagen 2",
  },
  {
    src: BASE_PATH + "/images/IMG_Sala_de_prensa_3.webp",
    srcSet:
      BASE_PATH + "/images/IMG_Sala_de_prensa_3-p-500.webp 500w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_3-p-800.webp 800w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_3-p-1080.webp 1080w, " +
      BASE_PATH + "/images/IMG_Sala_de_prensa_3.webp 1600w",
    alt: "Sala de prensa, imagen 3",
  },
];

export default function SalaPrensaPage() {
    const [imagenActiva, setImagenActiva] = useState<string | null>(
        null
    );

  return (
  <>
  <section>
    <div>
      <div className="titulo-sala-prensa">
        <h1 className="h1-centrado">Sala de Prensa</h1>
        <p className="texto-general-centrado-18">La Sala de Prensa es un espacio destinado a la atención y apoyo de las y los representantes de los medios de comunicación que dan cobertura a las actividades legislativas del Congreso del Estado de México.</p>
      </div>
    </div>
    <div className="div-section-saladeprensa-info">
      <div className="div-saladeprensa-info-interior">
        <div className="columna-centrado w-row">
          <div className="w-col w-col-6">
            <p className="texto-general-18">Este espacio cuenta con equipo de cómputo, acceso a internet y servicio de circuito cerrado de televisión (CCTV), mediante el cual se transmiten en tiempo real las sesiones del Pleno, reuniones de comisiones legislativas, así como eventos y actividades de las diputadas, diputade y diputados.<br/><br/>A través de este servicio, la Dirección General de Comunicación Social facilita las condiciones necesarias para que las y los periodistas desarrollen su labor informativa de manera eficiente, oportuna y con acceso a información institucional confiable.</p>
          </div>
          <div className="column-11 w-col w-col-6"><img src={`${BASE_PATH}/images/Sala_de_prensa_general.jpeg`} loading="lazy" sizes="(max-width: 479px) 96vw, (max-width: 767px) 97vw, (max-width: 991px) 48vw, (max-width: 3265px) 49vw, 1600px" srcSet={`${BASE_PATH}/images/Sala_de_prensa_general-p-500.jpeg 500w, ${BASE_PATH}/images/Sala_de_prensa_general-p-800.jpeg 800w, ${BASE_PATH}/images/Sala_de_prensa_general-p-1080.jpeg 1080w, ${BASE_PATH}/images/Sala_de_prensa_general.jpeg 1600w`} alt="" className="img-500"/></div>
        </div>
        <div className="div_ligthbox">
          {/* <a href="#" className="lightbox-link w-inline-block w-lightbox"> */}
            {/* <img src={`${BASE_PATH}/images/IMG_Sala_de_prensa_4.webp`} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px" srcSet={`${BASE_PATH}/images/IMG_Sala_de_prensa_4-p-500.webp 500w, ${BASE_PATH}/images/IMG_Sala_de_prensa_4-p-800.webp 800w, ${BASE_PATH}/images/IMG_Sala_de_prensa_4-p-1080.webp 1080w, ${BASE_PATH}/images/IMG_Sala_de_prensa_4.webp 1600w`} alt="" className="img-250px"/>
            <img src={`${BASE_PATH}/images/IMG_Sala_de_prensa_2.webp`} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px" srcSet={`${BASE_PATH}/images/IMG_Sala_de_prensa_2-p-500.webp 500w, ${BASE_PATH}/images/IMG_Sala_de_prensa_2-p-800.webp 800w, ${BASE_PATH}/images/IMG_Sala_de_prensa_2-p-1080.webp 1080w, ${BASE_PATH}/images/IMG_Sala_de_prensa_2.webp 1600w`} alt="" className="img-250px"/>
            <img src={`${BASE_PATH}/images/IMG_Sala_de_prensa_3.webp`} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px" srcSet={`${BASE_PATH}/images/IMG_Sala_de_prensa_3-p-500.webp 500w, ${BASE_PATH}/images/IMG_Sala_de_prensa_3-p-800.webp 800w, ${BASE_PATH}/images/IMG_Sala_de_prensa_3-p-1080.webp 1080w, ${BASE_PATH}/images/IMG_Sala_de_prensa_3.webp 1600w`} alt="" className="img-250px"/> */}
          <div className="lightbox-link w-inline-block w-lightbox">
            {imagenes.map((imagen) => (
            <button
                key={imagen.src}
                type="button"
                className="lightbox-link"
                onClick={() => setImagenActiva(imagen.src)}
                aria-label={`Ampliar ${imagen.alt}`}
            >
                <img
                src={imagen.src}
                srcSet={imagen.srcSet}
                sizes="(max-width: 1600px) 100vw, 1600px"
                loading="lazy"
                alt={imagen.alt}
                className="img-250px"
                />
            </button>
            ))}
        </div>

        {imagenActiva && (
            <div
            className="lightbox-overlay"
            onClick={() => setImagenActiva(null)}
            >
            <button
                type="button"
                className="lightbox-cerrar"
                onClick={() => setImagenActiva(null)}
                aria-label="Cerrar imagen"
            >
                &times;
            </button>

            <img
                src={imagenActiva}
                alt="Imagen ampliada de la sala de prensa"
                className="lightbox-imagen"
                onClick={(event) => event.stopPropagation()}
            />
            </div>
        )}
          {/* </a> */}
        </div>
      </div>
    </div>
  </section>
  <div className="close-area">
    <div className="div-section-general">
      <div className="columna-centrado w-row">
        <div className="column-12 w-col w-col-6"><img src={`${BASE_PATH}/images/prensa_2.webp`} loading="lazy" sizes="(max-width: 479px) 96vw, (max-width: 767px) 97vw, (max-width: 991px) 48vw, (max-width: 3265px) 49vw, 1600px" srcSet={`${BASE_PATH}/images/prensa_2-p-500.webp 500w, ${BASE_PATH}/images/prensa_2-p-800.webp 800w, ${BASE_PATH}/images/prensa_2-p-1080.webp 1080w, ${BASE_PATH}/images/prensa_2.webp 1600w`} alt="" className="img-500"/></div>
        <div className="w-col w-col-6">
          <div className="div-acreditaciones">
            <h1 className="h2">Acreditaciones</h1>
            <p className="texto-general">Para asuntos relacionados con acreditaciones de prensa y atención a medios comunícate con la Subdirección de Difusión y Vinculación<br/></p>
          </div>
          <div className="div-acreditaciones">
            <h1 className="h3">Solicitar acreditación para medios</h1>
            <p className="texto-general">Si representas a un medio de comunicación y te gustaría tener una acreditacion para poder acceder al recinto, contactanos para obtener más información, nuestro equipo de comunicación social revisara tu solicitud. <br/></p>
            <div className="div-llamar">
              <a href="tel:+527222796400" className="btn-var-3-non-margin w-button">Llamar</a>
              <p className="texto-general-non-margin">Tel: 722 279 6400 | Ext. 2591</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}