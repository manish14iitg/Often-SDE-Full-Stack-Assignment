import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MCPRecommendations = () => {
  const [nights, setNights] = useState(3);
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = () => {
    axios
      .get(`http://localhost:8000/mcp/recommendations?nights=${nights}`)
      .then((response) => setRecommendations(response.data))
      .catch((error) =>
        console.error("Error fetching recommendations:", error)
      );
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Get MCP Recommendations</h1>

          <div className="mb-4">
            <label className="block mb-1">Number of Nights:</label>
            <input
              type="number"
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="border p-2 w-full max-w-xs"
            />
          </div>

          <button
            onClick={getRecommendations}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          >
            Get Recommendations
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/itinerary/${itinerary.id}`} className="block">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {itinerary.name}
                </h2>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{itinerary.region || "Thailand"}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {itinerary.nights} nights
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2">
                  {itinerary.description}
                </p>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300">
                  View Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCPRecommendations;
