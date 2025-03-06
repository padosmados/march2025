export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  address: string;
  host: string;
  hostemail: string;
  hostlandlinephone: string;
  hostmobilephone: string;
  country: string;
  price: number;
};

export type DateRangeSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};

// utils/types.ts
export type PropertyDetails = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  host: string;
  hostemail: string;
  hostlandlinephone: string;
  hostmobilephone: string;
  country: string;
  description: string;
  price: number;
  beds: number;
  breakfast: number;
  amenities: string;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
  privateroom: number;
  address?: string; // Optional, address field
  profile?: {  // Optional, profile can be null or undefined
    firstName: string;
    lastName: string;
    profileImage: string;
    clerkId: string;
  };
  bookings?: Array<{  // Optional, bookings can be undefined or null
    checkIn: Date;
    checkOut: Date;
  }>;
};

