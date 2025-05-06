"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import TotalSlider from "@/components/total_energy";
import { useRouter } from "next/navigation";
import NMBSlider from "@/components/nmb-carousel";
import TourismSlider from "@/components/tourism-carousel";

const schools = [
  {
    id: 1,
    name: "Hubert Kairuki Memorial University",
    location: "Dar es Salaam",
    image: "/images/kairuki.jpeg",
  },
  {
    id: 2,
    name: "University of Dar es Salaam",
    location: "Dar es Salaam",
    image: "/images/udsm.jpeg",
  },
  {
    id: 3,
    name: "University of Dodoma",
    location: "Dodoma",
    image: "/images/udom.jpeg",
  },
  {
    id: 4,
    name: "Ardhi University",
    location: "Dar es Salaam",
    image: "/images/ardhi.jpeg",
  },
  {
    id: 5,
    name: "St. Augustine University of Tanzania",
    location: "Mwanza",
    image: "/images/sauti.jpeg",
  },
  {
    id: 6,
    name: "State University of Zanzibar",
    location: "Zanzibar",
    image: "/images/suza.jpeg",
  },
  {
    id: 7,
    name: "Mount Meru University",
    location: "Arusha",
    image: "/images/mmu.jpeg",
  },
  {
    id: 8,
    name: "University of Arusha",
    location: "Tuvaila, Arusha",
    image: "/images/uoa.jpeg",
  },
  {
    id: 9,
    name: "Teofilo Kisanji University",
    location: "Mbeya",
    image: "/images/tekki.jpeg",
  },
  {
    id: 10,
    name: "Nelson Mandela African Institution of Science and Technology",
    location: "Arusha",
    image: "/images/nmast.jpeg",
  },
];

export default function SchoolsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredSchools = schools
    .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 container mx-auto">
      <div className="col-span-3 p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            ← Back
          </Button>
          <Input
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setSortAsc(!sortAsc)}>
            Sort {sortAsc ? "↓" : "↑"}
          </Button>
        </div>
        <ScrollArea className="h-[90vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <Card key={school.id} className="overflow-hidden">
                <Image
                  src={school.image}
                  alt={school.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{school.name}</h2>
                  <p className="text-sm text-gray-500">{school.location}</p>
                  <Link
                    href={`/schools/${school.id}`}
                    className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
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

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h5 className="text-lg font-semibold text-gray-800 mb-3">NMB Bank</h5>
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
  );
}
