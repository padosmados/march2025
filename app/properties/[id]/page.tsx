import FavouriteToggleButton from '@/components/card/FavouriteToggleButton';
import PropertyRating from '@/components/card/PropertyRating';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import ImageContainer from '@/components/properties/ImageContainer';
import PropertyDetails from '@/components/properties/PropertyDetails';
import ShareButton from '@/components/properties/ShareButton';
import UserInfo from '@/components/properties/UserInfo';
import { Separator } from '@radix-ui/react-select';
import { fetchPropertyDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';
import Description from '@/components/properties/Description';
import Amenities from '@/components/properties/Amenities';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import SubmitReview from '@/components/reviews/SubmitReview';
import PropertyReviews from '@/components/reviews/PropertyReviews';
import { findExistingReview } from '@/utils/actions';
import { auth } from '@clerk/nextjs/server';
import { getCoordinatesFromAddress } from '@/utils/geolocation';

// Dynamically load components with SSR disabled
const DynamicMap = dynamic(() => import('@/components/properties/PropertyMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />,
});

const DynamicBookingWrapper = dynamic(() => import('@/components/booking/BookingWrapper'), {
  ssr: false,
  loading: () => <Skeleton className="h-[200px] w-full" />,
});

const WeatherWidget = dynamic(() => import('@/components/properties/WeatherWidget'), {
  ssr: false,
});

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');

  const { breakfast, privateroom, beds, tagline, address, name } = property;
  const details = { breakfast, privateroom, beds, tagline, address };

  // Use optional chaining with fallback defaults if profile is missing
  const firstName = property.profile?.firstName ?? 'Guest';
  const profileImage = property.profile?.profileImage ?? '/fallback-profile.png';

  const { userId } = auth();
  const isNotOwner = property.profile?.id !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));

  const timeSlots = [
    '00:00 - 01:00',
    '01:00 - 02:00',
    '02:00 - 03:00',
    '03:00 - 04:00',
    '04:00 - 05:00',
    '05:00 - 06:00',
    '06:00 - 07:00',
    '07:00 - 08:00',
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
    '22:00 - 23:00',
    '23:00 - 00:00',
  ];

  // Use address if available; fallback to tagline and name.
  const locationQuery =
    address && address.trim() !== '' ? address : `${tagline}, ${name}`;

  // Get property coordinates using the locationQuery.
  const coordinatesResult = await getCoordinatesFromAddress(locationQuery);
  const coords = coordinatesResult ? [coordinatesResult.lat, coordinatesResult.lng] : null;

  // Generate weather widget URL.
  let weatherHref = "";
  if (coords) {
    const [lat, lon] = coords;
    const latStr = Math.abs(lat).toFixed(2);
    const lonStr = Math.abs(lon).toFixed(2);
    const latDir = lat >= 0 ? "n" : "s";
    const lonDir = lon >= 0 ? "e" : "w";
    const locationSlug = locationQuery.toLowerCase().replace(/\s+/g, "-");
    weatherHref = `https://forecast7.com/en/${latStr}${latDir}${lonStr}${lonDir}/${locationSlug}/`;
  } else {
    const locationSlug = locationQuery.toLowerCase().replace(/\s+/g, "-");
    weatherHref = `https://forecast7.com/en/40d71n74d01/${locationSlug}/`;
  }

  return (
    <section>
      <div className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-7xl">
        <BreadCrumbs name={property.name} />
        <header className="flex justify-between items-center mt-4">
          <h1 className="text-4xl font-bold capitalize">{property.tagline}</h1>
          <div className="flex items-center gap-x-4">
            <ShareButton name={property.name} propertyId={property.id} />
            <FavouriteToggleButton propertyId={property.id} />
          </div>
        </header>
        {/* Main Image */}
        <ImageContainer
          mainImage={
            Array.isArray(property.images) && property.images.length > 0
              ? property.images[0]
              : ""
          }
          name={property.name}
        />
        {/* Gallery */}
        {Array.isArray(property.images) && property.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
            {property.images.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-auto object-cover rounded"
              />
            ))}
          </div>
        )}
        <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
          <div className="lg:col-span-8">
            <div className="flex gap-x-4 items-center">
              <h1 className="text-xl font-bold">{property.name}</h1>
              <PropertyRating inPage propertyId={property.id} />
            </div>
            <PropertyDetails details={details} />
            <UserInfo profile={{ profileImage, firstName }} />
            <Separator className="mt-4" />
            <Description description={property.description} />
            <Amenities
              amenities={
                Array.isArray(property.amenities)
                  ? property.amenities.join(', ')
                  : property.amenities
              }
            />
            {/* Map */}
            {coords ? (
              <DynamicMap propertyName={locationQuery} countryCode={property.country} />
            ) : (
              <p className="text-gray-500 mt-4">
                Unable to find the location for this property.
              </p>
            )}
          </div>
          <div className="lg:col-span-4 flex flex-col items-center">
            <DynamicBookingWrapper
              propertyId={property.id}
              price={property.price}
              bookings={property.bookings}
            />
            <div className="mt-8">
              <label htmlFor="eta" className="block text-lg font-medium">
                Estimated Time of Arrival (ETA)
              </label>
              <select id="eta" name="eta" className="mt-2 p-2 border rounded text-red-500">
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            {weatherHref && (
              <WeatherWidget weatherHref={weatherHref} locationQuery={locationQuery} />
            )}
          </div>
        </section>
        {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
        <PropertyReviews propertyId={property.id} />
      </div>
    </section>
  );
}

export default PropertyDetailsPage;
