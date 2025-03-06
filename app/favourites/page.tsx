import EmptyList from '@/components/home/EmptyList';
import PropertiesList from '@/components/home/PropertiesList';
import { fetchFavourites } from '@/utils/actions';
import { PropertyCardProps } from '@/utils/types';

async function FavouritesPage() {
  const rawFavourites = await fetchFavourites();
  
  // Map rawFavourites to match the PropertyCardProps type.
  const favourites: PropertyCardProps[] = rawFavourites.map((property: any) => ({
    id: property.id,
    name: property.name,
    tagline: property.tagline,
    images: property.images,
    country: property.country,
    price: property.price,
    image: property.images[0] || '', // Using the first image as a default
    address: '',                     // Default value
    host: '',                        // Default value
    hostemail: '',                   // Default value
    hostlandlinephone: '',           // Default value
    hostmobilephone: '',             // Default value
  }));

  if (favourites.length === 0) {
    return <EmptyList />;
  }

  return <PropertiesList properties={favourites} />;
}

export default FavouritesPage;
