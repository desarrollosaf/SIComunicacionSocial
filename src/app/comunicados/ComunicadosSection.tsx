'use client';

type Props = {
    boletines: any,
    loading: boolean
};

type Descripcion = {
  bullets?: string;
};

type bloque = {
    id?: string;
    fecha?: string;
    titulo?: string;
    descripcion?: Descripcion[];
    foto?: { path?: string }[];
};


export default function ComunicadosSection({ boletines, loading } : Props) {
const isLoading = loading && boletines.length === 0;
const principal = boletines?.[0];
const bloque1: bloque[] = boletines.slice(1, 5);
const bloque2: bloque[] = boletines.slice(5, 8);
const bloque3: bloque[] = boletines.slice(8, 12);

const skeletonStyles = `
    .skeleton-box {
      background: #eee;
      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      background-size: 200% 100%;
      animation: 1s shine linear infinite;
    }
    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  `;

    const getFoto = (item?: any) => {
        const path = item?.fotos?.[0]?.path;
        return path
            ? `https://sistema.congresoedomex.gob.mx/${path}`
            : '/images/default-user.png';
    };

    return (
    <>
        <section className="section-11"  style={{
        opacity: loading ? 0.5 : 1,
        transition: 'opacity 0.3s ease'
        }}>
            <div className="hero-boletines">
                <h1 className="titulo-seccion">Boletines </h1>
                <div className="div-block-2">
                    <form action="/search" className="search w-form"><label htmlFor="search" className="field-label">Encuentra de manera fácil y rápida la información que necesitas.</label>
                    <div className="div-block-3"><input className="search-input w-input" maxLength={256}  name="query" placeholder="Buscar" type="search" id="search"/><input type="submit" className="search-button w-button" value="Buscar"/></div>
                    </form>
                </div>
            </div>
        </section>

        
        <style>{skeletonStyles}</style>
        <section className="section-11" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
            <div className="ultimo-boletin">
                <div className="comunicado-main">
                    <div className="img-comunicado">
                         {isLoading ? (
                            <div className="skeleton-box" style={{ width: 4170, height: 500,  borderRadius: 10 }} />
                        ) : (
                            <img src={getFoto(principal)} loading="lazy" sizes="(max-width: 4170px) 100vw, 4170px"
                             srcSet={`
                            ${getFoto(principal)} 500w,
                            ${getFoto(principal)} 800w,
                            ${getFoto(principal)} 1080w, 
                            ${getFoto(principal)} 1600w,
                            ${getFoto(principal)} 2000w,
                            ${getFoto(principal)} 2600w,
                            ${getFoto(principal)} 3200w,
                            ${getFoto(principal)} 4170w`} alt="" className="img-comunicado-main"/>
                        )}
                    </div>
                    <div className="info-comunicado">
                         {isLoading ? (
                            <>
                                <div className="skeleton-box" style={{ width: 100, height: 20, marginBottom: 10 }} />
                                <div className="skeleton-box" style={{ width: '80%', height: 30, marginBottom: 10 }} />
                                <div className="skeleton-box" style={{ width: '100%', height: 60 }} />
                            </>
                        ) : (
                            <>
                                <div className="fecha-boletin">{ principal?.fecha } </div>
                                <h3 className="titulo-boletin"> { principal?.titulo }</h3>
                                { principal?.descripcion?.[0]?.bullets }
                                <a href={`/boletines/${principal?.id ?? ''}`}  className="btn-boletin w-button">Abrir Comunicado</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="div-block-72">
                <div className="w-layout-grid grid-tetra">
                    {(isLoading ? Array(4).fill(0) : bloque1).map((item: bloque, index) => (
                        <div className="comunicado_small" key={index}>
                            <div className="img-comunicado_tetra">
                                {isLoading ? (
                                    <div className="skeleton-box" style={{ height: 150 }} />
                                ) : (
                                    <img src={getFoto(item)} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px" 
                                        srcSet={`
                                        ${getFoto(item)} 500w,
                                        ${getFoto(item)} 800w,
                                        ${getFoto(item)} 1080w,
                                        ${getFoto(item)} 1600w`} alt="" className="img-comunicado-lista"/>
                                    )}
                            </div>

                            <div className="info-comunicado">
                                {isLoading ? (
                                    <>
                                        <div className="skeleton-box" style={{ width: 80, height: 15 }} />
                                        <div className="skeleton-box" style={{ width: '90%', height: 20 }} />
                                        <div className="skeleton-box" style={{ width: '100%', height: 40 }} />
                                    </>
                                ) : ( 
                                    <>
                                        <div className="fecha-boletin"> { item?.fecha }</div>
                                        <h3 className="titulo-boletin"> { item?.titulo } </h3>
                                        <p> { item?.descripcion?.[0]?.bullets }</p>
                                        <a href={`/boletines/${item?.id ?? ''}`} className="btn-boletin w-button">Abrir Comunicado</a>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        
            <div className="w-layout-grid grid-triple">
                 {(isLoading ? Array(3).fill(0) : bloque2).map((item: bloque, index) => (
                    <div className="comunicado_small" key={index}>
                        <div className="img-comunicado">
                            {isLoading ? (
                                <div className="skeleton-box" style={{ height: 150 }} />
                            ) : (
                                <img src={getFoto(item)} loading="lazy" alt="" className="image-36"/>
                            )}
                        </div>
                        <div className="info-comunicado">
                            {isLoading ? (
                                <>
                                    <div className="skeleton-box" style={{ width: 80, height: 15 }} />
                                    <div className="skeleton-box" style={{ width: '90%', height: 20 }} />
                                    <div className="skeleton-box" style={{ width: '100%', height: 40 }} />
                                </>
                            ) : (
                                <>
                                    <div className="fecha-boletin">{ item?.fecha }</div>
                                    <h3 className="titulo-boletin">{ item?.titulo }</h3>
                                    <p> {item?.descripcion?.[0]?.bullets} </p>
                                    <a href={`/boletines/${item?.id ?? ''}`} className="btn-boletin w-button">Abrir Comunicado</a>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-layout-grid grid-tetra">
                {(isLoading ? Array(4).fill(0) : bloque3).map((item: bloque, index) => (
                        <div className="comunicado_small" key={index}>
                            <div className="img-comunicado_tetra">
                                {isLoading ? (
                                    <div className="skeleton-box" style={{ height: 150 }} />
                                ) : (
                                <img src={getFoto(item)} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px" 
                                    srcSet={`
                                    ${getFoto(item)} 500w,
                                    ${getFoto(item)} 800w,
                                    ${getFoto(item)} 1080w,
                                    ${getFoto(item)} 1600w`} alt="" className="img-comunicado-lista"/>
                                )}
                            </div>

                            <div className="info-comunicado">
                                {isLoading ? (
                                    <>
                                        <div className="skeleton-box" style={{ width: 80, height: 15 }} />
                                        <div className="skeleton-box" style={{ width: '90%', height: 20 }} />
                                        <div className="skeleton-box" style={{ width: '100%', height: 40 }} />
                                    </>
                                ) : (
                                    <>
                                        <div className="fecha-boletin"> { item?.fecha }</div>
                                        <h3 className="titulo-boletin"> { item?.titulo } </h3>
                                        <p> { item?.descripcion?.[0]?.bullets }</p>
                                        <a href={`/boletines/${item?.id ?? ''}`} className="btn-boletin w-button">Abrir Comunicado</a>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    </>
    );
}
