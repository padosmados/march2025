'use server';

import {
  imageSchema,
  profileSchema,
  propertySchema,
  propertyImagesSchema,
  validateWithZodSchema,
  createReviewSchema,
} from './schemas';
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from './supabase';
import { calculateTotals } from './calculateTotals';
import { formatDate } from './format';

import prisma from '@/utils/db'; // ✅ Correct way

import { Prisma } from '@prisma/client';

import type { PropertyDetailsType } from "@/components/properties/PropertyDetails"; // ✅ Correct import





const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  if (!user.privateMetadata.hasProfile) redirect('/profile/create');
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/');
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login to create a profile');

    const rawData = Object.fromEntries(formData);
    // UPDATED: await the async validation
    const validatedFields = await validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect('/profile/create');
  return profile;
};



export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    // Validate the fields asynchronously using Zod
    const validatedFields = await validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });

    // Optionally revalidate the profile path if needed
    // revalidatePath('/profile');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

// A wrapper function that meets the expected actionFunction signature (one argument)
// It calls updateProfileAction with a default value for prevState, then redirects.
export async function updateProfileAndRedirect(
  formData: FormData
): Promise<{ message: string }> {
  const result = await updateProfileAction(null, formData);
  redirect('/');
  return result; // This is unreachable after redirect, but satisfies the type.
}



export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    // UPDATED: await the async validation
    const validatedFields = await validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};




import { z } from 'zod';
// … other imports …

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    console.log(rawData);

    // Retrieve all image files.
    const files = formData.getAll('image') as File[];

    // Explicitly cast validatedFields to the inferred type from propertySchema.
    const validatedFields = (await validateWithZodSchema(propertySchema, rawData)) as z.infer<typeof propertySchema>;

    if (!validatedFields.host) {
      return { message: "Host is a required field." };
    }

    // Validate the array of images.
    const validatedFiles = (await validateWithZodSchema(propertyImagesSchema, files)) as File[];

    // Upload each file and collect URLs.
    const fullPaths = await Promise.all(
      validatedFiles.map((file: File) => uploadImage(file))
    );

    // Process amenities explicitly.
    let amenitiesArray: string[] = [];
    if (typeof validatedFields.amenities === 'string') {
      amenitiesArray = validatedFields.amenities.split(',').map((item: string) => item.trim());
    }

    // Create the property.
    await db.property.create({
      data: {
        name: validatedFields.name as string,
        tagline: validatedFields.tagline as string,
        address: validatedFields.address as string,
        category: validatedFields.category as string,
        country: validatedFields.country as string,
        description: validatedFields.description as string,
        price: validatedFields.price as number,
        beds: validatedFields.beds as number,
        privateroom: validatedFields.privateroom as number,
        breakfast: validatedFields.breakfast as number,
        amenities: amenitiesArray,
        images: fullPaths,
        ownerId: user.id, // Set ownerId
        host: validatedFields.host as string,
        hostemail: validatedFields.hostemail as string,
        hostmobilephone: validatedFields.hostmobilephone as string,
        hostlandlinephone: validatedFields.hostlandlinephone as string,
      },
    });
    
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};








export const fetchProperties = async ({
  search = '',
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
      images: true, // Updated field name
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return properties;
};

export const fetchFavouriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favourite = await db.favourite.findFirst({
    where: {
      propertyId,
      profile: { id: user.id },
    },
    select: {
      id: true,
    },
  });
  return favourite?.id || null;
};

export const toggleFavouriteAction = async (prevState: {
  propertyId: string;
  favouriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favouriteId, pathname } = prevState;
  try {
    if (favouriteId) {
      await db.favourite.delete({
        where: {
          id: favouriteId,
        },
      });
    } else {
      await db.favourite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favouriteId ? 'Removed from Faves' : 'Added to Faves' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavourites = async () => {
  const user = await getAuthUser();
  const favourites = await db.favourite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          images: true, // Updated field name
        },
      },
    },
  });
  return favourites.map((favourite) => favourite.property);
};

export const fetchPropertyDetails = async (id: string) => {
  if (!id) {
    throw new Error("Property ID is required for fetching details");
  }
  const property = await prisma.property.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      tagline: true,
      category: true,
      images: true,
      country: true,
      description: true,
      price: true,
      address: true,
      hostemail: true,
      hostlandlinephone: true,
      hostmobilephone: true,
      beds: true,
      breakfast: true,
      privateroom: true,
      amenities: true,
      createdAt: true,
      updatedAt: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          id: true,
        },
      },
    },
  });
  if (!property) {
    throw new Error(`Property with ID ${id} not found`);
  }
  return property;
};


export async function createReviewAction(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    // UPDATED: await the async validation
    const validatedFields = await validateWithZodSchema(createReviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    });
    revalidatePath(`/properties/${validatedFields.propertyId}`);
    return { message: 'Review submitted successfully' };
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchPropertyReviews(propertyId: string) {
  const reviews = await db.review.findMany({
    where: {
      propertyId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reviews;
}

export const fetchPropertyReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      property: {
        select: {
          name: true,
          images: true, // Updated field name
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });

    revalidatePath('/reviews');
    return { message: 'Review deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (
  userId: string,
  propertyId: string
) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      propertyId: propertyId,
    },
  });
};

