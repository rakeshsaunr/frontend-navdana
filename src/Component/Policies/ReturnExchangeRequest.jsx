import React, { useState, useEffect } from "react";

const StarIcon = () => (
  <span className="text-[#b48a78] text-2xl">✦</span>
);

const ReturnExchangeRequest = () => {
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
      {/* Decorative divider */}
      <div className="text-center mb-8">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <StarIcon />
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>

      <h1 className="text-center mb-6 text-4xl md:text-5xl font-semibold text-[#2c1810] tracking-widest uppercase">
        Return & Exchange Policy
      </h1>
      <h2 className="text-center font-normal text-xl md:text-2xl text-[#b48a78] mb-8 italic">
        Hassle-free returns and exchanges for your peace of mind
      </h2>

      {/* Remove card format: no bg, shadow, rounded, or p-8 */}
      <section className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-[#8b5a3c] tracking-wide">
          Our Promise
        </h3>
        <p className="mb-4 text-gray-700">
          We want you to love your purchase! If something isn’t right, our return and exchange process is simple and transparent.
        </p>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-3 text-[#b48a78]">Key Points</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
          <li>
            <span className="font-medium">Returns & exchanges</span> accepted within <span className="text-[#8b5a3c] font-semibold">7 days</span> of delivery (except Luxe Collection).
          </li>
          <li>
            Refunds are issued as <span className="font-medium">store credit</span> valid for 1 year.<br />
            <span className="text-xs text-gray-500">
              Note: Store credit cannot be combined with other discount codes or offers.
            </span>
          </li>
          <li>
            Only <span className="font-medium">one return/exchange</span> per order is allowed.
          </li>
          <li>
            <span className="font-medium">Reverse pickup & logistics charges</span> of <span className="text-[#8b5a3c] font-semibold">₹150</span> are borne by the customer.
          </li>
          <li>
            For exchanges, you may select a different size or product. If the new product is costlier, pay the difference; if it’s less, the balance is credited as store credit.
          </li>
          <li>
            If your requested exchange size is unavailable, store credit will be issued.
          </li>
          <li>
            Partial returns from deals (e.g., Buy 3@₹1299, return 1) will be recalculated as per the new deal (e.g., Buy 2@₹1299).
          </li>
          <li>
            <span className="font-medium">No returns/exchanges</span> on special offers (deals, festive sales, BOGO) or Luxe Collection.
          </li>
          <li>
            <span className="font-medium">Customized products</span> are not eligible for return or exchange.
          </li>
          <li>
            <span className="font-medium">Prepaid orders</span> can be cancelled within 24 hours only. Refunds are processed after deducting payment gateway charges.
          </li>
          <li>
            If damage or stains are due to customer misuse, returns are not accepted. Store credit (minus logistics charges) may be issued at our discretion.
          </li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-3 text-[#b48a78]">Eligibility Checklist</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
          <li>
            Product must be unused, undamaged, and in original packaging with tags and invoice.
          </li>
          <li>
            Take a photo of the product at the time of reverse pickup. Wrong product returns will not be accepted.
          </li>
          <li>
            All returns go through a quality check (QC) process.
          </li>
          <li>
            Processing takes 1-2 working days after receiving the product.
          </li>
          <li>
            <span className="font-medium">To initiate a return/exchange:</span> Visit{" "}
            <a
              href="https://taperaro.com/apps/return_online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b5a3c] underline hover:text-[#b48a78]"
            >
              this link
            </a>{" "}
            (effective 1st October 2023).<br />
            <span className="text-xs text-gray-500">
              *Return pickup is processed after credit approval.
            </span>
          </li>
        </ul>
      </section>

      {/* Decorative divider */}
      <div className="text-center mt-12">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <StarIcon />
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>
    </div>
  );
};

export default ReturnExchangeRequest;
