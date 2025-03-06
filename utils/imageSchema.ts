import * as z from 'zod';

// --- Begin compressImage function ---
async function compressImage(file: File, maxSize: number): Promise<File> {
  if (typeof window === 'undefined') {
    return file;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Error reading file.'));
    reader.readAsDataURL(file);

    reader.onload = async (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxWidth = 800; // Resize to max width
        const scaleFactor = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleFactor;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.8;
        let blob: Blob | null = null;
        let compressedFile: File | null = null;

        do {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          blob = await fetch(dataUrl).then((res) => res.blob());

          if (!blob) {
            console.error('Image compression failed.');
            resolve(file);
            return;
          }

          compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
          quality -= 0.1;
        } while (blob.size > maxSize && quality > 0.1);

        resolve(compressedFile);
      };

      img.onerror = (error) => reject(error);
    };
  });
}
// --- End compressImage function ---

// Schema for a single property image.
export const propertyImageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 500 * 1024, {
    message: 'Each image must be less than 500KB',
  })
  .refine((file) => file.type.startsWith('image/'), {
    message: 'File must be an image',
  })
  .transform(async (file) => {
    return await compressImage(file, 500 * 1024);
  });

// Schema for an array of property images (max 8).
export const propertyImagesSchema = z.array(propertyImageSchema)
  .max(8, { message: 'You can upload up to 8 images only' });
