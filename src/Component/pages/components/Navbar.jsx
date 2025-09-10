import { useEffect, useRef } from "react";

export default function Navbar() {
  const desktopSearchRef = useRef(null);

  // Keyboard shortcut: focus desktop search with Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k" &&
        // Only trigger if not in an input/textarea already
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        if (desktopSearchRef.current) {
          desktopSearchRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Admin logo as inline SVG (user icon)
  function AdminLogo() {
    return (
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 border border-gray-200 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 bg-pink-500 text-white rounded-full text-xs hover:bg-pink-600 transition"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
        </svg>
      </span>
    );
  }

  return (
    <div className="sticky top-0 left-0 w-full bg-white shadow px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 z-30">
      {/* On mobile, center logo; on desktop, show Dashboard text or search */}
      <div className="flex items-center w-full sm:w-auto">
        {/* Desktop: show search at start with shortcut hint */}
        <div className="relative hidden sm:block w-full">
          <input
            ref={desktopSearchRef}
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 sm:px-3 rounded-lg w-full sm:w-64 pl-4"
            aria-label="Search (Ctrl+K)"
          />
          {/* Shortcut hint */}
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 select-none pointer-events-none">
            Ctrl+K
          </span>
        </div>
      </div>

      {/* Centered logo on mobile, hidden on desktop */}
      <div className="flex justify-center items-center w-full sm:w-auto order-first sm:order-none">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 w-auto mx-auto block sm:hidden"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
        {/* Show search in center on mobile only */}
        <input
          type="text"
          placeholder="Search..."
          className="border px-2 py-1 sm:px-2 rounded-lg w-75 block sm:hidden shadow-md"
        />
        {/* Admin Profile: show at end on desktop, right of logo on mobile */}
        <div className="flex items-center ml-2">
          <AdminLogo />
          <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
        </div>
      </div>
    </div>
  );
}
