'use client';

import { useState, useEffect } from "react";

export default function Information() {
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
        backgroundImage: `url('/info/${bgImageIndex + 1}.jpg')`, // Dynamically update background from /info
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto p-10 max-w-5xl text-left space-y-8">
        {/* Text content inside a white semi-transparent box */}
        <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-md">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">
            Information
          </h1>

          <p className="text-xl text-gray-800">
            <strong>Best Time to Go?</strong><br /><br />
            Anytime! It all comes down to personal preference:<br /><br />
            • Spring, Summer, and Autumn: The best weather and more pilgrims to meet.<br /><br />
            • Winter: Offers solitude, but be prepared for snow in northern Spain and fewer accommodations open.<br /><br />
            Walking long distances is easier in cooler weather, but summer brings lively festivals and nightlife in the towns and cities along the way.<br /><br />
          </p>

          <p className="text-xl text-gray-800">
            One of the biggest concerns for pilgrims is finding a place to stay. With Camino Tiger, you no longer have to worry. Our platform allows you to book accommodations in advance, ensuring you have a bed waiting for you at the end of each day. <br /> <br />
          </p>

          <h2 className="text-3xl font-extrabold mt-6 mb-4 text-gray-800">Why Choose Camino Tiger?</h2>
          <ul className="list-disc list-inside space-y-3 text-xl text-gray-800">
            <li>Low-Cost Accommodation – Affordable options tailored to the pilgrim experience.</li>
            <li>Photo Galleries – View properties before you book to find the perfect place to stay.</li>
            <li>Full Amenities List – Choose the best fit for your needs.</li>
            <li>Real-Time Availability – Instantly see what’s open, so you don’t have to call multiple places.</li>
            <li>Verified Reviews – Make confident choices based on fellow pilgrims’ experiences.</li><br /><br />
          </ul>

          <p className="text-xl text-gray-800">
            With Camino Tiger, you can focus on what truly matters on your journey. Walk at your own pace, take in the breathtaking scenery, reflect, and connect with fellow travelers. No more racing for a bed after a long day of walking, only to find every place fully booked.<br /><br />
          </p>

          <h2 className="text-3xl font-extrabold mt-6 mb-4 text-gray-800">Supporting Pilgrims & Albergue Owners</h2>

          <p className="text-xl text-gray-800">
            Our platform not only benefits pilgrims but also helps albergue owners by providing them with a clearer idea of how many guests to expect. This allows them to plan meals, manage capacity, and offer a smoother experience for everyone.<br /><br />
          </p>

          <p className="text-xl text-gray-800">
            At Camino Tiger, we are committed to enhancing the Camino experience—not just for today’s pilgrims, but for generations to come. By reinvesting in the Camino, we strive to preserve its beauty and spirit for years ahead.<br /><br /><br />
          </p>

          <p className="font-extrabold text-2xl text-gray-800 text-center">
            Your journey is personal. Let Camino Tiger take care of the details, so you can fully embrace the path ahead. <em>Buen Camino!</em>
          </p>
        </div>
      </div>
    </div>
  );
}
