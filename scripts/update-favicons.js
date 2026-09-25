const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const masterPath = path.join(process.cwd(), 'public', 'images', 'asci-logo.png');
  console.log('Reading master blue logo from:', masterPath);
  
  if (!fs.existsSync(masterPath)) {
    throw new Error('Master logo not found at ' + masterPath);
  }

  // 1. Generate ICO Buffer (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    icoSizes.map(s =>
      sharp(masterPath)
        .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );
  
  const headerLen = 6;
  const entryLen = 16;
  let currentOffset = headerLen + entryLen * icoSizes.length;
  const icoBuf = Buffer.alloc(currentOffset + pngBuffers.reduce((acc, b) => acc + b.length, 0));
  
  icoBuf.writeUInt16LE(0, 0); // reserved
  icoBuf.writeUInt16LE(1, 2); // ICO type 1
  icoBuf.writeUInt16LE(icoSizes.length, 4); // count of images
  
  let entryOffset = headerLen;
  for (let i = 0; i < icoSizes.length; i++) {
    const s = icoSizes[i];
    const buf = pngBuffers[i];
    
    icoBuf.writeUInt8(s === 256 ? 0 : s, entryOffset); // width
    icoBuf.writeUInt8(s === 256 ? 0 : s, entryOffset + 1); // height
    icoBuf.writeUInt8(0, entryOffset + 2); // colors (0 for 32bpp)
    icoBuf.writeUInt8(0, entryOffset + 3); // reserved
    icoBuf.writeUInt16LE(1, entryOffset + 4); // color planes
    icoBuf.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    icoBuf.writeUInt32LE(buf.length, entryOffset + 8); // size of image data
    icoBuf.writeUInt32LE(currentOffset, entryOffset + 12); // offset to image data
    
    buf.copy(icoBuf, currentOffset);
    currentOffset += buf.length;
    entryOffset += entryLen;
  }

  // Write app/favicon.ico and public/favicon.ico
  fs.writeFileSync(path.join(process.cwd(), 'app', 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.ico'), icoBuf);
  console.log('Updated app/favicon.ico and public/favicon.ico (' + icoBuf.length + ' bytes)');

  // 2. Generate 512x512 icons
  const icon512 = await sharp(masterPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'app', 'icon.png'), icon512);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.png'), icon512);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'logo.png'), icon512);
  console.log('Updated app/icon.png, public/icon.png, public/logo.png (512x512, ' + icon512.length + ' bytes)');

  // 3. Generate Apple Touch Icon 180x180
  const apple180 = await sharp(masterPath)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'app', 'apple-icon.png'), apple180);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'apple-icon.png'), apple180);
  console.log('Updated app/apple-icon.png and public/apple-icon.png (180x180, ' + apple180.length + ' bytes)');

  // 4. Generate 32x32 light/dark icons
  const icon32 = await sharp(masterPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon-light-32x32.png'), icon32);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon-dark-32x32.png'), icon32);
  console.log('Updated public/icon-light-32x32.png and public/icon-dark-32x32.png (32x32, ' + icon32.length + ' bytes)');

  // 5. Update public/icon.svg with 512x512 blue logo base64
  const iconSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${icon512.toString('base64')}" width="512" height="512" />
</svg>
`;
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.svg'), iconSvgContent, 'utf-8');
  console.log('Updated public/icon.svg with blue logo');

  // 6. Update public/logo.svg with crisp 96x96 (for 48x48 display) blue logo base64
  const logoMark96 = await sharp(masterPath)
    .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" fill="none">
  <!-- ASCI Blue Logo Mark -->
  <image href="data:image/png;base64,${logoMark96.toString('base64')}" x="6" y="6" width="48" height="48" />

  <!-- Wordmark "ASCI" in Inter -->
  <text x="64" y="38" font-family="'Inter', sans-serif" font-size="28" font-weight="700" fill="#0f172a" letter-spacing="1">ASCI</text>

  <!-- Academy Pill Badge in electric blue -->
  <rect x="154" y="20" width="74" height="22" rx="11" fill="#2563eb" />
  <text x="191" y="35" font-family="'Inter', -apple-system, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">ACADEMY</text>
</svg>
`;
  fs.writeFileSync(path.join(process.cwd(), 'public', 'logo.svg'), logoSvgContent, 'utf-8');
  console.log('Updated public/logo.svg with blue logo and blue badge');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
