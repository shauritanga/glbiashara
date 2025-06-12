"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Database, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seedSampleData } from "@/actions/admin/sports";
import { useRouter } from "next/navigation";

export default function SeedDataForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [state, formAction, isPending] = useActionState(seedSampleData, null);
  const router = useRouter();

  // Handle successful seeding
  if (state?.success) {
    setTimeout(() => {
      router.push("/admin/sports");
    }, 3000);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Seed Sample Data
        </h2>
        <p className="text-gray-600">
          This will populate your sports platform with realistic sample data for testing and demonstration.
        </p>
      </div>

      {state?.message && (
        <div className={`p-4 rounded-lg flex items-start ${
          state.success 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {state.success ? (
            <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <p className="font-medium">{state.message}</p>
            {state.success && (
              <p className="text-sm mt-1">
                Redirecting to admin panel in 3 seconds...
              </p>
            )}
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Confirmation Checkbox */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Data Replacement Warning
              </h3>
              <p className="text-red-800 mb-4">
                This action will permanently delete all existing sports data and replace it with sample data. 
                This includes all academies, talents, categories, reviews, and related information.
              </p>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-red-300 rounded"
                />
                <span className="ml-3 text-red-800">
                  I understand that this action will delete all existing sports data and cannot be undone. 
                  I want to proceed with seeding sample data.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Overview */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sample Data Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Will be created:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 6 Sports Categories</li>
                <li>• 3 Sample Users</li>
                <li>• 3 Sports Academies</li>
                <li>• 3 Talent Profiles</li>
                <li>• Realistic ratings and reviews</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Features demonstrated:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Academy registration and profiles</li>
                <li>• Talent profiles with achievements</li>
                <li>• Search and filtering</li>
                <li>• Review and rating system</li>
                <li>• Contact and messaging</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Sample User Credentials
          </h3>
          <div className="space-y-3 text-sm">
            <div className="bg-white rounded p-3">
              <p className="font-medium text-blue-900">John Mwalimu (Football Talent)</p>
              <p className="text-blue-800">Email: john.mwalimu@example.com</p>
              <p className="text-blue-800">Password: password123</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-medium text-blue-900">Grace Kimaro (Basketball Talent)</p>
              <p className="text-blue-800">Email: grace.kimaro@example.com</p>
              <p className="text-blue-800">Password: password123</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-medium text-blue-900">David Msigwa (Athletics Talent)</p>
              <p className="text-blue-800">Email: david.msigwa@example.com</p>
              <p className="text-blue-800">Password: password123</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!confirmed || isPending}
            className={`px-8 py-3 text-lg font-semibold ${
              confirmed && !isPending
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Seeding Data...
              </>
            ) : (
              <>
                <Database className="h-5 w-5 mr-3" />
                Seed Sample Data
              </>
            )}
          </Button>
        </div>

        {isPending && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              This may take a few moments. Please don't close this page.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
