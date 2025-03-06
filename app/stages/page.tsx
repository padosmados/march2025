"use client";

import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// ------------------------------------------------
// Camino Frances Types, Coordinates, and Stages
// ------------------------------------------------
type Town =
  | "Saint Jean Pied de Port"
  | "Roncesvalles"
  | "Zubiri"
  | "Pamplona"
  | "Puente la Reina"
  | "Estella"
  | "Los Arcos"
  | "Logroño"
  | "Nájera"
  | "Santo Domingo de la Calzada"
  | "Villafranca Montes de Oca"
  | "Burgos"
  | "Hontanas"
  | "Boadilla del Camino"
  | "Carrion de los Condes"
  | "Sahagun"
  | "Mansilla de las Mulas"
  | "León"
  | "Hospital de Órbigo"
  | "El Ganso"
  | "Acebo"
  | "Villafranca del Bierzo"
  | "Las Herrerias"
  | "Triacastela"
  | "Barbadelo"
  | "Ligonde"
  | "Melide"
  | "O Pedrouzo"
  | "Santiago de Compostela";

const coordinates: Record<Town, [number, number]> = {
  "Saint Jean Pied de Port": [43.162952611725224, -1.237401002051058],
  "Roncesvalles": [43.0087191, -1.3198194],
  "Zubiri": [42.9302977, -1.5046518],
  "Pamplona": [42.8194766, -1.6418523],
  "Puente la Reina": [42.6735349, -1.8104287],
  "Estella": [42.6698759, -2.0272023],
  "Los Arcos": [42.5692293, -2.1923848],
  "Logroño": [42.4668060, -2.4457676],
  "Nájera": [42.4174158, -2.7332115],
  "Santo Domingo de la Calzada": [42.4414087, -2.9531919],
  "Villafranca Montes de Oca": [42.3901031, -3.3079772],
  "Burgos": [42.3397074, -3.7037603],
  "Hontanas": [42.3127158, -4.0440621],
  "Boadilla del Camino": [42.2584078, -4.3468061],
  "Carrion de los Condes": [42.3371056, -4.6010022],
  "Sahagun": [42.3707130, -5.0336548],
  "Mansilla de las Mulas": [42.4979411, -5.4147050],
  "León": [42.5989246, -5.5672485],
  "Hospital de Órbigo": [42.4635098, -5.8836641],
  "El Ganso": [42.4625669, -6.2086626],
  "Acebo": [42.5006884, -6.4597215],
  "Villafranca del Bierzo": [42.6083939, -6.8085445],
  "Las Herrerias": [42.6707990, -6.9810299],
  "Triacastela": [42.7559395, -7.2397542],
  "Barbadelo": [42.7690329, -7.4442687],
  "Ligonde": [42.8601732, -7.7814789],
  "Melide": [42.9140808, -8.0147854],
  "O Pedrouzo": [42.9052422, -8.3610102],
  "Santiago de Compostela": [42.8804226, -8.5457108],
};

const stages = [
  { from: "Saint Jean Pied de Port", to: "Roncesvalles", distance: 26 },
  { from: "Roncesvalles", to: "Zubiri", distance: 21.5 },
  { from: "Zubiri", to: "Pamplona", distance: 22 },
  { from: "Pamplona", to: "Puente la Reina", distance: 24 },
  { from: "Puente la Reina", to: "Estella", distance: 22 },
  { from: "Estella", to: "Los Arcos", distance: 22 },
  { from: "Los Arcos", to: "Logroño", distance: 28 },
  { from: "Logroño", to: "Nájera", distance: 31 },
  { from: "Nájera", to: "Santo Domingo de la Calzada", distance: 21 },
  { from: "Santo Domingo de la Calzada", to: "Villafranca Montes de Oca", distance: 35 },
  { from: "Villafranca Montes de Oca", to: "Burgos", distance: 39.5 },
  { from: "Burgos", to: "Hontanas", distance: 31.5 },
  { from: "Hontanas", to: "Boadilla del Camino", distance: 26 },
  { from: "Boadilla del Camino", to: "Carrion de los Condes", distance: 25 },
  { from: "Carrion de los Condes", to: "Sahagun", distance: 39 },
  { from: "Sahagun", to: "Mansilla de las Mulas", distance: 37.5 },
  { from: "Mansilla de las Mulas", to: "León", distance: 20 },
  { from: "León", to: "Hospital de Órbigo", distance: 33 },
  { from: "Hospital de Órbigo", to: "El Ganso", distance: 29.8 },
  { from: "El Ganso", to: "Acebo", distance: 23.2 },
  { from: "Acebo", to: "Villafranca del Bierzo", distance: 39.5 },
  { from: "Villafranca del Bierzo", to: "Las Herrerias", distance: 21.7 },
  { from: "Las Herrerias", to: "Triacastela", distance: 29.3 },
  { from: "Triacastela", to: "Barbadelo", distance: 26.5 },
  { from: "Barbadelo", to: "Ligonde", distance: 32.5 },
  { from: "Ligonde", to: "Melide", distance: 21 },
  { from: "Melide", to: "O Pedrouzo", distance: 36.5 },
  { from: "O Pedrouzo", to: "Santiago de Compostela", distance: 20 },
];

