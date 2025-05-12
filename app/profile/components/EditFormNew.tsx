"use client";
// Interactive Profile Editing Form with Dynamic Input for Personal, Address, and Professional Information
import { updateUser } from "@/actions/getUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "@/lib/countries.json";
import Link from "next/link";
import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { IIndustry, IProfession, IUser } from "@/models";
import business from "@/lib/business.json";
import { IProfessions } from "@/types";

interface Club {
  _id: string;
  name: string;
}

export function EditProfileForm({
  profile,
  clubs,
  professions,
}: {
  profile: IUser;
  clubs: Club[];
  professions: IProfessions[];
}) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: profile.name || "",
    club: profile.club || "",
    business: profile.business || "",
    profession: profile.profession ? profile.profession.toString() : "",
    country: profile.country || "",
    phone: profile.phone || "",
    streetAddress: profile.streetAddress || "",
    city: profile.city || "",
    state: profile.state || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.phone && !/^\+?[\d\s-]{7,}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number (e.g., +1234567890)";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
      setSubmitStatus({ type: null, message: "" });
    };

  const handleSelectChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
      setSubmitStatus({ type: null, message: "" });
    };

  const resetForm = () => {
    setFormData({
      name: profile.name || "",
      club: profile.club || "",
      business: profile.business || "",
      profession: profile.profession ? profile.profession.toString() : "",
      country: profile.country || "",
      phone: profile.phone || "",
      streetAddress: profile.streetAddress || "",
      city: profile.city || "",
      state: profile.state || "",
    });
    setErrors({});
    setSubmitStatus({ type: null, message: "" });
  };

  const submitAction = () => {
    if (!validateForm()) return;
    startTransition(async () => {
      try {
        await updateUser(profile._id, formData);
        setSubmitStatus({
          type: "success",
          message: "Profile updated successfully!",
        });
      } catch (error) {
        setSubmitStatus({
          type: "error",
          message: "Failed to update profile. Please try again.",
        });
        console.error("Error updating profile:", error);
      }
    });
  };

  return (
    <form
      action={submitAction}
      className="space-y-6 shadow-md p-6 w-full max-w-2xl mx-auto bg-white rounded-lg"
      aria-labelledby="edit-profile-heading"
    >
      <h2
        id="edit-profile-heading"
        className="text-2xl font-bold text-gray-900"
      >
        Edit Your Profile
      </h2>

      {/* Submission Status */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-md flex items-center gap-2 ${
            submitStatus.type === "success" ? "bg-green-100" : "bg-red-100"
          }`}
          role="alert"
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <p
            className={
              submitStatus.type === "success"
                ? "text-green-700"
                : "text-red-700"
            }
          >
            {submitStatus.message}
          </p>
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Personal Information
        </h3>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleInputChange("name")}
            className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
            placeholder="e.g., John Doe"
            required
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
            placeholder="e.g., +1 234 567 8900"
            type="tel"
            aria-describedby="phone-error phone-help"
          />
          <p id="phone-help" className="text-xs text-gray-500">
            Include country code for international numbers.
          </p>
          {errors.phone && (
            <p id="phone-error" className="text-sm text-red-500">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Address Information
        </h3>
        <div className="space-y-2">
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Street Address
          </label>
          <Input
            id="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange("streetAddress")}
            className="mt-1"
            placeholder="e.g., 123 Main St"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <Input
              id="city"
              value={formData.city}
              onChange={handleInputChange("city")}
              className="mt-1"
              placeholder="e.g., New York"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State/Province
            </label>
            <Input
              id="state"
              value={formData.state}
              onChange={handleInputChange("state")}
              className="mt-1"
              placeholder="e.g., NY"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.country}
            onValueChange={handleSelectChange("country")}
            required
            aria-describedby="country-error"
          >
            <SelectTrigger
              id="country"
              className={errors.country ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {countries.map((country) => (
                <SelectItem
                  key={country.toLowerCase().replace(/\s+/g, "-")}
                  value={country.toLowerCase().replace(/\s+/g, "-")}
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p id="country-error" className="text-sm text-red-500">
              {errors.country}
            </p>
          )}
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Professional Information
        </h3>
        <div className="space-y-2">
          <label
            htmlFor="club"
            className="block text-sm font-medium text-gray-700"
          >
            Favorite Football Club
          </label>
          <Select
            value={`${formData.club}`}
            onValueChange={handleSelectChange("club")}
          >
            <SelectTrigger id="club">
              <SelectValue placeholder="Select a club" />
            </SelectTrigger>
            <SelectContent>
              {clubs.map((club) => (
                <SelectItem key={club._id} value={club._id}>
                  {club.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="profession"
            className="block text-sm font-medium text-gray-700"
          >
            Profession
          </label>
          <Select
            value={formData.profession}
            onValueChange={handleSelectChange("profession")}
          >
            <SelectTrigger id="profession">
              <SelectValue placeholder="Select your profession" />
            </SelectTrigger>
            <SelectContent>
              {professions.map((profession) => (
                <SelectItem
                  value={profession._id.toString()}
                  key={profession._id.toString()}
                >
                  {profession.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="business"
            className="block text-sm font-medium text-gray-700"
          >
            Industry
          </label>
          <Select
            value={formData.business}
            onValueChange={handleSelectChange("business")}
          >
            <SelectTrigger id="business">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {business.map((business) => (
                <SelectItem value={business.business} key={business.business}>
                  {business.business}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2">
        <Link href="/profile">
          <Button type="button" variant="outline" disabled={isPending}>
            Cancel
          </Button>
        </Link>
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          disabled={isPending}
        >
          Reset
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
