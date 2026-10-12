// Prefijo de la app cuando se sirve bajo un subdirectorio (p. ej. /DGCS).
// next/link y useRouter lo aplican solos; <img>, <a>, <link> y fetch locales no.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
