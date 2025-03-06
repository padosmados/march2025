'use client';

import React, { useState, useEffect } from 'react';

const AdvisePage = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % 4); // Change background every 5 seconds
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: `url('/advise/${bgImageIndex + 1}.jpg')`, // Dynamically update background from /advise
        backgroundAttachment: "fixed",  // Keep the background fixed when scrolling
        backgroundSize: "cover",  // Ensures the image covers the full screen
        backgroundPosition: "center", // Keeps the image centered
        backgroundRepeat: "no-repeat", // Prevents repeating the image
      }}
    >
      {/* Transparent White Box */}
      <div className="bg-white bg-opacity-80 p-6 md:p-12 max-w-3xl rounded-lg shadow-lg text-gray-900 text-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Advice for Pilgrims</h1><br /><br />
        <ul className="list-disc list-inside space-y-2">
          <li>Don’t overthink it - if you have the time and the desire, just go! You will never regret it.</li><br />
          <li>Listen to your instincts - if you love a village, stay there, even if you haven’t reached your planned daily distance. You can make up the distance for it, another day.</li><br />
          <li>Walk your own Camino - don’t let others dictate your pace or where you stay.  Trust me, you will regret not making your own choices when your home.</li><br />
          <li>If your body is saying no, it means no.  Dont risk getting injured due to others or to stay with your group.</li><br />
          <li>Don’t be afraid to walk alone - if your group has other plans, go at your own pace. You’ll meet new people.  Sometimes, its easier to meet new people when your alone.</li><br />
          <li>Some days are harder than others - the Camino isn’t easy, but that’s part of the journey.</li><br />
          <li>Talk to everyone you meet - one conversation could change your life.  If you let them pass, you will never know.</li><br />
          <li>Fitness isn’t everything - walk at your own pace, and your body will adjust after a few days.</li><br />
          <li>Turn around whilst walking, to see what you have achieved! Camino is about Life, make most of your journey as the people, places and feelings will never leave you.</li><br />
          <li>Stay aware of your belongings - while theft is rare, don’t leave your bag unattended.</li><br />
          <li>If you want to send your bag or take taxi, do it! Its your Camino, you do it your way.</li><br />
        </ul>               
      </div>
    </div>
  );
};

export default AdvisePage;
