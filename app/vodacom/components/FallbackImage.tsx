"use client";

import Image from "next/image";

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export default function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  fallbackSrc,
}: FallbackImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src =
          fallbackSrc ||
          `https://placehold.co/${width}x${height}/FF0000/FFFFFF?text=${alt}`;
      }}
    />
  );
}
