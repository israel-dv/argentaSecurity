import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE = 'https://argentaseguridad.com';

const ROUTES = [
  {
    path: 'bolsa-trabajo',
    title: 'Bolsa de trabajo | Argenta Seguridad Privada en Celaya',
    description:
      'Postúlate para trabajar en Argenta como guardia o personal de seguridad privada en Celaya y el Bajío. Envía tus datos y te contactamos.',
  },
  {
    path: 'gracias',
    title: 'Gracias | Argenta Seguridad Privada',
    description: 'Hemos recibido tu mensaje. Te contactaremos pronto.',
    noindex: true,
  },
];

// SPA: genera un index.html por ruta con su propio title/description/canonical.
// Vercel sirve el archivo estático antes que el rewrite a /index.html.
function routeMeta(): Plugin {
  let outDir = 'dist';
  return {
    name: 'route-meta',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const base = readFileSync(resolve(outDir, 'index.html'), 'utf-8');
      for (const r of ROUTES) {
        const url = `${SITE}/${r.path}`;
        let html = base
          .replace(/<title>[^<]*<\/title>/, `<title>${r.title}</title>`)
          .replace(
            /(<meta\s+name="description"\s+content=")[^"]*"/,
            `$1${r.description}"`,
          )
          .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
          .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
          .replace(
            /(<meta property="og:title" content=")[^"]*"/,
            `$1${r.title}"`,
          )
          .replace(
            /(<meta\s+property="og:description"\s+content=")[^"]*"/,
            `$1${r.description}"`,
          )
          .replace(
            /(<meta name="twitter:title" content=")[^"]*"/,
            `$1${r.title}"`,
          )
          .replace(
            /(<meta\s+name="twitter:description"\s+content=")[^"]*"/,
            `$1${r.description}"`,
          );
        if (r.noindex) {
          html = html.replace(
            '<meta name="robots" content="index, follow" />',
            '<meta name="robots" content="noindex, nofollow" />',
          );
        }
        mkdirSync(resolve(outDir, r.path), { recursive: true });
        writeFileSync(resolve(outDir, r.path, 'index.html'), html);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), routeMeta()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
