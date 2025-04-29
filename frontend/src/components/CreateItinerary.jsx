import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateItinerary = () => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [nights, setNights] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItinerary = { name, region, nights };

    axios
      .post("http://localhost:8000/itineraries/", newItinerary)
      .then((response) => {
        navigate(`/itinerary/${response.data.id}`);
      })
      .catch((error) => console.error("Error creating itinerary:", error));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create New Itinerary
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region:
          </label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nights:
          </label>
          <input
            type="number"
            value={nights}
            min="1"
            onChange={(e) => setNights(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Create Itinerary
        </button>
      </form>
    </div>
  );
};

export default CreateItinerary;
