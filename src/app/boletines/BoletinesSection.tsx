'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type Props = {
  boletin: any;
  boletines: any;
};

export default function BoletinesSection({ boletin, boletines } : Props) {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [descargando, setDescargando] = useState<'pdf' | 'word' | 'txt' | null>(null);
    const fotos = boletin?.fotos || [];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') setSelectedIndex(null);
            if (e.key === 'ArrowLeft') setSelectedIndex((selectedIndex - 1 + fotos.length) % fotos.length);
            if (e.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % fotos.length);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, fotos.length]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + fotos.length) % fotos.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % fotos.length);
    };
    const descargarTXT = () => {
        const contenido = `
        Título: ${boletin?.titulo}
        Comunicado: ${boletin?.comunicado}
        Fecha: ${boletin?.fecha}
        Contenido:
        ${boletin?.descripcion?.map((item: any) => item.bullets).join('\n')}
        ${boletin.texto}
        `;

        const blob = new Blob([contenido], { type: "text/plain;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `boletin_${boletin?.titulo}.txt`;
        link.click();

        URL.revokeObjectURL(url);
        };

        const descargarWord = () => {
            const imagenes = boletin?.fotos?.length > 1
                ? boletin.fotos.slice(1).map((item: any) =>
                    `<img src="https://sistema.congresoedomex.gob.mx/${item.path}" width="100" height="100" style="margin-bottom:10px;" />`
                ).join('')
                : '';

            const contenido = `
            <html>
                <head><meta charset="UTF-8"></head>
                <body>
                    <h1>${boletin?.titulo}</h1>
                    <strong>Comunicado: </strong> ${boletin?.comunicado} <br>
                    <strong>Fecha: </strong>${boletin?.fecha}<br><br>
                    ${boletin?.descripcion?.map((item: any) => `${item.bullets}`)}<br><br>
                    ${boletin?.fotos?.length > 0 ? `<img src="https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path}" width="150" height="150" /><br><br>` : ''}
                    ${imagenes}
                    ${boletin.texto}
                </body>
            </html>`;

            const blob = new Blob([contenido], { type: 'application/msword;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `boletin_${boletin?.titulo}.doc`;
            link.click();
            URL.revokeObjectURL(url);
        };


    const generarPDF = async () => {
        const BASE = 'https://sistema.congresoedomex.gob.mx/';
        const fotos = boletin?.fotos || [];

        // Tamaño de imágenes según cuántas hay (máx 3 por fila)
        const COLS = fotos.length === 1 ? 1 : fotos.length === 2 ? 2 : 3;
        const IMG_W = fotos.length === 1 ? 300 : fotos.length === 2 ? 200 : 140;
        const IMG_H = Math.round(IMG_W * 0.68);

        // Filas de imágenes en tabla para evitar cortes
        const rows: string[] = [];
        for (let i = 0; i < fotos.length; i += COLS) {
            const cells = fotos.slice(i, i + COLS).map((f: any) =>
                `<td style="padding:4px; text-align:center;">
                    <img src="/api/proxy-image?url=${BASE}${f.path}"
                         width="${IMG_W}" height="${IMG_H}"
                         style="display:block; width:${IMG_W}px; height:${IMG_H}px; object-fit:cover; border-radius:6px;" />
                </td>`
            ).join('');
            rows.push(`<tr>${cells}</tr>`);
        }
        const tablaImagenes = rows.length > 0
            ? `<table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-bottom:16px;">${rows.join('')}</table>`
            : '';

        // Limpiar HTML del texto y convertir a párrafos simples
        const textoLimpio = (boletin?.texto || '')
            .replace(/<\/p>/gi, '\n').replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/div>/gi, '\n').replace(/<\/h[1-6]>/gi, '\n\n')
            .replace(/<\/li>/gi, '\n').replace(/<[^>]+>/g, '')
            .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"');

        const parrafos = textoLimpio.split('\n')
            .map((l: string) => l.trim()).filter((l: string) => l.length > 0)
            .map((l: string) => `<p style="margin:0 0 10px 0; page-break-inside:avoid; break-inside:avoid; orphans:4; widows:4;">${l}</p>`)
            .join('');

        const descripcion = (boletin?.descripcion || [])
            .map((d: any) => `<p style="margin:0 0 6px 0; font-style:italic; color:#555;">• ${d.bullets}</p>`)
            .join('');

        const fecha = new Date((boletin?.fecha || '') + 'T00:00:00')
            .toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

        // Crear el contenedor - el wrapper es invisible, el content es lo que se pasa a html2pdf
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:fixed; top:0; left:0; opacity:0; pointer-events:none; z-index:-1; background:white;';

        const el = document.createElement('div');
        el.style.cssText = [
            'width:718px', 'background:white',
            'font-family:Arial,Helvetica,sans-serif', 'color:#333',
            'padding:20px', 'box-sizing:border-box', 'overflow:hidden'
        ].join(';');

        el.innerHTML = `
            <h1 style="font-size:20px; font-weight:bold; margin:0 0 12px 0; line-height:1.35; color:#1a1a1a;">${boletin?.titulo || ''}</h1>
            <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border-top:2px solid #a32a32; border-bottom:1px solid #ddd; margin-bottom:16px;">
                <tr>
                    <td style="padding:8px 0; font-size:12px; font-weight:bold; color:#a32a32;">COMUNICADO ${boletin?.comunicado || ''}</td>
                    <td style="padding:8px 0; font-size:12px; font-weight:bold; color:#666; text-align:right;">${fecha}</td>
                </tr>
            </table>
            ${descripcion ? `<div style="font-size:13px; line-height:1.6; margin-bottom:14px;">${descripcion}</div>` : ''}
            ${tablaImagenes}
            <div style="font-size:13px; line-height:1.75; text-align:justify;">${parrafos}</div>
        `;

        wrapper.appendChild(el);
        document.body.appendChild(wrapper);

        // Esperar imágenes
        await Promise.all(Array.from(el.querySelectorAll('img')).map(img =>
            new Promise(res => {
                if ((img as HTMLImageElement).complete) res(true);
                else { img.onload = () => res(true); img.onerror = () => res(true); }
            })
        ));

        const opt = {
            margin:      [14, 10, 14, 10],
            filename:    `boletin_${(boletin?.titulo || 'congreso').substring(0, 40)}.pdf`,
            image:       { type: 'jpeg', quality: 0.95 },
            html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
            jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:   { mode: ['avoid-all', 'css'] }
        };

        (window as any).html2pdf().set(opt).from(el).save().then(() => {
            document.body.removeChild(wrapper);
            setDescargando(null);
        });
    };


    const descargarPDF = (e: React.MouseEvent) => {
        e.preventDefault();
        if (descargando) return;
        setDescargando('pdf');
        if (typeof window !== 'undefined' && !(window as any).html2pdf) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = generarPDF;
            document.head.appendChild(script);
        } else {
            generarPDF();
        }
    };

    const descargarWordConSpinner = (e: React.MouseEvent) => {
        if (descargando) return;
        setDescargando('word');
        setTimeout(() => { descargarWord(); setDescargando(null); }, 300);
    };

    const descargarTXTConSpinner = (e: React.MouseEvent) => {
        if (descargando) return;
        setDescargando('txt');
        setTimeout(() => { descargarTXT(); setDescargando(null); }, 300);
    };
    
    return (
    <>
    <section className="section-8">
        <section className="encabezado-bole-n">
            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'flex-start' }}>
                <button 
                    onClick={() => router.back()} 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#000',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        padding: '0',
                        marginBottom: '15px'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Regresar
                </button>
            </div>
            <h1 className="heading-36"> {boletin.titulo} </h1>
            <div>
                <div className="columna-informativa-blog w-row">
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin-centrada">Comunicado {boletin.comunicado} </div>
                    </div>
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin-centrada">  
                            {new Date(boletin.fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="columna-informativa-blog w-row">
                    <div className="w-col w-col-6">
                    </div>
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin-centrada" style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>  
                            <a href="#" onClick={descargarPDF} title="Descargar PDF" className="btn-boletin w-button" style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: descargando && descargando !== 'pdf' ? 0.5 : 1, pointerEvents: descargando ? 'none' : 'auto' }}>
                                {descargando === 'pdf' ? <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
                                PDF
                            </a>
                            <a onClick={descargarWordConSpinner} title="Descargar Word" className="btn-boletin w-button" style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: descargando && descargando !== 'word' ? 0.5 : 1, pointerEvents: descargando ? 'none' : 'auto' }}>
                                {descargando === 'word' ? <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
                                WORD
                            </a>
                            <a onClick={descargarTXTConSpinner} title="Descargar TXT" className="btn-boletin w-button" style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: descargando && descargando !== 'txt' ? 0.5 : 1, pointerEvents: descargando ? 'none' : 'auto' }}>
                                {descargando === 'txt' ? <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
                                TXT
                            </a>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    </div>
                </div>
            </div>
            {boletin?.descripcion?.map((item:any, index: any) => (
            <p key={index} className="intro-boletin">
                {item.bullets}
            </p>
            ))}
            {boletin?.fotos?.length > 0 && (
                <a href="#" className="lightbox-link w-inline-block w-lightbox" onClick={(e) => e.preventDefault()}>
                    <img
                        src={`https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path}`}
                        loading="lazy"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        srcSet={`
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 500w, 
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 800w, 
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 1080w, 
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 1280w`} alt="" className="image-25"  onClick={() => setSelectedIndex(0)}/>
                
                    {boletin.fotos.length > 1 && (
                        <div className="div-block-40">
                            {boletin?.fotos?.slice(1).map((item:any, index: any) => (
                                <div key={index} style={{cursor: 'pointer'}} onClick={(e) => { e.preventDefault(); setSelectedIndex(index + 1); }}>
                                    <img src={`https://sistema.congresoedomex.gob.mx/${item.path}`} loading="lazy" className="img-lightbox-under" />
                                </div>
                            ))}
                        </div>
                    )}
                </a>
            )}
        </section>
        <div className="div-block-41">
            <div className="intro-boletin"
                dangerouslySetInnerHTML={{ __html: boletin.texto }}
            />
        </div><br/>
        <section className="boletines-relacionados">
            <h4 className="heading-37">Mantente informado</h4>
            <div className="w-layout-grid grid-boletin">
                {boletines?.slice(0, 4).map((bol: any, idx: number) => bol ? (
                    <div key={idx}>
                        {bol?.fotos?.length > 0 ? (
                            <img src={`https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path}`} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px"
                            srcSet={`
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 500w, 
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 800w, 
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 1080w, 
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 1200w`} alt="" className="img-boletin" />
                        ) : (
                            <div className="img-boletin" style={{ backgroundColor: '#eee', height: '200px' }} />
                        )}
                        <h5>{bol.titulo}</h5>
                        <div className="fecha-boletin">
                            {new Date(bol.fecha + "T00:00:00").toLocaleDateString('es-MX', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                        <a href={`/boletines/${bol.id}`} className="btn-var-2 w-button">Leer el boletín</a>
                    </div>
                ) : null)}
            </div>
        </section>
    </section>
    {selectedIndex !== null && fotos.length > 0 && (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.92)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)',
            animation: 'lbFadeIn 0.3s ease'
        }} onClick={() => setSelectedIndex(null)}>
            
            <style>{`
                @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes lbSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .lb-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255,255,255,0.1);
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    font-size: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .lb-btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-50%) scale(1.1); }
                .lb-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: transparent;
                    color: white;
                    border: none;
                    font-size: 36px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .lb-close:hover { transform: scale(1.2); }
                .lb-thumb {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 8px;
                    cursor: pointer;
                    opacity: 0.5;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                }
                .lb-thumb:hover { opacity: 0.8; }
                .lb-thumb.active { opacity: 1; border-color: white; transform: scale(1.1); }
            `}</style>

            <button className="lb-close" onClick={() => setSelectedIndex(null)}>✕</button>

            {fotos.length > 1 && (
                <button className="lb-btn" style={{ left: '20px' }} onClick={handlePrev}>❮</button>
            )}

            <div style={{ maxWidth: '90%', maxHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
                <img 
                    src={`https://sistema.congresoedomex.gob.mx/${fotos[selectedIndex].path}`} 
                    style={{ 
                        maxWidth: '100%', 
                        maxHeight: '80vh', 
                        objectFit: 'contain', 
                        borderRadius: '8px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        animation: 'lbSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} 
                />
            </div>

            {fotos.length > 1 && (
                <button className="lb-btn" style={{ right: '20px' }} onClick={handleNext}>❯</button>
            )}

            {fotos.length > 1 && (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    display: 'flex',
                    gap: '10px',
                    padding: '10px 20px',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '50px',
                    maxWidth: '90%',
                    overflowX: 'auto'
                }} onClick={(e) => e.stopPropagation()}>
                    {fotos.map((item:any, index: number) => (
                        <img 
                            key={index} 
                            className={`lb-thumb ${index === selectedIndex ? 'active' : ''}`}
                            src={`https://sistema.congresoedomex.gob.mx/${item.path}`} 
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                        />
                    ))}
                </div>
            )}
        </div>
    )}
    </>
  )
}