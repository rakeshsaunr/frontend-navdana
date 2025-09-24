import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://navdana-backend-2.onrender.com/api/v1/blog/";

export default function BlogPage() {
  const [activePage, setActivePage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch posts from API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setFetchError(null);
    axios
      .get(API_BASE)
      .then((res) => {
        // The API may return an array or an object with a data property
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
      <h2 className="text-3xl font-medium text-center mb-13">Blogs Celebs In Navdana</h2>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-20">Loading...</div>
        ) : fetchError ? (
          <div className="col-span-full text-center text-red-500 py-20">{fetchError}</div>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-20">No posts found.</div>
        ) : (
          posts.map((p) => (
            <article key={p.id || p._id} className="overflow-hidden">
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
                    className="w-70 h-auto object-cover rounded-t cursor-pointer"
                  />
                </Link>
              ) : (
                <img
                  src={p.img || p.image}
                  alt={p.title}
                  className="w-70 h-auto object-cover rounded-t"
                />
              )}
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">
                  {p.date ||
                    (p.created &&
                      new Date(p.created).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      }).toUpperCase())}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {p.link ? (
                    <Link
                      to={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600"
                    >
                      {p.title}
                    </Link>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{p.excerpt || p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(p.tags || []).map((tg) => (
                    <span key={tg} className="text-xs border px-2 py-1 rounded-full bg-gray-50">
                      {tg}
                    </span>
                  ))}
                </div>
                {p.link ? (
                  <Link
                    to={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border px-2 py-1 rounded inline-block relative overflow-hidden group"
                    style={{ transition: "color 0.2s" }}
                  >
                    <span
                      className="absolute inset-0 left-0 w-0 group-hover:w-full h-full bg-black transition-all duration-300 ease-out z-0"
                      style={{
                        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    ></span>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      READ MORE
                    </span>
                  </Link>
                ) : (
                  <button
                    className="text-sm border px-3 py-1 rounded relative overflow-hidden group"
                    disabled
                    style={{ transition: "color 0.2s" }}
                  >
                    <span
                      className="absolute inset-0 left-0 w-0 group-hover:w-full h-full bg-black transition-all duration-300 ease-out z-0"
                      style={{
                        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    ></span>
                    <span className="relative z-10 transition-colors duration-300">
                      READ MORE
                    </span>
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center gap-3">
        <button
          onClick={() => setActivePage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        {[1, 2, 3, "...", 30].map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === "number" && setActivePage(p)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
              activePage === p ? "bg-black text-white" : "border"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setActivePage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
