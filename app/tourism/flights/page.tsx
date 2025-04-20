"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Flights() {
  const router = useRouter();
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: 1,
  });

  const flights = [
    {
      airline: "Emirates",
      from: "Dubai (DXB)",
      to: "Dar es Salaam (DAR)",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1585865311579-f3612f824eac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEVtaXJhdGVzfGVufDB8fDB8fHww",
      duration: "5h 30m",
    },
    {
      airline: "Qatar Airways",
      from: "Doha (DOH)",
      to: "Zanzibar (ZNZ)",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1630311395569-198c3e65b2fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UWF0YXIlMjBBaXJ3YXlzfGVufDB8fDB8fHww",
      duration: "6h 15m",
    },
    {
      airline: "Ethiopian Airlines",
      from: "Addis Ababa (ADD)",
      to: "Dar es Salaam (DAR)",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1725300554935-51da71f0a9dd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXRoaW9waWElMjBhaXJsaW5lfGVufDB8fDB8fHww",
      description: "Reliable service with great connectivity in Africa.",
      duration: "2h 45m",
    },
    {
      airline: "Turkish Airlines",
      from: "Istanbul (IST)",
      to: "Kilimanjaro (JRO)",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1687340517347-773971d44fc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFR1cmtpc2glMjBBaXJ3YXlzfGVufDB8fDB8fHww",
      duration: "7h 20m",
    },
    {
      airline: "Kenya Airways",
      from: "Nairobi (NBO)",
      to: "Dar es Salaam (DAR)",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1542592302-02182e073f78?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fEtlbnlhJTIwQWlyd2F5c3xlbnwwfHwwfHx8MA%3D%3D",
      duration: "1h 15m",
    },
    {
      airline: "British Airways",
      from: "London (LHR)",
      to: "Dar es Salaam (DAR)",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1479209749439-1f3a483ad0bc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJyaXRpc2glMjBhaXJ3YXlzfGVufDB8fDB8fHww",
      duration: "9h 45m",
    },
    {
      airline: "KLM",
      from: "Amsterdam (AMS)",
      to: "Kilimanjaro (JRO)",
      price: 620,
      image:
        "https://images.unsplash.com/photo-1646858994608-10728aee0939?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEtMTXxlbnwwfHwwfHx8MA%3D%3D",
      duration: "8h 50m",
    },
    {
      airline: "South African Airways",
      from: "Johannesburg (JNB)",
      to: "Zanzibar (ZNZ)",
      price: 390,
      image: "https://images.unsplash.com/photo-1543269865-0a740d43b90c",
      duration: "3h 30m",
    },
    {
      airline: "Etihad Airways",
      from: "Abu Dhabi (AUH)",
      to: "Dar es Salaam (DAR)",
      price: 460,
      image:
        "https://images.unsplash.com/photo-1631807719683-25f08bb2e296?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXRpaGFkJTIwYWlyd2F5c3xlbnwwfHwwfHx8MA%3D%3D",
      duration: "5h 40m",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Flight booking:", formData);
    alert("Flight booking submitted!");
    setSelectedFlight(null); // Close form after submission
    setFormData({ from: "", to: "", departure: "", return: "", passengers: 1 });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectFlight = (flight: { from: string; to: string }) => {
    setSelectedFlight(flight.to);
    setFormData({ ...formData, from: flight.from, to: flight.to });
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
          <h1 className="text-3xl font-bold">Flights to Tanzania</h1>
        </div>

        {!selectedFlight ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Choose Your Flight
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flights.map((flight) => (
                <div
                  key={`${flight.airline}-${flight.from}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => selectFlight(flight)}
                >
                  <img
                    src={flight.image}
                    alt={flight.airline}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">
                      {flight.airline}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {flight.from} to {flight.to}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Duration: {flight.duration}
                    </p>
                    <p className="text-green-600 font-bold">
                      From ${flight.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => setSelectedFlight(null)}
              className="mb-4 text-blue-600 hover:underline"
            >
              ← Back to Flights
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Book Your Flight
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <label htmlFor="from" className="block text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="text"
                  id="from"
                  name="from"
                  value={formData.from}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="to" className="block text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={formData.to}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="departure" className="block text-gray-700 mb-2">
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departure"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="return" className="block text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  id="return"
                  name="return"
                  value={formData.return}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="passengers"
                  className="block text-gray-700 mb-2"
                >
                  Passengers
                </label>
                <select
                  id="passengers"
                  name="passengers"
                  value={formData.passengers}
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
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Book Flight
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
