import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      proxy: {
        '/api': {
          target: env,
          changeOrigin: true,
        }
      }
    }
  }
});
