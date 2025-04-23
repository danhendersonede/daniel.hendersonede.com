import type { ImageMetadata } from 'astro';
import { getServiceSlug } from '../utils/getServiceSlug';

// Import all images from the services directory
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/illustrations/services/*.{png,jpg,jpeg,webp}');

export const getServiceImage = async (path: string) => {
  const slug = getServiceSlug(path);
  const imagePath = `/src/assets/illustrations/services/${slug}.png`;
  if (!(imagePath in images)) {
    throw new Error(`Image ${imagePath} not found`);
  }
  const image = await images[imagePath]();
  return image.default;
}; 