"use client";

import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    src: "/1.jpg",
    alt: "Slide 1",
    caption: "Discover new opportunities",
  },
  {
    src: "/2.jpg",
    alt: "Slide 2",
    caption: "Discover new possibilities",
  },
  {
    src: "/3.jpg",
    alt: "Slide 3",
    caption: "Grow your skills and network",
  },
  {
    src: "/4.jpg",
    alt: "Slide 4",
    caption: "Explore diverse industries",
  },
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    fade: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    afterChange: (current: number) => setCurrentSlide(current),
    // Customize slick dots and arrows for blue branding
    appendDots: (dots: React.ReactNode[]) => (
      <div>
        <ul className="flex justify-center space-x-2">
          {dots.map((dot, index) => (
            <li
              key={index}
              className={`inline-block w-1 h-1 rounded-full transition-colors ${
                currentSlide === index ? "bg-blue-600" : "bg-blue-300"
              }`}
            ></li>
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-[80vh]">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
            />
            {/* Optional overlay for better caption readability */}
            <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-0 left-0 right-0 bg-blue-800 bg-opacity-75 text-white p-4">
        <p className="text-center text-xl font-medium text-blue-100">
          {images[currentSlide].caption}
        </p>
      </div>
    </div>
  );
}
