import { BASE_PATH } from "@/lib/basePath";
export default async function LogotiposOficialesPage() {
  return (
  <>
  <section>
    <div className="seccion-general">
      <h1 className="h1-centrado">Imagotipos</h1>
      <p className="texto-general-centrado">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
    </div>
    <div className="div-seccion-kit-prensa">
      <div className="div-block-82">
        <h2 className="h2-centrado">Recursos oficiales para medios de comunicación</h2>
        <p className="texto-general">Ponemos a disposición de medios, periodistas y aliados institucionales una colección de materiales oficiales para garantizar una comunicación clara, uniforme y alineada con la identidad institucional del Congreso del Estado de México.</p>
      </div><img src={`${BASE_PATH}/images/congreso_logo_horizontal.png`} loading="lazy" sizes="(max-width: 5195px) 100vw, 5195px" srcSet={`${BASE_PATH}/images/congreso_logo_horizontal-p-500.png 500w, ${BASE_PATH}/images/congreso_logo_horizontal-p-800.png 800w, ${BASE_PATH}/images/congreso_logo_horizontal-p-1080.png 1080w, ${BASE_PATH}/images/congreso_logo_horizontal-p-1600.png 1600w, ${BASE_PATH}/images/congreso_logo_horizontal-p-2000.png 2000w, ${BASE_PATH}/images/congreso_logo_horizontal-p-2600.png 2600w, ${BASE_PATH}/images/congreso_logo_horizontal-p-3200.png 3200w, ${BASE_PATH}/images/congreso_logo_horizontal.png 5195w`} alt="" className="img-centrada-h200"/>
      <div className="w-layout-grid grid-recursos">
        <div className="div-card-v1">
          <div className="div-block-81">
            <h3 className="h3-centrado">Imagotipos Oficiales en PNG</h3>
            <p className="texto-general-centrado-18">Contenido.</p>
          </div>
          <p className="texto-general-centrado">Logo principal<br/>Versiones horizontales verticales<br/>PNGDocumentos en PNG</p>
          <a href={`${BASE_PATH}/documents/Imagotipos-del-Congreso-del-Edo-Méx-PNG.zip`} className="btn-var-3 w-button">Descargar</a>
        </div>
        <div className="div-card-v1">
          <div className="div-block-81">
            <h3 className="h3-centrado">Imagotipos Oficiales en SVG</h3>
            <p className="texto-general-centrado-18">Contenido.</p>
          </div>
          <p className="texto-general-centrado">Logo principal<br/>Versiones horizontales verticales<br/>Documentos en SVG</p>
          <a href={`${BASE_PATH}/documents/Imagotipos-del-Congreso-del-Edo-Méx-SVG.zip`} className="btn-var-3 w-button">Descargar</a>
        </div>
        <div className="div-card-v1">
          <div className="div-block-81">
            <h3 className="h3-centrado">Imagotipos Oficiales en PDF</h3>
            <p className="texto-general-centrado-18">Contenido.</p>
          </div>
          <p className="texto-general-centrado">Logo principal<br/>Versiones horizontales verticales<br/>Documentos en PDF</p>
          <a href={`${BASE_PATH}/documents/Imagotipos-del-Congreso-del-Edo-Méx-PDF.zip`} className="btn-var-3 w-button">Descargar</a>
        </div>
        <div className="div-card-v1">
          <div className="div-block-81">
            <h3 className="h3-centrado">Imagotipos Oficiales en AI</h3>
            <p className="texto-general-centrado-18">Contenido.</p>
          </div>
          <p className="texto-general-centrado">Logo principal<br/>Versiones horizontales verticales<br/>Documentos en AI</p>
          <a href={`${BASE_PATH}/documents/Imagotipos-del-Congreso-del-Edo-Méx-AI.zip`} className="btn-var-3 w-button">Descargar</a>
        </div>
      </div>
    </div>
  </section>
    </> 
  );
}