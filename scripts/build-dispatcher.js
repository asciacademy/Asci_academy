const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isCloudflare =
  (process.env.CF_PAGES === '1' || process.env.CLOUDFLARE === '1') &&
  !process.env.__BUILDING_OPEN_NEXT;

if (isCloudflare) {
  console.log('⚡ Detected Cloudflare CI environment. Building with OpenNext...');
  execSync('npx opennextjs-cloudflare build', {
    stdio: 'inherit',
    env: { ...process.env, __BUILDING_OPEN_NEXT: '1' },
  });

  // 1. Remove .next/cache to prevent Cloudflare Pages 25MB file upload limit errors
  const cacheDir = path.join(__dirname, '..', '.next', 'cache');
  if (fs.existsSync(cacheDir)) {
    try {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      console.log('⚡ Cleaned up .next/cache to comply with Cloudflare 25MB file size limits.');
    } catch (e) {
      console.warn('Could not clean .next/cache:', e.message);
    }
  }

  // 2. Ensure Cloudflare Pages output directory has a worker proxy for SSR & API routing
  const workerProxyCode = `export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, "https://asci-academy.vercel.app");
    const headers = new Headers(request.headers);
    headers.set("host", "asci-academy.vercel.app");
    headers.set("x-forwarded-host", url.host);
    headers.set("x-forwarded-proto", url.protocol.replace(":", ""));
    const init = {
      method: request.method,
      headers: headers,
      redirect: "manual",
    };
    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
      init.duplex = "half";
    }
    try {
      return await fetch(targetUrl.toString(), init);
    } catch (err) {
      return new Response("Service Temporarily Unavailable: " + err.message, { status: 502 });
    }
  }
};
`;
  const assetsDir = path.join(__dirname, '..', '.open-next', 'assets');
  if (fs.existsSync(assetsDir)) {
    fs.writeFileSync(path.join(assetsDir, '_worker.js'), workerProxyCode, 'utf8');
    fs.writeFileSync(path.join(assetsDir, '.assetsignore'), '_worker.js\n', 'utf8');
    console.log('⚡ Injected _worker.js proxy and .assetsignore into .open-next/assets for Cloudflare Pages!');
  }
} else {
  console.log('▲ Building with standard Next.js (Vercel / Local)...');
  execSync('npx next build', { stdio: 'inherit' });
}
