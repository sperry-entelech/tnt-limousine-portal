'use client'

import React, { useState } from 'react'
import { BookingRequest } from '@/types'

interface TripCardProps {
  trip: BookingRequest
  showActions?: boolean
  showRating?: boolean
}

export default function TripCard({ trip, showActions = false, showRating = false }: TripCardProps) {
  const [rating, setRating] = useState(0)

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'airport':
        return '✈️'
      case 'wedding':
        return '💒'
      case 'wine-tour':
        return '🍷'
      case 'corporate':
        return '🏢'
      case 'special-event':
        return '🎉'
      case 'hourly':
        return '⏰'
      default:
        return '🚗'
    }
  }

  const getServiceName = (serviceType: string) => {
    switch (serviceType) {
      case 'airport':
        return 'Airport Transfer'
      case 'wedding':
        return 'Wedding Transportation'
      case 'wine-tour':
        return 'Wine Tour'
      case 'corporate':
        return 'Corporate Travel'
      case 'special-event':
        return 'Special Event'
      case 'hourly':
        return 'Hourly Service'
      default:
        return 'Transportation Service'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const renderStars = (currentRating: number) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        onClick={() => setRating(index + 1)}
        className={`w-5 h-5 ${index < currentRating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
      >
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ))
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Service Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-tnt-red/10 rounded-lg flex items-center justify-center text-xl">
              {getServiceIcon(trip.serviceType)}
            </div>
          </div>

          {/* Trip Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-gray-900 truncate">
                {getServiceName(trip.serviceType)}
              </h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDateTime(trip.pickupDateTime)}
              </div>

              <div className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium">From: {trip.pickupLocation}</p>
                  {trip.dropoffLocation && (
                    <p>To: {trip.dropoffLocation}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {trip.passengerCount} passenger{trip.passengerCount > 1 ? 's' : ''}
              </div>

              {trip.addOns && trip.addOns.length > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m6-6H6" />
                  </svg>
                  Add-ons: {trip.addOns.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-bold text-tnt-red">
              ${trip.estimatedPrice}
            </p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
          <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-3 py-1 rounded text-sm font-medium transition-colors">
            View Details
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 rounded text-sm font-medium transition-colors">
            Modify
          </button>
          <button className="border border-red-300 text-red-700 hover:bg-red-50 px-3 py-1 rounded text-sm font-medium transition-colors">
            Cancel
          </button>
          {trip.status === 'confirmed' && (
            <button className="border border-blue-300 text-blue-700 hover:bg-blue-50 px-3 py-1 rounded text-sm font-medium transition-colors">
              Track Live
            </button>
          )}
        </div>
      )}

      {/* Rating */}
      {showRating && trip.status === 'completed' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Rate your experience:</p>
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
            {rating > 0 && (
              <button className="ml-4 bg-tnt-red hover:bg-tnt-red-dark text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                Submit Rating
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}