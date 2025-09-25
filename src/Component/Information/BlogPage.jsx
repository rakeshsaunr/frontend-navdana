import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_BASE = "https://navdana-backend-2.onrender.com/api/v1/blog/";

const SLIDES_TO_SHOW = 4;

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

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

  // Calculate the visible posts for the current slide
  const getVisiblePosts = () => {
    if (posts.length <= SLIDES_TO_SHOW) return posts;
    // Clamp slideIndex
    let start = Math.max(0, Math.min(slideIndex, posts.length - SLIDES_TO_SHOW));
    return posts.slice(start, start + SLIDES_TO_SHOW);
  };

  const handlePrev = () => {
    setSlideIndex((prev) => Math.max(0, prev - SLIDES_TO_SHOW));
  };

  const handleNext = () => {
    setSlideIndex((prev) =>
      Math.min(
        posts.length - SLIDES_TO_SHOW,
        prev + SLIDES_TO_SHOW
      )
    );
  };

  // Reset slideIndex if posts change
  React.useEffect(() => {
    setSlideIndex(0);
  }, [posts.length]);

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
          {/* Slide icons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow transition disabled:opacity-50"
            style={{ display: "flex", alignItems: "center" }}
            disabled={slideIndex === 0}
            aria-label="Previous"
            onClick={handlePrev}
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow transition disabled:opacity-50"
            style={{ display: "flex", alignItems: "center" }}
            disabled={slideIndex >= posts.length - SLIDES_TO_SHOW}
            aria-label="Next"
            onClick={handleNext}
          >
            <FaChevronRight size={20} />
          </button>
          <div
            className="
              grid 
              grid-cols-2 
              sm:grid-cols-3 
              md:grid-cols-4 
              gap-3 
              sm:gap-4
            "
          >
            {getVisiblePosts().map((p, idx) => (
              <div
                key={p.id || p._id || idx + slideIndex}
                className="flex flex-col items-center p-2 sm:p-3 rounded-lg border border-gray-200"
              >
                <div className="w-full flex justify-center">
                  {p.link ? (
                    <Link
                      to={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full aspect-[3/4] overflow-hidden rounded-lg block"
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={p.img || p.image}
                        alt={p.title}
                        width="100%"
                        height="auto"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <img
                      src={p.img || p.image}
                      alt={p.title}
                      width="100%"
                      height="auto"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="w-full text-center mt-2 sm:mt-3">
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
                  <div className="text-[13.3px] text-[#000000] truncate font-archivo">
                    {p.description || p.desc || p.excerpt || ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
