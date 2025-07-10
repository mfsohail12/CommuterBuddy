import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";

function ConnectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { buddy } = location.state || {};

  const handleConfirm = () => {
    if (buddy) {
      toast.success(`A connection request was sent to ${buddy.userName}!`);
      navigate("/map", { state: { buddy } });
    }
  };

  if (!buddy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <button
          className="absolute top-9 left-6 flex justify-center items-center gap-3 text-white"
          onClick={() => navigate("/transit")}
        >
          <FaArrowLeftLong className="text-lg" />
          <p className="font-bold text-md">Go back</p>
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            No buddy selected
          </h2>
          <button
            onClick={() => navigate("/transit")}
            className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Transit Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <button
        className="absolute top-9 left-6 flex justify-center items-center gap-3 text-white"
        onClick={() => navigate("/transit")}
      >
        <FaArrowLeftLong className="text-lg" />
        <p className="font-bold text-md">Go back</p>
      </button>
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Connect With {buddy.userName}
          </h2>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Connection Details
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Transit:</strong> {buddy.transitNumber}
              </p>
              <p>
                <strong>Departure:</strong> {buddy.departureTime}
              </p>
              <p>
                <strong>Destination:</strong> {buddy.stationAddress}
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Connect with <strong>{buddy.userName}</strong> on{" "}
              <strong>{buddy.transitNumber}</strong> departing at{" "}
              <strong>{buddy.departureTime.substring(0, 5)}</strong>
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
