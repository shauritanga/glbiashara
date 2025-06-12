"use client";

import { useActionState } from "react";
import { createSportsTalent } from "@/actions/sports/talents";
import { getSportsCategories } from "@/actions/sports/categories";
import { getSportsAcademies } from "@/actions/sports/academies";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TalentRegistrationForm() {
  const [state, formAction, isPending] = useActionState(createSportsTalent, null);
  const [categories, setCategories] = useState<any[]>([]);
  const [academies, setAcademies] = useState<any[]>([]);
  const [selectedSport, setSelectedSport] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getSportsCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAcademies = async () => {
      if (selectedSport) {
        const data = await getSportsAcademies({ sport: selectedSport, limit: 50 });
        setAcademies(data.academies);
      }
    };
    fetchAcademies();
  }, [selectedSport]);

  useEffect(() => {
    if (state?.success) {
      router.push("/sports/talents");
    }
  }, [state, router]);

  const levels = ["Beginner", "Intermediate", "Advanced", "Professional"];
  const preferredFootOptions = ["Left", "Right", "Both"];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Sport *
            </label>
            <select
              id="sport"
              name="sport"
              required
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
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

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position/Specialty *
            </label>
            <input
              type="text"
              id="position"
              name="position"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Midfielder, Point Guard, Sprinter"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Skill Level *
            </label>
            <select
              id="level"
              name="level"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Physical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Physical Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              min="100"
              max="250"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 175"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              min="30"
              max="200"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 70"
            />
          </div>

          <div>
            <label htmlFor="preferredFoot" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Foot/Hand
            </label>
            <select
              id="preferredFoot"
              name="preferredFoot"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select preference</option>
              {preferredFootOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
        
        <div>
          <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience *
          </label>
          <input
            type="number"
            id="experienceYears"
            name="experienceYears"
            required
            min="0"
            max="50"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 5"
          />
        </div>

        <div>
          <label htmlFor="experienceDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Experience Description *
          </label>
          <textarea
            id="experienceDescription"
            name="experienceDescription"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your sporting background, training history, and notable experiences"
          />
        </div>

        <div>
          <label htmlFor="currentAcademy" className="block text-sm font-medium text-gray-700 mb-1">
            Current Academy/Club
          </label>
          <select
            id="currentAcademy"
            name="currentAcademy"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select current academy (optional)</option>
            {academies.map((academy) => (
              <option key={academy._id} value={academy._id}>
                {academy.name} - {academy.location.district}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Achievements & Goals</h3>
        
        <div>
          <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">
            Achievements
          </label>
          <textarea
            id="achievements"
            name="achievements"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="List your achievements, awards, and notable performances (comma separated)"
          />
        </div>

        <div>
          <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700 mb-1">
            What are you looking for?
          </label>
          <input
            type="text"
            id="lookingFor"
            name="lookingFor"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Professional Contract, Academy Training, Scholarship (comma separated)"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="willingToRelocate"
              value="true"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I am willing to relocate for the right opportunity
            </span>
          </label>
        </div>
      </div>

      {/* Videos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Highlight Videos</h3>
        <div>
          <label htmlFor="videos" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Videos
          </label>
          <input
            type="file"
            id="videos"
            name="videos"
            multiple
            accept="video/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload highlight videos showcasing your skills (max 3 videos, 50MB each)
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
          {isPending ? "Creating Profile..." : "Create Talent Profile"}
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          By registering, you agree to our terms of service and privacy policy. 
          Your profile will be reviewed before being published.
        </p>
      </div>
    </form>
  );
}
