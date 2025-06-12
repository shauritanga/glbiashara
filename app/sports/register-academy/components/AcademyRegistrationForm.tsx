"use client";

import { useActionState } from "react";
import { createSportsAcademy } from "@/actions/sports/academies";
import { getSportsCategories } from "@/actions/sports/categories";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AcademyRegistrationForm() {
  const [state, formAction, isPending] = useActionState(createSportsAcademy, null);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getSportsCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (state?.success) {
      router.push("/sports/academies");
    }
  }, [state, router]);

  const regions = [
    "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi",
    "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro",
    "Mtwara", "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani",
    "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Songwe", "Tabora",
    "Tanga", "Zanzibar Central/South", "Zanzibar North", "Zanzibar Urban/West"
  ];

  return (
    <form action={formAction} className="space-y-6">
      {state?.message && (
        <div className={`p-4 rounded-lg ${
          state.success 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {state.message}
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Academy Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter academy name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your academy, facilities, and training philosophy"
          />
        </div>

        <div>
          <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-1">
            Primary Sport *
          </label>
          <select
            id="sport"
            name="sport"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a sport</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              Region *
            </label>
            <select
              id="region"
              name="region"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              District *
            </label>
            <input
              type="text"
              id="district"
              name="district"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter district"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">
              Ward
            </label>
            <input
              type="text"
              id="ward"
              name="ward"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter ward (optional)"
            />
          </div>

          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="street"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter street address (optional)"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+255 XXX XXX XXX"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="academy@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://www.yourwebsite.com (optional)"
          />
        </div>
      </div>

      {/* Academy Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Academy Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Capacity *
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 100"
            />
          </div>

          <div>
            <label htmlFor="established" className="block text-sm font-medium text-gray-700 mb-1">
              Established Date *
            </label>
            <input
              type="date"
              id="established"
              name="established"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="facilities" className="block text-sm font-medium text-gray-700 mb-1">
            Facilities
          </label>
          <input
            type="text"
            id="facilities"
            name="facilities"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Football pitch, Gym, Changing rooms (comma separated)"
          />
        </div>

        <div>
          <label htmlFor="programs" className="block text-sm font-medium text-gray-700 mb-1">
            Training Programs
          </label>
          <input
            type="text"
            id="programs"
            name="programs"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Youth Development, Professional Training (comma separated)"
          />
        </div>

        <div>
          <label htmlFor="ageGroups" className="block text-sm font-medium text-gray-700 mb-1">
            Age Groups
          </label>
          <input
            type="text"
            id="ageGroups"
            name="ageGroups"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 6-12 years, 13-17 years, 18+ years (comma separated)"
          />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Academy Images</h3>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload photos of your academy, facilities, and training sessions (max 5 images)
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold"
        >
          {isPending ? "Registering Academy..." : "Register Academy"}
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          By registering, you agree to our terms of service and privacy policy. 
          Your academy will be reviewed before being published.
        </p>
      </div>
    </form>
  );
}
