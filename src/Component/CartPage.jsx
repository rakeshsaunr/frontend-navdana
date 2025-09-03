import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    paymentMethod: "card",
  });
  const [loading, setLoading] = useState(false);

  // --- User authentication states ---
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [showNamePopup, setShowNamePopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // --- Cart handlers ---
  const handleIncrement = (item) => {
    if (item.quantity < (item.stock || 1)) {
      addToCart(item, 1); // ✅ add one more of same variant
    } else {
      alert("No more stock available for this variant!");
    }
  };

  const handleDecrement = (item) => {
    removeFromCart(item._id, item.size, item.color, item.sku);
  };

  const handleRemove = (item) => {
    removeFromCart(item._id, item.size, item.color, item.sku, true);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // --- Checkout flow ---
  const startCheckout = () => {
    if (!user) {
      setShowNamePopup(true);
    } else {
      setShowCheckout(true);
    }
  };

  const nextToEmail = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    setShowNamePopup(false);
    setShowEmailPopup(true);
  };

  const sendOtp = async () => {
    try {
      if (!email.trim()) {
        alert("Please enter your email");
        return;
      }
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/user/send-otp", { email });
      setLoading(false);
      setShowEmailPopup(false);
      setShowOtpPopup(true);
    } catch (err) {
      setLoading(false);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      if (!otp.trim()) {
        alert("Please enter OTP");
        return;
      }
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/user/verify",
        { name, email, otp, token: token || null },
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
      setShowCheckout(true);
    } catch (err) {
      setLoading(false);
      alert("Invalid OTP, try again");
    }
  };

  const handleCheckout = async () => {
    const { fullName, address, city, postalCode, country, paymentMethod } = shippingInfo;
    if (!fullName || !address || !city || !postalCode || !country || !paymentMethod) {
      alert("Please fill all required shipping details");
      return;
    }

    const orderData = {
      user: user?._id,
      items: cart.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size || "",
        color: item.color || "",
        sku: item.sku || "",
      })),
      shippingAddress: shippingInfo,
      paymentMethod,
      prices: {
        itemsPrice: totalPrice,
        taxPrice: totalPrice * 0.05,
        shippingPrice: 50,
        totalPrice: totalPrice * 1.05 + 50,
      },
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/order", orderData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setLoading(false);
      alert("Order placed successfully!");
      clearCart(); // ✅ empty cart after success
      setShowCheckout(false);
    } catch (err) {
      setLoading(false);
      alert("Failed to place order. Try again.");
    }
  };

  // --- Empty cart UI ---
  if (cart.length === 0)
    return (
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="mb-4 text-gray-600">Looks like you haven’t added anything yet.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Your Cart</h2>

      {/* Cart items */}
      <div className="grid gap-6">
        {cart.map((item, idx) => (
          <div
            key={`${item._id}-${item.size}-${item.color}-${item.sku}-${idx}`}
            className="flex flex-col md:flex-row items-center md:justify-between p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition relative"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border"
            />
            <div className="flex-1 md:ml-6 flex flex-col gap-2 mt-4 md:mt-0">
              <h3 className="text-2xl font-semibold">{item.name}</h3>
              <p className="text-gray-700 text-lg">₹{item.price}</p>
              <div className="text-gray-600">
                {item.size && <p>Size: {item.size}</p>}
                {item.color && <p>Color: {item.color}</p>}
                {item.sku && <p className="text-xs text-gray-500">SKU: {item.sku}</p>}
              </div>

              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleDecrement(item)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 border rounded text-lg font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrement(item)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item)}
                className="mt-3 text-red-600 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="mt-4 md:mt-0 text-xl font-bold text-gray-900">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Cart total */}
      <div className="mt-10 p-6 bg-gray-100 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-inner">
        <h3 className="text-2xl font-bold">Total:</h3>
        <p className="text-3xl font-extrabold text-black mt-3 md:mt-0">₹{totalPrice}</p>
        <button
          onClick={startCheckout}
          className="mt-4 md:mt-0 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* --- Popups --- */}
      {/* Name popup */}
      {showNamePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Enter Your Name</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowNamePopup(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={nextToEmail}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
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
              <button
                onClick={() => setShowEmailPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={sendOtp}
                className="px-4 py-2 bg-black text-white rounded"
              >
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
              <button
                onClick={() => setShowOtpPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={verifyOtp}
                className="px-4 py-2 bg-black text-white rounded"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout popup */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-8 relative">
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={shippingInfo.country}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
              />

              <select
                name="paymentMethod"
                value={shippingInfo.paymentMethod}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
              >
                <option value="card">Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
