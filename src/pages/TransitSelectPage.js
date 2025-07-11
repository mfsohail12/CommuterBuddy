import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useUser from "../hooks/useUser";
import useRoute from "../hooks/useRoute";
import { FaArrowLeftLong } from "react-icons/fa6";
import ConnectionCard from "../components/ConnectionCard";

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

  // Mock data
  const mockRoutes = [
    {
      id: -1,
      name: "Alice",
      bus_number: "Bus 29",
      university_address: "55 Bloor St W",
      departure_time: "08:00",
      latitude: 43.6677,
      longitude: -79.3948,
      university: "UofT",
    },
    {
      id: -2,
      name: "Brian",
      bus_number: "Subway 2",
      university_address: "200 Finch Ave W",
      departure_time: "09:15",
      latitude: 43.7824,
      longitude: -79.4422,
      university: "UofT",
    },
    {
      id: -3,
      name: "Chloe",
      bus_number: "Bus 196",
      university_address: "4700 Keele St",
      departure_time: "07:45",
      latitude: 43.7735,
      longitude: -79.5019,
      university: "York",
    },
    {
      id: -4,
      name: "Daniel",
      bus_number: "Streetcar 505",
      university_address: "350 Victoria St",
      departure_time: "08:30",
      latitude: 43.6576,
      longitude: -79.3785,
      university: "TMU",
    },
    {
      id: -5,
      name: "Ella",
      bus_number: "Bus 480",
      university_address: "2329 West Mall",
      departure_time: "09:00",
      latitude: 49.2606,
      longitude: -123.246,
      university: "UBC",
    },
    {
      id: -6,
      name: "Felix",
      bus_number: "Metro Orange",
      university_address: "845 Sherbrooke St W",
      departure_time: "08:20",
      latitude: 45.5048,
      longitude: -73.5772,
      university: "McGill",
    },
    {
      id: -7,
      name: "Grace",
      bus_number: "Bus 7",
      university_address: "200 University Ave W",
      departure_time: "07:50",
      latitude: 43.4723,
      longitude: -80.5449,
      university: "UWaterloo",
    },
    {
      id: -8,
      name: "Henry",
      bus_number: "Bus 51",
      university_address: "1280 Main St W",
      departure_time: "09:10",
      latitude: 43.2609,
      longitude: -79.9192,
      university: "McMaster",
    },
    {
      id: -9,
      name: "Isla",
      bus_number: "Train VIA 62",
      university_address: "99 University Ave",
      departure_time: "08:05",
      latitude: 44.2253,
      longitude: -76.4951,
      university: "Queens",
    },
    {
      id: -10,
      name: "Jack",
      bus_number: "Bus 2",
      university_address: "1151 Richmond St",
      departure_time: "07:30",
      latitude: 43.0096,
      longitude: -81.2737,
      university: "Western",
    },
    {
      id: -11,
      name: "Kira",
      bus_number: "LRT 202",
      university_address: "2500 University Dr NW",
      departure_time: "08:40",
      latitude: 51.078,
      longitude: -114.1324,
      university: "UCalgary",
    },
    {
      id: -12,
      name: "Liam",
      bus_number: "Bus 94",
      university_address: "75 Laurier Ave E",
      departure_time: "09:20",
      latitude: 45.4231,
      longitude: -75.6831,
      university: "UOttawa",
    },
  ];

  const getUniversityName = (universityId) => {
    const uni = universities.find((u) => u.id === universityId);
    return uni ? uni.name : universityId;
  };

  useEffect(() => {
    if (!user || !route || routeLoading) return;

    const calculateMatchScore = (option, route) => {
      let score = 0;

      if (
        option.bus_number === route.bus_number &&
        option.departure_time === route.departure_time
      )
        score += 2;
      if (option.bus_number === route.bus_number) score += 1;
      if (option.university_address === route.university_address) score += 1;

      return score;
    };

    const loadCommuteOptions = async () => {
      try {
        const filterMockRoutes = mockRoutes.filter(
          (route) => route.university === university
        );

        // Load real data from Supabase
        const { data: routes, error } = await supabase
          .from("commute_requests")
          .select("*")
          .neq("user_id", user.id)
          .eq("university", university)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading commute requests:", error);
          setOptions(
            filterMockRoutes.sort((a, b) => {
              const scoreA = calculateMatchScore(a, route);
              const scoreB = calculateMatchScore(b, route);

              return scoreB - scoreA;
            })
          );
        } else {
          // Transform real data to match expected format
          const transformedRoutes = routes.map((item) => ({
            id: item.id,
            name: item.name,
            bus_number: item.bus_number,
            university_address: item.university_address,
            departure_time: item.departure_time.substring(0, 5),
            latitude: item.latitude,
            longitude: item.longitude,
            university: item.university,
          }));

          // Combine mock data with real data
          const combinedRoutes = [...filterMockRoutes, ...transformedRoutes];

          setOptions(
            combinedRoutes.sort((a, b) => {
              const scoreA = calculateMatchScore(a, route);
              const scoreB = calculateMatchScore(b, route);

              return scoreB - scoreA;
            })
          );
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
          onClick={() => navigate("/university")}
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
        onClick={() => navigate("/university")}
      >
        <FaArrowLeftLong className="text-lg" />
        <p className="font-bold text-md">Go back</p>
      </button>
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Choose Someone to Connect With
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
                  <ConnectionCard
                    key={option.id}
                    option={option}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
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
