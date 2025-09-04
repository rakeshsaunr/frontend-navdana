import React, { useState, useEffect } from "react";

const terms = [
  {
    title: "Definitions",
    content: [
      "“NAVDANA,” “we,” “us,” or “our” refers to NAVDANA Pvt. Ltd., with its registered office at [Insert Address].",
      "“You,” “your,” “Customer,” or “User” refers to any person accessing or using the website or purchasing products from us.",
    ],
    type: "list",
  },
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using our website and/or placing an order, you agree to be bound by these Terms & Conditions, our Privacy Policy, Returns & Exchanges Policy, Shipping Policy, and any other posted policies.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify, update, or replace these terms at any time without prior notice.",
  },
  {
    title: "Use of Content",
    content:
      "All content on our website is owned by or licensed to NAVDANA.",
  },
  {
    title: "Product Information & Availability",
    content:
      "We make reasonable efforts to showcase accurate product details. Availability may change without notice.",
  },
  {
    title: "Ordering, Payments & Pricing",
    content: [
      "Prices are in INR and include applicable taxes.",
      "Accepted methods: credit/debit cards, UPI, net banking, COD.",
      "We may cancel orders due to pricing errors or stock issues.",
    ],
    type: "list",
  },
  {
    title: "Cancellations, Refunds, Returns & Exchanges",
    content: [
      "Customers can cancel within 24 hours of placing an order.",
      "Refunds for cancellations by NAVDANA will be processed within 10–15 business days.",
      "Exchanges are permitted within 7 days for size or quality issues with tags intact.",
    ],
    type: "list",
  },
  {
    title: "Shipment & Delivery",
    content:
      "Orders are shipped via trusted couriers. NAVDANA is not liable for delays beyond its control.",
  },
  {
    title: "Disclaimer of Warranties & Limitation of Liability",
    content:
      'Our website and services are provided "as is."',
  },
  {
    title: "Intellectual Property",
    content:
      "All trademarks and logos are NAVDANA's property.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms are governed by Indian laws. Disputes fall under [City] jurisdiction.",
  },
  {
    title: "Contact Us",
    content: (
      <>
        Email:{" "}
        <a
          href="mailto:support@navdana.com"
          className="text-[#b48a78] underline hover:text-[#8b5a3c]"
        >
          support@navdana.com
        </a>{" "}
        | Phone:{" "}
        <a
          href="tel:+919311120477"
          className="text-[#b48a78] underline hover:text-[#8b5a3c]"
        >
          +91-9311120477
        </a>
      </>
    ),
  },
];

const TermsConditions = () => {
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
      <div className="text-sm text-gray-500 mb-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="hover:underline" style={{ textDecoration: "none" }}>
          Home
        </span>{" "}
        / <span className="text-gray-700 font-medium">Terms &amp; Conditions</span>
      </div>
      <h1 className="text-center mb-6 text-4xl md:text-5xl font-semibold text-[#2c1810] tracking-widest">
        Terms &amp; Conditions
      </h1>
      <div className="text-center text-sm text-gray-500 mb-8">
        <em>Last updated: August 29, 2025</em>
      </div>
      <div className="max-w-3xl mx-auto">
        {terms.map((term, idx) => (
          <div
            key={idx}
            className="mb-8 bg-white/80 rounded-xl shadow p-6 transition-transform duration-300 hover:scale-[1.01]"
          >
            <div className="flex items-center mb-3">
              <span className="text-[#b48a78] text-2xl mr-2">{idx + 1}.</span>
              <h2 className="text-lg font-bold text-[#8b5a3c]">{term.title}</h2>
            </div>
            <div className="ml-7 text-gray-700 text-base">
              {term.type === "list" ? (
                <ul className="list-disc ml-5 space-y-1">
                  {term.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{term.content}</p>
              )}
            </div>
          </div>
        ))}
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

export default TermsConditions;
