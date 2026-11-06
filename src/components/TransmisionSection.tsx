import Link from 'next/link';

type AgendaItem = {
  id?: string | number;
  fecha_hora?: string;
  fecha_hora_inicio?: string;
  fecha_hora_fin?: string;
  descripcion?: string;
  liga?: string;
  transmision?: boolean;
  estatus_transmision?: boolean;
  sede?: {
    sede?: string;
  };
};


type UltimaSesion = {
  id?: string;
  fecha?: string;
  descripcion?: string;
  sede?: { sede?: string };
  tipoevento?: { nombre?: string };
};


type Props = {
  agenda: AgendaItem[] | null;
  transmision?: AgendaItem | null;
  ultimaSesion?: UltimaSesion | null;
};


const extraerYoutubeId = (iframeString?: string) => {
  if (!iframeString) return null;
  const match = iframeString.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
};

const extraerYoutubeWatch = (iframeString?: string) => {
  const id = extraerYoutubeId(iframeString);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
};

const extraerYoutubeSrc = (iframeString?: string) => {
  if (!iframeString) return null;

  // Intenta extraer src de un iframe
  const srcMatch = iframeString.match(/src="([^"]+)"/i);
  const rawUrl = srcMatch?.[1] ?? null;

  // Convierte URLs directas de YouTube al formato embed
  const urlToProcess = rawUrl ?? iframeString.trim();
  const ytMatch = urlToProcess.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  if (!ytMatch?.[1]) return null;

  // Elimina el parámetro "si" de tracking que puede causar Error 153
  return `https://www.youtube.com/embed/${ytMatch[1]}`;
};

const formatearFechaHora = (fecha?: string) => {
  if (!fecha) return '';

  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return fecha;

  return date.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatearHora = (fecha?: string) => {
  if (!fecha) return '';

  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export default function TransmisionSection({ agenda, ultimaSesion, transmision }: Props) {
    const agendas = Array.isArray(agenda) ? agenda : [];

    const agendaPrincipal = transmision || agendas?.[0];
    const agendaLista = agendas.slice(1, 5);

    const videoSrc = extraerYoutubeSrc(agendaPrincipal?.liga) ?? null;
    return (
        <div className="div-transmision-vivo">
            <div className="sala-prensa-titulo">
                <h1 className="h1-centrado">TRANSMISIÓN EN VIVO</h1>
                <p>Sigue en tiempo real las sesiones, conferencias y actividades oficiales del Congreso del Estado de México.</p>
            </div>
            <div className="columns-5 w-row">
                <div className="w-col w-col-6">
                    <div style={{ paddingTop: '56.17021276595745%' }}
                        className="youtube-container"
                    >
                        {videoSrc ? (
                        <iframe
                            src={videoSrc}
                            frameBorder={0}
                            style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto',
                            }}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={agendaPrincipal?.descripcion || 'Agenda Parlamentaria'}
                        />
                        ) : null}
                    </div>
                    <h4>{agendaPrincipal?.descripcion || 'Sin evento destacado'}</h4>
                </div>
                <div className="column-6 w-col w-col-6">
                <div>
                    <ol role="list" className="w-list-unstyled">
                        {agendaLista.length > 0 ? (
                            agendaLista.map((item) => (
                            <li className="list-item" key={item.id}>
                                <div className="div-block-19">
                                <div className="text-block-3">
                                    {item.descripcion || 'Sin descripción'}
                                </div>

                                <div>
                                    {formatearFechaHora(item.fecha_hora_inicio || item.fecha_hora)}
                                    {item.fecha_hora_inicio || item.fecha_hora_fin ? ' | ' : ' | '}
                                    {formatearHora(item.fecha_hora_inicio || item.fecha_hora)}
                                    {item.fecha_hora_fin
                                    ? ` - ${formatearHora(item.fecha_hora_fin)}`
                                    : ''}
                                    {item.sede?.sede ? ` - ${item.sede.sede}` : ''}
                                </div>

                                {item.liga ? (
                                    <a
                                    href={extraerYoutubeWatch(item.liga) || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-envivo w-button"
                                    >
                                    Ir al en vivo
                                    </a>
                                ) : (
                                    <span className="btn-envivo w-button" style={{ opacity: 0.6 }}>
                                    Sin transmisión
                                    </span>
                                )}
                                </div>
                            </li>
                            ))
                        ) : (
                            <li className="list-item">
                            <div className="div-block-19">
                                <div className="text-block-3">
                                No hay eventos registrados en la agenda.
                                </div>
                            </div>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
            </div>
        </div>
    )
}