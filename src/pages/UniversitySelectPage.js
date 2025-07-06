import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function UniversitySelectPage() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const navigate = useNavigate();

  const universities = [
    { id: 'UofT', name: 'University of Toronto', fullName: 'University of Toronto' },
    { id: 'York', name: 'York University', fullName: 'York University' },
    { id: 'TMU', name: 'Toronto Metropolitan University', fullName: 'Toronto Metropolitan University (formerly Ryerson)' },
    { id: 'UBC', name: 'University of British Columbia', fullName: 'University of British Columbia' },
    { id: 'McGill', name: 'McGill University', fullName: 'McGill University' },
    { id: 'UWaterloo', name: 'University of Waterloo', fullName: 'University of Waterloo' },
    { id: 'McMaster', name: 'McMaster University', fullName: 'McMaster University' },
    { id: 'Queens', name: 'Queen\'s University', fullName: 'Queen\'s University' },
    { id: 'Western', name: 'Western University', fullName: 'Western University' },
    { id: 'UAlberta', name: 'University of Alberta', fullName: 'University of Alberta' },
    { id: 'UCalgary', name: 'University of Calgary', fullName: 'University of Calgary' },
    { id: 'UOttawa', name: 'University of Ottawa', fullName: 'University of Ottawa' },
    { id: 'Carleton', name: 'Carleton University', fullName: 'Carleton University' },
    { id: 'SFU', name: 'Simon Fraser University', fullName: 'Simon Fraser University' },
    { id: 'Concordia', name: 'Concordia University', fullName: 'Concordia University' },
    { id: 'UQAM', name: 'Université du Québec à Montréal', fullName: 'Université du Québec à Montréal' },
    { id: 'UManitoba', name: 'University of Manitoba', fullName: 'University of Manitoba' },
    { id: 'USask', name: 'University of Saskatchewan', fullName: 'University of Saskatchewan' },
    { id: 'MUN', name: 'Memorial University', fullName: 'Memorial University of Newfoundland' },
    { id: 'Dalhousie', name: 'Dalhousie University', fullName: 'Dalhousie University' },
    { id: 'UNB', name: 'University of New Brunswick', fullName: 'University of New Brunswick' },
    { id: 'UPEI', name: 'University of Prince Edward Island', fullName: 'University of Prince Edward Island' },
    { id: 'StFX', name: 'St. Francis Xavier University', fullName: 'St. Francis Xavier University' },
    { id: 'UVic', name: 'University of Victoria', fullName: 'University of Victoria' },
    { id: 'UNBC', name: 'University of Northern British Columbia', fullName: 'University of Northern British Columbia' },
    { id: 'OCAD', name: 'OCAD University', fullName: 'OCAD University' }
  ];

  const handleNext = () => {
    if (selectedUniversity) {
      const selectedUni = universities.find(uni => uni.id === selectedUniversity);
      navigate('/transit', { 
        state: { 
          university: selectedUni.id,
          universityName: selectedUni.name,
          universityFullName: selectedUni.fullName
        } 
      });
    }
  };

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
        <div className="max-w-lg w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Select Your University
            </h2>
            
            <div className="max-h-96 overflow-y-auto space-y-3 mb-8 pr-2">
              {universities.map((university) => (
                <label
                  key={university.id}
                  className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="university"
                    value={university.id}
                    checked={selectedUniversity === university.id}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-lg font-medium text-gray-700 block">
                      {university.name}
                    </span>
                    <span className="text-sm text-gray-500 block">
                      {university.id}
                    </span>
                  </div>
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
    </div>
  );
}

export default UniversitySelectPage;
