"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function RegisterProperty() {
  const [formData, setFormData] = useState({
    photos: [] as File[],
    firstName: '',
    surname: '',
    email: '',
    caminoRoute: '',
    selectedLocations: '',
    propertyName: '',
    propertyAddress: '',
    landline: '',
    mobile: '',
    whatsapp: 'No',
    stripePayments: 'No',
    comments: '',
  });

  const [status, setStatus] = useState({ success: false, error: "" });

  // Full list of towns and cities for each Camino route
  const caminoRoutes: Record<string, string[]> = {
    'Camino Frances': [
      'Saint-Jean-Pied-de-Port', 'Roncesvalles', 'Zubiri', 'Pamplona', 'Puente la Reina',
      'Estella', 'Los Arcos', 'Logroño', 'Nájera', 'Santo Domingo de la Calzada', 
      'Belorado', 'Burgos', 'Hornillos del Camino', 'Castrojeriz', 'Frómista',
      'Carrión de los Condes', 'Sahagún', 'Mansilla de las Mulas', 'León', 'Hospital de Órbigo',
      'Astorga', 'Rabanal del Camino', 'Ponferrada', 'Villafranca del Bierzo', 
      'O Cebreiro', 'Triacastela', 'Sarria', 'Portomarín', 'Palas de Rei', 
      'Melide', 'Arzúa', 'O Pedrouzo', 'Santiago de Compostela'
    ],
    'Camino Del Norte': [
      'Irun', 'San Sebastian', 'Zarautz', 'Deba', 'Markina-Xemein', 'Gernika',
      'Bilbao', 'Portugalete', 'Castro Urdiales', 'Laredo', 'Santander', 'Santillana del Mar',
      'Comillas', 'Colombres', 'Llanes', 'Ribadesella', 'Villaviciosa', 'Gijón',
      'Avilés', 'Muros de Nalón', 'Luarca', 'Ribadeo', 'Mondoñedo', 'Vilalba',
      'Baamonde', 'Sobrado dos Monxes', 'Arzúa', 'Santiago de Compostela'
    ],
    'Camino Portuguese': [
      'Lisbon', 'Alverca do Ribatejo', 'Azambuja', 'Santarém', 'Golegã',
      'Tomar', 'Alvaiázere', 'Ansiao', 'Rabaçal', 'Coimbra', 'Mealhada',
      'Agueda', 'Albergaria-a-Velha', 'Oliveira de Azeméis', 'Grijó',
      'Porto', 'Vila do Conde', 'Barcelos', 'Ponte de Lima', 'Valença',
      'Tui', 'O Porriño', 'Redondela', 'Pontevedra', 'Caldas de Reis',
      'Padrón', 'Santiago de Compostela'
    ],
    'Camino Ingles': [
      'Ferrol', 'Neda', 'Pontedeume', 'Betanzos', 'Hospital de Bruma',
      'Sigüeiro', 'Santiago de Compostela'
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'caminoRoute') {
      setFormData((prev) => ({
        ...prev,
        caminoRoute: value,
        selectedLocations: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ success: false, error: "" });
    
    // Construct a message field from the registration details.
    const message = `
Property Registration Details:
First Name: ${formData.firstName}
Surname: ${formData.surname}
Email: ${formData.email}
Camino Route: ${formData.caminoRoute}
Selected Town: ${formData.selectedLocations}
Property Name: ${formData.propertyName}
Property Address: ${formData.propertyAddress}
Landline: ${formData.landline}
Mobile: ${formData.mobile}
WhatsApp Available: ${formData.whatsapp}
Stripe Payments Setup: ${formData.stripePayments}
Comments: ${formData.comments}
    `;

    // Build the data object with a subject and message.
    const dataToSend = { ...formData, subject: "Register your property", message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      setStatus({ success: true, error: "" });
      // Reset form data
      setFormData({
        photos: [],
        firstName: '',
        surname: '',
        email: '',
        caminoRoute: '',
        selectedLocations: '',
        propertyName: '',
        propertyAddress: '',
        landline: '',
        mobile: '',
        whatsapp: 'No',
        stripePayments: 'No',
        comments: '',
      });
    } catch (err) {
      setStatus({ success: false, error: err instanceof Error ? err.message : 'An unexpected error occurred.' });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/registerproperty.jpg')",
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-5xl w-full flex flex-row flex-wrap gap-6 mt-[-50px]"
      >
        <h2 className="text-2xl font-bold w-full text-center">Register Your Property</h2>

        <div className="flex-1">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required className="w-full p-2 border rounded mt-2" />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-2 border rounded mt-2" />
          
          {/* Camino Route Selection */}
          <label className="font-semibold mt-2 block">Select Camino Route:</label>
          <select name="caminoRoute" value={formData.caminoRoute} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Camino route</option>
            {Object.keys(caminoRoutes).map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </select>

          {/* Town Selection */}
          {formData.caminoRoute && (
            <>
              <label className="font-semibold mt-2 block">Select Town:</label>
              <select name="selectedLocations" value={formData.selectedLocations} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Town</option>
                {caminoRoutes[formData.caminoRoute].map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="flex-1">
          <input type="text" name="propertyName" placeholder="Name of Property" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="propertyAddress" placeholder="Address of Property" onChange={handleChange} required className="w-full p-2 border rounded mt-2" />
          <input type="text" name="mobile" placeholder="Mobile Phone Number" onChange={handleChange} required className="w-full p-2 border rounded mt-2" />
          
          {/* WhatsApp Section */}
          <label className="flex items-center mt-2">
            <Image src="/whatsapp.png" alt="WhatsApp" width={48} height={48} className="mr-2" />
            <span className="mr-2">WhatsApp Available</span>
            <select name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="border p-2 rounded">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {/* Stripe Card Payments Setup */}
          <label className="flex items-center mt-2">
            <span className="mr-2">Do you have Stripe Card Payments setup?</span>
            <select name="stripePayments" value={formData.stripePayments} onChange={handleChange} className="border p-2 rounded">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <textarea name="comments" placeholder="Comments" onChange={handleChange} className="w-full p-2 border rounded mt-2" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
        {status.success && <p className="text-green-600 text-center">Your property registration has been sent successfully!</p>}
        {status.error && <p className="text-red-600 text-center">{status.error}</p>}
      </form>
    </div>
  );
}
