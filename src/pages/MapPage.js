import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaBus } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { FaTrain } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapPage() {
  const location = useLocation();
  const { buddy } = location.state || {};
  const navigate = useNavigate();

  // parsing transitNumber to determine transit type
  const trainRegex = /\b(train)\b/i;
  const subwayMetroRegex = /\b(subway|metro)\b/i;
  let transitType = "";
  if (trainRegex.test(buddy.transitNumber)) {
    transitType = "train";
  } else if (subwayMetroRegex.test(buddy.transitNumber)) {
    transitType = "subwayMetro";
  }

  if (!buddy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No buddy information available
          </h2>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#528CF7] to-[#786AF1]">
      <div className="shadow-lg p-4">
        <button
          className="absolute top-3 left-5 flex justify-center items-center gap-3 text-white"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong className="text-lg" />
          <p className="font-bold text-md">Go back</p>
        </button>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">
            Your CommuterBuddy is{" "}
            <span className="text-yellow-500">{buddy.userName}</span>!
          </h1>
          <div className="flex flex-wrap gap-5 text-sm text-white justify-center items-center">
            <span className="flex justify-center items-center gap-2">
              {transitType == "train" ? (
                <FaTrain className="text-lg" />
              ) : transitType == "subwayMetro" ? (
                <FaTrainSubway className="text-lg" />
              ) : (
                <FaBus className="text-lg" />
              )}
              <span>
                <strong>Shared transit:</strong> {buddy.transitNumber}
              </span>
            </span>
            <span className="flex justify-center items-center gap-2">
              <FaClock className="text-lg" />
              <span>
                <strong>Departure:</strong> {buddy.departureTime}
              </span>
            </span>
            <span className="flex justify-center items-center gap-2">
              <FaLocationDot className="text-lg" />
              <span>
                <strong>Station:</strong> {buddy.stationAddress}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden h-full w-screen">
        <MapContainer
          center={[buddy.lat, buddy.lng]}
          zoom={15}
          style={{ height: "640px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[buddy.lat, buddy.lng]}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{buddy.userName}</h3>
                <p className="text-sm text-gray-600">{buddy.transitNumber}</p>
                <p className="text-sm text-gray-600">{buddy.stationAddress}</p>
                <p className="text-sm font-medium text-blue-600">
                  Departure: {buddy.departureTime}
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
