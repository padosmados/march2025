"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function BagCollection() {
  const { user } = useUser();
  const [courier, setCourier] = useState<string>("");
  const [route, setRoute] = useState<string>("");
  const [towns, setTowns] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState<string>("+1");
  const [bagImage, setBagImage] = useState<File | null>(null);
  const [sendFromTown, setSendFromTown] = useState<string>("");
  const [sendToTown, setSendToTown] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [senderPhone, setSenderPhone] = useState<string>("");
  const [numBags, setNumBags] = useState<number>(1);

  const couriers = ["Joe Bloggs"];

  const caminoRoutes: Record<string, string[]> = {
    "Camino Frances": [
      "Saint-Jean-Pied-de-Port",
      "Roncesvalles",
      "Zubiri",
      "Pamplona",
      "Puente la Reina",
      "Estella",
      "Los Arcos",
      "Logroño",
      "Nájera",
      "Santo Domingo de la Calzada",
      "Belorado",
      "Burgos",
      "Hornillos del Camino",
      "Castrojeriz",
      "Frómista",
      "Carrión de los Condes",
      "Sahagún",
      "Mansilla de las Mulas",
      "León",
      "Hospital de Órbigo",
      "Astorga",
      "Rabanal del Camino",
      "Ponferrada",
      "Villafranca del Bierzo",
      "O Cebreiro",
      "Triacastela",
      "Sarria",
      "Portomarín",
      "Palas de Rei",
      "Melide",
      "Arzúa",
      "O Pedrouzo",
      "Santiago de Compostela",
    ],
    "Camino Del Norte": [
      "Irun",
      "San Sebastian",
      "Zarautz",
      "Deba",
      "Markina-Xemein",
      "Gernika",
      "Bilbao",
      "Portugalete",
      "Castro Urdiales",
      "Laredo",
      "Santander",
      "Santillana del Mar",
      "Comillas",
      "Colombres",
      "Llanes",
      "Ribadesella",
      "Villaviciosa",
      "Gijón",
      "Avilés",
      "Muros de Nalón",
      "Luarca",
      "Ribadeo",
      "Mondoñedo",
      "Vilalba",
      "Baamonde",
      "Sobrado dos Monxes",
      "Arzúa",
      "Santiago de Compostela",
    ],
    "Camino Portuguese": [
      "Lisbon",
      "Alverca do Ribatejo",
      "Azambuja",
      "Santarém",
      "Golegã",
      "Tomar",
      "Alvaiázere",
      "Ansiao",
      "Rabaçal",
      "Coimbra",
      "Mealhada",
      "Agueda",
      "Albergaria-a-Velha",
      "Oliveira de Azeméis",
      "Grijó",
      "Porto",
      "Vila do Conde",
      "Barcelos",
      "Ponte de Lima",
      "Valença",
      "Tui",
      "O Porriño",
      "Redondela",
      "Pontevedra",
      "Caldas de Reis",
      "Padrón",
      "Santiago de Compostela",
    ],
    "Camino Ingles": [
      "Ferrol",
      "Pontedeume",
      "Betanzos",
      "Bruma",
      "Santiago de Compostela",
    ],
  };

  const countryCodes: { code: string; country: string }[] = [
    { code: "+1", country: "United States" },
    { code: "+34", country: "Spain" },
    { code: "+44", country: "United Kingdom" },
    { code: "+33", country: "France" },
    { code: "+49", country: "Germany" },
    { code: "+351", country: "Portugal" },
    { code: "+39", country: "Italy" },
    { code: "+31", country: "Netherlands" },
    { code: "+61", country: "Australia" },
    { code: "+64", country: "New Zealand" },
    { code: "+86", country: "China" },
    { code: "+91", country: "India" },
  ];

  // Prefill sender details from the user's profile.
  useEffect(() => {
    if (user) {
      const fullName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName || "";
      setSenderName(fullName);
      if (user.emailAddresses && user.emailAddresses.length > 0) {
        setSenderEmail(user.emailAddresses[0].emailAddress);
      }
      if (user.phoneNumbers && user.phoneNumbers.length > 0) {
        setSenderPhone(user.phoneNumbers[0].phoneNumber);
      }
    }
  }, [user]);

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoute = e.target.value;
    setRoute(selectedRoute);
    setTowns(caminoRoutes[selectedRoute] || []);
    // Reset the from and to towns when the route changes
    setSendFromTown("");
    setSendToTown("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBagImage(e.target.files[0]);
    }
  };

  const handlePurchase = () => {
    if (!bagImage) {
      alert("Please upload an image of your bag before proceeding.");
      return;
    }
    // Add your Stripe integration logic here.
    console.log("Proceeding to purchase with bag image:", bagImage);
    window.location.href = "/stripe-checkout"; // Replace with your actual Stripe redirect.
  };

  // Compute cost based on selected towns, courier and number of bags.
  let stageCount = 0;
  if (sendFromTown && sendToTown) {
    const fromIndex = towns.indexOf(sendFromTown);
    const toIndex = towns.indexOf(sendToTown);
    stageCount = Math.abs(fromIndex - toIndex);
  }
  const costPerStage = courier === "Joe Bloggs" ? 7 : 0;
  const totalCost = stageCount * costPerStage * numBags;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-black"
      style={{
        backgroundImage: "url('/baggage/1.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto p-10 max-w-[1400px] bg-white shadow-lg rounded-lg bg-opacity-80">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Arrange Bag Collection
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Select Courier
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
            >
              <option value="">-- Select Courier --</option>
              {couriers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Select Camino Route
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              value={route}
              onChange={handleRouteChange}
            >
              <option value="">-- Select Route --</option>
              {Object.keys(caminoRoutes).map((routeName) => (
                <option key={routeName} value={routeName}>
                  {routeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Town Selection */}
        {route && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-lg font-semibold mb-2">
                Send From (Town)
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                value={sendFromTown}
                onChange={(e) => setSendFromTown(e.target.value)}
              >
                <option value="">-- Select Town --</option>
                {towns.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">
                Send To (Town)
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                value={sendToTown}
                onChange={(e) => setSendToTown(e.target.value)}
              >
                <option value="">-- Select Town --</option>
                {towns.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Number of Bags Selection */}
        {route && (
          <div className="mt-6">
            <label className="block text-lg font-semibold mb-2">
              Number of Bags
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              value={numBags}
              onChange={(e) => setNumBags(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Cost Display */}
        {sendFromTown && sendToTown && (
          <div className="mt-4">
            <label className="block text-lg font-semibold mb-2">
              Total Cost (Euro)
            </label>
            <input
              type="text"
              readOnly
              value={`€ ${totalCost}`}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
          {[
            { label: "FROM - Name of Accommodation", max: 20 },
            { label: "FROM - Sending Address", max: 30 },
            { label: "TO - Receiving Name Accommodation", max: 20 },
            { label: "TO - Receiving Address", max: 30 },
          ].map(({ label, max }) => (
            <div key={label}>
              <label className="block text-lg font-semibold mb-2">
                {label}
              </label>
              <input
                type="text"
                maxLength={max}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        {/* Sender Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Name of Sender
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Email Address of Sender
            </label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Upload Bag Image */}
        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">
            Upload Picture of Bag
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Country Code
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryCodes.map(({ code, country }) => (
                <option key={code} value={code}>
                  {country} ({code})
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-lg font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              maxLength={15}
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <button
          onClick={handlePurchase}
          className="w-full bg-green-600 text-white p-4 rounded-lg text-2xl font-bold hover:bg-green-700 transition mt-8 shadow-lg"
        >
          Purchase Now
        </button>
      </div>
    </div>
  );
}
