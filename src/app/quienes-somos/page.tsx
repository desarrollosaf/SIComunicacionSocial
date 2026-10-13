import { BASE_PATH } from "@/lib/basePath";

export default async function QuienesPage() {
  return (
<section>
    <div className="hero--flex-vertical">
      <div className="max_width-bgnone">
        <div className="flex-20">
          <h1 className="h1-centrado">Comunicación que acerca el trabajo legislativo a la ciudadanía</h1>
          <p className="texto-general-centrado-25">Somos la dependencia encargada de informar, difundir y fortalecer la comunicación institucional del Congreso del Estado de México, promoviendo una relación cercana, transparente y oportuna con medios de comunicación y la sociedad mexiquense.</p>
        </div>
      </div>
    </div>
    <div className="max_width-bgnone">
      <h1 className="h2-centrado">Nuestras actividades</h1>
      <div className="w-layout-grid grid-3">
        <div className="div-card-v2">
          <h3 className="h3-centrado">Cobertura legislativa</h3>
          <p className="texto-general-centrado">Transmisión y difusión de sesiones, comisiones, conferencias y actividades parlamentarias.</p>
        </div>
        <div className="div-card-v2">
          <h3 className="h3-centrado">Sala de prensa</h3>
          <p className="texto-general-centrado">Atención y acompañamiento a medios de comunicación y periodistas con acreditación.</p>
        </div>
        <div className="div-card-v2">
          <h3 className="h3-centrado">Comunicación digital</h3>
          <p className="texto-general-centrado">Gestión de las redes sociales institucionales, contenido multimedia y plataformas digitales.</p>
        </div>
        <div className="div-card-v2">
          <h3 className="h3-centrado">Producción audiovisual</h3>
          <p className="texto-general-centrado">Fotografía, video, transmisiones y generación de contenido informativo.</p>
        </div>
        <div className="div-card-v2">
          <h3 className="h3-centrado">Comunicación institucional</h3>
          <p className="texto-general-centrado">Diseño e implementación de estrategias de difusión e imagen pública del Congreso.</p>
        </div>
        <div className="div-card-v2">
          <h3 className="h3-centrado">Monitoreo informativo</h3>
          <p className="texto-general-centrado">Seguimiento de medios y análisis de la cobertura pública de temas legislativos.</p>
        </div>
      </div>
    </div>
    <div className="quienes-secc-2">
      <div className="columns-8 w-row">
        <div className="w-col w-col-6">
          <div>
            <div className="div-card-v3-white">
              <h1>Compromiso con la ciudadanía</h1>
              <p>Trabajamos para construir una comunicación institucional más abierta, accesible y cercana, que permita a las y los mexiquenses conocer el impacto de las decisiones legislativas y participar de manera informada en la vida pública del Estado de México.</p>
              <p className="texto-general-25">La comunicación pública debe servir para acercar las instituciones a las personas, fortalecer la transparencia y garantizar el derecho de la ciudadanía a estar informada.</p>
            </div>
          </div>
        </div>
        <div className="w-col w-col-6">
          <div className="div-block-83"><img src="images/lap-congreso.webp" loading="lazy" sizes="(max-width: 479px) 96vw, (max-width: 767px) 97vw, (max-width: 991px) 48vw, (max-width: 3918px) 49vw, 1920px" srcSet="images/lap-congreso-p-500.webp 500w, images/lap-congreso-p-800.webp 800w, images/lap-congreso-p-1080.webp 1080w, images/lap-congreso-p-1600.webp 1600w, images/lap-congreso.webp 1920w" alt=""/></div>
        </div>
      </div>
    </div>
    <div className="cta-ultimasecci-n">
      <h1 className="h1-centrado">¿Necesitas información o atención a medios?</h1>
      <div className="cta-btn-secction">
        <a href={`${BASE_PATH}/sala-de-prensa`} className="btn-var-cta w-button">Sala de Prensa</a>
        <a href="https://administracionyfinanzasplem.gob.mx/directorio/directorio" className="btn-var-cta w-button">Directorio</a>
      </div>
    </div>
  </section>
  )
}