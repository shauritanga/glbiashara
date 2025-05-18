"use client";

import Image from "next/image";
import { Building } from "lucide-react";

interface BusinessImageProps {
  src?: string;
  alt: string;
  businessName: string;
}

export default function BusinessImage({
  src,
  alt,
  businessName,
}: BusinessImageProps) {
  if (!src) {
    return <Building className="h-8 w-8 text-gray-400 m-auto" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "https://placehold.co/64x64/FF0000/FFFFFF?text=Logo";
      }}
    />
  );
}
