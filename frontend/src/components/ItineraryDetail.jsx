import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ItineraryDetail() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/itineraries/${id}`)
      .then((res) => {
        setItinerary(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading itinerary:", err);
        setError("Failed to load itinerary");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading itinerary...</div>;
  if (error) return <div>{error}</div>;
  if (!itinerary) return <div>No itinerary found.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{itinerary.name}</h1>
      <p className="text-gray-600 mb-1">Region: {itinerary.region}</p>
      <p className="text-gray-600 mb-1">Nights: {itinerary.nights}</p>
      <p className="text-yellow-600 mb-4">
        Rating: {itinerary.rating.toFixed(1)} ⭐
      </p>

      <hr className="mb-4" />

      {itinerary.day_plans.map((day, index) => (
        <div key={index} className="mb-6 border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Day {day.day_number}</h2>

          {/* Hotel */}
          {day.hotel && (
            <div className="mb-2">
              <p className="font-medium">Hotel:</p>
              <p>
                {day.hotel.name} ({day.hotel.location})
              </p>
            </div>
          )}

          {/* Activities */}
          {day.activities && day.activities.length > 0 && (
            <div className="mb-2">
              <p className="font-medium">Activities:</p>
              <ul className="list-disc ml-6">
                {day.activities.map((activity, idx) => (
                  <li key={idx}>
                    <strong>{activity.name}</strong>: {activity.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Transfers */}
          {day.transfers && day.transfers.length > 0 && (
            <div className="mb-2">
              <p className="font-medium">Transfers:</p>
              <ul className="list-disc ml-6">
                {day.transfers.map((transfer, idx) => (
                  <li key={idx}>
                    {transfer.mode} from {transfer.from_location} to{" "}
                    {transfer.to_location}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ItineraryDetail;
