import countries from 'world-countries';

// Filter the countries to only include France, Spain, and Portugal
export const formattedCountries = countries
  .filter(item => ['France', 'Spain', 'Portugal'].includes(item.name.common)) // Filter by country names
  .map((item) => ({
    code: item.cca2, // Country code (ISO 3166-1 alpha-2)
    name: item.name.common, // Country name
    flag: item.flag, // Country flag
    location: item.latlng, // Latitude and longitude
    region: item.region, // Region (e.g., Europe)
  }));

// Function to find country by code (this will work for only France, Spain, and Portugal)
export const findCountryByCode = (code: string) =>
  formattedCountries.find((item) => item.code === code);