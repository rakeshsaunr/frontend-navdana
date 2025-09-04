import { useState, useEffect } from 'react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <div
      className={`min-h-screen w-full py-12 px-4 transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        fontFamily: 'Georgia, serif',
        background: 'linear-gradient(135deg, #faf7f4 0%, #f5f1eb 100%)',
      }}
    >
      <h1 className="text-center mb-6 text-4xl md:text-5xl font-semibold text-[#2c1810] tracking-widest">
        About NAVDANA
      </h1>
      <h2 className="text-center font-normal text-xl md:text-2xl text-[#b48a78] mb-8 italic">
        Celebrating women, one stitch at a time.
      </h2>

      <div className="max-w-3xl mx-auto">
        <p className="text-lg leading-relaxed mb-6 text-gray-700 text-justify transition-transform duration-300 hover:translate-x-1">
          <span className="text-[#8b5a3c] font-medium">NAVDANA</span> is a love letter to the modern Indian woman — rooted in tradition, yet blossoming into something fresh and timeless.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-gray-700 text-justify transition-transform duration-300 hover:translate-x-1">
          Our journey started with a simple thought: why should we choose between heritage and everyday wear? At <span className="text-[#8b5a3c] font-medium">NAVDANA</span>, we bring together sustainably sourced fabrics, especially soft cottons, and reimagine them with prints that carry the essence of India — block prints, delicate motifs, and patterns that have traveled through generations.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-gray-700 text-justify transition-transform duration-300 hover:translate-x-1">
          Each piece is designed to be versatile, so you can wear it while sipping chai on a slow morning, at brunch with friends, or even to a boardroom where you want your presence to feel strong yet effortless. <span className="text-[#8b5a3c] font-medium">NAVDANA</span> is for women who love to blend the old with the new — who see style not just as fashion, but as a reflection of their journey.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-gray-700 text-justify transition-transform duration-300 hover:translate-x-1">
          Every fabric we choose, every print we celebrate, is meant to remind you: our heritage is not something to keep in a box, it's something to live in, every single day.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="text-center mt-12">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <span className="text-[#b48a78] text-2xl">✦</span>
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>
    </div>
  );
}
