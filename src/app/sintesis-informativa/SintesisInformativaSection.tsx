'use client';

const BASE_URL = 'https://sistema.congresoedomex.gob.mx/';

type SintesisRow = {
  id: number;
  fecha: string;
  sintesis_informativa?: string | null;
  portadas_nacionales?: string | null;
  portadas_estatales?: string | null;
  portadas_digitales?: string | null;
};

type Props = {
  rows: SintesisRow[];
  loading: boolean;
  busqueda: string;
  onBusquedaChange: (valor: string) => void;
  onBuscar: (e: React.FormEvent) => void;
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
};

function formatearFecha(fecha: string) {
  if (!fecha) return '';
  const date = new Date(`${fecha}T00:00:00`);
  if (Number.isNaN(date.getTime())) return fecha;
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getPaginasVisibles(paginaActual: number, totalPaginas: number) {
  const paginas: (number | '...')[] = [];
  const rango = 2;

  for (let i = 1; i <= totalPaginas; i++) {
    if (i === 1 || i === totalPaginas || (i >= paginaActual - rango && i <= paginaActual + rango)) {
      paginas.push(i);
    } else if (paginas[paginas.length - 1] !== '...') {
      paginas.push('...');
    }
  }

  return paginas;
}

const botones: { key: keyof SintesisRow; label: string }[] = [
  { key: 'sintesis_informativa', label: 'Síntesis informativa' },
  { key: 'portadas_nacionales', label: 'Portadas Nacionales' },
  { key: 'portadas_estatales', label: 'Portadas Estatales' },
  { key: 'portadas_digitales', label: 'Portadas Digitales' },
];

export default function SintesisInformativaSection({
  rows,
  loading,
  busqueda,
  onBusquedaChange,
  onBuscar,
  paginaActual,
  totalPaginas,
  onCambiarPagina,
}: Props) {
  return (
    <>
        <section>
        <div className="hero-sintesis-flex-vertical-copy">
          <div className="max_width-bgnone">
            <div className="flex-20">
              <h1 className="h1-centrado">Síntesis Informativa</h1>
              <p className="texto-general-centrado-25">
                Monitoreamos y analizamos la cobertura mediática del Congreso del Estado de
                México para generar reportes oportunos sobre menciones, publicaciones,
                portadas y contenidos informativos de interés.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div className="sintesis-listado-titulo">
          <h1 className="h3">Síntesis Informativa</h1>
          <div className="div-busqueda_sintesis">
            <form onSubmit={onBuscar} className="search-2 w-form">
              <input
                className="search-input-2 w-input"
                maxLength={256}
                name="query"
                placeholder="DD / MM / AAAA"
                type="search"
                id="search"
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
              />
              <input type="submit" className="btn-buscar w-button" value="Buscar" />
            </form>
          </div>
        </div>

        <div className="resultados">
          {loading ? (
            <div className="sintesis-listado">
              <h1 className="h4">Cargando…</h1>
            </div>
          ) : rows.length === 0 ? (
            <div className="sintesis-listado">
              <h1 className="h4">No se encontraron resultados.</h1>
            </div>
          ) : (
            rows.map((item) => (
              <div className="sintesis-listado" key={item.id}>
                <h1 className="h4">{formatearFecha(item.fecha)}</h1>
                <div className="div-cuerpo-acreditaciones">
                  <div>
                    <div className="div-btn-sintesis">
                      {botones
                        .filter((btn) => item[btn.key])
                        .map((btn) => (
                          <a
                            key={btn.key}
                            href={`${BASE_URL}${item[btn.key]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-sintesis w-button"
                          >
                            {btn.label}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {totalPaginas > 1 && (
            <div className="numeros-paginacion">
              {getPaginasVisibles(paginaActual, totalPaginas).map((num, idx) =>
                num === '...' ? (
                  <div className="num_page" key={`ellipsis-${idx}`}>...</div>
                ) : (
                  <div
                    className={`num_page ${num === paginaActual ? 'activo' : ''}`}
                    key={num}
                    onClick={() => onCambiarPagina(num)}
                  >
                    {num}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
