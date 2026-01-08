interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Custom Next.js image loader for Cloudinary
 * Automatically applies optimizations: auto format, auto quality, and responsive sizing
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  // Handle non-Cloudinary URLs (fallback to original)
  if (!src.includes('res.cloudinary.com')) {
    return src;
  }

  // Build Cloudinary transformation parameters
  const params = [
    `f_auto`,           // Automatic format (WebP, AVIF, etc.)
    `q_${quality || 'auto'}`, // Automatic quality or specified quality
    `w_${width}`,       // Width for responsive images
    `c_limit`,          // Limit crop - resize without cropping, maintaining aspect ratio
    `dpr_auto`,         // Automatic device pixel ratio
  ];

  const transformationString = params.join(',');

  // Parse Cloudinary URL and insert transformations
  const uploadIndex = src.indexOf('/upload/');
  if (uploadIndex === -1) return src;

  const beforeUpload = src.substring(0, uploadIndex + 8); // includes '/upload/'
  const afterUpload = src.substring(uploadIndex + 8);

  // Check if version number exists (v followed by digits)
  const versionMatch = afterUpload.match(/^v\d+\//);
  
  if (versionMatch) {
    // Has version: insert transformations before version
    return `${beforeUpload}${transformationString}/${afterUpload}`;
  } else {
    // Check if there are existing transformations
    const parts = afterUpload.split('/');
    if (parts.length > 1 && parts[0].includes(',')) {
      // Has existing transformations - replace them
      const publicId = parts.slice(1).join('/');
      return `${beforeUpload}${transformationString}/${publicId}`;
    }
    // No transformations - add them
    return `${beforeUpload}${transformationString}/${afterUpload}`;
  }
}

/**
 * Generate optimized Cloudinary URL with specific dimensions
 * Use this for known image sizes (thumbnails, cards, etc.)
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    crop?: 'fill' | 'scale' | 'fit' | 'limit' | 'thumb' | 'crop' | 'pad';
    gravity?: 'auto' | 'face' | 'center' | 'faces';
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  } = {}
): string {
  if (!src || !src.includes('res.cloudinary.com')) {
    return src;
  }

  const {
    width,
    height,
    quality = 'auto',
    crop = 'fill',
    gravity = 'auto',
    format = 'auto',
  } = options;

  const params: string[] = [
    `f_${format}`,
    `q_${quality}`,
  ];

  if (width) params.push(`w_${width}`);
  if (height) params.push(`h_${height}`);
  if (width || height) {
    params.push(`c_${crop}`);
    params.push(`g_${gravity}`);
  }
  params.push('dpr_auto');

  const transformationString = params.join(',');

  const uploadIndex = src.indexOf('/upload/');
  if (uploadIndex === -1) return src;

  const beforeUpload = src.substring(0, uploadIndex + 8);
  const afterUpload = src.substring(uploadIndex + 8);

  // Handle version numbers
  const versionMatch = afterUpload.match(/^v\d+\//);
  if (versionMatch) {
    return `${beforeUpload}${transformationString}/${afterUpload}`;
  }

  // Handle existing transformations
  const parts = afterUpload.split('/');
  if (parts.length > 1 && parts[0].includes(',')) {
    const publicId = parts.slice(1).join('/');
    return `${beforeUpload}${transformationString}/${publicId}`;
  }

  return `${beforeUpload}${transformationString}/${afterUpload}`;
}

/**
 * Generate blur placeholder data URL for Cloudinary images
 */
export function getBlurDataUrl(src: string): string {
  if (!src || !src.includes('res.cloudinary.com')) {
    // Return a generic gray placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+';
  }

  // Return a tiny Cloudinary image URL for blur-up effect
  return getOptimizedImageUrl(src, {
    width: 10,
    height: 10,
    quality: 'auto',
    format: 'auto',
  });
}
