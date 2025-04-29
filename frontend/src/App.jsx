import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItineraryList from "./components/ItineraryList";
import CreateItinerary from "./components/CreateItinerary";
import ItineraryDetails from "./components/ItineraryDetails";
import MCPRecommendations from "./components/MCPRecommendations";
import NavigationBar from "./components/NavigationBar";
import ItineraryDetail from "./components/ItineraryDetail";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ItineraryList />} />
        <Route path="/create" element={<CreateItinerary />} />
        <Route path="/itineraries/:id" element={<ItineraryDetails />} />
        <Route path="/recommendations" element={<MCPRecommendations />} />
        <Route path="/itinerary/:id" element={<ItineraryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
