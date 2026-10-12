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
    return (
        <div className="div-dialogo">
            <div className="div-titulo-seccion-dialogo"><img loading="lazy" src={dialogo?.imagen} alt=""/></div>
            <div className="div-preview-dialogo">
                <div className="w-layout-blockcontainer container w-container">
                <h1 className="heading-3">Lo más reciente holaaaaaaaaa</h1>
                <div className="w-layout-blockcontainer container-2 w-container"></div>
                <p className="paragraph-2">{ dialogo?.titulo}</p>
                <p className="paragraph-3"> {dialogo?.fecha} </p>
                <p> {dialogo?.texto}</p>
                <a href={dialogo?.liga} className="button w-button">Leer artículo</a>
                </div>
            </div>
            </div>
    )
}