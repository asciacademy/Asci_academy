const { execSync } = require('child_process');

const isCloudflare =
  (process.env.CF_PAGES === '1' || process.env.CLOUDFLARE === '1') &&
  !process.env.__BUILDING_OPEN_NEXT;

if (isCloudflare) {
  console.log('⚡ Detected Cloudflare CI environment. Building with OpenNext...');
  execSync('npx opennextjs-cloudflare build', {
    stdio: 'inherit',
    env: { ...process.env, __BUILDING_OPEN_NEXT: '1' },
  });
} else {
  console.log('▲ Building with standard Next.js (Vercel / Local)...');
  execSync('npx next build', { stdio: 'inherit' });
}
