import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleGoClick = () => {
    navigate('/university');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8">
          Commuter Buddy
        </h1>
        <p className="text-xl text-white mb-12">
          Find your perfect commute companion
        </p>
        <button
          onClick={handleGoClick}
          className="bg-white text-blue-600 px-16 py-6 rounded-full text-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
        >
          GO
        </button>
      </div>
    </div>
  );
}

export default HomePage;
