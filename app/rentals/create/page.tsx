import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';

// Locally cast components to 'any' so that extra props like className are allowed.
const FormInputAny = FormInput as any;
const CategoriesInputAny = CategoriesInput as any;
const TextAreaInputAny = TextAreaInput as any;
const CountriesInputAny = CountriesInput as any;

// Helper function to generate time slots
const generateTimeSlots = () => {
  const timeSlots = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : i;
    timeSlots.push(`${hour}:00`);
  }
  return timeSlots;
};

// Wrapper function to convert numeric fields and set required fields before calling createPropertyAction.
// It also maps tagline to location and computes a price as the lower of bedsPrice and privateroomPrice.
async function handleCreateProperty(input: FormData | Record<string, any>) {
  "use server";
  let formData: FormData;
  if (input instanceof FormData) {
    formData = input;
  } else {
    formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }
  }
  
  // Map tagline to location regardless.
  
  
  // Convert numeric fields to numbers
  const numericFields = [
    'beds',
    'bedsPrice',
    'privateroom',
    'privateroomPrice',
    'breakfast',
    'breakfastPrice'
  ];
  numericFields.forEach((field) => {
    const value = formData.get(field);
    formData.set(field, String(Number(value)));
  });
  
  // Calculate the price field as the lower of bedsPrice and privateroomPrice.
  const bedsPrice = Number(formData.get("bedsPrice"));
  const privateroomPrice = Number(formData.get("privateroomPrice"));
  const computedPrice = Math.min(bedsPrice, privateroomPrice);
  formData.set("price", String(computedPrice));
  
  return createPropertyAction(null, formData);
}

function CreatePropertyPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create property</h1>
      <div className="border p-8 rounded bg-white">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <FormContainer action={handleCreateProperty}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInputAny
              name="name"
              type="text"
              label="Name (20 limit)"
              defaultValue="Name of property"
              className="w-1/3 bg-white"
            />
            <FormInputAny
              name="tagline"
              type="text"
              label="Tagline (20 limit)"
              defaultValue="Town of property"
              className="w-1/3 bg-white"
            />
            <FormInputAny
              name="address"
              type="text"
              label="Address (20 limit)"
              defaultValue="Address of property"
              className="w-1/3 bg-white"
            />
            {/*
              Removed location input.
              Tagline now serves as the location field.
            */}
            <FormInputAny
              name="host"
              type="text"
              label="Host (20 limit)"
              defaultValue="Host of property"
              className="w-1/3 bg-white"
            />
            <FormInputAny
              name="hostemail"
              type="email"
              label="Host Email Address"
              defaultValue="Host email address"
              className="w-1/3 bg-white"
            />
            <FormInputAny
              name="hostmobilephone"
              type="tel"
              label="Host Mobile Phone"
              defaultValue="Mobile Phone"
              className="w-1/3 bg-white"
            />
            <FormInputAny
              name="hostlandlinephone"
              type="tel"
              label="Host Landline Phone"
              defaultValue="Land Line"
              className="w-1/3 bg-white"
            />
            {/* Removed price field input since it will default to the lowest of bedsPrice or privateroomPrice */}
            <CategoriesInputAny className="w-1/2 bg-white" />
            <TextAreaInputAny
              name="description"
              labelText="Description (10 - 100 words)"
              className="w-1/2 bg-white"
            />
            <CountriesInputAny className="w-1/2 bg-white" />
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mt-4">
            <CountriesInput />
            <ImageInput multiple maxFiles={8} />
          </div>

          <h3 className="text-lg mt-8 mb-4 font-medium">Accommodation Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <CounterInput detail="beds" defaultValue={0} />
              <PriceInput name="bedsPrice" label="Price per Bed" max={999} defaultValue={0} />
            </div>
            <div className="space-y-2">
              <CounterInput detail="privateroom" defaultValue={0} />
              <PriceInput
                name="privateroomPrice"
                label="Price per Private Room"
                max={999}
                defaultValue={0}
              />
            </div>
            <div className="space-y-2">
              <CounterInput detail="breakfast" defaultValue={0} />
              <PriceInput
                name="breakfastPrice"
                label="Price per Breakfast"
                max={999}
                defaultValue={0}
              />
            </div>
          </div>

          <h3 className="text-lg mt-8 mb-4 font-medium">Estimated Time of Arrival (ETA)</h3>
          <div className="mb-4">
            <label htmlFor="eta" className="block text-sm font-medium text-gray-700">
              Estimated Arrival Time (24-hour clock)
            </label>
            <select
              id="eta"
              name="eta"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
            >
              {generateTimeSlots().map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput />

          <SubmitButton text="create rental" className="mt-12" type="submit" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreatePropertyPage;
