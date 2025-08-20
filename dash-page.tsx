'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import TripCard from '@/components/dashboard/TripCard'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentBookings from '@/components/dashboard/RecentBookings'
import { BookingRequest, TripStatus } from '@/types'

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - would come from API in real implementation
  const upcomingTrips: BookingRequest[] = [
    {
      id: '1',
      serviceType: 'airport',
      vehicleId: 'sedan-1',
      pickupLocation: '123 Main St, Downtown',
      dropoffLocation: 'Airport Terminal 1',
      pickupDateTime: new Date('2024-08-18T08:00:00'),
      passengerCount: 2,
      contactInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-0123'
      },
      addOns: [],
      estimatedPrice: 85,
      status: 'confirmed'
    },
    {
      id: '2',
      serviceType: 'wedding',
      vehicleId: 'stretch-1',
      pickupLocation: 'St. Mary\'s Church',
      dropoffLocation: 'Grand Ballroom Hotel',
      pickupDateTime: new Date('2024-08-25T15:00:00'),
      passengerCount: 6,
      contactInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-0123'
      },
      addOns: ['decorations', 'champagne'],
      estimatedPrice: 450,
      status: 'confirmed'
    }
  ]

  const recentTrips: BookingRequest[] = [
    {
      id: '3',
      serviceType: 'corporate',
      vehicleId: 'suv-1',
      pickupLocation: 'Office Building',
      dropoffLocation: 'Conference Center',
      pickupDateTime: new Date('2024-08-10T09:00:00'),
      passengerCount: 3,
      contactInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-0123'
      },
      addOns: [],
      estimatedPrice: 120,
      status: 'completed'
    }
  ]

  const activeTripStatus: TripStatus = {
    id: 'trip-1',
    bookingId: '1',
    status: 'driver-assigned',
    driverInfo: {
      id: 'driver-1',
      name: 'Michael Johnson',
      phone: '555-0456',
      rating: 4.9,
      vehicleInfo: {
        make: 'Mercedes-Benz',
        model: 'S-Class',
        color: 'Black',
        licensePlate: 'TNT-001'
      }
    },
    estimatedArrival: new Date('2024-08-18T07:45:00'),
    updates: [
      {
        timestamp: new Date('2024-08-18T07:30:00'),
        status: 'driver-assigned',
        message: 'Driver Michael has been assigned to your trip',
      }
    ]
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'upcoming', name: 'Upcoming Trips', icon: '📅' },
    { id: 'history', name: 'Trip History', icon: '📋' },
    { id: 'profile', name: 'Profile', icon: '👤' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
            Book New Trip
          </button>
        </div>

        {/* Active Trip Alert */}
        {activeTripStatus && (
          <div className="bg-tnt-red/10 border border-tnt-red rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-tnt-red mb-2">Active Trip</h3>
                <p className="text-gray-700 mb-2">
                  Your driver {activeTripStatus.driverInfo?.name} is on the way
                </p>
                <p className="text-sm text-gray-600">
                  ETA: {activeTripStatus.estimatedArrival?.toLocaleTimeString()}
                </p>
              </div>
              <button className="bg-tnt-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-tnt-red-dark transition-colors">
                Track Live
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-tnt-red text-tnt-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-300`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Trips</h3>
                    <p className="text-3xl font-bold text-tnt-red">24</p>
                    <p className="text-sm text-gray-600">This year</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Miles Traveled</h3>
                    <p className="text-3xl font-bold text-tnt-red">2,150</p>
                    <p className="text-sm text-gray-600">Total distance</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Savings</h3>
                    <p className="text-3xl font-bold text-tnt-red">$320</p>
                    <p className="text-sm text-gray-600">Loyalty rewards</p>
                  </div>
                </div>

                {/* Upcoming Trips */}
                <div className="bg-white rounded-lg shadow border">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Trips</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {upcomingTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <QuickActions />
                <RecentBookings trips={recentTrips} />
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="bg-white rounded-lg shadow border">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Trips</h3>
              </div>
              <div className="p-6 space-y-4">
                {upcomingTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} showActions />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow border">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Trip History</h3>
              </div>
              <div className="p-6 space-y-4">
                {recentTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} showRating />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow border">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="555-0123"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}