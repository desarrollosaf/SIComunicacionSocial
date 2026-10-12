import { BASE_PATH } from "@/lib/basePath";

export default async function KitPrensaPage() {
  return (
  <>
   <section className="main">
        <div>
            <div className="div-titulo-hero-km">
                <h1 className="h1-centrado">Kit de Medios</h1>
                <p className="texto-general-centrado">Descarga recursos oficiales, materiales gráficos y documentación institucional del Congreso del Estado de México para cobertura periodística y difusión autorizada.</p>
            </div>
        </div>
  </section>
  <div className="div-seccion-kit-prensa">
    <h2>Recursos oficiales para medios de comunicación</h2>
    <p className="texto-general">Ponemos a disposición de medios, periodistas y aliados institucionales una colección de materiales oficiales para garantizar una comunicación clara, uniforme y alineada con la identidad institucional del Congreso del Estado de México.</p>
    <div className="w-layout-grid grid">
      <div className="div-card-v1"><img src={`${BASE_PATH}/images/Logotiposoficiales.webp`} loading="lazy" sizes="(max-width: 479px) 68vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Logotiposoficiales-p-500.webp 500w, ${BASE_PATH}/images/Logotiposoficiales-p-800.webp 800w, ${BASE_PATH}/images/Logotiposoficiales.webp 1000w`} alt=""/>
        <div className="div-block-81">
          <h3 className="h3">Imagotipos Oficiales</h3>
          <p className="texto-general-bold">Contenido.</p>
          <p className="texto-general">Logo principal<br/>Versiones horizontales verticales<br/>PNG, SVG, PDF, AI</p>
        </div>
        <a href={`${BASE_PATH}/logotipos-oficiales`} className="btn-var-3 w-button">Entrar</a>
      </div>
      <div className="div-card-v1"><img src={`${BASE_PATH}/images/Manual_Congreso.webp`} loading="lazy" sizes="(max-width: 479px) 55vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Manual_Congreso-p-500.webp 500w, ${BASE_PATH}/images/Manual_Congreso-p-800.webp 800w, ${BASE_PATH}/images/Manual_Congreso.webp 1000w`} alt=""/>
        <div className="div-block-81">
          <h3 className="h3">Manual de Identidad</h3>
          <p className="texto-general-bold">Contenido.</p>
          <p className="texto-general">Uso correcto de marca<br/>TipografíasColores institucionales<br/>Aplicaciones oficiales</p>
        </div>
        <a href="#" className="btn-var-3 w-button">Descargar</a>
      </div>
      <div className="div-card-v1"><img src={`${BASE_PATH}/images/Medios-copia.webp`} loading="lazy" sizes="(max-width: 479px) 68vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Medios-copia-p-500.webp 500w, ${BASE_PATH}/images/Medios-copia-p-800.webp 800w, ${BASE_PATH}/images/Medios-copia.webp 1000w`} alt=""/>
        <div className="div-block-81">
          <h3 className="h3">Imagotipos de Dependencias</h3>
          <p className="texto-general-bold">Contenido.</p>
          <p className="texto-general">Logo principal<br/>Versiones horizontales / verticales</p>
        </div>
        <a href={`${BASE_PATH}/identidad-dependencias`} className="btn-var-3 w-button">Explorar Dependencias</a>
      </div>
      <div className="div-card-v1"><img src={`${BASE_PATH}/images/Logotiposoficiales.webp`} loading="lazy" sizes="(max-width: 479px) 55vw, (max-width: 2040px) 49vw, 1000px" srcSet={`${BASE_PATH}/images/Logotiposoficiales-p-500.webp 500w, ${BASE_PATH}/images/Logotiposoficiales-p-800.webp 800w, ${BASE_PATH}/images/Logotiposoficiales.webp 1000w`} alt=""/>
        <div className="div-block-81">
          <h3 className="h3">Manual de usos corrextos e incorrectos</h3>
          <p className="texto-general-bold">Contenido.</p>
          <p className="texto-general">Videos oficiales<br/>Aperturas<br/>Material audiovisual</p>
        </div>
        <a href="#" className="btn-var-3 w-button">Explorar galería</a>
      </div>
    </div>
  </div>
  </>
  );
}