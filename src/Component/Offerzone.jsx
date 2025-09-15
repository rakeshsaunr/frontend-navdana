// src/components/OfferZone.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // core Swiper styles
import "swiper/css/autoplay";
// import { Autoplay } from "swiper";

// Use public folder paths directly
const offer1 = "/Images/model1.PNG";
const offer2 = "/Images/model2.png";
const offer3 = "/Images/model3.png"

export default function OfferZone() {
  return (
    <div className="w-full overflow-hidden relative">
      <Swiper
        // modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
      >
        <SwiperSlide>
          <img src={offer3} alt="Offer 1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={offer1} alt="Offer 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={offer2} alt="Offer 2" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
