'use client';

import { useState, useEffect } from "react";

export default function CaminoPacking() {
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % 4); // Change background every 5 seconds
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: `url('/whattobring/${bgImageIndex + 1}.jpg')`, // Dynamically update background from /whattobring
        backgroundAttachment: "fixed",  // Keep the background fixed when scrolling
        backgroundSize: "cover",  // This will ensure the image takes up the whole page without zooming
        backgroundPosition: "center", // Keeps the image centered
        backgroundRepeat: "no-repeat", // Prevents repeating the background image
      }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Essential Packing List for the Camino de Santiago
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          If you&rsquo;re planning to embark on the <strong>Camino de Santiago</strong>, you&rsquo;ve likely wondered, <em>&quot;What should I take?&quot;</em> 
          Preparing properly is key to making your journey smooth and enjoyable. While packing needs may vary, we&rsquo;ve compiled a 
          <strong> practical list of essentials</strong> to help you get ready for the adventure ahead.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Must-Have Items for the Camino:</h2><br />
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Backpack</strong> (35-45 liter capacity)</li>
          <li><strong>Sleeping bag</strong></li>
          <li><strong>Reusable water bottle</strong></li>
          <li><strong>Hiking boots</strong> (comfortable and well-worn)</li>
          <li><strong>Lightweight walking trousers</strong></li>
          <li><strong>3-4 sets of underwear and socks</strong></li>
          <li><strong>Toiletries</strong> (soap, toothbrush, comb, deodorant, tissues, etc.)</li>
          <li><strong>Towel - Micro fiber </strong> (quick-dry recommended)</li>
          <li><strong>Small first-aid kit</strong> (Betadine, gauze, Vaseline, blister care)</li>
          <li><strong>Identification</strong> (ID card or passport)</li>
          <li><strong>Pilgrim&rsquo;s Credential</strong> (for official Camino stamps)</li>
          <li><strong>Cash and credit card</strong></li>
          <li><strong>Earplugs</strong> (for a restful sleep in shared accommodations)</li>
          <li><strong>Headwear</strong> (hat, cap, visor, or bandana for sun protection)</li>
          <li><strong>Flip-flops</strong> (for showers and relaxing after walking)</li>
          <li><strong>Weight</strong> (remember you have to carry this for month)</li>
          <li><strong>Your enthusiasm and adventurous spirit!</strong></li>
        </ul>

        <p className="text-lg text-gray-700 mt-6">
          There are many opinions on what&rsquo;s essential for the Camino, but <strong>traveling light and smart</strong> is the best approach.
          Pack only what you truly need, and enjoy the journey!
        </p>

        <h2 className="text-2xl font-bold text-center text-green-600 mt-8">&quot;Buen Camino!&quot; 🚶‍♂️🏞️</h2>
      </div>
    </div>
  );
}
