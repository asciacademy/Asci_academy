const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgPath = 'C:/Users/mthej/.gemini/antigravity-ide/brain/c165dbce-c5ec-493c-9994-2649510175f9/.user_uploaded/media_1790031803738.jpg';
const outDir = path.join(__dirname, '../public/images/3d-icons');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const items = [
  {"id":"programming","left":24,"top":34,"width":179,"height":168},
  {"id":"ai","left":216,"top":26,"width":171,"height":174},
  {"id":"systems","left":412,"top":29,"width":190,"height":174},
  {"id":"algorithms","left":635,"top":37,"width":158,"height":159},
  {"id":"cloud","left":813,"top":32,"width":184,"height":169},
  {"id":"security","left":21,"top":261,"width":180,"height":160},
  {"id":"database","left":210,"top":261,"width":181,"height":162},
  {"id":"devops","left":413,"top":268,"width":190,"height":149},
  {"id":"agents","left":635,"top":255,"width":166,"height":163},
  {"id":"automation","left":823,"top":261,"width":168,"height":159},
  {"id":"empty-book","left":34,"top":472,"width":211,"height":154},
  {"id":"empty-badge","left":291,"top":464,"width":155,"height":155},
  {"id":"empty-certificate","left":521,"top":465,"width":167,"height":157},
  {"id":"empty-workspace","left":729,"top":461,"width":246,"height":166},
];

async function processItem(item) {
  const { data, info } = await sharp(imgPath)
    .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];

  const isBg = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    return r > 244 && g > 244 && b > 244;
  };

  // Seed boundary pixels for flood fill
  for (let x = 0; x < width; x++) {
    if (isBg(x, 0)) { queue.push([x, 0]); visited[0 * width + x] = 1; }
    if (isBg(x, height - 1)) { queue.push([x, height - 1]); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isBg(0, y)) { queue.push([0, y]); visited[y * width + 0] = 1; }
    if (isBg(width - 1, y)) { queue.push([width - 1, y]); visited[y * width + width - 1] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const neighbors = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isBg(nx, ny)) {
          visited[nIdx] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Create RGBA with smooth anti-aliased edge falloff
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const dstIdx = (y * width + x) * 4;
      const r = data[srcIdx], g = data[srcIdx+1], b = data[srcIdx+2];

      rgba[dstIdx] = r;
      rgba[dstIdx+1] = g;
      rgba[dstIdx+2] = b;

      const pIdx = y * width + x;
      if (visited[pIdx]) {
        rgba[dstIdx+3] = 0;
      } else {
        let nearBg = false;
        if (x > 0 && visited[pIdx - 1]) nearBg = true;
        else if (x < width - 1 && visited[pIdx + 1]) nearBg = true;
        else if (y > 0 && visited[pIdx - width]) nearBg = true;
        else if (y < height - 1 && visited[pIdx + width]) nearBg = true;

        if (nearBg && r > 225 && g > 225 && b > 225) {
          const brightness = (r + g + b) / 3;
          const alpha = Math.max(0, Math.min(255, Math.round(255 * (1 - (brightness - 225) / 30))));
          rgba[dstIdx+3] = alpha;
        } else {
          rgba[dstIdx+3] = 255;
        }
      }
    }
  }

  const pngPath = path.join(outDir, `${item.id}.png`);
  const webpPath = path.join(outDir, `${item.id}.webp`);
  const svgPath = path.join(outDir, `${item.id}.svg`);

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png({ quality: 100 })
    .toFile(pngPath);

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .webp({ quality: 95 })
    .toFile(webpPath);

  const pngB64 = fs.readFileSync(pngPath).toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
  <image href="data:image/png;base64,${pngB64}" width="${width}" height="${height}"/>
</svg>`;
  fs.writeFileSync(svgPath, svgContent);

  console.log(`Processed ${item.id} (${width}x${height})`);
}

async function runAll() {
  for (const item of items) {
    await processItem(item);
  }
  console.log('All 14 3D icons processed successfully!');
}

runAll().catch(console.error);
