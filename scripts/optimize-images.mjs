// Сжатие изображений в /public без видимой потери качества.
// - даунскейл до 1600px по длинной стороне (retina-запас для всех блоков)
// - JPG → mozjpeg q82 progressive; PNG → максимальное сжатие (палитра, если graphic)
// - перезаписываем ТОЛЬКО если новый файл меньше исходного
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public";
const MAX = 1600;

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

let savedTotal = 0, count = 0, skipped = 0;

for (const file of await walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const orig = await readFile(file);
  const img = sharp(orig, { failOn: "none" }).rotate(); // учесть EXIF-ориентацию
  const meta = await img.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);

  let pipe = img;
  if (longest > MAX) {
    pipe = pipe.resize({
      width: meta.width >= meta.height ? MAX : undefined,
      height: meta.height > meta.width ? MAX : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  let buf;
  if (ext === ".png") {
    buf = await pipe.png({ compressionLevel: 9, effort: 10, palette: true }).toBuffer();
  } else {
    buf = await pipe.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer();
  }

  if (buf.length < orig.length) {
    await writeFile(file, buf);
    const savedKB = (orig.length - buf.length) / 1024;
    savedTotal += savedKB;
    count++;
    console.log(`✓ ${file}  ${(orig.length/1024).toFixed(0)}→${(buf.length/1024).toFixed(0)} KB  (-${savedKB.toFixed(0)} KB)`);
  } else {
    skipped++;
  }
}

console.log(`\nГотово: сжато ${count} файлов, пропущено ${skipped}. Экономия: ${(savedTotal/1024).toFixed(2)} MB`);
