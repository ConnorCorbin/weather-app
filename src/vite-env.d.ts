/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEOCODING_API: string;
  readonly VITE_OPEN_METEO_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
