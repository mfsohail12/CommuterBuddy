import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useRoute from "../hooks/useRoute";
import useUser from "../hooks/useUser";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

function BusPage() {
  const [formData, setFormData] = useState({
    university: "",
    universityAddress: "",
    lat: "",
    long: "",
    busNumber: "",
    departureTime: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { route, loading: routeLoading } = useRoute();
  const user = useUser();

  const universities = [
    { id: "UofT", name: "University of Toronto" },
    { id: "York", name: "York University" },
    { id: "TMU", name: "Toronto Metropolitan University" },
    { id: "UBC", name: "University of British Columbia" },
    { id: "McGill", name: "McGill University" },
    { id: "UWaterloo", name: "University of Waterloo" },
    { id: "McMaster", name: "McMaster University" },
    { id: "Queens", name: "Queen's University" },
    { id: "Western", name: "Western University" },
    { id: "UAlberta", name: "University of Alberta" },
    { id: "UCalgary", name: "University of Calgary" },
    { id: "UOttawa", name: "University of Ottawa" },
    { id: "Carleton", name: "Carleton University" },
    { id: "SFU", name: "Simon Fraser University" },
    { id: "Concordia", name: "Concordia University" },
    { id: "UQAM", name: "Université du Québec à Montréal" },
    { id: "UManitoba", name: "University of Manitoba" },
    { id: "USask", name: "University of Saskatchewan" },
    { id: "MUN", name: "Memorial University" },
    { id: "Dalhousie", name: "Dalhousie University" },
    { id: "UNB", name: "University of New Brunswick" },
    { id: "UPEI", name: "University of Prince Edward Island" },
    { id: "StFX", name: "St. Francis Xavier University" },
    { id: "UVic", name: "University of Victoria" },
    { id: "UNBC", name: "University of Northern British Columbia" },
    { id: "OCAD", name: "OCAD University" },
  ];

  // Pre-fill form if user has an existing route
  useEffect(() => {
    if (route && !routeLoading) {
      setIsUpdating(true);
      setFormData({
        name: route.name || "",
        university: route.university || "",
        universityAddress: route.university_address || "",
        busNumber: route.bus_number || "",
        departureTime: route.departure_time || "",
      });
    }
  }, [route, routeLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) {
        throw new Error("You must be logged in to manage your route");
      }

      // check if all form data is present
      for (let key in formData) {
        if (formData[key] === "") {
          throw new Error("Missing data " + key);
        }
      }

      console.log(`${isUpdating ? "Updating" : "Creating"} route:`, {
        ...formData,
        name: user.full_name,
      });

      if (isUpdating && route) {
        // Update existing route
        const { data, error } = await supabase
          .from("commute_requests")
          .update({
            university: formData.university,
            university_address: formData.universityAddress,
            bus_number: formData.busNumber,
            departure_time: formData.departureTime,
            latitude: formData.lat,
            longitude: formData.long,
          })
          .eq("id", route.id)
          .eq("user_id", user.id);

        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }

        console.log("✅ Route updated successfully:", data);
      } else {
        // Create new route
        const { data, error } = await supabase.from("commute_requests").insert([
          {
            user_id: user.id,
            name: user.full_name,
            university: formData.university,
            university_address: formData.universityAddress,
            bus_number: formData.busNumber,
            departure_time: formData.departureTime,
            latitude: formData.lat,
            longitude: formData.long,
          },
        ]);

        if (error) {
          console.error("Supabase insert error:", error);
          throw error;
        }

        console.log("✅ Route created successfully:", data);
      }

      navigate("/");
    } catch (err) {
      console.error("❌ Error managing route:", err);
      setError(
        `Failed to ${isUpdating ? "update" : "save"} your route: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = async (e) => {
    const query = e.target.value;
    setFormData({
      ...formData,
      universityAddress: query,
      lat: "", // reset lat and long since new address is being typed in
      long: "",
    });

    if (query.length < 3) return;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        fetchSuggestions(query);
      }, 500)
    );
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const result = await response.json();

      console.log(result);

      if (result.length > 3) {
        setSuggestions(result.slice(0, 3));
      } else {
        setSuggestions(result);
      }
    } catch (error) {
      console.log("Error fetching address suggestions: ", error);
      setError("There was an error fetching address suggestions: " + error);
    }
  };

  const formatDisplayName = (name) => {
    const parts = name.split(",");
    return parts.slice(0, 3).join(",").trim();
  };

  if (routeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading your route...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Go Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="flex justify-center items-center gap-3 text-white hover:text-blue-200 transition-colors"
        >
          <FaArrowLeftLong className="text-lg" />
          <p className="font-bold text-md">Go back</p>
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isUpdating ? "Update Your Route" : "Add Your Route"}
            </h2>

            {!user && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                Please log in to manage your route
              </div>
            )}

            {isUpdating && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                You're updating your existing route. Change any details below.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University
                </label>
                <select
                  required
                  value={formData.university}
                  onChange={(e) =>
                    setFormData({ ...formData, university: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select your university</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.universityAddress}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="e.g., 27 King's College Circle, Toronto"
                />
                <div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="py-1 px-3 hover:bg-slate-200 flex gap-3 items-center w-full"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          universityAddress: formatDisplayName(
                            suggestion.display_name
                          ),
                          lat: suggestion.lat,
                          long: suggestion.lon,
                        });
                        setSuggestions([]);
                      }}
                    >
                      <FaLocationDot className="text-md" />
                      <p className="text-sm text-left">
                        {formatDisplayName(suggestion.display_name)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bus/Transit Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.busNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, busNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Bus 29, Metro Line 1"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time
                </label>
                <input
                  type="time"
                  required
                  value={formData.departureTime}
                  onChange={(e) =>
                    setFormData({ ...formData, departureTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !user}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? isUpdating
                    ? "Updating..."
                    : "Saving..."
                  : isUpdating
                  ? "Update Route"
                  : "Save Route"}
              </button>
            </form>

            <div className="mt-4">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusPage;
