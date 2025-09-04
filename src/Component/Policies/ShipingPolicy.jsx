import { useState, useEffect } from 'react';

const StarIcon = () => (
  <span className="text-[#b48a78] text-xl">✦</span>
);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleCopy = async (e, textToCopy) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedLink(textToCopy);
      setTimeout(() => setCopiedLink(null), 1000);
    } catch (err) {
      // fallback
      document.execCommand('copy');
    }
  };

  return (
    <div
      className={`min-h-screen w-full py-12 px-4 transition-all duration-700 ease-in-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        fontFamily: 'Georgia, serif',
        background: 'linear-gradient(135deg, #faf7f4 0%, #f5f1eb 100%)',
      }}
    >
      <h1 className="text-center mb-6 text-4xl md:text-5xl font-semibold text-[#2c1810] tracking-widest">
        NAVDANA
      </h1>
      <h2 className="text-center font-normal text-2xl md:text-3xl text-[#b48a78] mb-2 italic">
        Shipping & Returns Policy
      </h2>
      <div className="text-center text-sm text-[#8b5a3c] italic mb-8">
        Last updated: August 29, 2025
      </div>

      {/* Decorative divider */}
      <div className="text-center my-8 flex items-center justify-center">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <StarIcon />
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <h3 className="text-xl font-bold text-[#b48a78] mb-3 flex items-center gap-2">
            <span role="img" aria-label="Shipping">📦</span> Shipping
          </h3>
          <ul className="list-disc ml-7 text-gray-700 space-y-1 text-lg">
            <li>
              Orders processed within <span className="text-[#8b5a3c] font-semibold">2–4 days</span>
            </li>
            <li>
              Delivered in <span className="text-[#8b5a3c] font-semibold">10–15 working days</span>
            </li>
            <li>
              Tracking details shared once dispatched
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-[#b48a78] mb-3 flex items-center gap-2">
            <span role="img" aria-label="Shipping Charges">💰</span> Shipping Charges
          </h3>
          <ul className="list-disc ml-7 text-gray-700 space-y-1 text-lg">
            <li>Calculated at checkout</li>
            <li>
              <span className="text-[#8b5a3c] font-semibold">Free shipping</span> on promotions/minimum order value
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-[#b48a78] mb-3 flex items-center gap-2">
            <span role="img" aria-label="Returns">🔄</span> Returns & Exchanges
          </h3>
          <ul className="list-disc ml-7 text-gray-700 space-y-1 text-lg">
            <li>
              Accepted within <span className="text-[#8b5a3c] font-semibold">7 days</span> if unused, unwashed, tags intact
            </li>
            <li>
              <span className="text-[#8b5a3c] font-semibold">Non-returnable:</span> Sale items, customized items, accessories, intimate wear
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-[#b48a78] mb-3 flex items-center gap-2">
            <span role="img" aria-label="Refunds">💳</span> Refunds
          </h3>
          <ul className="list-disc ml-7 text-gray-700 space-y-1 text-lg">
            <li>
              Refunds for NAVDANA cancellations processed within <span className="text-[#8b5a3c] font-semibold">10–15 business days</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-[#b48a78] mb-3 flex items-center gap-2">
            <span role="img" aria-label="Delays">⚠️</span> Delays & Liability
          </h3>
          <ul className="list-disc ml-7 text-gray-700 space-y-1 text-lg">
            <li>NAVDANA is not liable for delays beyond its control</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-[#b48a78] mb-3 flex items-center gap-2">
            <span role="img" aria-label="Contact">📞</span> Contact Us
          </h3>
          <div className="ml-7 text-gray-700 text-lg">
            <div className="mb-2">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:support@navdana.com"
                className={`underline transition-all duration-300 hover:text-[#8b5a3c] ${copiedLink === 'support@navdana.com' ? 'text-green-600' : 'text-[#b48a78]'}`}
                onClick={(e) => handleCopy(e, 'support@navdana.com')}
              >
                support@navdana.com
              </a>
              {copiedLink === 'support@navdana.com' && (
                <span className="ml-2 text-green-600 text-sm">Copied!</span>
              )}
            </div>
            <div>
              <strong>Phone:</strong>{' '}
              <a
                href="tel:+919311120477"
                className="underline transition-all duration-300 hover:text-[#8b5a3c] text-[#b48a78]"
              >
                91-9311120477
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Decorative divider */}
      <div className="text-center mt-12">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <StarIcon />
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a3c] mx-2"></div>
      </div>
    </div>
  );
}
