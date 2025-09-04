import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
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

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = product?.variant?.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      setSelectedVariant(variant || null);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedColor, selectedSize, product]);

  if (!product) return <p className="p-6">Loading...</p>;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Please select a size & color before adding to cart!");
      return;
    }

    if (selectedVariant.stock === 0) {
      alert("This variant is out of stock!");
      return;
    }

    const alreadyInCart = cart.find(
      (item) =>
        item._id === product._id &&
        item.size === selectedVariant.size &&
        item.color === selectedVariant.color
    );

    if (alreadyInCart) {
      alert("This variant is already in your cart!");
      return;
    }

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      quantity: 1,
      size: selectedVariant.size,
      color: selectedVariant.color,
      sku: selectedVariant.sku,
    });

    alert("Product added to cart!");
  };

  // ✅ Convert description into bullet points
  const descriptionPoints = product.description
    ?.split(/•|\n/)
    .map((point) => point.trim())
    .filter((point) => point.length > 0);

  // Unique colors & sizes
  const colors = [...new Set(product.variant?.map((v) => v.color))];
  const sizes = [...new Set(product.variant?.map((v) => v.size))];

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

          {/* Description */}
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

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-2">Color:</h3>
            <div className="flex gap-3">
              {colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg transition-all
                    ${selectedColor === color ? "border-black bg-gray-100" : "border-gray-300"}
                  `}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-medium mb-2">Size:</h3>
            <div className="flex gap-3">
              {sizes.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg transition-all
                    ${selectedSize === size ? "border-black bg-gray-100" : "border-gray-300"}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Info */}
          {selectedVariant && (
            <div>
              {selectedVariant.stock === 0 ? (
                <p className="text-gray-500">Out of stock</p>
              ) : selectedVariant.stock <= 5 ? (
                <p className="text-red-500 font-medium">
                  Hurry! Only {selectedVariant.stock} left
                </p>
              ) : (
                <p className="text-green-600">In stock</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
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
