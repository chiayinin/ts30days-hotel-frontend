/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // 其他環境變量（如果有的話）可以在這裡定義
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
