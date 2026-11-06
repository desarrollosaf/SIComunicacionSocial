'use client';

import { BASE_PATH } from "@/lib/basePath";
import { useEffect, useState } from "react";
import { getBoletines } from "../service/boletines.api";

interface Boletin {
  id: number;
  titulo: string;
  descripcion?: string;
  imagen?: string;
  fecha?: string;
}

export default function GaleriaPage() {
  const [boletines, setBoletines] = useState<Boletin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const cargarBoletines = async () => {
    try {
      const respuesta = await getBoletines();

      setBoletines(respuesta);
    } catch (error) {
      console.error('Error al cargar boletines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  cargarBoletines();
}, []);

  const getFoto = (item?: any) => {
      const path = item?.fotos?.[0]?.path;
      return path
          ? `https://sistema.congresoedomex.gob.mx/${path}`
          : '/images/default-user.png';
  };

  return (
  <>
  <section className="section-6">
    <section>
      <div className="div-titulo-hero">
        <h1 className="h1-centrado">Banco de imágenes</h1>
        <p className="texto-general-centrado-18">Encuentra todas las imagenes de lo que se vive día a día en tu Congreso Mexiquense</p>
      </div>
    </section>
    <section className="cuerpo">
      <p className="texto-general-centrado-18">Selecciona la fecha que te gustaría revisar</p>
      <a href="#" className="btn-var-1 w-button">Selecciona la fecha aquí</a>
    </section>
    <section className="section-7">
      <div className="titulo-galeria">
        <h3 className="h3">Nombre del evento</h3>
        <div className="info-banco-imagenes">
          <p className="texto-div-16">Fecha</p>
        </div>
        <a href="#" className="btn-var-action w-button">Ver comunicado</a>
      </div>
      <div className="div-galeria">
        
        <div className="w-layout-grid grid-4">
          <div className="img-comunicado">
                {isLoading ? (
                  <div className="skeleton-box" style={{ width: 4170, height: 500,  borderRadius: 10 }} />
              ) : (
                   boletines.map((boletin) => (
                  <div className="item-comunicado" key={boletin.id}>
                    <div className="img-comunicado">
                      <img
                        src={getFoto(boletin)}
                        loading="lazy"
                        sizes="(max-width: 479px) 48vw, (max-width: 2040px) 49vw, 1000px"
                        srcSet={`
                          ${getFoto(boletin)} 500w,
                          ${getFoto(boletin)} 800w,
                          ${getFoto(boletin)} 1000w
                        `}
                        alt={boletin.titulo || 'Comunicado'}
                        className="img-centrada"
                      />
                    </div>
                    <div className="info-comunicado">
                      <div className="fecha-boletin">
                        {boletin.fecha}
                      </div>
                      <h3 className="titulo-boletin">
                        {boletin.titulo}
                      </h3>
                    </div>
                  </div>
                ))
              )}
            </div>
         </div>
      </div>
    </section>
  </section>
  </>
  )
}