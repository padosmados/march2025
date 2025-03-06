'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function OurMission() {
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % 4); // Change background every 5 seconds
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-black"
      style={{
        backgroundImage: `url('/ourmission/${bgImageIndex + 1}.jpg')`, // Dynamically update background
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto p-10 max-w-6xl text-left space-y-8">
        {/* Text content inside white semi-transparent box */}
        <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-md">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">
            Our Mission
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
            <p className="text-xl text-gray-800 pt-6">
              At Camino Tiger, our dedicated team is committed to enhancing the Camino experience by making accommodations more accessible and easier to find. <br /><br />
              We aim to provide a seamless experience for both travelers and accommodation owners by offering a more convenient and affordable booking solution.<br /><br />
            </p>
            <Image
              src="/aboutus1.jpg"
              width={300}
              height={400}
              alt="Pilgrims walking"
              className="rounded-lg shadow-md ml-8"
            />
          </div>

          <h2 className="text-3xl font-extrabold mt-6 mb-4 text-gray-800">Giving Back to the Camino</h2><br /><br />
          <ul className="list-disc list-inside space-y-3 text-xl text-gray-800">
            <li>Church Renovations – Helping restore and maintain historic churches along the Camino.</li><br />
            <li>Defibrillator Installations – Placing life-saving medical equipment along various routes.</li><br />
            <li>Resting Spots – Installing benches where they’re needed most, so pilgrims can rest when they need it.</li><br />
            <li>Pathway Maintenance – Improving dangerous or difficult sections of the Camino for a safer journey.</li><br />
            <li>Local Job Support – Hiring locals to carry out essential maintenance and improvements.</li><br /><br />
          </ul>

          <p className="text-xl text-gray-800">
            Our goal is not just to make the Camino more affordable but to ensure it remains a welcoming and well-maintained pilgrimage for years to come. <br /><br />
            With Camino Tiger, you can focus on what truly matters—walking at your own pace, soaking in the breathtaking scenery, and embracing the journey.<br /><br />
          </p>

          <p className="text-xl text-gray-800">
            At Camino Tiger, we are committed to preserving the spirit of the Camino while making it more accessible for all. Every booking contributes to the community, creating a positive impact that extends beyond just finding a place to stay.<br /><br /><br />
          </p>

          <div className="flex flex-col items-center text-center">
            <p className="text-2xl text-gray-800">
              Your journey is personal. Let Camino Tiger take care of the details, so you can fully embrace the path ahead. <em>Buen Camino!</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
