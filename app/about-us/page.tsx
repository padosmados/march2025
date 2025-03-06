"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const galleryImages = [
  "/aboutus/aboutus1.jpg",
  "/aboutus/aboutus2.jpg",
  "/aboutus/aboutus3.jpg",
  "/aboutus/aboutus4.jpg",
  "/aboutus/aboutus5.jpg",
  "/aboutus/aboutus6.jpg",
  "/aboutus/aboutus7.jpg",
  "/aboutus/aboutus8.jpg",
  "/aboutus/aboutus9.jpg",
  "/aboutus/aboutus10.jpg",
  "/aboutus/aboutus11.jpg",
  "/aboutus/aboutus12.jpg",
  "/aboutus/aboutus14.jpg",
  "/aboutus/aboutus15.jpg",
];

// Function to shuffle the images randomly
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    setShuffledImages(shuffleArray([...galleryImages])); // Shuffle on mount
  }, []);

  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % 4); // Change background every 5 seconds
    }, 5000);

    return () => clearInterval(imageChangeInterval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [shuffledImages]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-black"
      style={{
        backgroundImage: `url('/aboutus/background/${bgImageIndex + 1}.jpg')`, // Dynamically update background
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto p-10 max-w-6xl text-left space-y-8">
        {/* Text content remains unchanged */}
        <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-md">
          <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">
            About Us<br /><br />
          </h1>
          <p className="text-xl text-gray-800 mb-4">
            At Camino Tiger, we are pilgrims first and foremost. Having walked the full Camino many times, we understand the joys and challenges of the journey. Year after year, we faced the same struggles as every other pilgrim. That’s why we created Camino Tiger, a website and mobile app designed to make your pilgrimage smoother, easier, and stress-free.<br /><br />
          </p>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-gray-800">Why Choose Camino Tiger?</h2><br />
          <ul className="list-disc list-inside space-y-3 text-xl text-gray-800">
            <li>We aim to re-invest profits back into the Camino – No other booking site does this.  This will ensure a better experience for future generations.</li><br />
            <li>Low-Cost Accommodation – Affordable options tailored to the pilgrim experience.</li><br />
            <li>Photo Galleries – View properties before you book to find the perfect place to stay.</li><br />
            <li>Full Amenities List – Choose the best fit for your needs.</li><br />
            <li>Real-Time Availability – Instantly see what’s open, so you don’t have to call multiple places.</li><br />
            <li>Verified Reviews – Make confident choices based on fellow pilgrims’ experiences.</li><br />
          </ul>
          <p className="text-xl text-gray-800 mt-6">
            With Camino Tiger, you can focus on what truly matters on your journey. Walk at your own pace, take in the breathtaking scenery, reflect, and connect with fellow travellers. No more racing for a bed after a long day of walking, only to find every place fully booked.<br /><br />
          </p>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-gray-800">Supporting Pilgrims & Albergue Owners</h2><br /><br />
          <p className="text-xl text-gray-800 mb-6">
            Our platform not only benefits pilgrims but also helps albergue owners by providing them with a clearer idea of how many guests to expect. This allows them to plan meals, manage capacity, and offer a smoother experience for everyone.
          </p>
          <p className="text-xl text-gray-800">
            At Camino Tiger, we are committed to enhancing the Camino experience—not just for today’s pilgrims, but for generations to come. By reinvesting in the Camino, we strive to preserve its beauty and spirit for years ahead.
          </p>
          <div className="flex flex-col items-center text-center">
            <p className="font-bold text-3xl text-gray-800 mt-6">
              Your journey is personal. Let Camino Tiger take care of the details, so you can fully embrace the path ahead. <em>Buen Camino!</em>
            </p>
          </div>
        </div>

        {/* Responsive Auto-Changing Gallery */}
        <div className="relative mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl aspect-square rounded-lg overflow-hidden shadow-lg border-4 border-black">
          {shuffledImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`About Us ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
