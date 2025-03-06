import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';

async function PropertiesContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const rawProperties = await fetchProperties({ category, search });

  // Transform rawProperties to conform to PropertyCardProps
  const properties: PropertyCardProps[] = rawProperties.map((property: any) => ({
    id: property.id,
    name: property.name,
    tagline: property.tagline,
    image: property.images[0] || '', // Use first image from the images array
    address: property.address || 'Default Address', // Default or computed value
    host: property.host || 'Default Host',            // Default value
    hostemail: property.hostemail || 'default@example.com', // Default email
    hostlandlinephone: property.hostlandlinephone || '000-000-0000', // Default phone
    hostmobilephone: property.hostmobilephone || '000-000-0000', // Default phone
    country: property.country,
    price: property.price,
  }));

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No results."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return <PropertiesList properties={properties} />;
}
export default PropertiesContainer;
