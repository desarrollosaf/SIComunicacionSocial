import { BASE_PATH } from "@/lib/basePath";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import './globals.css';

export const metadata: Metadata = {
  title: "Dirección General de Comunicación Social",
  description: "Diracción General de Comunicación Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-wf-page="68dd617b668359798a899405" data-wf-site="68dd617a668359798a8993c6" suppressHydrationWarning>
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
      <body className="body">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* <FloatingChat /> */}
        <Script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6a0f26f32dc742d2462b8347" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"/>
        <Script src={`${BASE_PATH}/js/webflow.js`} type="text/javascript"/>
        <Script src="https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js" type="text/javascript"/>
        <Script src="https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js" type="text/javascript"/>
      </body>
    </html>
  );
}
