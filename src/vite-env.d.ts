/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly DIRECT_URL: string;
  readonly WEBHOOK_SECRET: string;
  readonly CLERK_SECRET_KEY: string;
  readonly VITE_REACT_APP_CLERK_PUBLISHABLE_KEY: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