// ------------------------------------------------
// Camino del Norte Types, Coordinates, and Stages
// ------------------------------------------------
type TownDelNorte =
  | "Irún"
  | "San Sebastián"
  | "Zarautz"
  | "Deba"
  | "Markina"
  | "Gernika Lumo"
  | "Bilbao"
  | "Portugalete"
  | "Castro Urdiales"
  | "Laredo"
  | "Santander"
  | "Santillana del Mar"
  | "Comillas"
  | "Colombres"
  | "Llanes"
  | "Ribadesella"
  | "Sebrayo"
  | "Gijón"
  | "Avilés"
  | "Soto de Luíña"
  | "Luarca"
  | "La Caridad"
  | "Ribadeo"
  | "Lourenzá"
  | "Abadín"
  | "Baamonde"
  | "Sobrado dos Monxes"
  | "Arzua"
  | "Santiago de Compostela";

const coordinatesDelNorte: Record<TownDelNorte, [number, number]> = {
  "Irún": [43.34089148732575, -1.7949160349266204],
  "San Sebastián": [43.32140001358755, -1.9825727090408154],
  "Zarautz": [43.286504315501126, -2.1773577584358543],
  "Deba": [43.294960973825035, -2.353436683002901],
  "Markina": [43.26751440515938, -2.4970212363376194],
  "Gernika Lumo": [43.314563973202894, -2.679399360491566],
  "Bilbao": [43.25869596728956, -2.9241244679817395],
  "Portugalete": [43.32434006489218, -3.02750884555602],
  "Castro Urdiales": [43.38535044026712, -3.21590141912482],
  "Laredo": [43.41373586676047, -3.4112782086250215],
  "Santander": [43.462839044900036, -3.8076474513519285],
  "Santillana del Mar": [43.392307017409195, -4.105822517657014],
  "Comillas": [43.38745795558964, -4.299401106276863],
  "Colombres": [43.37494294324626, -4.539405367657484],
  "Llanes": [43.42282975878311, -4.754425575282048],
  "Ribadesella": [43.46281283262862, -5.057672310127216],
  "Sebrayo": [43.49989988018611, -5.379751569452303],
  "Gijón": [43.54243277073342, -5.662579578219302],
  "Avilés": [43.55882498691664, -5.921359809411887],
  "Soto de Luíña": [43.5620661574271, -6.2303267732045],
  "Luarca": [43.54518180323801, -6.533936002040742],
  "La Caridad": [43.55167836225379, -6.828259027712746],
  "Ribadeo": [43.53722360005157, -7.040882407497922],
  "Lourenzá": [43.47637159150828, -7.300178808770833],
  "Abadín": [43.36623927489958, -7.448317389987919],
  "Baamonde": [43.17409767905011, -7.759335283006117],
  "Sobrado dos Monxes": [43.0390906751764, -8.023232738881012],
  "Arzua": [42.926675359354526, -8.16347166551194],
  "Santiago de Compostela": [42.8804226, -8.5457108],
};

