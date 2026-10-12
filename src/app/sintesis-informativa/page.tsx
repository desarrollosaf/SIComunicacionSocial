
export default function SintesisInformativaPage() {
    return (
        <>
        <section>
            <div className="hero-sintesis-flex-vertical-copy">
            <div className="max_width-bgnone">
                <div className="flex-20">
                <h1 className="h1-centrado">Síntesis Informativa</h1>
                <p className="texto-general-centrado-25">Monitoreamos y analizamos la cobertura mediática del Congreso del Estado de México para generar reportes oportunos sobre menciones, publicaciones, portadas y contenidos informativos de interés.</p>
                </div>
            </div>
            </div>
        </section>
        <div>
            <div className="sintesis-listado-titulo">
            <h1 className="h3">Síntesis Informativa</h1>
            <div className="div-busqueda_sintesis">
                <form action="/search" className="search-2 w-form"><input className="search-input-2 w-input" maxLength={100} name="query" placeholder="DD / MM / AAAA" type="search" id="search"/><input type="submit" className="btn-buscar w-button" value="Buscar"/></form>
            </div>
            </div>
            <div className="resultados">
            <div className="sintesis-listado">
                <h1 className="h4">dd / mm / aaaa</h1>
                <div className="div-cuerpo-acreditaciones">
                <div>
                    <div className="div-btn-sintesis">
                    <a href="#" className="btn-sintesis w-button">Síntesis informativa</a>
                    <a href="#" className="btn-sintesis w-button">Portadas Nacionales</a>
                    <a href="#" className="btn-sintesis w-button">Portadas Estatales</a>
                    <a href="#" className="btn-sintesis w-button">Portadas Digitales</a>
                    </div>
                </div>
                </div>
            </div>
            <div className="sintesis-listado">
                <h1 className="h4">dd / mm / aaaa</h1>
                <div className="div-cuerpo-acreditaciones">
                <div>
                    <div className="div-btn-sintesis">
                    <a href="#" className="btn-sintesis w-button">Síntesis informativa</a>
                    <a href="#" className="btn-sintesis w-button">Portadas Nacionales</a>
                    <a href="#" className="btn-sintesis w-button">Portadas Estatales</a>
                    <a href="#" className="btn-sintesis w-button">Portadas Digitales</a>
                    </div>
                </div>
                </div>
            </div>
            <div className="numeros-paginacion">
                <div className="num_page">1</div>
                <div className="num_page">2</div>
                <div className="num_page">3</div>
                <div className="num_page">4</div>
                <div className="num_page">5</div>
                <div className="num_page">...</div>
            </div>
            </div>
      </div>
    </>
    )

}