"use client";
import { BASE_PATH } from "@/lib/basePath";
import { useRouter } from "next/navigation";

export default function SalaPrensaSection() {
   const router = useRouter();
     return (
        <div className="div-sala-prensa">
            <div className="sala-prensa-titulo">
                <h1 className="h1-centrado">Sala de Prensa</h1>
                <p className="texto-general-centrado-18">Encuentra todo lo relacionado a la imagen del congreso y todo lo relacionado a prensa dentro de esta sección</p>
            </div>
            <div className="div-section">
                <div className="w-layout-grid grid-salaprensa">
                <div className="div-card-v1" 
                onClick={() => router.push(`kit-de-prensa`)} 
                >
                    <a className="link-block-4 w-inline-block"><img src={`${BASE_PATH}/images/auto_stories_250dp_BB945C.png`} loading="lazy" alt="" className="img-h-75-centro"/></a>
                    <h1 className="h4">Kit de prensa</h1>
                </div>
                <div className="div-card-v1" 
                onClick={() => router.push(`sala-de-prensa`)}
                >
                    <a className="w-inline-block"><img src={`${BASE_PATH}/images/badge_250dp_BB945C.png`} loading="lazy" alt="" className="img-h-75-centro"/></a>
                    <h1 className="h4">Sala de prensa</h1>
                </div>
                <div className="div-card-v1" 
                onClick={() => router.push(`galeria`)} 
                >
                    <a className="w-inline-block"><img src={`${BASE_PATH}/images/newspaper_250dp_BB945C.png`} loading="lazy" alt="" className="img-h-75-centro"/></a>
                    <h1 className="h4">Galería</h1>
                </div>
                </div>
            </div>
        </div>
     )
}