const stagesDelNorte = [
  { from: "Irún", to: "San Sebastián", distance: 24.8 },
  { from: "San Sebastián", to: "Zarautz", distance: 22.4 },
  { from: "Zarautz", to: "Deba", distance: 22.1 },
  { from: "Deba", to: "Markina", distance: 24 },
  { from: "Markina", to: "Gernika Lumo", distance: 25.4 },
  { from: "Gernika Lumo", to: "Bilbao", distance: 30.8 },
  { from: "Bilbao", to: "Portugalete", distance: 19.2 },
  { from: "Portugalete", to: "Castro Urdiales", distance: 25.4 },
  { from: "Castro Urdiales", to: "Laredo", distance: 25.7 },
  { from: "Laredo", to: "Santander", distance: 44 },
  { from: "Santander", to: "Santillana del Mar", distance: 36.3 },
  { from: "Santillana del Mar", to: "Comillas", distance: 22.2 },
  { from: "Comillas", to: "Colombres", distance: 28 },
  { from: "Colombres", to: "Llanes", distance: 22.9 },
  { from: "Llanes", to: "Ribadesella", distance: 30 },
  { from: "Ribadesella", to: "Sebrayo", distance: 31.6 },
  { from: "Sebrayo", to: "Gijón", distance: 35.8 },
  { from: "Gijón", to: "Avilés", distance: 25.4 },
  { from: "Avilés", to: "Soto de Luíña", distance: 38.5 },
  { from: "Soto de Luíña", to: "Luarca", distance: 33.8 },
  { from: "Luarca", to: "La Caridad", distance: 30.5 },
  { from: "La Caridad", to: "Ribadeo", distance: 21.3 },
  { from: "Ribadeo", to: "Lourenzá", distance: 28.4 },
  { from: "Lourenzá", to: "Abadín", distance: 25.2 },
  { from: "Abadín", to: "Baamonde", distance: 39.3 },
  { from: "Baamonde", to: "Sobrado dos Monxes", distance: 32 },
  { from: "Sobrado dos Monxes", to: "Arzua", distance: 22 },
  { from: "Arzua", to: "Santiago de Compostela", distance: 38.7 },
];

// ------------------------------------------------
// Camino Portuguese Types, Coordinates, and Stages
// (A common walking variant from Porto to Santiago)
// ------------------------------------------------
type TownPortuguese =
  | "Lisbon"
  | "Santa Iria de Azoia"
  | "Vila Franca de Xira"
  | "Azambuja"
  | "Santarém"
  | "Golega"
  | "Tomar"
  | "Alvaiazere"
  | "Ansião"
  | "Condeixa A Nova"
  | "Coimbra"
  | "Mealhada"
  | "Águeda"
  | "Albergaria A Velha"
  | "São João da Madeira"
  | "Porto"
  | "Povoa de Varzim"
  | "Esposende"
  | "Viana do Castelo"
  | "Vila Praia de Ancora"
  | "A Guarda"
  | "Baiona"
  | "Vigo"
  | "Arcade"
  | "Pontevedra"
  | "Caldas de Reis"
  | "Padrón"
  | "Santiago de Compostela";

const coordinatesPortuguese: Record<TownPortuguese, [number, number]> = {
  
    "Lisbon": [38.71005146955799, -9.132953513628202],
    "Santa Iria de Azoia": [38.8478436327611, -9.083615619161327],
    "Vila Franca de Xira":[38.95423691487951, -8.99059105524069],
    "Azambuja": [39.07034639422128, -8.865850759226102],
    "Santarém": [39.23750931269427, -8.685602601429908],
    "Golega": [39.403178763102254, -8.486491409954796],
    "Tomar": [39.60670150455303, -8.41081182616329],
    "Alvaiazere": [39.83789328581121, -8.381440871676064],
    "Ansião": [39.911487959905614, -8.435153998702713],
    "Condeixa A Nova": [40.10779166216664, -8.49312811728176],
    "Coimbra": [40.21092941478655, -8.423684557641838],
    "Mealhada": [40.37587409474875, -8.449123548153358],
    "Águeda": [40.573197560103225, -8.446471257939523],
    "Albergaria A Velha": [40.69425853506734, -8.481065952549976],
    "São João da Madeira": [40.89647311998274, -8.491358813162055],
    "Porto": [41.14329960585956, -8.609201762469182],
    "Povoa de Varzim": [41.381311456290376, -8.756987065675096],
    "Esposende": [41.53136353060276, -8.776066741012656],
    "Viana do Castelo": [41.694398072748484, -8.827273191812884],
    "Vila Praia de Ancora": [41.81493994245609, -8.84629309941433],
    "A Guarda": [41.90228874737059, -8.873888740142183],
    "Baiona": [42.118215169504445, -8.850766780645797],
    "Vigo": [42.2387530446029, -8.718250518225329],
    "Arcade": [42.340483986045776, -8.60159883329718],
    "Pontevedra": [42.43534344055017, -8.647894219447954],
    "Caldas de Reis": [42.60490752339565, -8.642514523642042],
    "Padrón": [42.73922224995416, -8.660824098898809],
    "Santiago de Compostela": [42.88090023921771, -8.544416859730232],
 
};

