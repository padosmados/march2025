import EmptyList from '@/components/home/EmptyList';
import PropertiesList from '@/components/home/PropertiesList';
import { fetchFavourites } from '@/utils/actions';
import { PropertyCardProps } from '@/utils/types';

async function FavouritesPage() {
  const rawFavourites = await fetchFavourites();
  
  // Map rawFavourites to match the PropertyCardProps type.
  const favourites: PropertyCardProps[] = rawFavourites.map((property: any) => ({
    ...property,
    image: property.images[0] || '', // using the first image as a default
    address: '',                      // provide a default value
    host: '',                         // default value
    hostemail: '',                    // default value
    hostlandlinephone: '',            // default value (if needed)
    hostmobilephone: '',              // default value (if needed)
  }));

  if (favourites.length === 0) {
    return <EmptyList />;
  }

  return <PropertiesList properties={favourites} />;
}

export default FavouritesPage;


