"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NMBSlider() {
  return (
    <div className="bg-white z-30 rounded-lg shadow-sm">
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
          href="https://www.crdbbank.co.tz/en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/crdb.jpg"
            alt="Tourism Image 1"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
        <a
          href="https://www.crdbbank.co.tz/en/for-business/business-bank-accounts/business-account"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/wakala.jpg"
            alt="Tourism Image 2"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
        <a
          href="https://www.crdbbank.co.tz/en/for-you/bank-loan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/simbank.jpg"
            alt="Tourism Image 3"
            className="w-full h-56 object-cover rounded-md"
          />
        </a>
      </Slider>
    </div>
  );
}
