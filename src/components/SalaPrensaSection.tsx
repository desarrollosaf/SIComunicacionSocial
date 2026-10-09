export default function SalaPrensaSection() {
     return (
        <div className="div-sala-prensa">
            <div className="sala-prensa-titulo">
                <h1 className="h1-centrado">Sala de Prensa</h1>
                <p className="texto-general-centrado-18">Encuentra todo lo relacionado a la imagen del congreso y todo lo relacionado a prensa dentro de esta sección</p>
            </div>
            <div className="div-section">
                <div className="w-layout-grid grid-salaprensa">
                <div className="div-card-v1">
                    <a href={`/kit-de-prensa`} className="link-block-4 w-inline-block"><img src="images/auto_stories_250dp_BB945C.png" loading="lazy" alt="" className="img-h-75-centro"/></a>
                    <h1 className="h4">Kit de prensa</h1>
                </div>
                <div className="div-card-v1">
                    <a href={`/sala-de-prensa`} className="w-inline-block"><img src="images/badge_250dp_BB945C.png" loading="lazy" alt="" className="img-h-75-centro"/></a>
                    <h1 className="h4">Sala de prensa</h1>
                </div>
                <div className="div-card-v1">
                    <a href={`/galeria`} className="w-inline-block"><img src="images/newspaper_250dp_BB945C.png" loading="lazy" alt="" className="img-h-75-centro"/></a>
                    <h1 className="h4">Galería</h1>
                </div>
                </div>
            </div>
        </div>
     )
}
