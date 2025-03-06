'use client';
import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import CountryFlagAndName from '../card/CountryFlagAndName';
import Title from './Title';

const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

function PropertyMap({ propertyName, countryCode }: { propertyName: string; countryCode: string }) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Function to Fetch Coordinates from Address with Debounce
  const fetchCoordinates = useCallback(async (address: string) => {
    if (!address) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const location = data[0]; // First result
        setCoordinates({ lat: parseFloat(location.lat), lng: parseFloat(location.lon) });
      } else {
        setError('Location not found. Please check the address.');
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setError('Failed to fetch location.');
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Debounced Effect to Fetch Coordinates on Property Name Change
  useEffect(() => {
    if (propertyName) {
      const debounceTimer = setTimeout(() => {
        fetchCoordinates(propertyName);
      }, 500); // Delay API call by 500ms to avoid excessive requests
      return () => clearTimeout(debounceTimer);
    }
  }, [propertyName, fetchCoordinates]);

  // ✅ Function to Open Street View
  const openStreetView = () => {
    if (!coordinates) return;
    const { lat, lng } = coordinates;
    const streetViewUrl = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}`;
    window.open(streetViewUrl, '_blank');
  };

  return (
    <div className='mt-4 w-full md:w-1/2 mb-12'>
      <div className='mb-4'>
        <Title text='Where you will be staying' />
        <CountryFlagAndName countryCode={countryCode} />
      </div>

      {/* ✅ Show loading or error message if applicable */}
      {loading ? (
        <p>Loading map...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : coordinates ? (
        <MapContainer
          scrollWheelZoom={false}
          zoomControl={false}
          className='h-[25vh] rounded-lg relative z-0 w-full mb-8'
          center={[coordinates.lat, coordinates.lng]}
          zoom={15}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <ZoomControl position='bottomright' />

          {/* ✅ Clicking the marker opens Street View, and hovering shows the tooltip */}
          <Marker position={[coordinates.lat, coordinates.lng]} icon={markerIcon} eventHandlers={{ click: openStreetView }}>
            <Tooltip>{propertyName}</Tooltip> {/* ✅ Tooltip shows property name on hover */}
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-gray-500">No location found.</p>
      )}
    </div>
  );
}

export default PropertyMap;
