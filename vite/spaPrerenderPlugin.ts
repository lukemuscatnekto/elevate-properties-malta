/**
 * Post-build SPA prerender for configured routes (e.g. `/`, `/privacy`, `/guides`, …) using Playwright + a tiny static server.
 *
 * `vite-plugin-prerender` fails under Vite 6 ESM config loading (`require is not defined`).
 * `@prerenderer/renderer-puppeteer` + Puppeteer 24 hit protocol errors during capture on this stack.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createServer} from 'node:http';
import type {AddressInfo} from 'node:net';
import type {Plugin} from 'vite';
import express from 'express';
import {chromium} from 'playwright';

function outputHtmlPath(staticDir: string, route: string): string {
  const r = route.endsWith('/') && route !== '/' ? route.slice(0, -1) : route;
  if (r === '/' || r === '') {
    return path.join(staticDir, 'index.html');
  }
  return path.join(staticDir, ...r.split('/').filter(Boolean), 'index.html');
}

function startSpaStaticServer(staticDir: string): Promise<{port: number; close: () => Promise<void>}> {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.static(staticDir));
  app.use((_req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
  });

  return new Promise((resolve, reject) => {
    const server = createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address() as AddressInfo | null;
      if (!addr || typeof addr.port !== 'number') {
        reject(new Error('[prerender] Could not bind static server'));
        return;
      }
      resolve({
        port: addr.port,
        close: () =>
          new Promise((res, rej) => {
            server.close((err) => (err ? rej(err) : res()));
          }),
      });
    });
    server.on('error', reject);
  });
}

export function spaPrerenderPlugin(routes: string[]): Plugin {
  return {
    name: 'elevate-spa-prerender',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const staticDir = path.resolve(process.cwd(), 'dist');
      const {port, close} = await startSpaStaticServer(staticDir);
      const browser = await chromium.launch({headless: true});
      try {
        for (const route of routes) {
          const context = await browser.newContext();
          const page = await context.newPage();
          const urlPath = route === '/' ? '/' : route.startsWith('/') ? route : `/${route}`;
          const url = `http://127.0.0.1:${port}${urlPath}`;
          await page.goto(url, {waitUntil: 'networkidle', timeout: 120_000});
          await page
            .locator('#hero, #privacy-heading, #guides-prerender-anchor')
            .first()
            .waitFor({state: 'attached', timeout: 120_000});
          const html = await page.content();
          const out = outputHtmlPath(staticDir, route);
          await fs.mkdir(path.dirname(out), {recursive: true});
          await fs.writeFile(out, html, 'utf8');
          await context.close();
        }
      } finally {
        await browser.close();
        await close();
      }
    },
  };
}
