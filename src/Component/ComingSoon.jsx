// src/Component/ComingSoon.jsx
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">
        🚧 Coming Soon 🚧
      </h1>

      <Link
        to="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
