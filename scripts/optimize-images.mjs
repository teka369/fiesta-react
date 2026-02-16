import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const publicDir = './public';

async function optimizeImages() {
  // Optimize logo.png
  const logoPath = path.join(publicDir, 'logo.png');
  try {
    const logoBuffer = await fs.readFile(logoPath);
    const logoMeta = await sharp(logoBuffer).metadata();
    
    // Resize to 128x128 (enough for retina displays)
    // Convert to WebP for better compression
    await sharp(logoBuffer)
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 80 })
      .toFile(path.join(publicDir, 'logo.webp'));
    
    console.log('Created logo.webp');
    
    // Also create a smaller PNG version as fallback
    await sharp(logoBuffer)
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'logo-small.png'));
    
    console.log('Created logo-small.png');
  } catch (err) {
    console.error('Error optimizing logo:', err.message);
  }

  // Optimize preview.webp if it exists
  const previewPath = path.join(publicDir, 'preview.webp');
  try {
    const previewBuffer = await fs.readFile(previewPath);
    await sharp(previewBuffer)
      .webp({ quality: 85 })
      .toFile(path.join(publicDir, 'preview-optimized.webp'));
    
    await fs.rename(path.join(publicDir, 'preview-optimized.webp'), previewPath);
    console.log('Optimized preview.webp');
  } catch (err) {
    console.error('Error optimizing preview:', err.message);
  }

  // Optimize separador.png if it exists
  const separadorPath = path.join(publicDir, 'separador.png');
  try {
    const separadorBuffer = await fs.readFile(separadorPath);
    await sharp(separadorBuffer)
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'separador-optimized.png'));
    
    await fs.rename(path.join(publicDir, 'separador-optimized.png'), separadorPath);
    console.log('Optimized separador.png');
  } catch (err) {
    console.error('Error optimizing separador:', err.message);
  }

  console.log('Image optimization complete!');
}

optimizeImages();
