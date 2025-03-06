export async function getCoordinatesFromAddress(address: string) {
    try {
      console.log("Fetching coordinates for:", address); // ✅ Debug log
  
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
  
      if (data.length === 0) {
        console.warn("No coordinates found for address:", address);
        return { lat: 40.4168, lng: -3.7038 }; // ✅ Default to Madrid, Spain (instead of London)
      }
  
      console.log("Coordinates found:", data[0].lat, data[0].lon); // ✅ Debug log
  
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return { lat: 40.4168, lng: -3.7038 }; // ✅ Default to Madrid, Spain
    }
  }
  