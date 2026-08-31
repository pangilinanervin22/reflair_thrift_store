// One-off: converts the storefront's photographic assets to WebP at a sane
// maximum width and prints the savings. next/image still produces responsive
// derivatives on request; this shrinks the *sources* the repo carries and
// uploads on every deploy (the originals were 1–8 MB PNGs of photographs).
//
//   node scripts/optimize-images.mjs
//
// After running, update the paths in src (…/*.png|jpg → …/*.webp) and delete
// the originals — git history keeps them.
import sharp from "sharp";
import { stat } from "node:fs/promises";

// [source, max width]
const targets = [
    ["public/assets/images/intro_1.jpg", 1920],
    ["public/assets/images/intro_2.jpg", 1920],
    ["public/assets/images/loginbgimage.jpg", 1600],
    ["public/assets/images/home_sec_girl.png", 1440],
    ["public/assets/images/home-sec4.png", 1280],
    ["public/assets/images/home-sec5-1.png", 1600],
    ["public/assets/images/home-sec5-2.png", 1600],
    ["public/assets/images/home-sec5-3.png", 1600],
    ["public/assets/images/home-sec5-4.png", 1600],
    ["public/assets/images/home-sec5-5.png", 1600],
    ["public/assets/images/home-sec5-7.png", 1600],
];

let before = 0;
let after = 0;
for (const [src, width] of targets) {
    const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
    await sharp(src)
        .rotate() // honour EXIF orientation
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(out);
    const a = (await stat(src)).size;
    const b = (await stat(out)).size;
    before += a;
    after += b;
    console.log(`${src} -> ${out}: ${(a / 1e6).toFixed(2)} MB -> ${(b / 1e6).toFixed(2)} MB`);
}
console.log(`total ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
