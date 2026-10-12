import { BASE_PATH } from "@/lib/basePath";

export default async function GaleriaPage() {
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
            <img src={`${BASE_PATH}/images/Logotiposoficiales.webp`} loading="lazy" sizes="(max-width: 479px) 48vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Logotiposoficiales-p-500.webp 500w, ${BASE_PATH}/images/Logotiposoficiales-p-800.webp 800w, ${BASE_PATH}/images/Logotiposoficiales.webp 1000w`} alt="" className="img-centrada"/>
            <img src={`${BASE_PATH}/images/Logotiposoficiales.webp`} loading="lazy" sizes="(max-width: 479px) 48vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Logotiposoficiales-p-500.webp 500w, ${BASE_PATH}/images/Logotiposoficiales-p-800.webp 800w, ${BASE_PATH}/images/Logotiposoficiales.webp 1000w`} alt="" className="img-centrada"/>
            <img src={`${BASE_PATH}/images/Logotiposoficiales.webp`} loading="lazy" sizes="(max-width: 479px) 48vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Logotiposoficiales-p-500.webp 500w, ${BASE_PATH}/images/Logotiposoficiales-p-800.webp 800w, ${BASE_PATH}/images/Logotiposoficiales.webp 1000w`} alt="" className="img-centrada"/>
            <img src={`${BASE_PATH}/images/Logotiposoficiales.webp`} loading="lazy" sizes="(max-width: 479px) 48vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Logotiposoficiales-p-500.webp 500w, ${BASE_PATH}/images/Logotiposoficiales-p-800.webp 800w, ${BASE_PATH}/images/Logotiposoficiales.webp 1000w`} alt="" className="img-centrada"/>
            <img src={`${BASE_PATH}/images/Logotiposoficiales.webp`} loading="lazy" sizes="(max-width: 479px) 48vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Logotiposoficiales-p-500.webp 500w, ${BASE_PATH}/images/Logotiposoficiales-p-800.webp 800w, ${BASE_PATH}/images/Logotiposoficiales.webp 1000w`} alt="" className="img-centrada"/>
        </div>
      </div>
    </section>
  </section>
  </>
  )
}