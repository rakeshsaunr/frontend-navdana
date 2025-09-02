import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // import the context

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // New state for size

  const { cart, addToCart } = useCart(); // get cart & addToCart function

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
        console.log(res);
        setProduct(res.data.data);

        if (res.data.data.images?.length > 0) {
          setSelectedImage(res.data.data.images[0].url || res.data.data.images[0].img);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    const alreadyInCart = cart.find(
      (item) => item._id === product._id && item.size === selectedSize
    );

    if (alreadyInCart) {
      alert("Only one item per size can be added due to limited stock!");
      return;
    }

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      quantity: 1,
      size: selectedSize, // save size in cart
    });

    alert("Product added to cart!");
  };

  const sizes = ["XS", "S", "M", "L", "XL"]; // Size options

  // ✅ Convert description into bullet points
  const descriptionPoints = product.description
    ?.split(/•|\n/) // split by "•" or newline
    .map((point) => point.trim())
    .filter((point) => point.length > 0);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Image Gallery */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
            {product.images.map((img, idx) => {
              const imgSrc = img.url || img.img;
              return (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={img.alt || `${product.name}-${idx}`}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md border-2 
                    ${selectedImage === imgSrc ? "border-black shadow-md" : "border-gray-200"}`}
                  onClick={() => setSelectedImage(imgSrc)}
                />
              );
            })}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-[400px] h-[500px] rounded-xl shadow-lg object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded opacity-70">
                Hover to Zoom
              </span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-700">₹{product.price}</p>
          
          {/* Description as bullet points */}
          {descriptionPoints?.length > 0 && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Description:</h2>
              <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1">
                {descriptionPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Selection */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Size:</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-800 transition-all"
          >
            🛒 Add to Cart
          </button>

          <button className="border border-black text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition-all">
            ❤️ Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
