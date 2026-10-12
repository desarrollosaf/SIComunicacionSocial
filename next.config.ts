import type { NextConfig } from "next";

// En producción se sirve bajo /DGCS (BASE_PATH=/DGCS en tiempo de build).
// En desarrollo, sin variable, la app queda en la raíz.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath,
  output: "standalone",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
