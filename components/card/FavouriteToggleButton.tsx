import { FaHeart } from 'react-icons/fa';
import { Button } from '../ui/button';
import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavouriteId } from '@/utils/actions';
import FavouriteToggleForm from './FavouriteToggleForm';
async function FavouriteToggleButton({ propertyId }: { propertyId: string }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const favouriteId = await fetchFavouriteId({ propertyId });
  return <FavouriteToggleForm favouriteId={favouriteId} propertyId={propertyId} />;
}
export default FavouriteToggleButton;
