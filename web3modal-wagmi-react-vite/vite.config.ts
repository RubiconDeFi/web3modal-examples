import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
  let config: UserConfig = {
    build: {
      outDir: 'build', // Changed output folder, like in CRA
      chunkSizeWarningLimit: 900,
      sourcemap: 'hidden',
      target: 'es2020',
    },
    server: {
      port: 3001,
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
    },
    plugins: [
      react({
        include: '*.tsx,*.ts',
        babel: {
          plugins: ['babel-plugin-twin', 'babel-plugin-macros', 'babel-plugin-styled-components'],
          ignore: ['\x00commonjsHelpers.js'],
        },
      }),
      // eslintPlugin(),
      viteTsconfigPaths(),
    ],
  };

  return config as UserConfig;
});
