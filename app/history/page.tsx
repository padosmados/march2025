'use client';

import { useState, useEffect } from "react";

export default function History() {
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % 6); // Change background every 5 seconds
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-black"
      style={{
        backgroundImage: `url('/history/${bgImageIndex + 1}.jpg')`, // Dynamically update background from /history
        backgroundAttachment: "fixed",  // Keep the background fixed when scrolling
        backgroundSize: "cover",  // Ensures the image covers the full screen
        backgroundPosition: "center", // Keeps the image centered
        backgroundRepeat: "no-repeat", // Prevents repeating the image
      }}
    >
      <div className="container mx-auto p-10 max-w-5xl text-left space-y-8">
        {/* Text content inside a white semi-transparent box */}
        <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            The Fascinating History of the Camino de Santiago 
            <br />
            
          </h1>

          <p className="text-lg text-gray-800">
            The Camino de Santiago is more than just a pilgrimage, its a bucket-list adventure that attracts people from all walks of life, whether spiritually inclined or not. But what makes the Camino so compelling for todays travelers? How did this ancient route evolve into one of the worlds most revered destinations?
            <br />
            <br />
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">The Legend of Saint James</h2>
          <p className="text-lg text-gray-800">
            A blend of mystery, legend, and history surrounds the Camino de Santiago. According to tradition, the apostle Saint James&rsquo;s body is buried in the magnificent cathedral of Santiago.  
            The story goes that in the 9th century, a shepherd named Pelayo discovered the saint&rsquo;s remains in a field in Galicia. Upon learning of the discovery, King Alfonso II commissioned a small chapel on the site, which later became the grand cathedral we see today.
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">The Power of Pilgrimage</h2>
          <p className="text-lg text-gray-800">
            The discovery of Saint James&rsquo;s remains wasn&rsquo;t just a religious event&mdash;it was also a political one. The influx of Christian pilgrims strengthened cultural ties and helped defend Christian Europe against the Moors. As thousands flocked to Santiago, a powerful Christian presence emerged, solidifying its place on the European map.
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">The Pre-History of the Camino: From Mysticism to Fisterra</h2>
          <p className="text-lg text-gray-800">
            Long before the discovery of Saint James&rsquo;s tomb, travelers were already following paths to Galicia, believing that the Milky Way itself was a divine guide to sacred lands.  
            Fisterra, known as the &quot;End of the World,&quot; was once believed to be the last point on Earth. Here, ancient pilgrims offered prayers at Ara Solis, a sun altar believed to have mystical power.
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">The Growth of the Camino: From the 11th Century Onwards</h2>
          <p className="text-lg text-gray-800">
            The true golden age of the Camino began in 1078, when the construction of Santiago&rsquo;s Romanesque cathedral began. Pilgrimage routes expanded, with the Camino Frances gaining prominence as new territories were reclaimed from the Moors.
            As the pilgrimage routes grew, monasteries, hospitals, and bridges were built to ensure the safety and well-being of pilgrims, fostering thriving communities along the way.
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">The Pilgrimage Becomes a Way of Life</h2>
          <p className="text-lg text-gray-800">
            By the 12th century, the pilgrimage to Santiago had reached its peak. The Codex Calixtinus, written by Aymeric Picaud, became the first guidebook for pilgrims, illustrating how essential the Camino had become as a route of faith, adventure, and spiritual reflection.  
            Pilgrims from across Europe joined together, seeking divine favor, fulfilling penance, or embarking on a personal quest.
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">A Shift in the Winds: The Decline and Rebirth of the Camino</h2>
          <p className="text-lg text-gray-800">
            Though the Camino flourished during the medieval period, it eventually declined due to religious wars, the Reformation, and shifting politics. However, in the 1980s, Father Elias Vali&ntilde;a led a revival, marking the route and revitalizing the pilgrimage.  
            By 1993, the Camino was declared a UNESCO World Heritage site, and its popularity has continued to rise&mdash;nearly 500,000 pilgrims walked the Camino in 2024 alone.
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">A Timeless Journey</h2>
          <p className="text-lg text-gray-800">
            From a humble path of faith to a worldwide symbol of adventure and connection, the Camino de Santiago remains a timeless journey, calling people from every corner of the globe.  
            Whether you seek spiritual growth, cultural discovery, or simply the experience of walking in the footsteps of countless others&mdash;the Camino awaits. 
            <br />
          </p>
          <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-800">Camino Statistics</h2>
          <p className="text-lg text-gray-800">
            When I first completed my Camino in 2017 there was 301,036 pilgrims receiving their certificates.  2024 there was 499,239 so this is 66% rise in number of pilgrims receiving their Compostela.  Within next 10 years its highly likely to reach 1 million pilgrims.
            <br />


          </p>
        </div>
      </div>
    </div>
  );
}
