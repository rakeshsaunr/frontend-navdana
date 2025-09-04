import React, { useEffect, useRef, useState } from "react";

const products = [
  {
    name: "Premium Cotton T-Shirt",
    description: "Comfortable & Stylish",
    price: 899,
    oldPrice: 1299,
    likes: "1.2k",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
  },
  {
    name: "Running Sneakers",
    description: "Athletic & Durable",
    price: 2499,
    oldPrice: 3999,
    likes: "2.8k",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
  },
  {
    name: "Wireless Headphones",
    description: "Premium Sound Quality",
    price: 1899,
    oldPrice: 2999,
    likes: "956",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
  },
  {
    name: "Designer Handbag",
    description: "Elegant & Spacious",
    price: 3299,
    oldPrice: 4999,
    likes: "3.1k",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop",
  },
  {
    name: "Smart Watch",
    description: "Fitness & Style Combined",
    price: 4999,
    oldPrice: 7999,
    likes: "1.7k",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
];

export default function ProductCarousel() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [muted, setMuted] = useState(true);

  const cardWidth = 312; // 288px + 24px gap
  const visibleCards = Math.floor(window.innerWidth / cardWidth);
  const maxSlides = Math.max(0, products.length - visibleCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev < maxSlides ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxSlides]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentSlide * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  const addToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  const openVideoPopup = (url) => {
    setVideoUrl(url);
    setMuted(true);
    setShowModal(true);
  };

  const toggleMute = () => setMuted((prev) => !prev);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Featured Products</h1>
        <p className="text-white/80 text-lg">Discover our latest collection</p>
      </div>

      <div className="relative">
        {/* Prev Button */}
        <button
          onClick={() => currentSlide > 0 && setCurrentSlide(currentSlide - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white/90 rounded-full p-3 shadow-lg"
        >
          ◀
        </button>

        {/* Next Button */}
        <button
          onClick={() => currentSlide < maxSlides && setCurrentSlide(currentSlide + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white/90 rounded-full p-3 shadow-lg"
        >
          ▶
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto px-16 py-8 scrollbar-hide"
        >
          {products.map((product, idx) => (
            <div key={idx} className="flex-none w-72">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => openVideoPopup(product.video)}
                >
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    ❤️ {product.likes}
                  </div>
                  <video
                    className="w-full h-96 object-cover"
                    autoPlay
                    muted
                    loop
                    style={{ aspectRatio: "9/16" }}
                  >
                    <source src={product.video} type="video/mp4" />
                  </video>
                </div>
                <div className="p-6">
                  <div className="flex gap-4 mb-4">
                    <img
                      className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-xs mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.oldPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product.name)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(maxSlides + 1)].map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target.classList.contains("bg-black/80") && setShowModal(false)}
        >
          <div className="relative bg-black rounded-2xl overflow-hidden max-w-md w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 z-30"
            >
              ✖
            </button>

            <button
              onClick={toggleMute}
              className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 rounded-full p-2 z-30"
            >
              {muted ? "🔇" : "🔊"}
            </button>

            <video
              className="w-full h-auto"
              autoPlay
              controls
              muted={muted}
              style={{ aspectRatio: "9/16" }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
