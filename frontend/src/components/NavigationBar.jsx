// components/NavigationBar.js
import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => (
  <nav className="px-6 py-4 bg-[#111928] text-white flex justify-center items-center">
    <div className="flex items-center justify-between gap-12">
      <h2>
        <Link to="/">Home</Link>
      </h2>
      <h2>
        <Link to="/create">Create</Link>
      </h2>
      <h2>
        <Link to="/recommendations">Recommendations</Link>
      </h2>
    </div>
  </nav>
);

export default NavigationBar;
