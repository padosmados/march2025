import { formatQuantity } from '@/utils/format';

export type PropertyDetailsProps = {
  details: {
    beds: number;
    privateroom: number;
    breakfast: number;
    tagline: string;
    address: string;
    
    
  };
};

function PropertyDetails({
  details: { beds, privateroom, breakfast },
}: PropertyDetailsProps) {
  return (
    <p className='text-md font-light '>
      <span>{formatQuantity(beds, 'bed')}</span>
      <span>{formatQuantity(privateroom, 'privateroom')} &middot; </span>
      <span>{formatQuantity(breakfast, 'breakfast')} &middot; </span>
      
      
    </p>
  );
}

export type PropertyDetailsType = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  image: string;
  country: string;
  description: string;
  price: number;
  beds: number;
  breakfast: number;
  privateroom: number;
  address: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  bookings: {
    checkIn: Date;
    checkOut: Date;
  }[];
};

export default PropertyDetails;