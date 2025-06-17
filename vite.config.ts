import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), svgr(), tsconfigPaths()],
    base: "/", // 設定為 GitHub Pages 專案路徑
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 確保路徑正確，修改實際的 Request Url，將 '/api' 用 '' 替代
        }
      },
    }
  }
});
