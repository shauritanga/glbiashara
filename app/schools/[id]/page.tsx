"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TotalSlider from "@/components/total_energy";
import NMBSlider from "@/components/nmb-carousel";
import TourismSlider from "@/components/tourism-carousel";
import { Button } from "@/components/ui/button";

export default function SchoolDetails() {
  const router = useRouter();
  const search = useSearchParams();
  console.log({ search });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-6 container mx-auto">
      {/* Left - School Details */}
      <div className="lg:col-span-1 bg-white p-4 rounded shadow">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          ← Back
        </Button>
        <h2 className="text-xl font-bold mb-2">School Info</h2>
        <p>
          <strong>ID:</strong> {}
        </p>
        <p>
          <strong>Name:</strong> Sample School Name
        </p>
        <p>
          <strong>Location:</strong> Sample Location
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Additional details can go here.
        </p>
      </div>

      {/* Middle - Posts */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        <ScrollArea className="max-h-screen rounded border p-4 space-y-4">
          {[...Array(10)].map((_, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <h3 className="font-semibold">Post Title {idx + 1}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>

      {/* Right - Adverts */}
      <div className="lg:col-span-1 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Adverts</h2>
        <div className="space-y-4">
          <div className="col-span-1 flex-col">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold text-gray-800 mb-3">
                Health Care
              </h5>
              <Link
                href="/health/kairuki"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Kairuki Instituteee
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold text-gray-800 mb-3">
                Total Energy
              </h5>
              <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
                <TotalSlider />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h5 className="text-lg font-semibold text-gray-800 mb-3">
              NMB Bank
            </h5>
            <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
              <NMBSlider />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h5 className="text-lg font-semibold text-gray-800 mb-3">
              Tourism & Tourist Sites
            </h5>
            <Link href="/tourism/zanzibar">
              <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
                <TourismSlider />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
