type dialogo = {
  id?: string | number;
  titulo?: string;
  fecha?: string;
  texto?: string;
  liga?: string;
  imagen?: string;
};

type Props = {
  dialogo: dialogo | null;
};

export default function DialogoSection({ dialogo }: Props) {
const formatearFecha = (fecha: string) => {
        if (!fecha) return '';

        const [anio, mes, dia] = fecha.split('T')[0].split('-').map(Number);

        const fechaFormateada = new Date(anio, mes - 1, dia);

        const fechaTexto = new Intl.DateTimeFormat('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(fechaFormateada);

        return fechaTexto.replace(/ de ([a-záéíóúñ])/, (_, letra) => ` ${letra.toUpperCase()}`);
    };


    return (
        <div className="div-dialogo">
            <div className="div-titulo-seccion-dialogo"><img loading="lazy" src='images/logo-dialogo-1.svg' alt=""/></div>
            <div className="div-preview-dialogo">
                <div className="w-layout-blockcontainer container w-container">
                <h1 className="heading-3">Lo más reciente </h1>
                <div className="w-layout-blockcontainer container-2 w-container" style={{backgroundImage: `url('${dialogo?.imagen}')`}}></div>
                <p className="paragraph-2">{ dialogo?.titulo}</p>
                <p className="paragraph-3"> {dialogo?.fecha && formatearFecha(dialogo.fecha)} </p>
                <p> {dialogo?.texto}</p>
                <a href={dialogo?.liga} className="button w-button">Leer artículo</a>
                </div>
            </div>
            </div>
    )
}