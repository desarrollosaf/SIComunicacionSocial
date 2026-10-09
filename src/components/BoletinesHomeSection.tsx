import Link from 'next/link';

type Boletin = {
  id?: string | number;
  titulo?: string;
  fecha?: string;
  fotos?: Array<{ path?: string }>;
  descripcion?: Array<{ bullets?: string }>;
};

type Props = {
  mainBoletines: Boletin[] | null;
};

const BASE_IMG = 'https://sistema.congresoedomex.gob.mx/';

const formatearFecha = (fecha?: string) => {
  if (!fecha) return '';

  const date = new Date(`${fecha}T00:00:00`);

  if (Number.isNaN(date.getTime())) return fecha;

  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const getImageUrl = (boletin?: Boletin) => {
  const path = boletin?.fotos?.[0]?.path;
  return path ? `${BASE_IMG}/${path}`.replace(/([^:]\/)\/+/g, '$1') : '/images/placeholder.png';
};

export default function BoletinesHomeSection({ mainBoletines }: Props) {
  const boletines = Array.isArray(mainBoletines) ? mainBoletines : [];

  if (boletines.length < 5) {
    return null;
  }

  const b0 = boletines?.[0];
  const b1 = boletines?.[1];
  const b2 = boletines?.[2];
  const b3 = boletines?.[3];
  const b4 = boletines?.[4];

  return (
    <section className="max_width">
      <div>
        <div>
          <h4 className="h1-centrado">Boletines</h4>
        </div>
        <div className="texto-general-centrado">Mantente informado de todo lo que ocurre en el pleno</div>
        <div className="div-block-23">
          <div className="columns-boletines w-row">
            <div className="column-9 w-col w-col-6">
              <div className="div-block-22">
                <img
                  src={getImageUrl(b0)}
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2666px) 48vw, 1280px"
                  srcSet={`
                    ${getImageUrl(b0)} 500w,
                    ${getImageUrl(b0)} 800w,
                    ${getImageUrl(b0)} 1080w,
                    ${getImageUrl(b0)} 1280w
                  `}
                  alt={b0?.titulo || 'Boletín'}
                  className="image-10"
                />

                <div>
                  <h4 className="heading-10">
                    {b0?.titulo || 'Sin título'}
                    <br />
                  </h4>

                  <p className="paragraph-4">{formatearFecha(b0?.fecha)}</p>

                  <p>{b0?.descripcion?.[0]?.bullets || ''}</p>
                </div>

                <Link href={`/boletines/${b0?.id ?? ''}`} className="btn-var-2 w-button">
                  Leer el boletín
                </Link>
              </div>
            </div>
            <div className="w-col w-col-6">
              <div>
                <div className="w-layout-grid">
                  <div>
                    <img
                      src={getImageUrl(b1)}
                      loading="lazy"
                      sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px"
                      srcSet={`
                        ${getImageUrl(b1)} 500w,
                        ${getImageUrl(b1)} 800w,
                        ${getImageUrl(b1)} 1080w,
                        ${getImageUrl(b1)} 1280w
                      `}
                      alt={b1?.titulo || 'Boletín'}
                      className="img-boletin"
                    />
                    <h5>{b1?.titulo || 'Sin título'}</h5>
                    <div className="fecha-boletin">{formatearFecha(b1?.fecha)}</div>
                    <Link href={`/boletines/${b1?.id ?? ''}`} className="btn-var-2 w-button">
                      Leer el boletín
                    </Link>
                  </div>

                  <div>
                    <img
                      src={getImageUrl(b2)}
                      loading="lazy"
                      sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px"
                      srcSet={`
                        ${getImageUrl(b2)} 500w,
                        ${getImageUrl(b2)} 800w,
                        ${getImageUrl(b2)} 1080w,
                        ${getImageUrl(b2)} 1280w
                      `}
                      alt={b2?.titulo || 'Boletín'}
                      className="img-boletin"
                    />
                    <h5>{b2?.titulo || 'Sin título'}</h5>
                    <div className="fecha-boletin">{formatearFecha(b2?.fecha)}</div>
                    <Link href={`/boletines/${b2?.id ?? ''}`} className="btn-var-2 w-button">
                      Leer el boletín
                    </Link>
                  </div>

                  <div>
                    <img
                      src={getImageUrl(b3)}
                      loading="lazy"
                      sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px"
                      srcSet={`
                        ${getImageUrl(b3)} 500w,
                        ${getImageUrl(b3)} 800w,
                        ${getImageUrl(b3)} 1080w,
                        ${getImageUrl(b3)} 1280w
                      `}
                      alt={b3?.titulo || 'Boletín'}
                      className="img-boletin"
                    />
                    <h5>{b3?.titulo || 'Sin título'}</h5>
                    <div className="fecha-boletin">{formatearFecha(b3?.fecha)}</div>
                    <Link href={`/boletines/${b3?.id ?? ''}`} className="btn-var-2 w-button">
                      Leer el boletín
                    </Link>
                  </div>

                  <div>
                    <img
                      src={getImageUrl(b4)}
                      loading="lazy"
                      sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px"
                      srcSet={`
                        ${getImageUrl(b4)} 500w,
                        ${getImageUrl(b4)} 800w,
                        ${getImageUrl(b4)} 1080w,
                        ${getImageUrl(b4)} 1280w
                      `}
                      alt={b4?.titulo || 'Boletín'}
                      className="img-boletin"
                    />
                    <h5>{b4?.titulo || 'Sin título'}</h5>
                    <div className="fecha-boletin">{formatearFecha(b4?.fecha)}</div>
                    <Link href={`/boletines/${b4?.id ?? ''}`} className="btn-var-2 w-button">
                      Leer el boletín
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-block-77">
        <h4 className="heading-10">Conoce más de nuestro trabajo legislativo<br/></h4>
        <a href="https://www.congresoedomex.gob.mx/comunicados" className="btn-var-2_1 w-button">Ver todos los boletines</a>
      </div>
    </section>
  );
}