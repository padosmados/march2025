// LeafletMap.tsx
'use client'

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    const newMap = L.map('map').setView([43.1592, -1.2355], 13); // Default map view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(newMap);

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  return <div id="map" style={{ height: '500px' }}></div>;
};

export default LeafletMap;

