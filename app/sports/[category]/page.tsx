import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Trophy, Users, MapPin, Star } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function SportsCategoryPage({ params }: PageProps) {
  const session = (await auth()) || {};
  const { category } = await params;

  // Define valid categories
  const validCategories = ["football", "basketball", "athletics", "swimming", "tennis", "volleyball"];
  
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Category data
  const categoryData: Record<string, any> = {
    football: {
      name: "Football",
      icon: "⚽",
      description: "Professional football academies and talent development programs across Tanzania.",
      academies: [
        { name: "Elite Football Academy", location: "Dar es Salaam", rating: 4.8, students: 150 },
        { name: "Young Stars FC Academy", location: "Mwanza", rating: 4.6, students: 120 },
        { name: "Future Champions Football", location: "Arusha", rating: 4.7, students: 95 }
      ],
      talents: [
        { name: "John Mwalimu", position: "Midfielder", age: 19, location: "Dar es Salaam" },
        { name: "Peter Msigwa", position: "Striker", age: 20, location: "Mwanza" },
        { name: "Emmanuel Kijazi", position: "Defender", age: 18, location: "Arusha" }
      ]
    },
    basketball: {
      name: "Basketball",
      icon: "🏀",
      description: "Basketball training centers and emerging players developing their skills.",
      academies: [
        { name: "Champions Basketball Center", location: "Arusha", rating: 4.6, students: 89 },
        { name: "Hoops Academy", location: "Dar es Salaam", rating: 4.5, students: 75 },
        { name: "Court Kings Training", location: "Dodoma", rating: 4.4, students: 60 }
      ],
      talents: [
        { name: "Grace Kimaro", position: "Point Guard", age: 17, location: "Arusha" },
        { name: "James Mwenda", position: "Center", age: 19, location: "Dar es Salaam" },
        { name: "Sarah Mushi", position: "Shooting Guard", age: 18, location: "Dodoma" }
      ]
    },
    athletics: {
      name: "Athletics",
      icon: "🏃",
      description: "Track and field training programs for sprinters, distance runners, and field event athletes.",
      academies: [
        { name: "Speed Athletics Club", location: "Mwanza", rating: 4.9, students: 120 },
        { name: "Track Masters Academy", location: "Iringa", rating: 4.7, students: 85 },
        { name: "Field Events Center", location: "Mbeya", rating: 4.6, students: 70 }
      ],
      talents: [
        { name: "David Msigwa", position: "Sprinter", age: 21, location: "Mwanza" },
        { name: "Mary Mollel", position: "Long Distance", age: 19, location: "Iringa" },
        { name: "Joseph Kiprotich", position: "High Jump", age: 20, location: "Mbeya" }
      ]
    },
    swimming: {
      name: "Swimming",
      icon: "🏊",
      description: "Swimming academies and aquatic sports training facilities.",
      academies: [
        { name: "Aqua Swimming Academy", location: "Dodoma", rating: 4.7, students: 75 },
        { name: "Blue Wave Swimming", location: "Dar es Salaam", rating: 4.5, students: 90 },
        { name: "Dolphin Swim Club", location: "Mwanza", rating: 4.6, students: 65 }
      ],
      talents: [
        { name: "Amina Hassan", position: "Freestyle", age: 18, location: "Dodoma" },
        { name: "Daniel Mwakasege", position: "Butterfly", age: 19, location: "Dar es Salaam" },
        { name: "Fatuma Juma", position: "Backstroke", age: 17, location: "Mwanza" }
      ]
    },
    tennis: {
      name: "Tennis",
      icon: "🎾",
      description: "Tennis coaching and player development with international standard courts.",
      academies: [
        { name: "Tennis Pro Academy", location: "Mbeya", rating: 4.5, students: 95 },
        { name: "Ace Tennis Center", location: "Arusha", rating: 4.4, students: 70 },
        { name: "Grand Slam Academy", location: "Dar es Salaam", rating: 4.6, students: 80 }
      ],
      talents: [
        { name: "Michael Temba", position: "Singles", age: 20, location: "Mbeya" },
        { name: "Linda Mwalimu", position: "Doubles", age: 18, location: "Arusha" },
        { name: "Frank Massawe", position: "Singles", age: 19, location: "Dar es Salaam" }
      ]
    },
    volleyball: {
      name: "Volleyball",
      icon: "🏐",
      description: "Volleyball training and team development programs.",
      academies: [
        { name: "Volleyball Excellence Center", location: "Morogoro", rating: 4.4, students: 110 },
        { name: "Spike Masters Academy", location: "Tanga", rating: 4.3, students: 85 },
        { name: "Net Champions Club", location: "Mtwara", rating: 4.5, students: 75 }
      ],
      talents: [
        { name: "Sarah Mwanga", position: "Setter", age: 19, location: "Morogoro" },
        { name: "Hassan Mwalimu", position: "Spiker", age: 20, location: "Tanga" },
        { name: "Grace Mollel", position: "Libero", age: 18, location: "Mtwara" }
      ]
    }
  };

  const currentCategory = categoryData[category];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center mb-8">
            <Link
              href="/sports"
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Sports
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{currentCategory.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentCategory.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentCategory.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{currentCategory.academies.length}</h3>
              <p className="text-gray-600">Academies</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {currentCategory.academies.reduce((sum: number, academy: any) => sum + academy.students, 0)}
              </h3>
              <p className="text-gray-600">Total Students</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {(currentCategory.academies.reduce((sum: number, academy: any) => sum + academy.rating, 0) / currentCategory.academies.length).toFixed(1)}
              </h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>

          {/* Academies Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {currentCategory.name} Academies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentCategory.academies.map((academy: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {academy.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {academy.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {academy.students} Students
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                      {academy.rating}
                    </div>
                  </div>
                  <Link
                    href={`/sports/academies`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block text-sm"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Talents Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured {currentCategory.name} Talents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentCategory.talents.map((talent: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {talent.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {talent.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{talent.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {talent.location}
                    </div>
                    <div>Age: {talent.age}</div>
                  </div>
                  <Link
                    href={`/sports/talents`}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block text-sm"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Join the {currentCategory.name} Community
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Whether you're looking to train at a professional academy or showcase your 
              {currentCategory.name.toLowerCase()} talents, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sports/academies"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find Academies
              </Link>
              <Link
                href="/sports/talents"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
              >
                View Talents
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
