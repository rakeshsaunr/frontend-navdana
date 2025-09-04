import React, { useState, useEffect } from "react";

const CancelPolicy = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div
      className={`min-h-screen w-full py-12 px-4 transition-all duration-700 ease-in-out ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        fontFamily: "Georgia, serif",
        background: "linear-gradient(135deg, #faf7f4 0%, #f5f1eb 100%)",
      }}
    >
      <h1 className="text-center mb-6 text-4xl md:text-5xl font-semibold text-[#2c1810] tracking-widest">
        Cancellation Policy
      </h1>
      <div className="text-center text-sm text-gray-500 mb-8">
        <em>Last updated: August 29, 2025</em>
      </div>

      <div className="max-w-3xl mx-auto text-[#2c1810]">
        <ol className="list-decimal ml-7 space-y-7 text-base md:text-lg">
          <li>
            <span className="font-bold text-[#8b5a3c]">Customer Cancellations</span>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Can cancel within 24 hours of placing an order.</li>
              <li>Prepaid refunds processed within 10–15 business days.</li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-[#8b5a3c]">NAVDANA Cancellations</span>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>May occur due to stock, payment, or pricing errors.</li>
              <li>Refunds issued within 10–15 business days.</li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-[#8b5a3c]">Non-Cancellable Orders</span>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Once dispatched, orders cannot be cancelled.</li>
              <li>Sale items are non-cancellable.</li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-[#8b5a3c]">Contact Us</span>
            <div className="ml-1 mt-2 text-gray-700">
              Email:{" "}
              <a
                href="mailto:support@navdana.in"
                className="text-[#b48a78] underline hover:text-[#8b5a3c]"
              >
                support@navdana.in
              </a>
              {" "} | {" "}
              Phone:{" "}
              <a
                href="tel:+919311120477"
                className="text-[#b48a78] underline hover:text-[#8b5a3c]"
              >
                +91-9311120477
              </a>
            </div>
          </li>
        </ol>
      </div>

      {/* Decorative elements */}
      <div className="text-center mt-12">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <span className="text-[#b48a78] text-2xl">✦</span>
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>
    </div>
  );
};

export default CancelPolicy;
