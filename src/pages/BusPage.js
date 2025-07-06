// src/pages/BusPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; // Make sure this path is correct

function BusPage() {
  const [busNumber, setBusNumber] = useState("");
  const [busTime, setBusTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      const { data, error } = await supabase
        .from("bus_number") // Make sure this table has a column for time too!
        .insert([{ 
          busNumber: busNumber,
          time: busTime, // replace 'time' with your actual column name if different
        }]);

      if (error) throw error;

      console.log("✅ Bus details saved:", data);
      navigate("/transit");
    } catch (err) {
      console.error("❌ Supabase insert error:", err.message);
      setError("Failed to save your bus details. Please try again.");
    }
  };

  return (
    <div className="bus-page min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Which major bus do you take to school?</h2>

      <input
        type="text"
        placeholder="Enter bus number (e.g., 7, 301A)"
        value={busNumber}
        onChange={(e) => setBusNumber(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-64"
      />

      <input
        type="time"
        value={busTime}
        onChange={(e) => setBusTime(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-64"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleNext}
        disabled={!busNumber || !busTime}
        className={`px-6 py-2 rounded ${
          busNumber && busTime
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default BusPage;