'use client'

import React, { useState, useEffect } from 'react'
import TripTracker from '@/components/TripTracker'
import { TripStatus, DriverInfo, Location } from '@/types'
import { tripOperations } from '@/lib/database'

export default function TrackPage() {
  const [bookingId, setBookingId] = useState('')
  const [tripStatus, setTripStatus] = useState<TripStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock trip tracking data
  const mockTripStatus: TripStatus = {
    id: 'trip-track-001',
    bookingId: 'TNT-2024-001',
    status: 'en-route',
    driverInfo: {
      id: 'driver-001',
      name: 'Michael Rodriguez',
      phone: '555-0123',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      rating: 4.9,
      vehicleInfo: {
        make: 'Mercedes-Benz',
        model: 'S-Class',
        color: 'Black',
        licensePlate: 'TNT-001'
      }
    },
    vehicleLocation: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: '123 Main Street, New York, NY',
      timestamp: new Date()
    },
    estimatedArrival: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    updates: [
      {
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: 'driver-assigned',
        message: 'Driver Michael has been assigned to your trip',
      },
      {
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        status: 'en-route',
        message: 'Driver is on the way to pickup location',
        location: {
          latitude: 40.7505,
          longitude: -73.9934,
          timestamp: new Date(Date.now() - 20 * 60 * 1000)
        }
      },
      {
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        status: 'en-route',
        message: 'Driver is 10 minutes away',
        location: {
          latitude: 40.7547,
          longitude: -73.9892,
          timestamp: new Date(Date.now() - 10 * 60 * 1000)
        }
      }
    ]
  }

  const trackTrip = async () => {
    if (!bookingId.trim()) {
      setError('Please enter a booking ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Try to get trip status from Supabase
      const status = await tripOperations.getTripStatus(bookingId.trim())
      
      if (status) {
        setTripStatus(status)
      } else {
        // If no trip found in database, use mock data for demo
        console.log('No trip found in database, using mock data for demo')
        setTripStatus(mockTripStatus)
      }
    } catch (err) {
      console.error('Error tracking trip:', err)
      // Fallback to mock data for demo purposes
      setTripStatus(mockTripStatus)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingId(e.target.value)
    if (error) setError('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      trackTrip()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-tnt-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TNT</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Trip</h1>
          <p className="text-gray-600">
            Enter your booking ID to see real-time location and status updates
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="max-w-md mx-auto">
            <label htmlFor="booking-id" className="block text-sm font-medium text-gray-700 mb-2">
              Booking ID
            </label>
            <div className="flex space-x-3">
              <input
                id="booking-id"
                type="text"
                value={bookingId}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="e.g., TNT-2024-001"
                className="flex-1 p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
              />
              <button
                onClick={trackTrip}
                disabled={loading}
                className="bg-tnt-red hover:bg-tnt-red-dark disabled:opacity-50 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Tracking...
                  </div>
                ) : (
                  'Track Trip'
                )}
              </button>
            </div>

            {error && (
              <div className="mt-3 text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* Sample IDs */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Try these sample booking IDs:</p>
            <div className="flex justify-center space-x-4 text-sm">
              <button
                onClick={() => setBookingId('TNT-2024-001')}
                className="text-tnt-red hover:text-tnt-red-dark font-medium"
              >
                TNT-2024-001
              </button>
              <button
                onClick={() => setBookingId('TNT-2024-002')}
                className="text-tnt-red hover:text-tnt-red-dark font-medium"
              >
                TNT-2024-002
              </button>
              <button
                onClick={() => setBookingId('TNT-2024-003')}
                className="text-tnt-red hover:text-tnt-red-dark font-medium"
              >
                TNT-2024-003
              </button>
            </div>
          </div>
        </div>

        {/* Trip Status */}
        {tripStatus && <TripTracker tripStatus={tripStatus} />}

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Can't find your booking ID or need assistance with tracking?
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Call Support: (555) 123-4567
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}