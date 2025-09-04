import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Import Link

export default function SuitSet() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://navdana.com/api/v1/product");
        if (res.data.success) {
          setProducts(res.data.data); // products are inside "data"
          console.log("Data is:", res.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <section className="px-4 py-12 bg-white">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-[#2C4A52] mb-10">
        Suit Set
      </h2>

      {/* Product Grid */}
      <div className="max-w-9xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="group">
            {/* Image Container */}
            <div className="relative h-110 w-full overflow-hidden rounded-lg shadow bg-gray-100 group-hover:shadow-lg transition">
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.alt || product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Bottom Left: Price */}
              <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold transition-opacity duration-300 group-hover:opacity-0">
                ₹{product.price}
              </div>

              {/* Bottom Right: Add to Bag */}
              <div className="absolute bottom-2 right-2 bg-white text-gray-800 p-1 rounded-full shadow transition-opacity duration-300 group-hover:opacity-0">
                <ShoppingBag className="w-4 h-4" />
              </div>

              {/* Hover Quick View → Now Clickable */}
              <Link
                to={`/product/${product._id}`} // ✅ Navigate to product details
                className="absolute bottom-2 left-2 right-2 bg-[#2C4A52] text-white text-center py-3 opacity-0 group-hover:opacity-100 transition rounded-[8px]"
              >
                Quick view
              </Link>
            </div>

            {/* Description and Price */}
            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">
                {product.name}
              </h3>
              <div className="text-sm font-semibold text-pink-600">
                ₹{product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="w-full flex justify-center mt-12">
        {/* <button
          className="relative overflow-hidden bg-[#F0E5C7] text-black px-10 py-4 rounded font-medium shadow transition duration-300 hover:text-white"
          style={{ border: "none" }}
        >
          <span className="relative z-10">VIEW ALL</span>
          <span className="absolute inset-0 bg-[#e2d3a9] wave-animation"></span>
        </button> */}

        <style jsx>{`
          .wave-animation {
            transform: translateY(100%);
            transition: transform 0.5s ease;
            z-index: 0;
          }
          button:hover .wave-animation {
            transform: translateY(0%);
          }
        `}</style>
      </div>
    </section>
  );
}
