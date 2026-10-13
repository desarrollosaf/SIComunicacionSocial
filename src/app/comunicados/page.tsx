'use client';
import { useState, useEffect } from 'react';
import ComunicadosSection from "./ComunicadosSection";
import { getBoletinesAll } from '../service/comunicados.api';

export const dynamic = 'force-dynamic';

export default function ComunicadosPage() {
    
    const [paginaActual, setPaginaActual] = useState(1);
    const [boletines, setBoletines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const totalPaginas = Math.ceil(total / 12);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setBoletines([]);
            setLoading(true);
            const data = await getBoletinesAll(paginaActual);
            setTimeout(() => {
                setBoletines(data.rows);
                setTotal(data.count);
                setLoading(false);
            }, 400);
        };
        fetchData();
    }, [paginaActual]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <ComunicadosSection boletines={boletines} loading={loading}></ComunicadosSection>
            {totalPaginas > 1 && (
                <div className="ini-paginacion">
                    <button
                        className="ini-pag-btn"
                        onClick={() => { setPaginaActual(p => Math.max(1, p - 1)); scrollToTop(); }}
                        disabled={paginaActual === 1}
                    >
                        ← Anterior
                    </button>
                    <span className="ini-pag-info">Página {paginaActual} de {totalPaginas}</span>
                    <button
                        className="ini-pag-btn"
                        onClick={() => { setPaginaActual(p => Math.min(totalPaginas, p + 1)); scrollToTop(); }}
                        disabled={paginaActual === totalPaginas}
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
}