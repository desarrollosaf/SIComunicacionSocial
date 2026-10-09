import type { Metadata } from 'next';
import BoletinesSection from '@/app/boletines/BoletinesSection';
import { getBoletin, getBoletinesRandom } from '../../service/boletines.api'

const BASE_IMG = 'https://sistema.congresoedomex.gob.mx/';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const boletin = await getBoletin(id);

    if (!boletin || Array.isArray(boletin)) {
        return { title: 'Comunicado no encontrado' };
    }

    const titulo = boletin.titulo ?? 'Comunicado';
    const descripcion = boletin.descripcion?.[0]?.bullets ?? 'Tu Congreso conectado y transparente';
    const foto = boletin.fotos?.[0]?.path ? `${BASE_IMG}${boletin.fotos[0].path}` : undefined;

    return {
        title: titulo,
        description: descripcion,
        openGraph: {
            title: titulo,
            description: descripcion,
            type: 'article',
            images: foto ? [{ url: foto, width: 1200, height: 630, alt: titulo }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: titulo,
            description: descripcion,
            images: foto ? [foto] : undefined,
        },
    };
}

export default async function BoletinesPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const boletin = await getBoletin(id);
    const boletines = await getBoletinesRandom();
     return (
        <section className="boletines max_width">
            <div>
                <BoletinesSection
                boletin = {boletin} 
                boletines = {boletines}></BoletinesSection>
            </div>
        </section>
    )
}