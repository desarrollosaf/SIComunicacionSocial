import { BASE_PATH } from "@/lib/basePath";
export default function SintesisSection() {
    return (
        <div className="div-sintesis">
            <div className="div-sintesis-titulo">
                <h1 className="h1-centrado">Síntesis Informativa</h1>
                <p className="texto-general-centrado">Monitoreamos y analizamos la cobertura mediática del Congreso del Estado de México para generar reportes oportunos sobre menciones, publicaciones, portadas y contenidos informativos de interés.</p>
            </div>
            <div className="div-sintesis-botones">
                <a href={`${BASE_PATH}/sintesis-informativa`} className="btn-var-3 w-button">Ver las síntesis</a>
            </div>
        </div>
    )
}