"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileImageUploaderProps {
  imageUrl: string;
  userName: string;
  updateAction: (formData: FormData) => Promise<{ success: boolean }>;
}

export default function ProfileImageUploader({
  imageUrl,
  userName,
  updateAction,
}: ProfileImageUploaderProps) {
  const router = useRouter();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      const result = await updateAction(formData);
      if (result.success) {
        router.refresh();
      }
    }
  };

  return (
    <div className="relative group">
      <div className="relative h-32 w-32">
        <Image
          src={imageUrl || "/default-avatar.png"}
          alt={userName}
          fill
          className="rounded-full object-cover border-4 border-white shadow-md"
          sizes="128px"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full">
          <label
            htmlFor="profile-image"
            className="text-white text-sm cursor-pointer p-2 text-center"
          >
            Change Photo
          </label>
          <input
            id="profile-image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}
