'use client'

import React from 'react'
import Link from 'next/link'
import { BookingRequest } from '@/types'

interface RecentBookingsProps {
  trips: BookingRequest[]
}

export default function RecentBookings({ trips }: RecentBookingsProps) {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Trips</h3>
          <Link
            href="/dashboard/trips"
            className="text-sm text-tnt-red hover:text-tnt-red-dark font-medium transition-colors"
          >
            View all
          </Link>
        </div>
      </div>
      <div className="p-6">
        {trips.length > 0 ? (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div key={trip.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">
                    {getServiceIcon(trip.serviceType)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getServiceName(trip.serviceType)}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {trip.pickupLocation}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${trip.estimatedPrice}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(trip.pickupDateTime)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z"
              />
            </svg>
            <h4 className="mt-2 text-sm font-medium text-gray-900">No recent trips</h4>
            <p className="mt-1 text-sm text-gray-500">
              Your completed trips will appear here.
            </p>
            <div className="mt-4">
              <Link
                href="/dashboard/book"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-tnt-red border border-transparent rounded-md hover:bg-tnt-red-dark transition-colors"
              >
                Book Your First Trip
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Loyalty Points Section */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-tnt-red/5 to-tnt-red/10">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Loyalty Points</h4>
            <p className="text-xs text-gray-600">Earn points with every trip</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-tnt-red">2,450</p>
            <p className="text-xs text-gray-500">Points available</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-tnt-red h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            550 points until your next reward
          </p>
        </div>
      </div>
    </div>
  )
}
