"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TotalSlider() {
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
        <a href="" target="_blank" rel="noopener noreferrer">
          <img
            src="/oil.jpg"
            alt="Oil station"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img
            src="/gas.jpg"
            alt="Gas point"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img
            src="/coverage.jpg"
            alt="general total"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
      </Slider>
    </div>
  );
}
