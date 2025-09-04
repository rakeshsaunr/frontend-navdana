import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, Search, User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "/Images/LOGO.PNG";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://myapp.loca.lt/api/v1/category"
        );
        // API se categories ka naam nikal ke set kar rahe hain
        const categoryNames = response.data.categories.map((cat) => cat.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleComingSoon = () => {
    navigate("/coming-soon");
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      {/* Top strip */}
      <div className="text-center h-12 bg-black">
        <h1 className="text-white text-xl font-medium">
          Welcome to Your Navdana
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-1 py-2 flex justify-between items-center text-black">
        {/* Logo */}
        <div className="flex items-center space-x-2 justify-start">
          <img
            src={logo}
            alt="Logo"
            className="h-35 w-35 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex gap-6 font-medium">
          {categories.map((item, index) => (
            <button
              key={index}
              className="transition text-black hover:text-gray-500"
              onClick={handleComingSoon}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-6 relative">
          <button onClick={handleComingSoon}>
            <Search className="w-6 h-6 cursor-pointer" color="#000" strokeWidth={2.5} />
          </button>
          <button onClick={handleComingSoon}>
            <User className="w-6 h-6 cursor-pointer" color="#000" strokeWidth={2.5} />
          </button>
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-6" color="#000" strokeWidth={2.5} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" color="#000" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          {categories.map((item, index) => (
            <button
              key={index}
              className="block font-medium text-black hover:text-gray-500 transition"
              onClick={handleComingSoon}
            >
              {item}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