const stagesPortuguese = [
  { from: "Lisbon", to: "Santa Iria de Azoia", distance: 23 },
  { from: "Santa Iria de Azoia", to: "Vila Franca de Xira", distance: 26 },
  { from: "Vila Franca de Xira", to: "Azambuja", distance: 19 },
  { from: "Azambuja", to: "Santarém", distance: 32 },
  { from: "Santarém", to: "Golega", distance: 32 },


  { from: "Golega", to: "Tomar", distance: 30 },
  { from: "Tomar", to: "Alvaiazere", distance: 31 },
  { from: "Alvaiazere", to: "Ansião", distance: 14 },
  { from: "Ansião", to: "Condeixa A Nova", distance: 31 },
  { from: "Condeixa A Nova", to: "Coimbra", distance: 19 },

  { from: "Coimbra", to: "Mealhada", distance: 23 },
  { from: "Mealhada", to: "Águeda", distance: 25 },
  { from: "Águeda", to: "Albergaria A Velha", distance: 17 },
  { from: "Albergaria A Velha", to: "São João da Madeira", distance: 29 },
  { from: "São João da Madeira", to: "Porto", distance: 33 },


  { from: "Porto", to: "Povoa de Varzim", distance: 25 },
  { from: "Povoa de Varzim", to: "Esposende", distance: 22 },
  { from: "Esposende", to: "Viana do Castelo", distance: 24 },
  { from: "Viana do Castelo", to: "Vila Praia de Ancora", distance: 19 },
  { from: "Vila Praia de Ancora", to: "A Guarda", distance: 13 },

  { from: "A Guarda", to: "Baiona", distance: 30 },
  { from: "Baiona", to: "Vigo", distance: 26 },
  { from: "Vigo", to: "Arcade", distance: 23 },
  { from: "Arcade", to: "Pontevedra", distance: 12 },
  { from: "Pontevedra", to: "Caldas de Reis", distance: 22 },


  { from: "Caldas de Reis", to: "Padrón", distance: 18 },
  { from: "Padrón", to: "Santiago de Compostela", distance: 25 },
  
];

// ------------------------------------------------
// Camino Ingles Types, Coordinates, and Stages
// (A common walking route from Ferrol to Santiago)
// ------------------------------------------------
type TownIngles =
  | "Ferrol"
  | "Neda"
  | "Pontedeume"
  | "Betanzos"
  | "Santiago de Compostela";

const coordinatesIngles: Record<TownIngles, [number, number]> = {
  "Ferrol": [43.48223766890256, -8.23510375676892],
  "Neda": [43.49950341114929, -8.158369058609681],
  "Pontedeume": [43.408068234597955, -8.17201407892178],
  "Betanzos": [43.28224841151972, -8.2109911722159],
  "Santiago de Compostela": [42.880755614088784, -8.544390599670892],
};

const stagesIngles = [
  { from: "Ferrol", to: "Neda", distance: 15 },
  { from: "Neda", to: "Pontedeume", distance: 20 },
  { from: "Pontedeume", to: "Betanzos", distance: 25 },
  { from: "Betanzos", to: "Santiago de Compostela", distance: 35 },
];

// ------------------------------------------------
// Shared Helper Function
// ------------------------------------------------
const generateCurvedRoute = (
  start: [number, number],
  end: [number, number]
): [number, number][] => {
  const midLat = (start[0] + end[0]) / 2;
  const midLon = (start[1] + end[1]) / 2;
  const dLat = end[0] - start[0];
  const dLon = end[1] - start[1];
  const offsetFactor = 0.1;
  const offsetLat = midLat - dLon * offsetFactor;
  const offsetLon = midLon + dLat * offsetFactor;
  return [start, [offsetLat, offsetLon], end];
};

