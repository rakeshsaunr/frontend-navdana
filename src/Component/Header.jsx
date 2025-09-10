import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Menu, Search, ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cart } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://navdana.com/api/v1/category");
        if (Array.isArray(response.data.categories)) {
          const activeCategories = response.data.categories.filter(
            (cat) => cat.isActive && cat.name !== "All Products"
          );
          const finalCategories = [{ _id: "all-products", name: "All Products" }, ...activeCategories];
          setCategories(finalCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const handleCategoryClick = (category) => {
    if (category._id === "all-products") {
      navigate("/all-products");
    } else {
      navigate(`/collection-pages/${category._id}`);
    }
  };

  const openLoginPopup = () => setShowEmailPopup(true);

  const sendOtp = async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      await axios.post("https://navdana.com/api/v1/user/send-otp", { email });
      setLoading(false);
      setShowEmailPopup(false);
      setShowOtpPopup(true);
    } catch {
      setLoading(false);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "https://navdana.com/api/v1/user/verify",
        { email, otp, token: token || null },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );
      setLoading(false);

      const { user: loggedInUser, token: authToken } = res.data;
      setUser(loggedInUser);
      setToken(authToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", authToken);
      setShowOtpPopup(false);
    } catch {
      setLoading(false);
      alert("Invalid OTP, try again");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/')
    setDropdownOpen(false);
  };

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      {/* Top strip */}
      <div className="text-center h-12 bg-black">
        <h1 className="text-white text-xl font-medium">Welcome to Your Navdana</h1>
      </div>

      <div className="max-w-7xl mx-auto px-1 py-2 flex justify-between items-center text-black">
        {/* Logo */}
        <div className="flex items-center space-x-2 justify-start">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto mb-5 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 font-medium">
          {categories.map((item) => (
            <button
              key={item._id || item.name}
              className="transition text-black hover:text-gray-500"
              onClick={() => handleCategoryClick(item)}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-6 relative">
          {/* Search */}
          <button onClick={() => navigate("/coming-soon")}>
            <Search className="w-6 h-6 cursor-pointer" color="#000" strokeWidth={2.5} />
          </button>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart className="w-6 h-6" color="#000" strokeWidth={2.5} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {/* User / Login */}
          {!user ? (
            <button onClick={openLoginPopup}>
              <User className="w-6 h-6 cursor-pointer" color="#000" strokeWidth={2.5} />
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <User className="w-6 h-6 cursor-pointer" color="#000" strokeWidth={2.5} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-auto min-w-[12rem] max-w-xs bg-white rounded-2xl shadow-lg border z-50 animate-fadeIn">
                  {/* User Email */}
                  <div className="px-4 py-3 border-b text-sm font-medium text-gray-800 break-words whitespace-normal">
                    {user.email}
                  </div>

                  {/* If Admin → Dashboard Option */}
                  {user.role === "admin" && (
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition rounded-b-2xl"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" color="#000" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          {categories.map((item) => (
            <button
              key={item._id || item.name}
              className="block font-medium text-black hover:text-gray-500 transition"
              onClick={() => handleCategoryClick(item)}
            >
              {item.name}
            </button>
          ))}
        </nav>
      )}

      {/* Email popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Enter Your Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowEmailPopup(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={sendOtp} className="px-4 py-2 bg-black text-white rounded">
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowOtpPopup(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={verifyOtp} className="px-4 py-2 bg-black text-white rounded">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
