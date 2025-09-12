import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(" https://navdana.com/api/v1/category");
        // Assuming API returns { categories: [...] }
        setCollections(Array.isArray(response.data.categories) ? response.data.categories : []);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  // Dynamically set slidesToShow based on screen width
  useEffect(() => {
    function updateSlidesToShow() {
      if (window.innerWidth < 400) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 640) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    }
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // Only show collections except "All Products" and where isActive is true
  const filteredCollections = collections.filter(
    (item) => item.name !== "All Products" && item.isActive
  );

  const totalSlides = filteredCollections.length;

  // Get visible collections for the current slide (dynamic for mobile)
  const getVisibleCollections = () => {
    if (totalSlides <= slidesToShow) {
      return filteredCollections;
    }
    let visible = [];
    for (let i = 0; i < slidesToShow; i++) {
      visible.push(filteredCollections[(currentSlide + i) % totalSlides]);
    }
    return visible;
  };

  // Calculate the correct counter caption for the slider
  const getCounterCaption = () => {
    if (totalSlides <= slidesToShow) {
      return `1/1`;
    }
    let start = currentSlide + 1;
    let end = currentSlide + slidesToShow;
    if (end > totalSlides) {
      end = end - totalSlides;
    }
    return `${start}/${end}`;
  };

  const handlePrev = () => {
    if (totalSlides <= slidesToShow) return;
    setCurrentSlide((prev) =>
      prev === 0
        ? (totalSlides - slidesToShow < 0 ? 0 : totalSlides - slidesToShow)
        : prev - 1
    );
  };

  const handleNext = () => {
    if (totalSlides <= slidesToShow) return;
    setCurrentSlide((prev) =>
      (prev + 1) % totalSlides
    );
  };

  return (
    <section className="py-17 bg-white">
      <h2 className="text-3xl font-medium text-center mb-13">
        SHOP BY COLLECTION
      </h2>

      {filteredCollections.length === 0 ? (
        <p className="text-center text-gray-500">No collections available.</p>
      ) : (
        <>
          {/* Mobile: Custom round slider with minimal gap */}
          <div className="block sm:hidden w-full relative">
            {totalSlides > 0 && (
              <div className="flex flex-col items-center">
                <div className="relative w-full flex flex-col items-center justify-center">
                  <div
                    className="flex flex-row justify-center w-full transition-all"
                    style={{
                      minHeight: "200px",
                      gap: "12px",
                    }}
                  >
                    {getVisibleCollections().map((item, idx) => (
                      <Link
                        to={`/collection-pages/${item._id}`}
                        key={item._id || item.name || idx}
                        className="full-unstyled-link::after"
                        style={{ minWidth: 0 }}
                      >
                        <div className="flex flex-col items-center">
                          <LazyLoadImage
                            effect="blur"
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="w-32 h-32 object-cover rounded-full border border-gray-200 shadow"
                            style={{
                              aspectRatio: "1/1",
                              objectFit: "cover",
                              background: "#fff"
                            }}
                          />
                        </div>
                        <div className="flex flex-row items-center justify-center mt-2">
                          <p className="text-gray-800 font-medium text-base text-center">
                            {item.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* Slider counter and buttons at the bottom */}
                  <div className="w-full flex flex-col items-center mt-4">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="bg-white transition disabled:opacity-50"
                        aria-label="Previous"
                        disabled={totalSlides <= slidesToShow}
                        style={{ minWidth: 32, minHeight: 32 }}
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="text-base font-medium text-gray-700 select-none" style={{ minWidth: 32, textAlign: "center" }}>
                        {getCounterCaption()}
                      </span>
                      <button
                        onClick={handleNext}
                        className="bg-white transition disabled:opacity-50"
                        aria-label="Next"
                        disabled={totalSlides <= slidesToShow}
                        style={{ minWidth: 32, minHeight: 32 }}
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:flex flex-wrap justify-center gap-6 px-4">
            {filteredCollections.map((item, index) => (
              <Link
                to={`/collection-pages/${item._id}`}
                key={item._id || item.name || index}
                className="full-unstyled-link::after"
              >
                <div className="flex flex-col items-center">
                  <LazyLoadImage
                    src={item.image}
                    alt={item.name}
                    effect="blur"
                    loading="lazy"
                    className="w-48 h-48 object-cover rounded-full"
                  />
                </div>
                <p className="mt-2 text-gray-800 font-medium flex items-center justify-center text-center">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
