import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';

// Helper to convert a file to a buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
}

// Helper to upload a stream to Cloudinary
function uploadStreamToCloudinary(buffer: Buffer, folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
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

    const buffer = await fileToBuffer(file);
    const result = await uploadStreamToCloudinary(buffer, 'ecommerce-lite');

    return NextResponse.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