// ------------------------------------------------
// Main Component
// ------------------------------------------------
const Stages: React.FC = () => {
  // Common states
  const [isMounted, setIsMounted] = useState(false);
  const [routeType, setRouteType] = useState("Camino Frances");
  const [Leaflet, setLeaflet] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [elevationMap, setElevationMap] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Camino Frances selections
  const [selectedFrom, setSelectedFrom] = useState<Town | "">("");
  const [selectedTo, setSelectedTo] = useState<Town | "">("");
  const [totalDistance, setTotalDistance] = useState<number>(0);

  // Camino del Norte selections
  const [selectedFromDelNorte, setSelectedFromDelNorte] = useState<TownDelNorte | "">("");
  const [selectedToDelNorte, setSelectedToDelNorte] = useState<TownDelNorte | "">("");
  const [totalDistanceDelNorte, setTotalDistanceDelNorte] = useState<number>(0);

  // Camino Portuguese selections
  const [selectedFromPortuguese, setSelectedFromPortuguese] = useState<TownPortuguese | "">("");
  const [selectedToPortuguese, setSelectedToPortuguese] = useState<TownPortuguese | "">("");
  const [totalDistancePortuguese, setTotalDistancePortuguese] = useState<number>(0);

  // Camino Ingles selections
  const [selectedFromIngles, setSelectedFromIngles] = useState<TownIngles | "">("");
  const [selectedToIngles, setSelectedToIngles] = useState<TownIngles | "">("");
  const [totalDistanceIngles, setTotalDistanceIngles] = useState<number>(0);

  // Mark component as mounted.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamically import Leaflet on client.
  useEffect(() => {
    import('leaflet').then((L) => {
      setLeaflet(L);
    });
  }, []);

  // Detect mobile devices.
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
        setIsMobile(true);
      }
    }
  }, []);

  // Initialize main map.
  useEffect(() => {
    if (Leaflet) {
      const newMap = Leaflet.map('map').setView([43.1592, -1.2355], 10);
      Leaflet.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles &copy; Esri, i-cubed, USDA FSA, USGS, AEX, GeoIQ, NOAA, NGA, US Census Bureau, and the GIS User Community',
        }
      ).addTo(newMap);
      setMap(newMap);
      return () => {
        newMap.remove();
      };
    }
  }, [Leaflet]);

  // Initialize elevation map with OrganicMaps only on mobile.
  useEffect(() => {
    if (isMobile && Leaflet) {
      const newElevationMap = Leaflet.map('elevation-map').setView([43.1592, -1.2355], 10);
      Leaflet.tileLayer(
        'https://tiles.organicmaps.app/tiles/{z}/{x}/{y}.png',
        {
          attribution: 'Map data © OrganicMaps',
          tileSize: 256,
          maxZoom: 19,
        }
      ).addTo(newElevationMap);
      setElevationMap(newElevationMap);
      return () => {
        newElevationMap.remove();
      };
    }
  }, [isMobile, Leaflet]);

  // ------------------------------------------------
  // Map Markers (update based on route type)
  // ------------------------------------------------
  useEffect(() => {
    if (!Leaflet || !map) return;
    // Remove existing markers (assumed non-interactive)
    map.eachLayer((layer: any) => {
      if (layer instanceof Leaflet.Marker && layer.options.interactive === false) {
        map.removeLayer(layer);
      }
    });
    if (routeType === "Camino Frances") {
      Object.entries(coordinates).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(map);
      });
    } else if (routeType === "Camino del Norte") {
      Object.entries(coordinatesDelNorte).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(map);
      });
    } else if (routeType === "Camino Portuguese") {
      Object.entries(coordinatesPortuguese).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(map);
      });
    } else if (routeType === "Camino Ingles") {
      Object.entries(coordinatesIngles).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(map);
      });
    }
  }, [map, Leaflet, routeType]);

  // Add markers to elevation map (if mobile)
  useEffect(() => {
    if (!Leaflet || !elevationMap || !isMobile) return;
    elevationMap.eachLayer((layer: any) => {
      if (layer instanceof Leaflet.Marker && layer.options.interactive === false) {
        elevationMap.removeLayer(layer);
      }
    });
    if (routeType === "Camino Frances") {
      Object.entries(coordinates).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(elevationMap);
      });
    } else if (routeType === "Camino del Norte") {
      Object.entries(coordinatesDelNorte).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(elevationMap);
      });
    } else if (routeType === "Camino Portuguese") {
      Object.entries(coordinatesPortuguese).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(elevationMap);
      });
    } else if (routeType === "Camino Ingles") {
      Object.entries(coordinatesIngles).forEach(([town, latlng]) => {
        Leaflet.marker(latlng, {
          icon: Leaflet.divIcon({
            className: 'town-label',
            html: `<span style="color: gold; font-weight: bold;">${town}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
            popupAnchor: [0, -10],
          }),
          interactive: false,
        }).addTo(elevationMap);
      });
    }
  }, [elevationMap, Leaflet, isMobile, routeType]);

  // ------------------------------------------------
  // Generic Distance Calculator
  // ------------------------------------------------
  const calculateTotalDistanceGeneric = (
    from: string,
    to: string,
    stagesArray: { from: string; to: string; distance: number }[]
  ): number => {
    let total = 0;
    const startIndex = stagesArray.findIndex((stage) => stage.from === from);
    const endIndex = stagesArray.findIndex((stage) => stage.to === to);
    if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
      for (let i = startIndex; i <= endIndex; i++) {
        total += stagesArray[i].distance;
      }
    }
    return total;
  };

  // ------------------------------------------------
  // Route Drawing for Camino Frances
  // ------------------------------------------------
  useEffect(() => {
    if (routeType !== "Camino Frances" || !selectedFrom || !selectedTo || selectedFrom === selectedTo) {
      setTotalDistance(0);
      return;
    }
    if (map && Leaflet) {
      map.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          map.removeLayer(layer);
        }
      });
    }
    if (elevationMap && Leaflet) {
      elevationMap.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          elevationMap.removeLayer(layer);
        }
      });
    }
    const total = calculateTotalDistanceGeneric(selectedFrom, selectedTo, stages);
    setTotalDistance(total);
    drawRoute(selectedFrom, selectedTo);
  }, [selectedFrom, selectedTo, elevationMap, Leaflet, routeType]);

  const drawRoute = (from: Town, to: Town) => {
    if (!map || !Leaflet) return;
    const startIndex = stages.findIndex((stage) => stage.from === from);
    const endIndex = stages.findIndex((stage) => stage.to === to);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) return;
    let routeCoordinates: [number, number][] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const stage = stages[i];
      if (coordinates[stage.from as Town] && coordinates[stage.to as Town]) {
        const curvedSegment = generateCurvedRoute(
          coordinates[stage.from as Town],
          coordinates[stage.to as Town]
        );
        routeCoordinates = routeCoordinates.length > 0
          ? routeCoordinates.concat(curvedSegment.slice(1))
          : routeCoordinates.concat(curvedSegment);
      }
    }
    Leaflet.polyline(routeCoordinates, { color: 'blue' }).addTo(map);
    if (isMobile && elevationMap && Leaflet) {
      Leaflet.polyline(routeCoordinates, { color: 'red' }).addTo(elevationMap);
    }
  };

  // ------------------------------------------------
  // Route Drawing for Camino del Norte
  // ------------------------------------------------
  useEffect(() => {
    if (routeType !== "Camino del Norte" || !selectedFromDelNorte || !selectedToDelNorte || selectedFromDelNorte === selectedToDelNorte) {
      setTotalDistanceDelNorte(0);
      return;
    }
    if (map && Leaflet) {
      map.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          map.removeLayer(layer);
        }
      });
    }
    if (elevationMap && Leaflet) {
      elevationMap.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          elevationMap.removeLayer(layer);
        }
      });
    }
    const total = calculateTotalDistanceGeneric(selectedFromDelNorte, selectedToDelNorte, stagesDelNorte);
    setTotalDistanceDelNorte(total);
    drawRouteDelNorte(selectedFromDelNorte, selectedToDelNorte);
  }, [selectedFromDelNorte, selectedToDelNorte, elevationMap, Leaflet, routeType]);

  const drawRouteDelNorte = (from: TownDelNorte, to: TownDelNorte) => {
    if (!map || !Leaflet) return;
    const startIndex = stagesDelNorte.findIndex((stage) => stage.from === from);
    const endIndex = stagesDelNorte.findIndex((stage) => stage.to === to);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) return;
    let routeCoordinates: [number, number][] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const stage = stagesDelNorte[i];
      if (coordinatesDelNorte[stage.from as TownDelNorte] && coordinatesDelNorte[stage.to as TownDelNorte]) {
        const curvedSegment = generateCurvedRoute(
          coordinatesDelNorte[stage.from as TownDelNorte],
          coordinatesDelNorte[stage.to as TownDelNorte]
        );
        routeCoordinates = routeCoordinates.length > 0
          ? routeCoordinates.concat(curvedSegment.slice(1))
          : routeCoordinates.concat(curvedSegment);
      }
    }
    Leaflet.polyline(routeCoordinates, { color: 'green' }).addTo(map);
    if (isMobile && elevationMap && Leaflet) {
      Leaflet.polyline(routeCoordinates, { color: 'red' }).addTo(elevationMap);
    }
  };

  // ------------------------------------------------
  // Route Drawing for Camino Portuguese
  // ------------------------------------------------
  useEffect(() => {
    if (
      routeType !== "Camino Portuguese" ||
      !selectedFromPortuguese ||
      !selectedToPortuguese ||
      selectedFromPortuguese === selectedToPortuguese
    ) {
      setTotalDistancePortuguese(0);
      return;
    }
    if (map && Leaflet) {
      map.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          map.removeLayer(layer);
        }
      });
    }
    if (elevationMap && Leaflet) {
      elevationMap.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          elevationMap.removeLayer(layer);
        }
      });
    }
    const total = calculateTotalDistanceGeneric(selectedFromPortuguese, selectedToPortuguese, stagesPortuguese);
    setTotalDistancePortuguese(total);
    drawRoutePortuguese(selectedFromPortuguese, selectedToPortuguese);
  }, [selectedFromPortuguese, selectedToPortuguese, elevationMap, Leaflet, routeType]);

  const drawRoutePortuguese = (from: TownPortuguese, to: TownPortuguese) => {
    if (!map || !Leaflet) return;
    const startIndex = stagesPortuguese.findIndex((stage) => stage.from === from);
    const endIndex = stagesPortuguese.findIndex((stage) => stage.to === to);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) return;
    let routeCoordinates: [number, number][] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const stage = stagesPortuguese[i];
      if (
        coordinatesPortuguese[stage.from as TownPortuguese] &&
        coordinatesPortuguese[stage.to as TownPortuguese]
      ) {
        const curvedSegment = generateCurvedRoute(
          coordinatesPortuguese[stage.from as TownPortuguese],
          coordinatesPortuguese[stage.to as TownPortuguese]
        );
        routeCoordinates = routeCoordinates.length > 0
          ? routeCoordinates.concat(curvedSegment.slice(1))
          : routeCoordinates.concat(curvedSegment);
      }
    }
    // Use a distinct color (purple) for Portuguese route.
    Leaflet.polyline(routeCoordinates, { color: 'purple' }).addTo(map);
    if (isMobile && elevationMap && Leaflet) {
      Leaflet.polyline(routeCoordinates, { color: 'red' }).addTo(elevationMap);
    }
  };

  // ------------------------------------------------
  // Route Drawing for Camino Ingles
  // ------------------------------------------------
  useEffect(() => {
    if (
      routeType !== "Camino Ingles" ||
      !selectedFromIngles ||
      !selectedToIngles ||
      selectedFromIngles === selectedToIngles
    ) {
      setTotalDistanceIngles(0);
      return;
    }
    if (map && Leaflet) {
      map.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          map.removeLayer(layer);
        }
      });
    }
    if (elevationMap && Leaflet) {
      elevationMap.eachLayer((layer: any) => {
        if (layer instanceof Leaflet.Polyline) {
          elevationMap.removeLayer(layer);
        }
      });
    }
    const total = calculateTotalDistanceGeneric(selectedFromIngles, selectedToIngles, stagesIngles);
    setTotalDistanceIngles(total);
    drawRouteIngles(selectedFromIngles, selectedToIngles);
  }, [selectedFromIngles, selectedToIngles, elevationMap, Leaflet, routeType]);

  const drawRouteIngles = (from: TownIngles, to: TownIngles) => {
    if (!map || !Leaflet) return;
    const startIndex = stagesIngles.findIndex((stage) => stage.from === from);
    const endIndex = stagesIngles.findIndex((stage) => stage.to === to);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) return;
    let routeCoordinates: [number, number][] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const stage = stagesIngles[i];
      if (
        coordinatesIngles[stage.from as TownIngles] &&
        coordinatesIngles[stage.to as TownIngles]
      ) {
        const curvedSegment = generateCurvedRoute(
          coordinatesIngles[stage.from as TownIngles],
          coordinatesIngles[stage.to as TownIngles]
        );
        routeCoordinates = routeCoordinates.length > 0
          ? routeCoordinates.concat(curvedSegment.slice(1))
          : routeCoordinates.concat(curvedSegment);
      }
    }
    // Use a distinct color (orange) for Ingles route.
    Leaflet.polyline(routeCoordinates, { color: 'orange' }).addTo(map);
    if (isMobile && elevationMap && Leaflet) {
      Leaflet.polyline(routeCoordinates, { color: 'red' }).addTo(elevationMap);
    }
  };

  // ------------------------------------------------
  // Render JSX
  // ------------------------------------------------
  return (
    <div>
      {!isMounted ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Recommended Stages of the Camino de Santiago (from experience)
          </h2>
          <div>
            {/* Route Type Dropdown */}
            <select
              value={routeType}
              onChange={(e) => {
                setRouteType(e.target.value);
                // Reset all selections on route change.
                setSelectedFrom("");
                setSelectedTo("");
                setTotalDistance(0);
                setSelectedFromDelNorte("");
                setSelectedToDelNorte("");
                setTotalDistanceDelNorte(0);
                setSelectedFromPortuguese("");
                setSelectedToPortuguese("");
                setTotalDistancePortuguese(0);
                setSelectedFromIngles("");
                setSelectedToIngles("");
                setTotalDistanceIngles(0);
              }}
              style={{
                border: '2px solid yellow',
                padding: '5px',
                margin: '10px',
                fontSize: '16px',
              }}
            >
              <option value="Camino Frances">Camino Frances</option>
              <option value="Camino Portuguese">Camino Portuguese</option>
              <option value="Camino del Norte">Camino del Norte</option>
              <option value="Camino Ingles">Camino Ingles</option>
            </select>

            {/* Camino Frances Section */}
            {routeType === "Camino Frances" && (
              <>
                <select
                  value={selectedFrom}
                  onChange={(e) => {
                    setSelectedFrom(e.target.value as Town);
                    setSelectedTo("");
                    setTotalDistance(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select From</option>
                  {Object.keys(coordinates).map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedTo}
                  onChange={(e) => {
                    setSelectedTo(e.target.value as Town);
                    setTotalDistance(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select To</option>
                  {Object.keys(coordinates)
                    .filter((town) => town !== selectedFrom)
                    .map((town) => (
                      <option key={town} value={town}>
                        {town}
                      </option>
                    ))}
                </select>
                {totalDistance > 0 && (
                  <div>
                    <h5>Total Distance: {totalDistance} km</h5>
                  </div>
                )}
              </>
            )}

            {/* Camino del Norte Section */}
            {routeType === "Camino del Norte" && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Camino del Norte</h3>
                <select
                  value={selectedFromDelNorte}
                  onChange={(e) => {
                    setSelectedFromDelNorte(e.target.value as TownDelNorte);
                    setSelectedToDelNorte("");
                    setTotalDistanceDelNorte(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select From</option>
                  {Object.keys(coordinatesDelNorte).map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedToDelNorte}
                  onChange={(e) => {
                    setSelectedToDelNorte(e.target.value as TownDelNorte);
                    setTotalDistanceDelNorte(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select To</option>
                  {Object.keys(coordinatesDelNorte)
                    .filter((town) => town !== selectedFromDelNorte)
                    .map((town) => (
                      <option key={town} value={town}>
                        {town}
                      </option>
                    ))}
                </select>
                {totalDistanceDelNorte > 0 && (
                  <div>
                    <h5>Total Distance: {totalDistanceDelNorte} km</h5>
                  </div>
                )}
              </>
            )}

            {/* Camino Portuguese Section */}
            {routeType === "Camino Portuguese" && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Camino Portuguese</h3>
                <select
                  value={selectedFromPortuguese}
                  onChange={(e) => {
                    setSelectedFromPortuguese(e.target.value as TownPortuguese);
                    setSelectedToPortuguese("");
                    setTotalDistancePortuguese(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select From</option>
                  {Object.keys(coordinatesPortuguese).map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedToPortuguese}
                  onChange={(e) => {
                    setSelectedToPortuguese(e.target.value as TownPortuguese);
                    setTotalDistancePortuguese(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select To</option>
                  {Object.keys(coordinatesPortuguese)
                    .filter((town) => town !== selectedFromPortuguese)
                    .map((town) => (
                      <option key={town} value={town}>
                        {town}
                      </option>
                    ))}
                </select>
                {totalDistancePortuguese > 0 && (
                  <div>
                    <h5>Total Distance: {totalDistancePortuguese} km</h5>
                  </div>
                )}
              </>
            )}

            {/* Camino Ingles Section */}
            {routeType === "Camino Ingles" && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Camino Ingles</h3>
                <select
                  value={selectedFromIngles}
                  onChange={(e) => {
                    setSelectedFromIngles(e.target.value as TownIngles);
                    setSelectedToIngles("");
                    setTotalDistanceIngles(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select From</option>
                  {Object.keys(coordinatesIngles).map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedToIngles}
                  onChange={(e) => {
                    setSelectedToIngles(e.target.value as TownIngles);
                    setTotalDistanceIngles(0);
                  }}
                  style={{
                    border: '2px solid yellow',
                    padding: '5px',
                    margin: '10px',
                    fontSize: '16px',
                  }}
                >
                  <option value="">Select To</option>
                  {Object.keys(coordinatesIngles)
                    .filter((town) => town !== selectedFromIngles)
                    .map((town) => (
                      <option key={town} value={town}>
                        {town}
                      </option>
                    ))}
                </select>
                {totalDistanceIngles > 0 && (
                  <div>
                    <h5>Total Distance: {totalDistanceIngles} km</h5>
                  </div>
                )}
              </>
            )}
          </div>
          {/* Main Map */}
          <div id="map" style={{ height: '950px', width: '67%', margin: '0 auto' }}></div>
          {/* Elevation Map (mobile only) */}
          {isMobile && (
            <>
              <h2 style={{ textAlign: 'center' }}>Elevation</h2>
              <div id="elevation-map" style={{ height: '500px', width: '66.67%', margin: '0 auto' }}></div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Stages;
