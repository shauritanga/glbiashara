"use client";
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
import { IProfession } from "@/models";
import { IUser } from "@/models";
import Link from "next/link";
import { useState, useTransition } from "react";

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
  professions: IProfession[];
}) {
  const [isPending, startTransistion] = useTransition();
  const [formData, setFormData] = useState({
    name: profile.name,
    club: profile.club || "",
    business: "",
    profession: "",
    country: profile.country || "",
    phone: profile.phone || "",
    streetAddress: profile.streetAddress || "",
    city: profile.city || "",
    state: profile.state || "",
  });

  const handleSelectChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const submitAction = () => {
    startTransistion(async () => {
      try {
        await updateUser(profile._id, formData);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    });
  };
  return (
    <form action={submitAction} className="space-y-6 shadow-md p-6 w-2/3">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleInputChange("name")}
            className="mt-1"
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            className="mt-1"
            placeholder="Enter your phone number"
            type="tel"
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Address Information</h3>
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
            placeholder="Enter your street address"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              placeholder="Enter your city"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <Input
              id="state"
              value={formData.state}
              onChange={handleInputChange("state")}
              className="mt-1"
              placeholder="Enter your state"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <Select
            value={formData.country}
            onValueChange={handleSelectChange("country")}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select a country" />
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
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Professional Information</h3>
        <div className="space-y-2">
          <label
            htmlFor="club"
            className="block text-sm font-medium text-gray-700"
          >
            Football Club
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
            htmlFor="career"
            className="block text-sm font-medium text-gray-700"
          >
            Career
          </label>
          <Select
            value={formData.profession}
            onValueChange={handleSelectChange("profession")}
          >
            <SelectTrigger id="profession">
              <SelectValue placeholder="Select a career" />
            </SelectTrigger>
            <SelectContent>
              {professions.map((profession) => (
                <SelectItem
                  value={profession.name}
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
            Business
          </label>
          <Select
            value={formData.business}
            onValueChange={handleSelectChange("business")}
          >
            <SelectTrigger id="business">
              <SelectValue placeholder="Select a business" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="media">Media & Entertainment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Link href="/profile">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
