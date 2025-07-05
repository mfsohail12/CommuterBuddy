import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useUser from "../hooks/useUser";

function TransitSelectPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { university } = location.state || {};
  const user = useUser();

  useEffect(() => {
    const loadCommuteOptions = async () => {
      try {
        // Mock data
        const mockOptions = [
          {
            id: 1,
            userName: "Alice",
            transitNumber: "Bus 29",
            stationAddress: "55 Bloor St W",
            departureTime: "8:00 AM",
            lat: 43.6677,
            lng: -79.3948,
            university: "UofT",
          },
          {
            id: 2,
            userName: "Bob",
            transitNumber: "Metro Line 1",
            stationAddress: "St. George Station",
            departureTime: "8:15 AM",
            lat: 43.6629,
            lng: -79.3957,
            university: "UofT",
          },
        ];

        // Load real data from Supabase
        const { data: realData, error } = await supabase
          .from("commute_requests")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading commute requests:", error);
          setOptions(mockOptions);
        } else {
          // Transform real data to match expected format
          const transformedRealData = realData.map((item) => ({
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
          const combinedOptions = [...mockOptions, ...transformedRealData];

          // Filter by university if specified
          const filteredOptions = university
            ? combinedOptions.filter(
                (option) => option.university === university
              )
            : combinedOptions;

          setOptions(filteredOptions);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadCommuteOptions();
  }, [university]);

  const handleNext = () => {
    if (selectedOption) {
      navigate("/connect", { state: { buddy: selectedOption } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading commute options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Select Transit Option
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            {university
              ? `Going to ${university}`
              : "Available commute options"}
          </p>

          {options.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No commute options available for {university}
              </p>
              <button
                onClick={() => navigate("/university")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Go Back
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {options
                  .filter(
                    (option) => option.userName != user.user_metadata?.full_name
                  )
                  .map((option) => (
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
                              <strong>Station:</strong> {option.stationAddress}
                            </p>
                            <p>
                              <strong>Departure:</strong> {option.departureTime}
                            </p>
                            {option.university && (
                              <p>
                                <strong>University:</strong> {option.university}
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
