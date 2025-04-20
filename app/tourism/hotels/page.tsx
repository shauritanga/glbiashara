"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hotels() {
  const router = useRouter();
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
  });

  const hotels = [
    {
      name: "Zanzibar Serena Hotel",
      location: "Stone Town, Zanzibar",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/da/77/e6/the-hotel-v18372780.jpg?w=1800&h=1000&s=1",
      description: "Luxury oceanfront hotel with historic Swahili charm.",
      rating: 4.8,
    },
    {
      name: "Ngorongoro Serena Safari Lodge",
      location: "Ngorongoro Crater",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      description:
        "Stunning views of the crater with world-class safari experiences.",
      rating: 4.7,
    },
    {
      name: "Four Seasons Safari Lodge",
      location: "Serengeti National Park",
      image: "https://images.unsplash.com/photo-1561501878-aabd62634533",
      description: "Luxury lodge in the heart of the Serengeti.",
      rating: 4.9,
    },
    {
      name: "Arusha Coffee Lodge",
      location: "Arusha",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-s/01/bb/1d/06/arusha-coffee-lodge.jpg?w=600&h=-1&s=1",
      description: "Charming plantation-style lodge near Kilimanjaro.",
      rating: 4.5,
    },
    {
      name: "Essque Zalu Zanzibar",
      location: "Nungwi, Zanzibar",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/2d/bd/8c/essque-zalu-zanzibar.jpg?w=1800&h=-1&s=1",
      description: "Beachfront resort with modern amenities and infinity pool.",
      rating: 4.6,
    },
    {
      name: "Kilimanjaro Wonders Hotel",
      location: "Moshi",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/90/6e/a4/kilimanjaro-wonders-hotel.jpg?w=2000&h=-1&s=1",
      description:
        "Comfortable base for Kilimanjaro treks with mountain views.",
      rating: 4.4,
    },
    {
      name: "Tulia Zanzibar Unique Beach Resort",
      location: "Pongwe, Zanzibar",
      image: "https://images.unsplash.com/photo-1607444807093-eefb769187da",
      description: "Exclusive beach resort with personalized service.",
      rating: 4.8,
    },
    {
      name: "Lake Manyara Serena Safari Lodge",
      location: "Lake Manyara",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/54/92/01/aerial-view-of-lake-manyara.jpg?w=1400&h=800&s=1",
      description: "Treehouse-style lodge overlooking the Rift Valley.",
      rating: 4.6,
    },
    {
      name: "The Residence Zanzibar",
      location: "Kizimkazi, Zanzibar",
      image: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd",
      description:
        "Private villas with direct beach access and luxury amenities.",
      rating: 4.9,
    },
    {
      name: "Gran Melia Arusha",
      location: "Arusha",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/4c/1d/d5/caption.jpg?w=1400&h=800&s=1",
      description: "Modern hotel with lush gardens and safari tour options.",
      rating: 4.7,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hotel booking:", formData);
    alert("Hotel booking submitted!");
    setSelectedHotel(null); // Close form after submission
    setFormData({
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      rooms: 1,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectHotel = (hotelName: string) => {
    setSelectedHotel(hotelName);
    setFormData({ ...formData, destination: hotelName });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
          >
            Back
          </button>
          <h1 className="text-3xl font-bold">Tanzania Hotels</h1>
        </div>

        {!selectedHotel ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Choose Your Hotel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.name}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => selectHotel(hotel.name)}
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {hotel.location}
                    </p>
                    <p className="text-gray-700 mb-2">{hotel.description}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500">
                        {"★".repeat(Math.floor(hotel.rating))}
                      </span>
                      <span className="text-gray-600 ml-2">
                        ({hotel.rating})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => setSelectedHotel(null)}
              className="mb-4 text-blue-600 hover:underline"
            >
              ← Back to Hotels
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Book {selectedHotel}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <label
                  htmlFor="destination"
                  className="block text-gray-700 mb-2"
                >
                  Hotel
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="checkIn" className="block text-gray-700 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="checkOut" className="block text-gray-700 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="guests" className="block text-gray-700 mb-2">
                  Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="rooms" className="block text-gray-700 mb-2">
                  Rooms
                </label>
                <select
                  id="rooms"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  {[...Array(5)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Book Hotel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
