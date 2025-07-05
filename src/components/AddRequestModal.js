import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddRequestModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    universityAddress: '',
    busNumber: '',
    departureTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to add a request');
      }

      // Get coordinates from address using a geocoding service
      const coordinates = await getCoordinatesFromAddress(formData.universityAddress);

      const { error } = await supabase
        .from('commute_requests')
        .insert([
          {
            user_id: user.id,
            name: formData.name,
            university: formData.university,
            university_address: formData.universityAddress,
            bus_number: formData.busNumber,
            departure_time: formData.departureTime,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      onSuccess();
      onClose();
      setFormData({
        name: '',
        university: '',
        universityAddress: '',
        busNumber: '',
        departureTime: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple geocoding function using Nominatim (free service)
  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      } else {
        // Default to Toronto coordinates if address not found
        return { lat: 43.6532, lng: -79.3832 };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      // Default to Toronto coordinates
      return { lat: 43.6532, lng: -79.3832 };
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-90 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Commute Request</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University
            </label>
            <select
              name="university"
              required
              value={formData.university}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select your university</option>
              <option value="UofT">University of Toronto</option>
              <option value="York">York University</option>
              <option value="Ryerson">Toronto Metropolitan University</option>
              <option value="OCAD">OCAD University</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University Address
            </label>
            <input
              type="text"
              name="universityAddress"
              required
              value={formData.universityAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="e.g., 27 King's College Cir, Toronto"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Number
            </label>
            <input
              type="text"
              name="busNumber"
              required
              value={formData.busNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="e.g., Bus 29, Metro Line 1"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departure Time
            </label>
            <input
              type="time"
              name="departureTime"
              required
              value={formData.departureTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding Request...' : 'Add Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
