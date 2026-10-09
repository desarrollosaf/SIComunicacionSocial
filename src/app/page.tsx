import { getBoletines } from '@/app/service/boletines.api';
import BoletinesHomeSection from "@/components/BoletinesHomeSection";
import DialogoSection from '@/components/DialogoSection';
import RedesSocialesSection from '@/components/RedesSocialesSection';
import SalaPrensaSection from '@/components/SalaPrensaSection';
import SintesisSection from '@/components/SintesisSection';
import TransmisionSection from '@/components/TransmisionSection';


export default async function Page() {
    const boletines = await getBoletines();
    const mainBoletines = boletines && boletines.length >= 5 ? boletines : null;


  return (
    <section className="main">
        <div className="hero">
            <img src="images/Direccion-general-de-comunicacion-social.png" loading="lazy" alt="" className="img-high-60"/>
        </div>
        <BoletinesHomeSection mainBoletines = {mainBoletines}></BoletinesHomeSection>
        <SalaPrensaSection></SalaPrensaSection>
        <SintesisSection></SintesisSection>
        <DialogoSection></DialogoSection>
        <TransmisionSection></TransmisionSection>
        <RedesSocialesSection></RedesSocialesSection>
        

    </section>
  );
}