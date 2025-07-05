import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapPage() {
  const location = useLocation();
  const { buddy } = location.state || {};

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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Your Commute Buddy
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span><strong>Buddy:</strong> {buddy.userName}</span>
            <span><strong>Transit:</strong> {buddy.transitNumber}</span>
            <span><strong>Departure:</strong> {buddy.departureTime}</span>
            <span><strong>Station:</strong> {buddy.stationAddress}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <MapContainer
              center={[buddy.lat, buddy.lng]}
              zoom={15}
              style={{ height: '500px', width: '100%' }}
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
      </div>
    </div>
  );
}

export default MapPage;
