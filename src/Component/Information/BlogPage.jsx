import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_BASE = "https://navdana-backend-2.onrender.com/api/v1/blog/";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const sliderRef = useRef(null);

  // Fetch posts
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setFetchError(null);
    axios
      .get(API_BASE)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.blogss || [];
        if (isMounted) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFetchError("Failed to load posts.");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Slider settings with custom arrows
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <button
        type="button"
        className="slick-arrow slick-next z-10 absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-gray-100 transition"
        style={{ display: "block" }}
        aria-label="Next"
      >
        <FaChevronRight className="text-gray-700" />
      </button>
    ),
    prevArrow: (
      <button
        type="button"
        className="slick-arrow slick-prev z-10 absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-gray-100 transition"
        style={{ display: "block" }}
        aria-label="Previous"
      >
        <FaChevronLeft className="text-gray-700" />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }, // Show 2 images on mobile for "aisi dikhe multiple me"
      },
      {
        breakpoint: 360,
        settings: { slidesToShow: 1 },
      },
    ],
    ref: sliderRef,
  };

  // Custom Arrow Handlers (to work with react-slick's ref)
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 relative">
      <h2 className="text-2xl sm:text-3xl font-medium text-center mb-6 tracking-wide">
        ♡ Celebs In Navdana ♡
      </h2>
      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading...</div>
      ) : fetchError ? (
        <div className="text-center text-red-500 py-20">{fetchError}</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No posts found.</div>
      ) : (
        <div className="relative">
          {/* Custom Slide Icons */}
          <button
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-gray-100 transition"
            style={{ width: 40, height: 40 }}
            aria-label="Previous"
          >
            <FaChevronLeft className="text-xl text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-gray-100 transition"
            style={{ width: 40, height: 40 }}
            aria-label="Next"
          >
            <FaChevronRight className="text-xl text-gray-700" />
          </button>
          <Slider
            {...sliderSettings}
            ref={sliderRef}
            arrows={false}
          >
            {posts.map((p, idx) => (
              <div
                key={p.id || p._id || idx}
                className="px-2"
              >
                <div className="flex flex-col items-center p-3">
                  <div className="w-full flex justify-center">
                    {p.link ? (
                      <Link
                        to={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={p.img || p.image}
                          alt={p.title}
                          className="w-full h-[220px] sm:h-[250px] md:h-[280px] object-cover rounded-lg transition-transform duration-200 hover:scale-105"
                          style={{ background: "#f7f7f7" }}
                        />
                      </Link>
                    ) : (
                      <img
                        src={p.img || p.image}
                        alt={p.title}
                        className="w-full h-[220px] sm:h-[250px] md:h-[280px] object-cover rounded-lg"
                        style={{ background: "#f7f7f7" }}
                      />
                    )}
                  </div>
                  <div className="w-full text-center mt-3">
                    {p.link ? (
                      <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-1 truncate">
                        <Link
                          to={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "#ec4899" }}
                        >
                          {p.title}
                        </Link>
                      </h3>
                    ) : (
                      <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-1 truncate">
                        {p.title}
                      </h3>
                    )}
                    <div className="text-[10px] sm:text-xs text-gray-500 mb-1 truncate">
                      {p.date ||
                        (p.created &&
                          new Date(p.created).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }))}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate">
                      {p.description || p.desc || p.excerpt || ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
