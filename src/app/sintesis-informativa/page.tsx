'use client';

import { useEffect, useState } from 'react';

import { getSintesisInformativa } from '../service/sintesis-informativa.api'
import SintesisInformativaSection from './SintesisInformativaSection';

export const dynamic = 'force-dynamic';

function parseFechaBusqueda(valor: string): string | undefined {
  const match = valor.trim().match(/^(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})$/);
  if (!match) return undefined;
  const [, dd, mm, aaaa] = match;
  return `${aaaa}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}

export default function SintesisInformativaPage() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState<string | undefined>(undefined);
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPaginas = Math.max(1, Math.ceil(total / 10));

  useEffect(() => {
    let activo = true;
    setLoading(true);

    getSintesisInformativa(paginaActual, fechaFiltro).then((data) => {
      if (!activo) return;
      console.log('data ',data)
      setRows(data.rows || []);
      setTotal(data.count || 0);
      setLoading(false);
    });

    return () => {
      activo = false;
    };
  }, [paginaActual, fechaFiltro]);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setPaginaActual(1);
    setFechaFiltro(parseFechaBusqueda(busqueda));
  };

  return (
    <SintesisInformativaSection
      rows={rows}
      loading={loading}
      busqueda={busqueda}
      onBusquedaChange={setBusqueda}
      onBuscar={handleBuscar}
      paginaActual={paginaActual}
      totalPaginas={totalPaginas}
      onCambiarPagina={setPaginaActual}
    />
  );
}
