'use client'

import React, { useState, useEffect } from 'react'
import { TripStatus } from '@/types'

interface TripTrackerProps {
  tripStatus: TripStatus
}

export default function TripTracker({ tripStatus }: TripTrackerProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'driver-assigned':
        return 'bg-yellow-100 text-yellow-800'
      case 'en-route':
        return 'bg-orange-100 text-orange-800'
      case 'arrived':
        return 'bg-green-100 text-green-800'
      case 'in-transit':
        return 'bg-purple-100 text-purple-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z" />
          </svg>
        )
      case 'driver-assigned':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'en-route':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'arrived':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case 'in-transit':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const formatTimeRemaining = (date: Date) => {
    const diff = date.getTime() - currentTime.getTime()
    if (diff <= 0) return 'Arriving now'
    
    const minutes = Math.floor(diff / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    if (minutes > 0) {
      return `${minutes} min ${seconds} sec`
    } else {
      return `${seconds} sec`
    }
  }

  const callDriver = () => {
    if (tripStatus.driverInfo?.phone) {
      window.open(`tel:${tripStatus.driverInfo.phone}`, '_self')
    }
  }

  const sendMessage = () => {
    alert('Message feature would open here - SMS/WhatsApp integration')
  }

  return (
    <div className="space-y-6">
      {/* Current Status Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-tnt-red to-tnt-red-dark text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Trip Status</h2>
              <p className="text-red-100">Booking ID: {tripStatus.bookingId}</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tripStatus.status)} bg-white/20 text-white`}>
                {getStatusIcon(tripStatus.status)}
                <span className="ml-2 capitalize">{tripStatus.status.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* ETA Section */}
          {tripStatus.estimatedArrival && tripStatus.status !== 'completed' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Estimated Arrival</p>
                    <p className="text-lg font-bold text-blue-900">
                      {formatTimeRemaining(tripStatus.estimatedArrival)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">ETA</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {tripStatus.estimatedArrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Driver Information */}
          {tripStatus.driverInfo && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Driver</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={tripStatus.driverInfo.photo || 'https://via.placeholder.com/60x60?text=Driver'}
                  alt={tripStatus.driverInfo.name}
                  className="w-15 h-15 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{tripStatus.driverInfo.name}</h4>
                  <div className="flex items-center space-x-1 mb-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">{tripStatus.driverInfo.rating}/5.0</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{tripStatus.driverInfo.vehicleInfo.color} {tripStatus.driverInfo.vehicleInfo.make} {tripStatus.driverInfo.vehicleInfo.model}</p>
                    <p>License: {tripStatus.driverInfo.vehicleInfo.licensePlate}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={callDriver}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call</span>
                  </button>
                  <button
                    onClick={sendMessage}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Live Map Placeholder */}
          <div className="border border-gray-200 rounded-lg mb-6">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Live Location</h3>
            </div>
            <div className="h-64 bg-gray-100 flex items-center justify-center relative">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">Interactive Map</p>
                <p className="text-gray-400 text-sm">Real-time vehicle tracking</p>
                {tripStatus.vehicleLocation && (
                  <div className="mt-4 p-3 bg-white rounded-lg inline-block">
                    <p className="text-sm text-gray-600">Current Location:</p>
                    <p className="text-sm font-medium text-gray-900">
                      {tripStatus.vehicleLocation.address || `${tripStatus.vehicleLocation.latitude}, ${tripStatus.vehicleLocation.longitude}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      Updated: {tripStatus.vehicleLocation.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Map would be integrated here with services like Google Maps, Mapbox, etc. */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow p-2">
                <button className="text-tnt-red hover:text-tnt-red-dark text-sm font-medium">
                  View Fullscreen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Updates Timeline */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Trip Updates</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {tripStatus.updates.map((update, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-tnt-red text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {getStatusIcon(update.status)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {update.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {update.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {update.location && (
                    <p className="text-xs text-gray-500 mt-1">
                      Location updated: {update.location.latitude.toFixed(4)}, {update.location.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-tnt-red hover:bg-tnt-red-dark text-white p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Emergency Support</span>
          </button>
          
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Live Chat</span>
          </button>
          
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share Trip</span>
          </button>
        </div>
      </div>
    </div>
  )
}