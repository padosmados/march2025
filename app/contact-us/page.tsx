"use client";

import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    dialingCode: "",
    phoneNumber: "",
    userType: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: false, error: "" });

  // List of countries with their dialing codes
  const countryDialingCodes = [
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Australia", code: "+61" },
    { name: "Canada", code: "+1" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
    { name: "Spain", code: "+34" },
    { name: "Portugal", code: "+351" },
    { name: "Italy", code: "+39" },
    { name: "Netherlands", code: "+31" },
    { name: "Switzerland", code: "+41" },
    { name: "Ireland", code: "+353" },
    { name: "New Zealand", code: "+64" },
    { name: "South Africa", code: "+27" },
    { name: "Brazil", code: "+55" },
    { name: "Argentina", code: "+54" },
    { name: "Mexico", code: "+52" },
    { name: "India", code: "+91" },
    { name: "China", code: "+86" },
    { name: "Japan", code: "+81" },
    { name: "South Korea", code: "+82" },
    { name: "Russia", code: "+7" },
    { name: "United Arab Emirates", code: "+971" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ success: false, error: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      setStatus({ success: true, error: "" });
      setFormData({ firstName: "", surname: "", email: "", dialingCode: "", phoneNumber: "", userType: "", message: "" });
    } catch (err) {
      setStatus({ success: false, error: err instanceof Error ? err.message : 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" 
         style={{ backgroundImage: "url('/contactus/1.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full space-y-4 bg-opacity-80">
        <h2 className="text-2xl font-bold text-center">Contact Us</h2>
        <input type="text" name="firstName" placeholder="Your Name" value={formData.firstName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="surname" placeholder="Your Surname" value={formData.surname} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="dialingCode" value={formData.dialingCode} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Country Dialing Code</option>
          {countryDialingCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}
        </select>
        <input type="text" name="phoneNumber" placeholder="Contact Telephone Number" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="userType" value={formData.userType} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select User Type</option>
          <option value="Host">Host</option>
          <option value="Pilgrim">Pilgrim</option>
        </select>
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
        {status.success && <p className="text-green-600 text-center">Your message has been sent successfully!</p>}
        {status.error && <p className="text-red-600 text-center">{status.error}</p>}
      </form>
    </div>
  );
}
