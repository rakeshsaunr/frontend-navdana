import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/banner";

export default function OfferZone() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(API_URL);
      setBanners(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    lazyLoad: "ondemand", // <-- Enables lazy loading
  };

  if (!banners.length) return null;

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner._id} className="relative w-full" style={{ height: "300px" }}>
            <img
              src={banner.url}
              alt={banner.title}
              loading="lazy" // <-- Native lazy loading for images
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
