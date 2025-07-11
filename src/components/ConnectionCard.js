import React, { useEffect, useState } from "react";
import useRoute from "../hooks/useRoute";
import { FaTrainSubway } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";

const ConnectionCard = ({ option, selectedOption, setSelectedOption }) => {
  const [sameBus, setSameBus] = useState(false);
  const [sameDestination, setSameDestination] = useState(false);
  const { route } = useRoute();

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
    if (!route) return;

    if (route.bus_number === option.bus_number) {
      setSameBus(true);
    }
    if (route.university_address === option.university_address) {
      setSameDestination(true);
    }
  }, [route]);

  return (
    <div
      onClick={() => setSelectedOption(option)}
      className={`p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        selectedOption?.id === option.id
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      } ${sameBus || sameDestination ? "bg-green-200" : "bg-white"}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {option.name}
          </h3>
          <div className="space-y-1 text-gray-600 flex flex-col items-start">
            <p
              className={
                "flex justify-center items-center gap-4" +
                (sameBus ? " text-green-600" : "")
              }
            >
              <FaTrainSubway />
              <span>
                <strong>Transit:</strong> {option.bus_number}
              </span>
            </p>
            <p
              className={
                "flex justify-center items-center gap-4" +
                (sameDestination ? " text-green-600" : "")
              }
            >
              <FaLocationDot />
              <span>
                <strong>Destination:</strong>{" "}
                {option.university_address.length < 40
                  ? option.university_address
                  : option.university_address.substring(0, 40).trim() + " ..."}
              </span>
            </p>
            <p className="flex justify-center items-center gap-4">
              <FaClock />
              <span>
                <strong>Departure:</strong> {option.departure_time}
              </span>
            </p>
            {option.university && (
              <p className="flex justify-center items-center gap-4">
                <FaUniversity />
                <span>
                  <strong>University:</strong>{" "}
                  {getUniversityName(option.university)}
                </span>
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
  );
};

export default ConnectionCard;
