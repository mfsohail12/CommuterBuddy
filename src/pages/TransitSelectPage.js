import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TransitSelectPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { university } = location.state || {};

  const options = [
    { 
      id: 1, 
      userName: 'Alice', 
      transitNumber: 'Bus 29', 
      stationAddress: '55 Bloor St W', 
      departureTime: '8:00 AM', 
      lat: 43.6677, 
      lng: -79.3948 
    },
    { 
      id: 2, 
      userName: 'Bob', 
      transitNumber: 'Metro Line 1', 
      stationAddress: 'St. George Station', 
      departureTime: '8:15 AM', 
      lat: 43.6629, 
      lng: -79.3957 
    },
  ];

  const handleNext = () => {
    if (selectedOption) {
      navigate('/connect', { state: { buddy: selectedOption } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Select Transit Option
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Going to {university}
          </p>
          
          <div className="space-y-4 mb-8">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedOption?.id === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {option.userName}
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p><strong>Transit:</strong> {option.transitNumber}</p>
                      <p><strong>Station:</strong> {option.stationAddress}</p>
                      <p><strong>Departure:</strong> {option.departureTime}</p>
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
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransitSelectPage;
