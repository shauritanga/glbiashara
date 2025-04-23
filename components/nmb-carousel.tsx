"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NMBSlider() {
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
        <a
          href="https://www.nmbbank.co.tz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/nmb1.jpeg"
            alt="Tourism Image 1"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
        <a
          href="https://www.nmbbank.co.tz/business-banking/ways-to-bank/nmb-wakala"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/nmb3.jpeg"
            alt="Tourism Image 2"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
        <a
          href="https://openaccount.nmbbank.co.tz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/iu-media.png"
            alt="Tourism Image 3"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
      </Slider>
    </div>
  );
}
