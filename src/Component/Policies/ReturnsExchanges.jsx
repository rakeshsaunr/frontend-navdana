import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StarIcon = () => (
  <span className="text-[#b48a78] text-xl">✦</span>
);

export default function App() {
  const [formData, setFormData] = useState({ orderNumber: "", contactInfo: "" });
  const [showModal, setShowModal] = useState({ visible: false, message: "" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setShowModal({ visible: true, message: "Searching for your order..." });
    setFormData({ orderNumber: "", contactInfo: "" });
    setTimeout(() => {
      setShowModal({ visible: false, message: "" });
    }, 3000);
  };

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
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="hover:underline" style={{ textDecoration: "none" }}>Home</Link> / <span className="text-gray-700 font-medium">Returns & Exchanges</span>
      </div>

      <h1 className="text-center mb-6 text-4xl md:text-5xl font-semibold text-[#2c1810] tracking-widest">
        Returns & Exchanges
      </h1>
      <h2 className="text-center font-normal text-xl md:text-2xl text-[#b48a78] mb-8 italic">
        Find your order to start a return or exchange
      </h2>

      {/* Decorative divider */}
      <div className="text-center my-8 flex items-center justify-center">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <StarIcon />
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Removed card format: no bg, shadow, rounded, or p-8 */}
        <p className="text-center text-gray-700 mb-4">
          Please enter your <span className="text-[#b48a78] font-medium">Order Number</span> and <span className="text-[#b48a78] font-medium">Email or Phone</span> used at purchase.<br />
          We'll help you find your order and start the return or exchange process.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          <div>
            <input
              type="text"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#b48a78] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b48a78] bg-[#faf7f4] placeholder-gray-400 transition"
              placeholder="Order Number"
            />
          </div>
          <div>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#b48a78] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b48a78] bg-[#faf7f4] placeholder-gray-400 transition"
              placeholder="Email or Phone"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#b48a78] text-white py-3 px-6 rounded-md hover:bg-[#8b5a3c] transition-colors duration-200 font-medium tracking-wide uppercase shadow"
          >
            Find your order
          </button>
        </form>
      </div>

      {/* Decorative divider */}
      <div className="text-center mt-12">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <StarIcon />
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>

      {/* Dynamic Modal for feedback */}
      {showModal.visible && (
        <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 ease-out animate-fade-in-up">
          <div className="bg-[#b48a78] text-white text-sm px-6 py-3 rounded-lg shadow-xl flex items-center space-x-2">
            <span>{showModal.message}</span>
            <button onClick={() => setShowModal({ visible: false, message: "" })} className="text-gray-200 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
