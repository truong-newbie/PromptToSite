const fs = require("fs");
const path = require("path");

const W = 32;
const H = 32;

// Tạo mảng pixel 32x32 RGBA
const pixels = new Uint8Array(W * H * 4);

function setPixel(x, y, r, g, b, a) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const idx = (y * W + x) * 4;
  pixels[idx] = r;
  pixels[idx + 1] = g;
  pixels[idx + 2] = b;
  pixels[idx + 3] = a;
}

// Vẽ nền squircle bo góc với gradient từ #1d4ed8 (29, 78, 216) sang #0284c7 (2, 132, 199)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // Khoảng cách bo góc
    const rx = Math.max(0, Math.max(7 - x, x - 24));
    const ry = Math.max(0, Math.max(7 - y, y - 24));
    const dist = Math.sqrt(rx * rx + ry * ry);
    if (dist <= 7) {
      const t = (x + y) / (W + H);
      const r = Math.round(29 * (1 - t) + 2 * t);
      const g = Math.round(78 * (1 - t) + 132 * t);
      const b = Math.round(216 * (1 - t) + 199 * t);
      setPixel(x, y, r, g, b, 255);
    }
  }
}

// Vẽ dấu nhắc lệnh `>` màu trắng
for (let d = 0; d < 5; d++) {
  setPixel(7 + d, 11 + d, 255, 255, 255, 255);
  setPixel(7 + d + 1, 11 + d, 255, 255, 255, 255);
  setPixel(11 - d, 16 + d, 255, 255, 255, 255);
  setPixel(12 - d, 16 + d, 255, 255, 255, 255);
}

// Vẽ khung Web (x: 15..26, y: 9..22)
for (let x = 15; x <= 26; x++) {
  setPixel(x, 9, 255, 255, 255, 220);
  setPixel(x, 13, 255, 255, 255, 180);
  setPixel(x, 22, 255, 255, 255, 220);
}
for (let y = 9; y <= 22; y++) {
  setPixel(15, y, 255, 255, 255, 220);
  setPixel(26, y, 255, 255, 255, 220);
}

// Chấm traffic light
setPixel(17, 11, 56, 189, 248, 255);
setPixel(19, 11, 147, 197, 253, 255);

// Khối content card màu Cyan #38bdf8
for (let y = 15; y <= 20; y++) {
  for (let x = 17; x <= 24; x++) {
    setPixel(x, y, 56, 189, 248, 255);
  }
}

// Đóng gói định dạng ICO tiêu chuẩn
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // Reserved
header.writeUInt16LE(1, 2); // ICO Type
header.writeUInt16LE(1, 4); // 1 Image

const imgSize = 40 + W * H * 4 + W * H / 8; // BMP header + RGBA + AND mask
const entry = Buffer.alloc(16);
entry.writeUInt8(W, 0); // Width
entry.writeUInt8(H, 1); // Height
entry.writeUInt8(0, 2); // Color palette
entry.writeUInt8(0, 3); // Reserved
entry.writeUInt16LE(1, 4); // Color planes
entry.writeUInt16LE(32, 6); // Bits per pixel
entry.writeUInt32LE(imgSize, 8); // Image byte size
entry.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

const bmpHeader = Buffer.alloc(40);
bmpHeader.writeUInt32LE(40, 0); // Header size
bmpHeader.writeInt32LE(W, 4); // Width
bmpHeader.writeInt32LE(H * 2, 8); // Height x 2 for ICO
bmpHeader.writeUInt16LE(1, 12); // Planes
bmpHeader.writeUInt16LE(32, 14); // Bit count
bmpHeader.writeUInt32LE(0, 16); // Compression (BI_RGB)
bmpHeader.writeUInt32LE(W * H * 4, 20); // Image size
bmpHeader.writeInt32LE(0, 24);
bmpHeader.writeInt32LE(0, 28);
bmpHeader.writeUInt32LE(0, 32);
bmpHeader.writeUInt32LE(0, 36);

// Dữ liệu pixel BMP đi từ dưới lên (Bottom-up, BGRA)
const pixelData = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const srcIdx = ((H - 1 - y) * W + x) * 4;
    const destIdx = (y * W + x) * 4;
    pixelData[destIdx] = pixels[srcIdx + 2]; // B
    pixelData[destIdx + 1] = pixels[srcIdx + 1]; // G
    pixelData[destIdx + 2] = pixels[srcIdx]; // R
    pixelData[destIdx + 3] = pixels[srcIdx + 3]; // A
  }
}

// AND mask (128 bytes 0 cho phần opaque)
const andMask = Buffer.alloc(W * H / 8, 0);

const icoBuffer = Buffer.concat([header, entry, bmpHeader, pixelData, andMask]);
const outPath = path.join(__dirname, "..", "public", "favicon.ico");
fs.writeFileSync(outPath, icoBuffer);
console.log("Đã tạo thành công public/favicon.ico kích thước", icoBuffer.length, "bytes");

