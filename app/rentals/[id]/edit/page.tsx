import {
  fetchRentalDetails,
  updatePropertyImageAction,
  updatePropertyAction,
} from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { redirect } from 'next/navigation';
import { type Amenity, amenities as defaultAmenitiesList } from '@/utils/amenities';
import ImageInputContainer from '@/components/form/ImageInputContainer';

async function EditRentalPage({ params }: { params: { id?: string } }) {
  // Log the route parameters for debugging
  console.log("EditRentalPage params:", params);
  
  // If params or params.id is missing, redirect to the rentals list
  if (!params || !params.id) {
    redirect('/rentals');
    return null;
  }

  const property = await fetchRentalDetails(params.id);
  if (!property) redirect('/');

  // Convert property.amenities to an array of Amenity objects.
  let defaultAmenities: Amenity[] = [];
  if (Array.isArray(property.amenities)) {
    // If amenities are stored as an array of strings, convert each to an Amenity object.
    defaultAmenities = property.amenities.map((amenityName: string) => {
      const foundAmenity = defaultAmenitiesList.find(
        (amenity) =>
          amenity.name.toLowerCase() === amenityName.toLowerCase()
      );
      if (foundAmenity) {
        return { ...foundAmenity, selected: true };
      } else {
        return {
          name: amenityName,
          icon: defaultAmenitiesList[0].icon, // fallback icon
          selected: true,
        };
      }
    });
  } else if (typeof property.amenities === 'string') {
    try {
      const parsed = JSON.parse(property.amenities);
      if (Array.isArray(parsed)) {
        defaultAmenities = parsed.map((amenityName: string) => {
          const foundAmenity = defaultAmenitiesList.find(
            (amenity) =>
              amenity.name.toLowerCase() === amenityName.toLowerCase()
          );
          if (foundAmenity) {
            return { ...foundAmenity, selected: true };
          } else {
            return {
              name: amenityName,
              icon: defaultAmenitiesList[0].icon,
              selected: true,
            };
          }
        });
      }
    } catch (error) {
      console.error('Failed to parse amenities:', error);
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Edit Property</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          name={property.name}
          text="Update Image"
          action={updatePropertyImageAction}
          image={
            Array.isArray(property.images) && property.images.length > 0
              ? property.images[0]
              : ''
          }
        >
          <input type="hidden" name="id" value={property.id} />
        </ImageInputContainer>

        <FormContainer action={updatePropertyAction}>
          <input type="hidden" name="id" value={property.id} />
          <div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limit)"
              defaultValue={property.name}
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline (30 limit)"
              defaultValue={property.tagline}
            />
            <FormInput
              name="address"
              type="text"
              label="Name (20 limit)"
              defaultValue={property.address}
            />
            <FormInput
              name="hostmobilephone"
              type="tel"
              label="Host Mobile Phone"
              defaultValue={property.hostmobilephone}
              
            />
            <FormInput
              name="hostlandlinephone"
              type="tel"
              label="Host Landline Phone"
              defaultValue={property.hostlandlinephone}
            />  





            <PriceInput defaultValue={property.price} />
            <CategoriesInput defaultValue={property.category} />
            <CountriesInput defaultValue={property.country} />
          </div>

          <TextAreaInput
            name="description"
            labelText="Description (10 - 100 Words)"
            defaultValue={property.description}
          />

          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="privateroom" defaultValue={property.privateroom} />
          <CounterInput detail="beds" defaultValue={property.beds} />
          <CounterInput detail="breakfast" defaultValue={property.breakfast} />

          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput defaultValue={defaultAmenities} />

          <SubmitButton text="edit property" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditRentalPage;
