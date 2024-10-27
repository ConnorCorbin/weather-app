/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEOCODING_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
