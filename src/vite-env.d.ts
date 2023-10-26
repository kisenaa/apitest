/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly DIRECT_URL: string;
  readonly VITE_REACT_APP_CLERK_PUBLISHABLE_KEY: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
