import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ItineraryDetails = () => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/itineraries/${id}`)
      .then((response) => {
        setItinerary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching itinerary:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to load itinerary details.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-blue-600 p-6">
          <h1 className="text-3xl font-bold text-white">{itinerary.name}</h1>
          <div className="flex items-center mt-2 text-blue-100">
            <span className="mr-4">
              <i className="fas fa-map-marker-alt mr-1"></i> {itinerary.region}
            </span>
            <span>
              <i className="fas fa-moon mr-1"></i> {itinerary.nights} nights
            </span>
          </div>
        </div>

        <div className="p-6">
          {itinerary.day_plans.map((day) => (
            <div key={day.day_number} className="mb-8 last:mb-0">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="font-bold">{day.day_number}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Day {day.day_number}
                </h2>
              </div>

              {day.hotel && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-hotel text-blue-500 mr-2"></i>{" "}
                    Accommodation
                  </h3>
                  <p className="text-gray-800 font-medium">{day.hotel.name}</p>
                </div>
              )}

              {day.activities.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-umbrella-beach text-blue-500 mr-2"></i>{" "}
                    Activities
                  </h3>
                  <ul className="space-y-3">
                    {day.activities.map((activity) => (
                      <li key={activity.id} className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <i className="fas fa-check text-blue-600 text-xs"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {activity.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {activity.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {day.transfers.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-shuttle-van text-blue-500 mr-2"></i>{" "}
                    Transfers
                  </h3>
                  <ul className="space-y-3">
                    {day.transfers.map((transfer) => (
                      <li key={transfer.id} className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <i className="fas fa-route text-blue-600 text-xs"></i>
                        </div>
                        <div>
                          <p className="text-gray-800">
                            <span className="font-medium">
                              {transfer.from_location}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium">
                              {transfer.to_location}
                            </span>{" "}
                            by{" "}
                            <span className="text-blue-600">
                              {transfer.mode}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
