"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function VodaComSlider() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Slider
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
        className="rounded-md"
      >
        <div>
          <img
            src="/vodacom-general.jpeg"
            alt="Tourism Image 1"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
        <div>
          <img
            src="/vodacom-mpesa.jpeg"
            alt="Tourism Image 2"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
        <div>
          <img
            src="/vodacom-mobile-shop.jpeg"
            alt="Tourism Image 3"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
        <div>
          <img
            src="/mpesa.png"
            alt="Tourism Image 4"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
      </Slider>
    </div>
  );
}
