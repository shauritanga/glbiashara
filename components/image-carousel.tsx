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
    alt: "Slide 3",
    caption: "Explore diverse industries",
  },
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    afterChange: (current: number) => setCurrentSlide(current),
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
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
        <p className="text-center text-xl">{images[currentSlide].caption}</p>
      </div>
    </div>
  );
}
