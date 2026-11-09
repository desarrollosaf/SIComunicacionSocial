'use client';

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getBoletinesTodos,
  type GaleriaComunicado,
  type GaleriaFoto,
} from "../service/boletines.api";

const POR_PAGINA = 20;
const FOTOS_VISIBLES = 8; // fotos por comunicado antes de "ver más"
const FOTOS_BASE = "https://sistema.congresoedomex.gob.mx/";

const fotoUrl = (path: string) => `${FOTOS_BASE}${path.replace(/^\//, "")}`;

const formatearFecha = (fecha?: string) => {
  if (!fecha) return "";
  const [y, m, d] = fecha.slice(0, 10).split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  if (Number.isNaN(date.getTime())) return fecha;
  return date.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
};

// Descarga como archivo; si el servidor de fotos no permite CORS, la abre en otra pestaña.
async function descargarFoto(path: string) {
  const url = fotoUrl(path);
  const nombre = path.split("/").pop() || "foto.jpg";
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error(String(res.status));
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  } catch {
    window.open(url, "_blank", "noopener");
  }
}

type FotoEnVisor = { comunicado: GaleriaComunicado; index: number };

export default function GaleriaPage() {
  const [pagina, setPagina] = useState(1);
  const [comunicados, setComunicados] = useState<GaleriaComunicado[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [seleccion, setSeleccion] = useState<Map<string, GaleriaFoto>>(new Map());
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set());
  const [visor, setVisor] = useState<FotoEnVisor | null>(null);
  const [descargando, setDescargando] = useState(false);
  const inicioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let activo = true;
    setIsLoading(true);
    getBoletinesTodos(pagina).then(({ rows, count }) => {
      if (!activo) return;
      setComunicados(rows);
      setTotal(count);
      setIsLoading(false);
    });
    return () => {
      activo = false;
    };
  }, [pagina]);

  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  const irAPagina = (p: number) => {
    if (p < 1 || p > totalPaginas || p === pagina) return;
    setPagina(p);
    setExpandidos(new Set());
    inicioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFoto = (foto: GaleriaFoto) => {
    setSeleccion((prev) => {
      const next = new Map(prev);
      if (next.has(foto.id)) next.delete(foto.id);
      else next.set(foto.id, foto);
      return next;
    });
  };

  const toggleComunicado = (c: GaleriaComunicado) => {
    setSeleccion((prev) => {
      const next = new Map(prev);
      const todas = c.fotos.every((f) => next.has(f.id));
      c.fotos.forEach((f) => (todas ? next.delete(f.id) : next.set(f.id, f)));
      return next;
    });
  };

  const descargarSeleccion = async () => {
    setDescargando(true);
    for (const foto of seleccion.values()) {
      await descargarFoto(foto.path);
      await new Promise((r) => setTimeout(r, 250));
    }
    setDescargando(false);
  };

  // Visor: teclado y navegación
  const moverVisor = useCallback((delta: number) => {
    setVisor((v) => {
      if (!v) return v;
      const n = v.comunicado.fotos.length;
      return { ...v, index: (v.index + delta + n) % n };
    });
  }, []);

  useEffect(() => {
    if (!visor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisor(null);
      if (e.key === "ArrowRight") moverVisor(1);
      if (e.key === "ArrowLeft") moverVisor(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [visor, moverVisor]);

  const numerosPagina = useMemo(() => {
    const nums: (number | "…")[] = [];
    const add = (n: number | "…") => nums[nums.length - 1] !== n && nums.push(n);
    for (let p = 1; p <= totalPaginas; p++) {
      if (p === 1 || p === totalPaginas || Math.abs(p - pagina) <= 1) add(p);
      else add("…");
    }
    return nums;
  }, [pagina, totalPaginas]);

  const fotoVisor = visor ? visor.comunicado.fotos[visor.index] : null;

  return (
    <>
      <style>{estilos}</style>
      <section className="section-6">
        <section>
          <div className="div-titulo-hero">
            <h1 className="h1-centrado">Banco de imágenes</h1>
            <p className="texto-general-centrado-18">
              Encuentra todas las imagenes de lo que se vive día a día en tu Congreso Mexiquense
            </p>
          </div>
        </section>

        <section className="section-7 gal" ref={inicioRef}>
          {isLoading ? (
            <SkeletonGaleria />
          ) : comunicados.length === 0 ? (
            <p className="gal-vacio">No hay fotografías disponibles por ahora.</p>
          ) : (
            comunicados.map((c) => {
              const expandido = expandidos.has(c.id);
              const visibles = expandido ? c.fotos : c.fotos.slice(0, FOTOS_VISIBLES);
              const restantes = c.fotos.length - visibles.length;
              const todasSel = c.fotos.every((f) => seleccion.has(f.id));
              return (
                <article key={c.id} className="gal-grupo">
                  <header className="gal-head">
                    <div className="gal-head-info">
                      <span className="gal-fecha">{formatearFecha(c.fecha)}</span>
                      <h3 className="gal-titulo">
                        <Link href={`/boletines/${c.id}`}>{c.titulo}</Link>
                      </h3>
                    </div>
                    <div className="gal-head-acciones">
                      <span className="gal-conteo">
                        {c.fotos.length} {c.fotos.length === 1 ? "foto" : "fotos"}
                      </span>
                      <button
                        type="button"
                        className={`gal-chip ${todasSel ? "is-on" : ""}`}
                        onClick={() => toggleComunicado(c)}
                      >
                        {todasSel ? "Quitar selección" : "Seleccionar todas"}
                      </button>
                    </div>
                  </header>

                  <div className="gal-grid">
                    {visibles.map((foto, i) => {
                      const sel = seleccion.has(foto.id);
                      return (
                        <figure key={foto.id} className={`gal-foto ${sel ? "is-sel" : ""}`}>
                          <button
                            type="button"
                            className="gal-foto-abrir"
                            onClick={() => setVisor({ comunicado: c, index: i })}
                            aria-label={`Ver foto ${i + 1} de ${c.titulo}`}
                          >
                            <img src={fotoUrl(foto.path)} alt={c.titulo} loading="lazy" />
                          </button>
                          <button
                            type="button"
                            className="gal-check"
                            aria-pressed={sel}
                            aria-label={sel ? "Quitar de la selección" : "Seleccionar foto"}
                            onClick={() => toggleFoto(foto)}
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                          </button>
                        </figure>
                      );
                    })}
                    {restantes > 0 && (
                      <button
                        type="button"
                        className="gal-mas"
                        onClick={() => setExpandidos((s) => new Set(s).add(c.id))}
                      >
                        <span>+{restantes}</span>
                        <small>ver todas</small>
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}

          {!isLoading && totalPaginas > 1 && (
            <nav className="gal-paginacion" aria-label="Paginación">
              <button type="button" onClick={() => irAPagina(pagina - 1)} disabled={pagina === 1}>
                ‹ Anterior
              </button>
              {numerosPagina.map((n, i) =>
                n === "…" ? (
                  <span key={`e${i}`} className="gal-elipsis">…</span>
                ) : (
                  <button
                    key={n}
                    type="button"
                    className={n === pagina ? "is-actual" : ""}
                    aria-current={n === pagina ? "page" : undefined}
                    onClick={() => irAPagina(n)}
                  >
                    {n}
                  </button>
                )
              )}
              <button type="button" onClick={() => irAPagina(pagina + 1)} disabled={pagina === totalPaginas}>
                Siguiente ›
              </button>
            </nav>
          )}
        </section>
      </section>

      {seleccion.size > 0 && (
        <div className="gal-barra" role="region" aria-label="Fotos seleccionadas">
          <span>
            <strong>{seleccion.size}</strong> {seleccion.size === 1 ? "foto seleccionada" : "fotos seleccionadas"}
          </span>
          <button type="button" className="gal-barra-sec" onClick={() => setSeleccion(new Map())}>
            Limpiar
          </button>
          <button type="button" className="gal-barra-pri" onClick={descargarSeleccion} disabled={descargando}>
            {descargando ? "Descargando…" : "Descargar"}
          </button>
        </div>
      )}

      {visor && fotoVisor && (
        <div className="gal-visor" role="dialog" aria-modal="true" onClick={() => setVisor(null)}>
          <div className="gal-visor-top" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="gal-fecha">{formatearFecha(visor.comunicado.fecha)}</span>
              <p className="gal-visor-titulo">{visor.comunicado.titulo}</p>
            </div>
            <div className="gal-visor-acciones">
              <span>
                {visor.index + 1} / {visor.comunicado.fotos.length}
              </span>
              <button
                type="button"
                className={`gal-chip ${seleccion.has(fotoVisor.id) ? "is-on" : ""}`}
                onClick={() => toggleFoto(fotoVisor)}
              >
                {seleccion.has(fotoVisor.id) ? "Seleccionada ✓" : "Seleccionar"}
              </button>
              <button type="button" className="gal-chip" onClick={() => descargarFoto(fotoVisor.path)}>
                Descargar
              </button>
              <button type="button" className="gal-visor-cerrar" onClick={() => setVisor(null)} aria-label="Cerrar">
                ×
              </button>
            </div>
          </div>
          <img
            key={fotoVisor.id}
            className="gal-visor-img"
            src={fotoUrl(fotoVisor.path)}
            alt={visor.comunicado.titulo}
            onClick={(e) => e.stopPropagation()}
          />
          {visor.comunicado.fotos.length > 1 && (
            <>
              <button
                type="button"
                className="gal-visor-nav is-prev"
                aria-label="Anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  moverVisor(-1);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="gal-visor-nav is-next"
                aria-label="Siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  moverVisor(1);
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function SkeletonGaleria() {
  return (
    <>
      {[0, 1, 2].map((g) => (
        <div key={g} className="gal-grupo" aria-hidden="true">
          <div className="gal-head">
            <div className="gal-head-info" style={{ width: "100%" }}>
              <div className="gal-sk" style={{ width: 140, height: 14, borderRadius: 99 }} />
              <div className="gal-sk" style={{ width: "60%", height: 26, marginTop: 10 }} />
            </div>
          </div>
          <div className="gal-grid">
            {Array.from({ length: g === 0 ? 8 : 4 }).map((_, i) => (
              <div key={i} className="gal-sk gal-sk-foto" />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

const estilos = `
.gal { --dorado: #BB945C; --dorado-osc: #9a7742; --texto: #333; --suave: #f3f1ed; padding-bottom: 120px; }
.gal-vacio { text-align: center; color: #777; padding: 60px 0; }

.gal-grupo { padding: 36px 0; border-bottom: 1px solid #ece8e1; }
.gal-grupo:last-of-type { border-bottom: 0; }
.gal-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 18px; }
.gal-head-info { min-width: 0; flex: 1 1 420px; }
.gal-fecha { display: inline-block; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--dorado); }
.gal-titulo { margin: 6px 0 0; font-size: 22px; line-height: 1.3; font-weight: 700; color: var(--texto); }
.gal-titulo a { color: inherit; text-decoration: none; background-image: linear-gradient(var(--dorado), var(--dorado)); background-size: 0 2px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size .3s; }
.gal-titulo a:hover { background-size: 100% 2px; }
.gal-head-acciones { display: flex; align-items: center; gap: 12px; }
.gal-conteo { font-size: 14px; color: #888; }

.gal-chip { border: 1px solid #ddd5c8; background: #fff; color: var(--texto); border-radius: 999px; padding: 7px 16px; font-size: 14px; cursor: pointer; transition: all .2s; white-space: nowrap; }
.gal-chip:hover { border-color: var(--dorado); color: var(--dorado-osc); }
.gal-chip.is-on { background: var(--dorado); border-color: var(--dorado); color: #fff; }

.gal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
.gal-foto { position: relative; margin: 0; border-radius: 14px; overflow: hidden; aspect-ratio: 4 / 3; background: var(--suave); transition: transform .25s, box-shadow .25s; }
.gal-foto:hover { box-shadow: 0 10px 28px rgba(0,0,0,.14); transform: translateY(-2px); }
.gal-foto-abrir { all: unset; display: block; width: 100%; height: 100%; cursor: zoom-in; }
.gal-foto img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
.gal-foto:hover img { transform: scale(1.05); }
.gal-foto.is-sel { box-shadow: 0 0 0 3px var(--dorado); }
.gal-foto.is-sel img { transform: scale(.94); border-radius: 10px; }

.gal-check { position: absolute; top: 10px; left: 10px; width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; background: rgba(0,0,0,.28); backdrop-filter: blur(2px); display: grid; place-items: center; cursor: pointer; opacity: 0; transform: scale(.85); transition: all .2s; padding: 0; }
.gal-check svg { width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; opacity: .6; }
.gal-foto:hover .gal-check, .gal-check:focus-visible, .gal-foto.is-sel .gal-check { opacity: 1; transform: scale(1); }
.gal-foto.is-sel .gal-check { background: var(--dorado); border-color: var(--dorado); }
.gal-foto.is-sel .gal-check svg { opacity: 1; }
@media (hover: none) { .gal-check { opacity: 1; transform: scale(1); } }

.gal-mas { aspect-ratio: 4 / 3; border-radius: 14px; border: 1.5px dashed #d8cdbb; background: var(--suave); color: var(--dorado-osc); cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; transition: all .2s; }
.gal-mas span { font-size: 28px; font-weight: 700; }
.gal-mas small { font-size: 13px; }
.gal-mas:hover { background: #ece4d6; border-color: var(--dorado); }

.gal-sk { background: linear-gradient(90deg, #eeebe6 25%, #f8f6f2 50%, #eeebe6 75%); background-size: 200% 100%; animation: gal-shimmer 1.4s infinite; border-radius: 8px; }
.gal-sk-foto { aspect-ratio: 4 / 3; border-radius: 14px; }
@keyframes gal-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.gal-paginacion { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 40px; }
.gal-paginacion button { min-width: 40px; height: 40px; padding: 0 14px; border-radius: 999px; border: 1px solid #e3ddd3; background: #fff; color: var(--texto); font-size: 15px; cursor: pointer; transition: all .2s; }
.gal-paginacion button:hover:not(:disabled) { border-color: var(--dorado); color: var(--dorado-osc); }
.gal-paginacion button:disabled { opacity: .4; cursor: default; }
.gal-paginacion button.is-actual { background: var(--dorado); border-color: var(--dorado); color: #fff; font-weight: 600; }
.gal-elipsis { padding: 0 4px; color: #999; }

.gal-barra { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 900; display: flex; align-items: center; gap: 12px; background: #2b2b2b; color: #fff; padding: 10px 10px 10px 22px; border-radius: 999px; box-shadow: 0 12px 32px rgba(0,0,0,.25); animation: gal-sube .25s ease; max-width: calc(100% - 32px); font-size: 15px; }
.gal-barra strong { color: #e2c48f; }
.gal-barra button { border: 0; border-radius: 999px; padding: 9px 18px; font-size: 14px; cursor: pointer; }
.gal-barra-sec { background: transparent; color: #ddd; }
.gal-barra-sec:hover { color: #fff; }
.gal-barra-pri { background: var(--dorado, #BB945C); color: #fff; font-weight: 600; }
.gal-barra-pri:disabled { opacity: .6; }
@keyframes gal-sube { from { opacity: 0; transform: translate(-50%, 16px); } }

.gal-visor { position: fixed; inset: 0; z-index: 1000; background: rgba(15,14,12,.94); display: flex; align-items: center; justify-content: center; animation: gal-fade .2s ease; }
.gal-visor-top { position: absolute; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 24px; color: #fff; flex-wrap: wrap; }
.gal-visor-titulo { margin: 4px 0 0; font-size: 16px; max-width: 60vw; color: #f1f1f1; }
.gal-visor-acciones { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #bbb; }
.gal-visor .gal-chip { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2); color: #fff; }
.gal-visor .gal-chip.is-on { background: #BB945C; border-color: #BB945C; }
.gal-visor-cerrar { background: none; border: 0; color: #fff; font-size: 34px; line-height: 1; cursor: pointer; padding: 0 6px; }
.gal-visor-img { max-width: calc(100% - 140px); max-height: calc(100vh - 160px); object-fit: contain; border-radius: 8px; box-shadow: 0 20px 60px rgba(0,0,0,.5); animation: gal-fade .25s ease; margin-top: 50px; }
.gal-visor-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 52px; height: 52px; border-radius: 50%; border: 0; background: rgba(255,255,255,.1); color: #fff; font-size: 30px; cursor: pointer; transition: background .2s; }
.gal-visor-nav:hover { background: rgba(255,255,255,.22); }
.gal-visor-nav.is-prev { left: 20px; }
.gal-visor-nav.is-next { right: 20px; }
@keyframes gal-fade { from { opacity: 0; } }

@media (max-width: 767px) {
  .gal-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .gal-titulo { font-size: 18px; }
  .gal-foto, .gal-mas, .gal-sk-foto { border-radius: 10px; }
  .gal-visor-img { max-width: 100%; border-radius: 0; }
  .gal-visor-nav { width: 42px; height: 42px; font-size: 24px; }
  .gal-visor-nav.is-prev { left: 8px; }
  .gal-visor-nav.is-next { right: 8px; }
  .gal-visor-titulo { max-width: 100%; }
}
`;
