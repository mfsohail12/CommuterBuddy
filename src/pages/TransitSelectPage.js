import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useUser from "../hooks/useUser";
import useRoute from "../hooks/useRoute";
import { FaArrowLeftLong } from "react-icons/fa6";

function TransitSelectPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { university } = location.state || {};
  const user = useUser();
  const { route, loading: routeLoading } = useRoute();

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

  const getUniversityName = (universityId) => {
    const uni = universities.find((u) => u.id === universityId);
    return uni ? uni.name : universityId;
  };

  useEffect(() => {
    if (!user || !route || routeLoading) return;

    const loadCommuteOptions = async () => {
      try {
        // Mock data
        const mockRoutes = [
          {
            id: -1,
            userName: "Alice",
            transitNumber: "Bus 29",
            stationAddress: "55 Bloor St W",
            departureTime: "08:00:00", // creates Date with current date and time
            lat: 43.6677,
            lng: -79.3948,
            university: "UofT",
          },
        ];

        // Load real data from Supabase
        const { data: routes, error } = await supabase
          .from("commute_requests")
          .select("*")
          .neq("user_id", user.id)
          .eq("university", university)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading commute requests:", error);
          setOptions(mockRoutes);
        } else {
          // Transform real data to match expected format
          const transformedRoutes = routes.map((item) => ({
            id: item.id,
            userName: item.name,
            transitNumber: item.bus_number,
            stationAddress: item.university_address,
            departureTime: item.departure_time,
            lat: item.latitude,
            lng: item.longitude,
            university: item.university,
          }));

          // Combine mock data with real data
          const combinedRoutes = [...mockRoutes, ...transformedRoutes];

          setOptions(combinedRoutes);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadCommuteOptions();
  }, [university, user, route, routeLoading]);

  const handleNext = () => {
    if (selectedOption) {
      navigate("/connect", { state: { buddy: selectedOption } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <button
          className="absolute top-9 left-6 flex justify-center items-center gap-3 text-white"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong className="text-lg" />
          <p className="font-bold text-md">Go back</p>
        </button>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading commute options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
      <button
        className="absolute top-9 left-6 flex justify-center items-center gap-3 text-white"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="text-lg" />
        <p className="font-bold text-md">Go back</p>
      </button>
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Select Transit Option
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            {university
              ? `Going to ${getUniversityName(university)}`
              : "Available commute options"}
          </p>

          {options.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No commute options available for {getUniversityName(university)}
              </p>
              <button
                onClick={() => navigate("/university")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Go Back
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedOption?.id === option.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {option.userName}
                        </h3>
                        <div className="space-y-1 text-gray-600">
                          <p>
                            <strong>Transit:</strong> {option.transitNumber}
                          </p>
                          <p>
                            <strong>Destination:</strong>{" "}
                            {option.stationAddress}
                          </p>
                          <p>
                            <strong>Departure:</strong> {option.departureTime}
                          </p>
                          {option.university && (
                            <p>
                              <strong>University:</strong>{" "}
                              {getUniversityName(option.university)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          name="transit"
                          checked={selectedOption?.id === option.id}
                          onChange={() => setSelectedOption(option)}
                          className="w-4 h-4 text-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  selectedOption
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransitSelectPage;
