"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

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
        <Link href="/crdb">
          <img
            src="/crdb.jpg"
            alt="Tourism Image 1"
            className="w-full h-56 object-cover rounded-md"
          />
        </Link>
        <Link href="/crdb">
          <img
            src="/wakala.jpg"
            alt="Tourism Image 2"
            className="w-full h-56 object-cover rounded-md"
          />
        </Link>
        <Link href="/crdb">
          <img
            src="/simbank.jpg"
            alt="Tourism Image 3"
            className="w-full h-56 object-cover rounded-md"
          />
        </Link>
      </Slider>
    </div>
  );
}
