import { BASE_PATH } from "@/lib/basePath";
import { BODY_CLASS_DEFAULT, BODY_CLASS_POR_RUTA } from "@/lib/bodyClass";
import type { Metadata } from "next";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import BodyClass from "@/components/BodyClass";
import './globals.css';

export const metadata: Metadata = {
  title: "Dirección General de Comunicación Social",
  description: "Diracción General de Comunicación Social",
};

// Pone la clase de body correcta antes del primer pintado.
const bodyClassScript = `(function(){var m=${JSON.stringify(BODY_CLASS_POR_RUTA)},b=${JSON.stringify(BASE_PATH)},p=location.pathname;if(b&&p.indexOf(b)===0)p=p.slice(b.length);p=p.replace(/\\/+$/,"")||"/";document.body.className=m[p]||${JSON.stringify(BODY_CLASS_DEFAULT)};})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link href={`${BASE_PATH}/css/normalize.css`} rel="stylesheet" type="text/css" />
        <link href={`${BASE_PATH}/css/webflow.css`} rel="stylesheet" type="text/css" />
        <link href={`${BASE_PATH}/css/direccion-de-comunicacion-social.webflow.css`} rel="stylesheet" type="text/css" />
        <link href={`${BASE_PATH}/images/favicon.png`} rel="shortcut icon" type="image/x-icon" />
        <link href={`${BASE_PATH}/images/webclip.png`} rel="apple-touch-icon" />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
      </head>
      <body className={BODY_CLASS_DEFAULT} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: bodyClassScript }} />
        <BodyClass />
        <Header />
        {children}
        <Footer />
        {/* <FloatingChat /> */}
      </body>
    </html>
  );
}
