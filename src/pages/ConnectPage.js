import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ConnectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { buddy } = location.state || {};

  const handleConfirm = () => {
    if (buddy) {
      alert(`Connection request sent to ${buddy.userName}!`);
      navigate('/map', { state: { buddy } });
    }
  };

  if (!buddy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No buddy selected
          </h2>
          <button
            onClick={() => navigate('/transit')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Connect with Buddy
          </h2>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Connection Details
            </h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Buddy:</strong> {buddy.userName}</p>
              <p><strong>Transit:</strong> {buddy.transitNumber}</p>
              <p><strong>Departure:</strong> {buddy.departureTime}</p>
              <p><strong>Station:</strong> {buddy.stationAddress}</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Connect with <strong>{buddy.userName}</strong> on{' '}
              <strong>{buddy.transitNumber}</strong> departing{' '}
              <strong>{buddy.departureTime}</strong> from{' '}
              <strong>{buddy.stationAddress}</strong>
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Confirm Connection
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
