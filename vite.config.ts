import react from '@vitejs/plugin-react';
import * as sass from 'sass';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import PrettyModuleClassnames from 'vite-plugin-pretty-module-classnames';
import sassDts from 'vite-plugin-sass-dts';
import stylelintPlugin from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    PrettyModuleClassnames(),
    sassDts({
      enabledMode: ['development', 'production'],
      esmExport: true,
    }),
    stylelintPlugin({
      include: ['src/**/*.css', 'src/**/*.scss'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
