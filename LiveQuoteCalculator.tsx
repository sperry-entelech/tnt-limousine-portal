'use client'

import React, { useState, useEffect } from 'react'
import { database } from '@/lib/database'

interface PricingBreakdown {
  base_price: number
  driver_gratuity?: number
  fuel_surcharge?: number
  tolls?: number
  parking?: number
  after_hour_surcharge?: number
  subtotal?: number
  discount_amount?: number
  discount_percentage?: number
  additional_fees?: number
  taxes: number
  total_amount: number
}

export default function LiveQuoteCalculator() {
  const [serviceType, setServiceType] = useState('hourly')
  const [vehicleType, setVehicleType] = useState('sedan')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [hours, setHours] = useState(3)
  const [destination, setDestination] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null)
  const [vehicles, setVehicles] = useState<any[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    loadVehicles()
  }, [])

  useEffect(() => {
    if (pickupDate && pickupTime) {
      calculatePricing()
    }
  }, [serviceType, vehicleType, pickupDate, pickupTime, hours, destination])

  const loadVehicles = async () => {
    const vehicleData = await database.getVehicles()
    setVehicles(vehicleData)
  }

  const calculatePricing = async () => {
    if (!pickupDate || !pickupTime) return
    
    setIsCalculating(true)
    const pickupDateTime = `${pickupDate}T${pickupTime}`
    
    try {
      const pricingResult = await database.calculateQuotePrice(
        serviceType,
        vehicleType,
        pickupDateTime,
        hours,
        0,
        destination
      )
      setPricing(pricingResult)
    } catch (error) {
      console.error('Error calculating pricing:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const selectedVehicle = vehicles.find(v => v.type === vehicleType)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Quote Calculator</h2>
        <p className="text-gray-600">Get instant pricing with TNT Limousine's real rates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quote Form */}
        <div className="space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-transparent"
            >
              <option value="hourly">Hourly Service</option>
              <option value="point_to_point">Point-to-Point</option>
              <option value="airport">Airport Transfer</option>
            </select>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Type
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-transparent"
            >
              <option value="sedan">Sedan (up to 3 passengers)</option>
              <option value="transit">Transit Van (up to 15 passengers)</option>
              <option value="mini_bus">Executive Mini Bus (up to 12 passengers)</option>
              <option value="stretch_limo">Stretch Limousine (up to 8 passengers)</option>
              <option value="sprinter_limo">Sprinter Limo (up to 10 passengers)</option>
              <option value="limo_bus">Limo Bus (up to 18 passengers)</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date
              </label>
              <input
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-transparent"
              />
            </div>
          </div>

          {/* Hours (for hourly service) */}
          {serviceType === 'hourly' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Needed
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-transparent"
              />
            </div>
          )}

          {/* Destination (for airport service) */}
          {serviceType === 'airport' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Airport Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-transparent"
              >
                <option value="richmond">Richmond International (RIC)</option>
                <option value="charlottesville">Charlottesville/Williamsburg</option>
                <option value="national">Reagan National (DCA)</option>
                <option value="dulles">Dulles International (IAD)</option>
                <option value="bwi">BWI Baltimore</option>
              </select>
            </div>
          )}

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Passengers
            </label>
            <input
              type="number"
              min="1"
              max={selectedVehicle?.capacity || 20}
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tnt-red focus:border-transparent"
            />
            {selectedVehicle && (
              <p className="text-sm text-gray-500 mt-1">
                Maximum capacity: {selectedVehicle.capacity} passengers
              </p>
            )}
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing Breakdown</h3>
          
          {selectedVehicle && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800">{selectedVehicle.name}</h4>
              <p className="text-sm text-gray-600">Capacity: {selectedVehicle.capacity} passengers</p>
            </div>
          )}

          {isCalculating ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tnt-red"></div>
              <span className="ml-2 text-gray-600">Calculating...</span>
            </div>
          ) : pricing ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rate</span>
                <span className="font-semibold">${pricing.base_price.toFixed(2)}</span>
              </div>
              
              {pricing.driver_gratuity !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver Gratuity</span>
                  <span className="font-semibold">${pricing.driver_gratuity.toFixed(2)}</span>
                </div>
              )}
              
              {pricing.fuel_surcharge !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Surcharge</span>
                  <span className="font-semibold">${pricing.fuel_surcharge.toFixed(2)}</span>
                </div>
              )}
              
              {pricing.tolls !== undefined && pricing.tolls > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tolls</span>
                  <span className="font-semibold">${pricing.tolls.toFixed(2)}</span>
                </div>
              )}
              
              {pricing.parking !== undefined && pricing.parking > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Parking</span>
                  <span className="font-semibold">${pricing.parking.toFixed(2)}</span>
                </div>
              )}
              
              {pricing.after_hour_surcharge !== undefined && pricing.after_hour_surcharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">After-Hour Surcharge</span>
                  <span className="font-semibold">${pricing.after_hour_surcharge.toFixed(2)}</span>
                </div>
              )}
              
              {pricing.additional_fees !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Additional Fees</span>
                  <span className="font-semibold">${pricing.additional_fees.toFixed(2)}</span>
                </div>
              )}
              
              {pricing.subtotal !== undefined && (
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${pricing.subtotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              {pricing.discount_amount !== undefined && pricing.discount_amount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({pricing.discount_percentage}%)</span>
                  <span className="font-semibold">-${pricing.discount_amount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes (8%)</span>
                <span className="font-semibold">${pricing.taxes.toFixed(2)}</span>
              </div>
              
              <div className="border-t-2 border-tnt-red pt-3">
                <div className="flex justify-between text-xl">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-tnt-red">${pricing.total_amount.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Discounts Applied */}
              {pricing.discount_amount !== undefined && pricing.discount_amount > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <h5 className="font-semibold text-green-800 text-sm">Discounts Applied:</h5>
                  <ul className="text-xs text-green-700 mt-1 space-y-1">
                    {hours >= 6 && <li>• 10% off for 6+ hour trips</li>}
                    {pickupDate && new Date(pickupDate).getDay() >= 1 && new Date(pickupDate).getDay() <= 4 && (
                      <li>• 10% off for Monday-Thursday bookings</li>
                    )}
                    {pickupDate && Math.ceil((new Date(pickupDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) <= 4 && (
                      <li>• 15% off for bookings 4 days or less</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Please fill in pickup date and time to see pricing
            </p>
          )}

          {pricing && (
            <button className="w-full mt-6 bg-tnt-red hover:bg-tnt-red-dark text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              Book This Trip - ${pricing.total_amount.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}