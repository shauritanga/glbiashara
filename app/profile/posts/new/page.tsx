"use client";

import { useState, useRef, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createPost } from "@/actions/createPost";
import regions from "@/lib/regions.json";
import districts from "@/lib/districts.json";
import wards from "@/lib/wards.json";
import streets from "@/lib/streets.json";
import business from "@/lib/business.json";
import { ArrowBigLeft } from "lucide-react";
import { ActionResponse } from "@/types";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [specification, setSpecification] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Initialize useRouter

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type.startsWith("video/")
      ) {
        setFile(selectedFile);
      } else {
        alert("Please select an image or video file.");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const districtOptions =
    districts.find((group) => group.region === region)?.districts || [];
  const wardOptions =
    wards.find((group) => group.district === district)?.wards || [];
  const streetOptions =
    streets.find((group) => group.ward === ward)?.streets || [];
  const specificationOptions =
    business.find((group) => group.business === businessType)?.specifications ||
    [];

  const initialState: ActionResponse = { success: false, message: "" };
  const [state, action, isPending] = useActionState(
    async (prevState: ActionResponse, formData: FormData) => {
      const result = await createPost(prevState, formData);
      if (result.success) {
        setRegion("");
        setDistrict("");
        setWard("");
        setStreet("");
        setBusinessType("");
        setSpecification("");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        router.push("/profile"); // Redirect to profile page
      }
      return result;
    },
    initialState
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      <Button
        variant="link"
        className="mb-4"
        onClick={() => window.history.back()}
      >
        <ArrowBigLeft className="mr-2" />
        Back
      </Button>
      <form
        action={action}
        className="space-y-6 shadow-md p-6 bg-white rounded-lg"
      >
        <div>
          <h2 className="text-xl font-semibold">Create a New Post</h2>
          <p className="text-sm text-gray-500">
            Share your thoughts, photos, or videos with the world!
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Post Content</h3>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Enter post title"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="What's on your mind?"
              rows={4}
              className="w-full"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Category Details
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                value={businessType}
                onChange={(e) => {
                  setBusinessType(e.target.value);
                  setSpecification("");
                }}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="">-- Select Category --</option>
                {business.map((item) => (
                  <option key={item.business} value={item.business}>
                    {item.business}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="specific"
                className="block text-sm font-medium text-gray-700"
              >
                Specification
              </label>
              <select
                id="specific"
                name="specific"
                required
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                disabled={!businessType}
                className="w-full p-2 border rounded-md bg-white disabled:bg-gray-100"
              >
                <option value="">-- Select Specification --</option>
                {specificationOptions.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Location Details
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                Region
              </label>
              <select
                id="region"
                name="region"
                required
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setDistrict("");
                  setWard("");
                  setStreet("");
                }}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="">-- Select Region --</option>
                {regions.map((region) => (
                  <option key={region.label} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
              </label>
              <select
                id="district"
                name="district"
                required
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setWard("");
                  setStreet("");
                }}
                disabled={!region}
                className="w-full p-2 border rounded-md bg-white disabled:bg-gray-100"
              >
                <option value="">-- Select District --</option>
                {districtOptions.map((district) => (
                  <option key={district.label} value={district.value}>
                    {district.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="ward"
                className="block text-sm font-medium text-gray-700"
              >
                Ward
              </label>
              <select
                id="ward"
                name="ward"
                value={ward}
                onChange={(e) => {
                  setWard(e.target.value);
                  setStreet("");
                }}
                disabled={!district}
                className="w-full p-2 border rounded-md bg-white disabled:bg-gray-100"
              >
                <option value="">-- Select Ward --</option>
                {wardOptions.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street/Village
              </label>
              <select
                id="street"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                disabled={!ward}
                className="w-full p-2 border rounded-md bg-white disabled:bg-gray-100"
              >
                <option value="">-- Select Street --</option>
                {streetOptions.map((street) => (
                  <option key={street} value={street}>
                    {street}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Media Upload</h3>
          <div className="space-y-2">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image/Video
            </label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Supported formats: JPG, PNG, GIF, MP4, etc.
            </p>
            {file && (
              <p className="text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>
        </section>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Uploading..." : "Post"}
        </Button>
        {state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </div>
  );
}
