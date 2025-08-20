'use client'

import React, { useState, useEffect } from 'react'
import { database } from '@/lib/database'

export default function Fleet() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVehicles() {
      try {
        const vehicleData = await database.getVehicles()
        setVehicles(vehicleData)
      } catch (error) {
        console.error('Error loading vehicles:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadVehicles()
  }, [])

  // Convert database vehicle data to display format
  const formatVehicle = (vehicle: any) => ({
    id: vehicle.id,
    category: vehicle.type,
    name: vehicle.name,
    model: `${vehicle.make} ${vehicle.model}`,
    capacity: `1-${vehicle.capacity} passengers`,
    features: vehicle.features || [],
    hourlyRate: `$${vehicle.hourly_rate}`,
    dayRate: `$${(vehicle.hourly_rate * 8).toFixed(0)}`, // Calculate day rate
    image: vehicle.image_url || 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    year: vehicle.year,
    color: vehicle.color,
    licensePlate: vehicle.license_plate
  })
  const categories = [
    { id: 'all', name: 'All Vehicles', icon: '🚗' },
    { id: 'sedan', name: 'Executive Sedans', icon: '🚙' },
    { id: 'transit', name: 'Transit Vans', icon: '🚐' },
    { id: 'mini_bus', name: 'Mini Buses', icon: '🚌' },
    { id: 'stretch_limo', name: 'Stretch Limos', icon: '🏎️' },
    { id: 'sprinter_limo', name: 'Sprinter Limos', icon: '✨' },
    { id: 'limo_bus', name: 'Party Buses', icon: '🎉' }
  ]

  // Format vehicles for display
  const formattedVehicles = vehicles.map(formatVehicle)
  
  const filteredVehicles = selectedCategory === 'all' 
    ? formattedVehicles 
    : formattedVehicles.filter(vehicle => vehicle.category === selectedCategory)

  if (loading) {
    return (
      <section id="fleet" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tnt-red mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading our premium fleet...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of meticulously maintained luxury vehicles, 
            each equipped with premium amenities and professional chauffeur service.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-tnt-red text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift transition-all duration-300 border border-gray-200"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {vehicle.capacity}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                <p className="text-gray-600 mb-4">{vehicle.model}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {vehicle.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-3 h-3 text-tnt-red mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Hourly Rate</p>
                      <p className="text-lg font-bold text-tnt-red">{vehicle.hourlyRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Day Rate</p>
                      <p className="text-lg font-bold text-tnt-red">{vehicle.dayRate}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-tnt-red hover:bg-tnt-red-dark text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                      Book Now
                    </button>
                    <button className="flex-1 border border-tnt-red text-tnt-red hover:bg-tnt-red hover:text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet Features */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Fleet?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h4>
              <p className="text-gray-600">
                All vehicles undergo regular maintenance and safety inspections. 
                Our drivers are professionally trained and fully licensed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Luxury Amenities</h4>
              <p className="text-gray-600">
                Premium interiors, entertainment systems, and comfort features 
                ensure your journey is as enjoyable as your destination.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Always On Time</h4>
              <p className="text-gray-600">
                GPS tracking, flight monitoring, and professional dispatch 
                ensure punctual service for all your transportation needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}