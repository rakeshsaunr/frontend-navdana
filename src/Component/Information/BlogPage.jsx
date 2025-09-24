import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://navdana-backend-2.onrender.com/api/v1/blog/";

export default function NewsPage() {
  const [activePage, setActivePage] = useState(1);
  // support multi-select filters; clicking "All" clears selection
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const filters = [
    "All",
    "Anarkali suit sets",
    "Angrakha",
    "bed linens",
    "Bunaai’s drape sarees",
    "chiffon saree",
    "cotton",
    "daily wear",
    "Dress for Ganesh Chaturthi",
    "Dressing guide",
    "Elegant Rakhi dresses",
    "Ethnic wear for Raksha Bandhan",
    "Festive Kurta Sets",
    "Independence Day Dresses",
    "Kurta Sets for Women",
    "Traditional look",
  ];

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

  // toggle filter selection (multi-select). If "All" clicked -> clear selection.
  const toggleFilter = (filter) => {
    if (filter === "All") {
      setSelectedFilters([]);
      return;
    }

    setSelectedFilters((prev) => {
      // if previously selected contained this filter, remove it
      if (prev.includes(filter)) return prev.filter((p) => p !== filter);
      // else add filter and ensure 'All' isn't selected
      return [...prev, filter];
    });
  };

  // compute filtered posts memoized
  const filteredPosts = useMemo(() => {
    if (selectedFilters.length === 0) return posts;
    return posts.filter((post) =>
      selectedFilters.some((f) =>
        (post.tags || []).map((t) => t.toLowerCase()).includes(f.toLowerCase())
      )
    );
  }, [posts, selectedFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-medium text-center mb-13">Blogs Celebs In Navdana</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {filters.map((f) => {
          const isActive =
            f === "All" ? selectedFilters.length === 0 : selectedFilters.includes(f);
          return (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                isActive ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-20">Loading...</div>
        ) : fetchError ? (
          <div className="col-span-full text-center text-red-500 py-20">{fetchError}</div>
        ) : filteredPosts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-20">No posts match the selected filters.</div>
        ) : (
          filteredPosts.map((p) => (
            <article key={p.id || p._id} className="overflow-hidden">
              <img src={p.img || p.image} alt={p.title} className="w-full h-56 object-cover" />
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">{p.date || (p.created && new Date(p.created).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }).toUpperCase())}</div>
                <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{p.excerpt || p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(p.tags || []).map((tg) => (
                    <span key={tg} className="text-xs border px-2 py-1 rounded-full bg-gray-50">
                      {tg}
                    </span>
                  ))}
                </div>
                <button className="text-sm border px-3 py-1 rounded hover:bg-gray-100">READ MORE</button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Pagination (keeps working for filtered results)*/}
      <div className="mt-10 flex justify-center items-center gap-3">
        <button onClick={() => setActivePage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
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
        <button onClick={() => setActivePage((p) => p + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
}