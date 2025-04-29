import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/itineraries/");
        setItineraries(response.data);
      } catch (err) {
        setError("Failed to load itineraries. Please try again later.");
        console.error("Error fetching itineraries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Explore Our Itineraries
        </h1>
        <p className="text-lg text-gray-600">
          Discover your perfect getaway in Thailand
        </p>
      </div>

      {itineraries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">
            No itineraries found. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {itineraries.map((itinerary) => (
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
      )}
    </div>
  );
};

export default ItineraryList;
