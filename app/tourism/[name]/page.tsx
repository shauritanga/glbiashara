"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Tourism() {
  const router = useRouter();
  const destinations = [
    {
      name: "Serengeti National Park",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      description:
        "Witness the Great Migration and incredible wildlife in this world-famous park.",
    },
    {
      name: "Zanzibar Beaches",
      image:
        "https://images.unsplash.com/photo-1607444807093-eefb769187da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHphbnppYmFyfGVufDB8fDB8fHww",
      description:
        "Pristine white sand beaches and turquoise waters perfect for relaxation.",
    },
    {
      name: "Mount Kilimanjaro",
      image:
        "https://images.unsplash.com/photo-1668693304858-545cc90dbfe7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQzfHxraWxpbWFuamFyb3xlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Africa's highest peak, offering challenging treks and stunning views.",
    },
    {
      name: "Ngorongoro Crater",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/90/bb/99/standing-at-the-edge.jpg?w=1400&h=800&s=1",
      description:
        "A UNESCO World Heritage Site with a dense concentration of wildlife in a volcanic caldera.",
    },
    {
      name: "Stone Town, Zanzibar",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/a7/96/6c/photo2jpg.jpg?w=1400&h=800&s=1",
      description:
        "Historic Swahili trading hub with vibrant markets and coral stone architecture.",
    },
    {
      name: "Lake Manyara National Park",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/b9/54/c1/good-looking-of-giraffe.jpg?w=700&h=400&s=1",
      description:
        "Famous for tree-climbing lions and flocks of flamingos along the lake.",
    },
    {
      name: "Selous Game Reserve",
      image:
        "https://images.unsplash.com/photo-1673283882405-8fae936a0e52?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFNlbG91cyUyMEdhbWUlMjBSZXNlcnZlfGVufDB8fDB8fHww",
      description:
        "One of the largest protected areas in Africa, ideal for boat safaris and wildlife viewing.",
    },
    {
      name: "Tarangire National Park",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/a8/51/0b/buffaloes.jpg?w=2000&h=-1&s=1",
      description:
        "Known for its large elephant herds and iconic baobab trees.",
    },
    {
      name: "Mafia Island",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/9d/42/c9/mafia-beach.jpg?w=2200&h=800&s=1",
      description:
        "A pristine marine park perfect for diving and snorkeling with vibrant coral reefs.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button
              onClick={() => router.back()}
              className="bg-white text-blue-600 px-3 py-1.5 rounded text-sm sm:text-base hover:bg-gray-200"
            >
              Back
            </button>
            <h1 className="text-xl sm:text-2xl font-bold">Tanzania Tourism</h1>
          </div>
          <div className="flex space-x-4 text-sm sm:text-base">
            <Link href="/tourism/flights" className="hover:underline">
              Book Flights
            </Link>
            <Link href="/tourism/hotels" className="hover:underline">
              Book Hotels
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Explore Tanzania's Wonders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {dest.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
