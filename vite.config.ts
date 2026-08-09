import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          dayDetails: path.resolve(__dirname, 'day-details.html'),
          notebook: path.resolve(__dirname, 'notebook.html'),
          mathPracticeProblems: path.resolve(__dirname, 'math-practice-problems.html'),
          circuitAnalysisProblems: path.resolve(__dirname, 'circuit-analysis-problems.html'),
          feArcadeAdaptationMap: path.resolve(__dirname, 'fe-arcade-adaptation-map.html'),
          puzzleEngineReference: path.resolve(__dirname, 'puzzle-engine-reference.html'),
          neoArcadeDesignSystem: path.resolve(__dirname, '00_Generic_Templates/neo-arcade-design-system.html'),
          arcadeDesignLanguage: path.resolve(__dirname, '00_Generic_Templates/arcade-design-language.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