export async function fetchPropertyRating(propertyId: string) {
  const result = await db.review.groupBy({
    by: ['propertyId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  });

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
}

export const createBookingAction = async (prevState: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const user = await getAuthUser();
  await db.booking.deleteMany({
    where: {
      profileId: user.id,
      paymentStatus: false,
    },
  });
  let bookingId: null | string = null;

  const { propertyId, checkIn, checkOut } = prevState;
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  });
  if (!property) {
    return { message: 'Property not found' };
  }
  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });

  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user.id,
        propertyId,
      },
    });
    bookingId = booking.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?bookingId=${bookingId}`);
};

export const fetchBookings = async () => {
  const user = await getAuthUser();
  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
      paymentStatus: true,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      checkIn: 'desc',
    },
  });
  return bookings;
};

export async function deleteBookingAction(prevState: { bookingId: string }) {
  const { bookingId } = prevState;
  const user = await getAuthUser();

  try {
    const result = await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    });

    revalidatePath('/bookings');
    return { message: 'Booking deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
}

export const fetchRentals = async () => {
  const user = await getAuthUser(); // ✅ Ensure user is retrieved

  // ✅ Define `rentals` before using it
  const rentals = await db.property.findMany({
    where: {
      OR: [
        { ownerId: user.id },
        { profile: { clerkId: user.id } }
      ],
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  const rentalsWithBookingSums = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
          paymentStatus: true,
        },
        _sum: {
          totalNights: true,
        },
      });

      const orderTotalSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
          paymentStatus: true,
        },
        _sum: {
          orderTotal: true,
        },
      });

      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights ?? 0,
        orderTotalSum: orderTotalSum._sum.orderTotal ?? 0,
      };
    })
  );

  return rentalsWithBookingSums;
};

export async function deleteRentalAction(prevState: { propertyId: string }) {
  const { propertyId } = prevState;
  const user = await getAuthUser();

  try {
    await db.property.delete({
      where: {
        id: propertyId,
        profile: { id: user.id }, // ✅ Use `id` instead of `clerkId`
      },
    });

    revalidatePath('/rentals');
    return { message: 'Rental deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
}

export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthUser();
  return db.property.findUnique({
    where: {
      id: propertyId,
      profile: { id: user.id }, // ✅ Use `id` instead of `clerkId`
    },
  });
};





type PropertyData = z.infer<typeof propertySchema>;

export const updatePropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const propertyId = formData.get('id') as string;

  try {
    const rawData = Object.fromEntries(formData);
    // Explicitly cast validatedFields to our inferred type.
    const validatedFields = (await validateWithZodSchema(propertySchema, rawData)) as PropertyData;

    // Process amenities explicitly.
    let amenitiesArray: string[] = [];
    if (typeof validatedFields.amenities === 'string') {
      amenitiesArray = validatedFields.amenities.split(',').map((item: string) => item.trim());
    }

    // Build the update object with explicit casts.
    const updateData: Prisma.PropertyUpdateInput = {
      name: validatedFields.name as string,
      tagline: validatedFields.tagline as string,
      address: validatedFields.address as string,
      category: validatedFields.category as string,
      country: validatedFields.country as string,
      description: validatedFields.description as string,
      price: validatedFields.price as number,
      beds: validatedFields.beds as number,
      privateroom: validatedFields.privateroom as number,
      breakfast: validatedFields.breakfast as number,
      amenities: amenitiesArray,
      host: validatedFields.host as string,
      hostemail: validatedFields.hostemail as string,
      hostmobilephone: validatedFields.hostmobilephone as string,
      hostlandlinephone: validatedFields.hostlandlinephone as string,
    };

    await db.property.update({
      where: {
        id: propertyId,
        ownerId: user.id,
      },
      data: updateData,
    });

    revalidatePath(`/rentals/${propertyId}/edit`);
    return { message: "Update Successful" };
  } catch (error) {
    return renderError(error);
  }
};




export const updatePropertyImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const propertyId = formData.get("id") as string;

  try {
    const image = formData.get("image") as File;
    // UPDATED: await the async validation
    const validatedFields = await validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.property.update({
      where: {
        id: propertyId,
        ownerId: user.id,
      },
      data: {
        // Updated: replace the images array with a new array containing the updated image.
        images: [fullPath],
      },
    });

    revalidatePath(`/rentals/${propertyId}/edit`);
    return { message: "Property Image Updated Successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchReservations = async () => {
  const user = await getAuthUser();

  const reservations = await db.booking.findMany({
    where: {
      paymentStatus: true,
      property: {
        profile: { id: user.id }, // ✅ Correctly references clerkId
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          country: true,
        },
      },
    },
  });

  return reservations;
};

export const fetchStats = async () => {
  await getAdminUser();

  const usersCount = await db.profile.count();
  const propertiesCount = await db.property.count();
  const bookingsCount = await db.booking.count({
    where: {
      paymentStatus: true,
    },
  });

  return {
    usersCount,
    propertiesCount,
    bookingsCount,
  };
};

export const fetchChartsData = async () => {
  await getAdminUser();
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMonthsAgo = date;

  const bookings = await db.booking.findMany({
    where: {
      paymentStatus: true,
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const bookingsPerMonth = bookings.reduce((total, current) => {
    const date = formatDate(current.createdAt, true);
    const existingEntry = total.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      total.push({ date, count: 1 });
    }
    return total;
  }, [] as Array<{ date: string; count: number }>);
  return bookingsPerMonth;
};

export const fetchReservationStats = async () => {
  const user = await getAuthUser();

  const properties = await db.property.count({
    where: {
      ownerId: user.id,
    },
  });

  const totals = await db.booking.aggregate({
    _sum: {
      orderTotal: true,
      totalNights: true,
    },
    where: {
      property: {
        ownerId: user.id,
      },
    },
  });

  return {
    properties,
    nights: totals._sum?.totalNights ?? 0,
    amount: totals._sum?.orderTotal ?? 0,
  };
}; // ✅ Added missing closing bracket
