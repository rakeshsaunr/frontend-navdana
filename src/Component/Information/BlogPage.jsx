import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://navdana-backend-2.onrender.com/api/v1/blog/";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch posts from API, including description
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setFetchError(null);
    axios
      .get(API_BASE)
      .then((res) => {
        // Try to fetch description/desc/Excerpt as well
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

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 tracking-wide">
        ♡ Blogs Celebs In Navdana ♡
      </h2>
      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading...</div>
      ) : fetchError ? (
        <div className="text-center text-red-500 py-20">{fetchError}</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No posts found.</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-end min-w-[700px]">
            {posts.map((p, idx) => (
              <div
                key={p.id || p._id || idx}
                className="flex flex-col items-center w-[140px] sm:w-[170px] md:w-[200px] bg-white rounded-lg shadow-none"
              >
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
                        className="w-full h-[220px] sm:h-[250px] md:h-[300px] object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                        style={{ background: "#f7f7f7" }}
                      />
                    </Link>
                  ) : (
                    <img
                      src={p.img || p.image}
                      alt={p.title}
                      className="w-full h-[220px] sm:h-[250px] md:h-[300px] object-cover rounded-lg shadow-md"
                      style={{ background: "#f7f7f7" }}
                    />
                  )}
                </div>
                <div className="w-full text-center mt-3">
                  {/* Title as a link if p.link exists */}
                  {p.link ? (
                    <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-1 truncate">
                      <Link
                        to={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "#ec4899" }} // pink-500
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
                  {/* Show description/desc/excerpt if available */}
                  <div className="text-[10px] text-gray-400 truncate">
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
