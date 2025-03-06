'use client';

import { useState, useEffect } from "react";

// ------------------------------------------------
// Type Definitions
// ------------------------------------------------
interface Stage {
  from: string;
  to: string;
  distance: number;
}

type RouteType = "Camino Frances" | "Camino del Norte" | "Camino Portuguese" | "Camino Ingles";

// ------------------------------------------------
// Sample Stages Data for Camino Frances (adjust or add your full data)
// ------------------------------------------------
const stagesFrances: Stage[] = [
  { from: "Saint Jean Pied de Port", to: "Orisson", distance: 7.5 },
  { from: "Orisson", to: "Roncesvalles", distance: 18.5 },
  { from: "Roncesvalles", to: "Auritz", distance: 2.4 },
  { from: "Auritz", to: "Espinal", distance: 3.6 },
  { from: "Espinal", to: "Bizkarreta", distance: 5 },
  { from: "Bizkarreta", to: "Zubiri", distance: 10.5 },
  { from: "Zubiri", to: "Larrasoana", distance: 5.5 },
  { from: "Larrasoana", to: "Zabaldika", distance: 8 },
  { from: "Zabaldika", to: "Trinidad de Arre", distance: 5 },
  { from: "Trinidad de Arre", to: "Burlata", distance: 0.2 },
  { from: "Burlata", to: "Pamplona", distance: 3.3 },
  { from: "Pamplona", to: "Cizur Menor", distance: 4.8 },
  { from: "Cizur Menor", to: "Uterga", distance: 11.3 },
  { from: "Uterga", to: "Obanos", distance: 5.4 },
  { from: "Obanos", to: "Puente la Reina", distance: 3.5 },
  { from: "Puente la Reina", to: "Maneru", distance: 5 },
  { from: "Maneru", to: "Cirauqui", distance: 2.6 },
  { from: "Cirauqui", to: "Lorca",distance: 5.4 },
  { from: "Lorca", to: "Villatuerta", distance: 5.0 },
  { from: "Villatuerta", to: "Estella", distance: 4.0 },
  { from: "Estella", to: "Ayegui", distance: 2 },
  { from: "Ayegui", to: "Villamayor de Monjardin", distance: 7.4 },
  { from: "Villamayor de Monjardin", to: "Los Arcos", distance: 12.6 },
  { from: "Los Arcos", to: "Sansol", distance: 6.8 },
  { from: "Sansol", to: "Torres del Rio", distance: 0.8 },
  { from: "Torres del Rio", to: "Viana", distance: 10.9 },
  { from: "Viana", to: "Logroño", distance: 5.5 },
  { from: "Logroño", to: "Navarrete", distance: 13.0 },
  { from: "Navarrete", to: "Ventosa", distance: 7.8 },
  { from: "Ventosa", to: "Nájera", distance: 8.5 },
  { from: "Nájera", to: "Azofra", distance: 5.8 },
  { from: "Azofra", to: "Ciruena", distance: 9.7 },
  { from: "Ciruena", to: "Santo Domingo de la Calzada", distance: 5.5 },
  { from: "Santo Domingo de la Calzada", to: "Granon", distance: 6.5 },
  { from: "Granon", to: "Redicilla del Camino", distance: 5.0 },
  { from: "Redicilla del Camino", to: "Viloria de Rioja", distance: 4.0 },
  { from: "Viloria de Rioja", to: "Villamayor del Rio", distance: 3.5 },
  { from: "Villamayor del Rio", to: "Belorado", distance: 5.0 },
  { from: "Belorado", to: "Tosantos", distance: 4.8 },
  { from: "Tosantos", to: "Villambistia", distance: 1.9 },
  { from: "Villambistia", to: "Espinosa del Camino", distance: 1.6 },
  { from: "Espinosa del Camino", to: "Villafranca Montes de Oca", distance: 3.7 },
  { from: "Villafranca Montes de Oca", to: "San Juan de Ortega", distance: 12.0 },
  { from: "San Juan de Ortega", to: "Ages", distance: 3.5 },
  { from: "Ages", to: "Atapuerca", distance: 2.5 },
  { from: "Atapuerca", to: "Cardenuela Riopico", distance: 6.5 },
  { from: "Cardenuela Riopico (take burgos river way its left over motorway / train line)", to: "Burgos", distance: 15.0 },
  { from: "Burgos", to: "Villalbilla de Burgos", distance: 6.2 },
  { from: "Villalbilla de Burgos", to: "Tardajos", distance: 2.8 },
  { from: "Tardajos", to: "Rabe de las Calzadas", distance: 2.0 },
  { from: "Rabe de las Calzadas", to: "Hornillos del Camino", distance: 8.2 },
  { from: "Hornillos del Camino", to: "San Bol", distance: 6.5 },
  { from: "Sanbol", to: "Hontanas", distance: 5.0 },
  { from: "Hontanas", to: "San Anton", distance: 7.0 },
  { from: "San Anton", to: "Castrojeriz", distance: 2.0 },
  { from: "Castrojeriz", to: "Itero del Castillo", distance: 9.6},
  { from: "Itero del Castillo", to: "Itero de la Vega", distance: 1.8},
  { from: "Itero de la Vega", to: "Boadilla de Camino", distance: 5.6},
  { from: "Boadilla del Camino", to: "Fromista", distance: 6.0 },
  { from: "Fromista", to: "Villarmentero de Campos", distance: 9.4 },
  { from: "Villarmentero de Campos", to: "Villalcazar de Sirga", distance: 4.1 },
  { from: "Villalcazar de Sirga", to: "Carrion de los Condes", distance: 5.5 },
  { from: "Carrion de los Condes", to: "Calzadilla de la Cueza", distance: 16.8 },
  { from: "Calzadilla de la Cueza", to: "Ledigos", distance: 6.2 },
  { from: "Ledigos", to: "Terradillos de los Templarios", distance: 2.8 },
  { from: "Terradillos de los Templarios", to: "San Nicolas del real Camino", distance: 5.8 },
  { from: "San Nicolas del real Camino", to: "Sahagun", distance: 7.4 },
  { from: "Sahagun", to: "Calzada de Coto", distance: 4.0 },
  { from: "Calzada de Coto", to: "Bercianos del Real Camino", distance: 6.5 },
  { from: "Bercianos del Real Camino", to: "Mansilla de las Mulas", distance: 37.5 },
  
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

// (Other routes' data would go here...)


// ------------------------------------------------
// Helper Functions
// ------------------------------------------------
const getTownsFromStages = (stagesArray: Stage[]): string[] => {
  if (!stagesArray.length) return [];
  const towns = [stagesArray[0].from];
  stagesArray.forEach((stage) => {
    towns.push(stage.to);
  });
  return towns;
};

const calculateTotalDistance = (from: string, to: string, stagesArray: Stage[]): number => {
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

const calculateAverageTime = (distance: number): number => distance / 4;

const calculateSteps = (distance: number): number => distance * 1400;

// ------------------------------------------------
// Main Calculator Component
// ------------------------------------------------
export default function CaminoCalculator() {
  // Background crossfade state
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(false);

  // Other state
  const [routeType, setRouteType] = useState<RouteType>("Camino Frances");
  const [fromTown, setFromTown] = useState<string>("");
  const [toTown, setToTown] = useState<string>("");
  const [totalDistance, setTotalDistance] = useState<number>(0);

  // For simplicity, using only Camino Frances data here
  const townsFrances = getTownsFromStages(stagesFrances);
  let currentStages: Stage[] = [];
  let currentTowns: string[] = [];
  switch (routeType) {
    case "Camino Frances":
      currentStages = stagesFrances;
      currentTowns = townsFrances;
      break;
    // Other cases for different routes can be added here...
    default:
      currentStages = stagesFrances;
      currentTowns = townsFrances;
  }

  // Background crossfade effect with 7-second interval and 1-second fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % 4);
        setFade(false);
      }, 1000); // 1-second fade duration
    }, 7000); // 7 seconds interval
    return () => clearInterval(interval);
  }, []);

  // Update calculation when selections change.
  useEffect(() => {
    if (fromTown && toTown && fromTown !== toTown) {
      const distance = calculateTotalDistance(fromTown, toTown, currentStages);
      setTotalDistance(distance);
    } else {
      setTotalDistance(0);
    }
  }, [fromTown, toTown, currentStages]);

  const averageTime = totalDistance > 0 ? calculateAverageTime(totalDistance) : 0;
  const stepsCount = totalDistance > 0 ? calculateSteps(totalDistance) : 0;

  return (
    <div className="relative min-h-screen">
      {/* Background Layers for Crossfade */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/info/${((currentImageIndex + 1) % 4) + 1}.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: fade ? 1 : 0,
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/info/${currentImageIndex + 1}.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content Container - Centered horizontally, but with reduced top padding to move it higher */}
      <div className="relative z-10 container mx-auto p-4 flex flex-col justify-start items-center min-h-screen pt-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Camino Calculator</h1>
          
          {/* Route Type Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Route</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={routeType}
              onChange={(e) => {
                setRouteType(e.target.value as RouteType);
                setFromTown("");
                setToTown("");
                setTotalDistance(0);
              }}
            >
              <option value="Camino Frances">Camino Frances</option>
              <option value="Camino Portuguese">Camino Portuguese</option>
              <option value="Camino del Norte">Camino del Norte</option>
              <option value="Camino Ingles">Camino Ingles</option>
            </select>
          </div>

          {/* From Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">From</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={fromTown}
              onChange={(e) => {
                setFromTown(e.target.value);
                setTotalDistance(0);
              }}
            >
              <option value="">Select starting town</option>
              {currentTowns.map((town, idx) => (
                <option key={idx} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>

          {/* To Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">To</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={toTown}
              onChange={(e) => {
                setToTown(e.target.value);
                setTotalDistance(0);
              }}
            >
              <option value="">Select ending town</option>
              {currentTowns.filter((town) => town !== fromTown).map((town, idx) => (
                <option key={idx} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>

          {/* Results Display */}
          {totalDistance > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-lg">
                Total Distance: <strong>{totalDistance} km</strong>
              </p>
              <p className="text-lg">
                Average Time: <strong>{averageTime.toFixed(1)} hours</strong>
              </p>
              <p className="text-lg">
                Steps: <strong>{stepsCount.toLocaleString()} steps</strong>
              </p>
              {/* Animated GIF from /letsdocamino.gif */}
              <div className="flex justify-center mt-4">
                <img src="/letsdocamino.gif" alt="Let's do Camino" className="w-32 h-auto" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
