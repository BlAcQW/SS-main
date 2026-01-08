import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';

// Helper to convert a file to a buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
}

// Helper to upload a stream to Cloudinary with optimizations
function uploadStreamToCloudinary(buffer: Buffer, folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { 
              folder,
              // Apply optimizations on upload
              transformation: [
                { quality: 'auto:good' },  // Automatic quality optimization
                { fetch_format: 'auto' },   // Automatic format selection
              ],
              // Enable eager transformations for common sizes
              eager: [
                { width: 400, height: 400, crop: 'fill', gravity: 'auto', quality: 'auto', fetch_format: 'auto' },
                { width: 100, height: 100, crop: 'fill', gravity: 'auto', quality: 'auto', fetch_format: 'auto' },
              ],
              eager_async: true, // Generate transformations asynchronously
              // Resource type detection
              resource_type: 'image',
              // Overwrite if same public_id exists
              overwrite: true,
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        Readable.from(buffer).pipe(stream);
    });
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ message: 'Invalid file type. Please upload an image.' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ message: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    const buffer = await fileToBuffer(file);
    const result = await uploadStreamToCloudinary(buffer, 'ecommerce-lite');

    return NextResponse.json({ 
      url: result.secure_url, 
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
