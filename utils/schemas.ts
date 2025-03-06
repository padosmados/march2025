import * as z from 'zod';
import { ZodSchema } from 'zod';

// ---------------------
// Profile Schema
// ---------------------
export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: 'first name must be at least 2 characters',
  }),
  lastName: z.string().min(2, {
    message: 'last name must be at least 2 characters',
  }),
  username: z.string().min(2, {
    message: 'username must be at least 2 characters',
  }),
  phone: z.string().min(5, {
    message: 'phone must be provided and be at least 5 characters',
  }),
});

// ---------------------
// Generic Validator
// ---------------------
export async function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<T> {
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}

// ---------------------
// Image Schema for Profile Updates
// ---------------------
export const imageSchema = z.object({
  image: validateFile(),
});

// Function to validate and compress images (for single image use)
function validateFile() {
  const maxUploadSize = 200 * 1024; // 200KB
  const acceptedFilesTypes = ['image/'];

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, 'File size must be less than 200KB')
    .refine((file) => {
      return (
        !file || acceptedFilesTypes.some((type) => file.type.startsWith(type))
      );
    }, 'File must be an image')
    .transform(async (file) => {
      if (!file) return file;
      return await compressImage(file, maxUploadSize);
    });
}

// Function to compress images automatically.
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

        let quality = 0.8; // Start with 80% quality
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

// ---------------------
// Property Schema
// ---------------------
export const propertySchema = z
  .object({
    name: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string().min(2, { message: 'name must be at least 2 characters.' })
      )
      .optional()
      .default('N/A'),
    tagline: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string().min(2, { message: 'tagline must be at least 2 characters.' })
      )
      .optional()
      .default('N/A'),
    price: z
      .preprocess(
        (a) => (a === "" ? "0" : a),
        z.coerce.number().int().min(0, {
          message: 'price must be a positive number.',
        })
      ),
    category: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string()
      )
      .optional()
      .default('N/A'),
    description: z
      .string()
      .transform((val) => val.trim())
      .optional()
      .default("")
      .refine(
        (desc) =>
          desc === "" ||
          (desc.split(/\s+/).filter(Boolean).length >= 5 &&
            desc.split(/\s+/).filter(Boolean).length <= 500),
        { message: 'description must be between 5 and 500 words if provided.' }
      ),
    country: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string()
      )
      .optional()
      .default('N/A'),
    privateroom: z.preprocess(
      (a) => (a === "" ? "0" : a),
      z.coerce.number().int().min(0, {
        message: 'privateroom amount must be a positive number.',
      })
    ),
    beds: z.preprocess(
      (a) => (a === "" ? "0" : a),
      z.coerce.number().int().min(0, {
        message: 'beds amount must be a positive number.',
      })
    ),
    breakfast: z.preprocess(
      (a) => (a === "" ? "0" : a),
      z.coerce.number().int().min(0, {
        message: 'breakfast amount must be a positive number.',
      })
    ),
    amenities: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string()
      )
      .optional()
      .default(''),
    // Address is strictly required.
    address: z.string().trim().min(5, {
      message: 'address must be at least 5 characters long.',
    }),
    // The location field is optional; if missing, it will be set to tagline in the transform below.
    location: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string().min(2, {
          message: 'location must be at least 2 characters.',
        })
      )
      .optional(),
    host: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string().min(2, { message: 'host must be at least 2 characters.' })
      )
      .optional()
      .default('N/A'),
    hostemail: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string().email({ message: 'Invalid email address' })
      )
      .optional()
      .default('example@example.com'),
    hostmobilephone: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string().min(10, {
          message: 'Host mobile phone number must be at least 10 digits.',
        })
      )
      .optional()
      .default('0000000000'),
    hostlandlinephone: z
      .preprocess(
        (a) => (typeof a === 'string' && a.trim() === "" ? undefined : a),
        z.string().min(10, {
          message: 'Host landline phone number must be at least 10 digits.',
        })
      )
      .optional()
      .default('0000000000'),
  })
  // Allow extra keys (for example: bedsPrice, privateroomPrice, breakfastPrice, message)
  .passthrough()
  // Transform so that if location is not provided, it defaults to the tagline.
  .transform((data) => ({
    ...data,
    location: data.location || data.tagline,
  }));


// ---------------------
// Review Schema
// ---------------------
export const createReviewSchema = z.object({
  propertyId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(500),
});

// ---------------------
// New Schemas for Property Images
// ---------------------

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

// Schema for an array of property images (up to 8).
export const propertyImagesSchema = z
  .array(propertyImageSchema)
  .max(8, { message: 'You can upload up to 8 images only' });
