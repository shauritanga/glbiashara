"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TourismSlider() {
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
            src="/z1.jpg"
            alt="Tourism Image 1"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
        <div>
          <img
            src="/z2.jpg"
            alt="Tourism Image 2"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
        <div>
          <img
            src="/z3.jpg"
            alt="Tourism Image 3"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
        <div>
          <img
            src="/z4.jpg"
            alt="Tourism Image 4"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
      </Slider>
    </div>
  );
}
