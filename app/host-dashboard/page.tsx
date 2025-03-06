"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

// ✅ Define Property Type
type Property = {
  id: string;
  name: string;
  location: string;
};

function HostDashboard() {
  const { userId } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]); // ✅ Explicitly define type

  useEffect(() => {
    async function fetchProperties() {
      if (!userId) return;
      const response = await fetch(`/api/host-properties?userId=${userId}`);
      const data = await response.json();
      setProperties(data.properties || []); // ✅ Ensure it's always an array
    }

    fetchProperties();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Properties</h1>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <p className="font-semibold">{property.name}</p>
              <p>{property.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HostDashboard;
