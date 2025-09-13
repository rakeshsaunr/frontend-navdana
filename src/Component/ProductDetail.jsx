import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { MdArrowBackIos } from "react-icons/md";
import namer from "color-namer";

const ColorNameConverter = (hex) => {
  if (!hex) return "";
  try {
    return namer(hex).basic[0].name;
  } catch {
    return "";
  }
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // State for mobile tap-to-zoom

  // New state for desktop hover effect
  const [zoomStyle, setZoomStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`https://navdana.com/api/v1/product/${id}`);
        setProduct(res.data.data);
        if (res.data.data.images?.length > 0) {
          setSelectedImage(res.data.data.images[0].url || res.data.data.images[0].img);
          setCurrentSlide(0);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  const sizes = [...new Set(product.variant?.map((v) => v.size))];
  const colors = [...new Set(product.variant?.map((v) => v.color))];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color before adding to cart!");
      return;
    }

    addToCart(
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
        sku: product.variant?.find(
          (v) => v.size === selectedSize && v.color === selectedColor
        )?.sku,
      },
      quantity
    );

    alert("Product added to cart!");
  };

  const descriptionPoints = product.description
    ?.split(/•|\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const handlePrev = () => {
    if (!product?.images?.length) return;
    setCurrentSlide((prev) => {
      const newIdx = prev === 0 ? product.images.length - 1 : prev - 1;
      setSelectedImage(product.images[newIdx].url || product.images[newIdx].img);
      return newIdx;
    });
  };

  const handleNext = () => {
    if (!product?.images?.length) return;
    setCurrentSlide((prev) => {
      const newIdx = prev === product.images.length - 1 ? 0 : prev + 1;
      setSelectedImage(product.images[newIdx].url || product.images[newIdx].img);
      return newIdx;
    });
  };

  const handleThumbnailClick = (imgSrc, idx) => {
    setSelectedImage(imgSrc);
    setCurrentSlide(idx);
  };
  
  // Handlers for the desktop zoom effect
  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Set the transform origin to the mouse position
    setZoomStyle({
      transform: 'scale(2)',
      transformOrigin: `${x}% ${y}%`
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setZoomStyle({}); // Reset style
    setIsHovering(false);
  };

  const handleTapToZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-full md:max-w-6xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Images */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          {/* Mobile Slider */}
          <div className="block sm:hidden w-full relative">
            {product.images && product.images.length > 0 && (
              <div className="relative w-full overflow-x-scroll flex snap-x snap-mandatory">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-full h-[400px] snap-center"
                    onClick={handleTapToZoom}
                  >
                    <img
                      src={img.url || img.img}
                      alt={img.alt || `${product.name}-${idx}`}
                      className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : ''}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails (desktop) */}
          <div className="hidden sm:flex flex-row sm:flex-col gap-2 sm:gap-4 overflow-x-auto sm:overflow-y-auto max-h-[90px] sm:max-h-[500px]">
            {product.images.map((img, idx) => {
              const imgSrc = img.url || img.img;
              return (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={img.alt || `${product.name}-${idx}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover cursor-pointer border-2 ${
                    selectedImage === imgSrc ? "border-black shadow-md" : "border-gray-200"
                  }`}
                  onClick={() => handleThumbnailClick(imgSrc, idx)}
                />
              );
            })}
          </div>

          {/* Main Image with Zoom Effect */}
          <div 
            className="hidden sm:flex flex-1 items-center justify-center overflow-hidden relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className={`w-full max-w-[400px] h-[500px] rounded-xl shadow-lg object-cover cursor-crosshair transition-transform duration-200 ease-out`}
              style={zoomStyle}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4 sm:gap-6 mt-4 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">{product.name}</h1>
          <p className="text-xl sm:text-2xl font-semibold text-gray-700">₹{product.price}</p>

          {/* Description */}
          {descriptionPoints?.length > 0 && (
            <div>
              <h2 className="font-semibold text-base sm:text-lg mb-2">Description:</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm sm:text-base">
                {descriptionPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-medium">Color:</span>
              <div className="flex gap-3">
                {colors.map((hex, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer flex items-center justify-center ${
                      selectedColor === hex ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: hex }}
                    onClick={() => setSelectedColor(hex)}
                    title={ColorNameConverter(hex)}
                  >
                    {selectedColor === hex && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                ))}
              </div>
              {selectedColor && <span className="text-sm text-gray-600">{ColorNameConverter(selectedColor)}</span>}
            </div>
          )}

          {/* Sizes */}
          {sizes.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-medium">Size:</span>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`px-4 py-2 cursor-pointer border rounded text-center font-medium ${
                      selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity counter */}
          <div className="flex items-center gap-4 mt-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-3 py-1 border rounded text-lg font-medium">{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-800 mt-4"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}