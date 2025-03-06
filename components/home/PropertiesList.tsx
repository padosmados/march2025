import PropertyCard from '@/components/card/PropertyCard';
import type { PropertyCardProps } from '@/utils/types';

function PropertiesList({ properties }: { properties: PropertyCardProps[] }) {
  return (
    <section className="mt-4 gap-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}

export default PropertiesList;
