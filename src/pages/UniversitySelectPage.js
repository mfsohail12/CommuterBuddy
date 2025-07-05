import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UniversitySelectPage() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const navigate = useNavigate();

  const universities = ['UofT', 'York'];

  const handleNext = () => {
    if (selectedUniversity) {
      navigate('/transit', { state: { university: selectedUniversity } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Select Your University
          </h2>
          
          <div className="space-y-4 mb-8">
            {universities.map((university) => (
              <label
                key={university}
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="university"
                  value={university}
                  checked={selectedUniversity === university}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-4 h-4 text-blue-600 mr-3"
                />
                <span className="text-lg font-medium text-gray-700">
                  {university}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedUniversity}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              selectedUniversity
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

export default UniversitySelectPage;
