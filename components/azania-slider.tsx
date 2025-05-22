"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function AzaniaSlider() {
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
        <Link href="/azania">
          <img
            src="/azania-one.jpeg"
            alt="Tourism Image 1"
            className="w-full h-56 object-cover rounded-md"
          />
        </Link>
        <Link href="/azania">
          <img
            src="/azania-two.jpeg"
            alt="Tourism Image 2"
            className="w-full h-56 object-cover rounded-md"
          />
        </Link>
        <Link href="/azania">
          <img
            src="/azania-three.jpeg"
            alt="Tourism Image 3"
            className="w-full h-56 object-cover rounded-md"
          />
        </Link>
      </Slider>
    </div>
  );
}
