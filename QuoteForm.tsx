'use client'

import React, { useState, useEffect } from 'react'
import { database } from '@/lib/database'

interface QuoteFormProps {
  onClose: () => void
}

export default function QuoteForm({ onClose }: QuoteFormProps) {
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<any[]>([])
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [quoteResult, setQuoteResult] = useState<any>(null)

  const [formData, setFormData] = useState({
    serviceType: '',
    vehicleType: '',
    pickupLocation: '',
    destinationLocation: '',
    pickupDate: '',
    pickupTime: '',
    passengerCount: 1,
    duration: 3,
    estimatedMiles: 15,
    specialRequests: '',
    flightNumber: ''
  })

  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  })

  const [pricing, setPricing] = useState<any>({
    base_price: 0,
    additional_fees: 0,
    taxes: 0,
    total_amount: 0
  })

  // Load services and vehicles on component mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [servicesData, vehiclesData] = await Promise.all([
          database.getServicePackages(),
          database.getVehicles()
        ])
        setServices(servicesData)
        setVehicles(vehiclesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Calculate pricing when form data changes
  useEffect(() => {
    if (formData.serviceType && formData.vehicleType && formData.pickupDate && formData.duration) {
      calculatePricing()
    }
  }, [formData.serviceType, formData.vehicleType, formData.pickupDate, formData.duration, formData.estimatedMiles])

  async function calculatePricing() {
    try {
      const pickupDateTime = `${formData.pickupDate}T${formData.pickupTime || '10:00'}`
      const pricing = await database.calculateQuotePrice(
        formData.serviceType,
        formData.vehicleType,
        pickupDateTime,
        formData.duration,
        formData.estimatedMiles
      )
      setPricing(pricing)
    } catch (error) {
      console.error('Error calculating pricing:', error)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleContactChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmitQuote = async () => {
    try {
      setLoading(true)
      
      const quoteData = {
        customer_email: contactInfo.email,
        customer_phone: contactInfo.phone,
        service_type: formData.serviceType,
        pickup_date: formData.pickupDate,
        pickup_time: formData.pickupTime,
        pickup_address: formData.pickupLocation,
        destination_address: formData.destinationLocation,
        passenger_count: formData.passengerCount,
        duration_hours: formData.duration,
        vehicle_type: formData.vehicleType,
        base_price: pricing.base_price,
        additional_fees: pricing.additional_fees,
        taxes: pricing.taxes,
        total_amount: pricing.total_amount,
        special_requests: formData.specialRequests || null
      }

      const quote = await database.createQuote(quoteData)
      setQuoteResult(quote)
      setStep(5) // Move to confirmation step
    } catch (error) {
      console.error('Error creating quote:', error)
      alert('Error creating quote. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Service Information</h3>
            
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                required
              >
                <option value="">Select a service</option>
                {services.map((service: any) => (
                  <option key={service.id} value={service.type}>
                    {service.name} - ${service.base_price}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                required
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((vehicle: any) => (
                  <option key={vehicle.id} value={vehicle.type}>
                    {vehicle.name} - ${vehicle.hourly_rate}/hr (up to {vehicle.capacity} passengers)
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                placeholder="Enter pickup address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                required
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination (Optional)
              </label>
              <input
                type="text"
                value={formData.destinationLocation}
                onChange={(e) => handleInputChange('destinationLocation', e.target.value)}
                placeholder="Enter destination address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Date & Time</h3>
            
            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                required
              />
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Time
              </label>
              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Duration (hours)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
              >
                <option value={1}>1 hour</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
                <option value={4}>4 hours</option>
                <option value={5}>5 hours</option>
                <option value={6}>6 hours</option>
                <option value={8}>8 hours (full day)</option>
                <option value={10}>10 hours</option>
                <option value={12}>12 hours</option>
              </select>
            </div>

            {/* Passenger Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Passengers
              </label>
              <select
                value={formData.passengerCount}
                onChange={(e) => handleInputChange('passengerCount', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
              >
                {[1,2,3,4,5,6,7,8,9,10,12,14,16,18,20].map(num => (
                  <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Additional Details</h3>
            
            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Any special requests, decorations, refreshments, etc."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
              />
            </div>

            {/* Flight Number (for airport services) */}
            {formData.serviceType === 'airport' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flight Number (Optional)
                </label>
                <input
                  type="text"
                  value={formData.flightNumber}
                  onChange={(e) => handleInputChange('flightNumber', e.target.value)}
                  placeholder="e.g., UA 1234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                />
              </div>
            )}

            {/* Pricing Preview */}
            {pricing.total_amount > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Estimated Pricing</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>${pricing.base_price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Fees:</span>
                    <span>${pricing.additional_fees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes:</span>
                    <span>${pricing.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-1">
                    <span>Total:</span>
                    <span className="text-tnt-red">${pricing.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={contactInfo.firstName}
                  onChange={(e) => handleContactChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={contactInfo.lastName}
                  onChange={(e) => handleContactChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company (Optional)
              </label>
              <input
                type="text"
                value={contactInfo.company}
                onChange={(e) => handleContactChange('company', e.target.value)}
                placeholder="Company name for corporate bookings"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tnt-red"
              />
            </div>

            {/* Final Pricing */}
            <div className="bg-tnt-red/5 border border-tnt-red/20 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Quote Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{formData.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle:</span>
                  <span>{formData.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span>{formData.pickupDate} at {formData.pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{formData.duration} hours</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                  <span>Total Estimate:</span>
                  <span className="text-tnt-red">${pricing.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900">Quote Request Submitted!</h3>
            
            {quoteResult && (
              <div className="bg-gray-50 p-6 rounded-lg text-left">
                <h4 className="font-semibold text-gray-900 mb-4">Quote Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Quote Number:</span>
                    <span className="font-medium">{quoteResult.quote_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-medium text-tnt-red">${quoteResult.total_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Until:</span>
                    <span className="font-medium">
                      {new Date(quoteResult.valid_until).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-gray-600">
              We've received your quote request and will contact you shortly with a detailed proposal. 
              A confirmation email has been sent to {contactInfo.email}.
            </p>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={onClose}
                className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setStep(1)
                  setFormData({
                    serviceType: '',
                    vehicleType: '',
                    pickupLocation: '',
                    destinationLocation: '',
                    pickupDate: '',
                    pickupTime: '',
                    passengerCount: 1,
                    duration: 3,
                    estimatedMiles: 15,
                    specialRequests: '',
                    flightNumber: ''
                  })
                  setQuoteResult(null)
                }}
                className="border border-tnt-red text-tnt-red hover:bg-tnt-red hover:text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                New Quote
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Request a Quote</h2>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-2 w-8 rounded-full mr-2 ${
                      i <= step ? 'bg-tnt-red' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          {renderStep()}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevStep}
                disabled={step === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  step === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {step < 4 ? (
                <button
                  onClick={handleNextStep}
                  className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuote}
                  disabled={loading}
                  className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}