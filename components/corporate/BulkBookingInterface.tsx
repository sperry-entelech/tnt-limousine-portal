'use client'

import React, { useState } from 'react'
import { CorporateAccount, BookingRequest, PartialContactInfo } from '@/types'

interface BulkBookingInterfaceProps {
  account: CorporateAccount
}

export default function BulkBookingInterface({ account }: BulkBookingInterfaceProps) {
  const [bookings, setBookings] = useState<Partial<BookingRequest>[]>([
    {
      serviceType: '',
      pickupLocation: '',
      dropoffLocation: '',
      pickupDateTime: new Date(),
      passengerCount: 1,
      contactInfo: {} as PartialContactInfo
    }
  ])

  const [template, setTemplate] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const templates = [
    {
      id: 'airport-shuttle',
      name: 'Airport Shuttle Service',
      description: 'Multiple employee airport transfers'
    },
    {
      id: 'conference-transport',
      name: 'Conference Transportation',
      description: 'Multi-day conference shuttle service'
    },
    {
      id: 'client-visits',
      name: 'Client Visit Schedule',
      description: 'Scheduled client pickup and transport'
    },
    {
      id: 'team-events',
      name: 'Team Events',
      description: 'Company events and team building transport'
    }
  ]

  const addBooking = () => {
    setBookings([
      ...bookings,
      {
        serviceType: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupDateTime: new Date(),
        passengerCount: 1,
        contactInfo: {} as PartialContactInfo
      }
    ])
  }

  const removeBooking = (index: number) => {
    setBookings(bookings.filter((_, i) => i !== index))
  }

  const updateBooking = (index: number, field: string, value: any) => {
    const updatedBookings = [...bookings]
    if (field.startsWith('contactInfo.')) {
      const contactField = field.split('.')[1]
      updatedBookings[index] = {
        ...updatedBookings[index],
        contactInfo: {
          ...updatedBookings[index].contactInfo,
          [contactField]: value
        }
      }
    } else {
      updatedBookings[index] = {
        ...updatedBookings[index],
        [field]: value
      }
    }
    setBookings(updatedBookings)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Here you would typically parse the CSV/Excel file
      // and populate the bookings array
    }
  }

  const calculateTotal = () => {
    // Mock calculation - in real app this would call pricing API
    return bookings.length * 95 // Average price per booking
  }

  const submitBulkBooking = () => {
    // Here you would submit all bookings
    console.log('Submitting bulk booking:', bookings)
    alert(`${bookings.length} bookings submitted successfully!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Bulk Booking Interface</h2>
        
        {/* Template Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setTemplate(tmpl.id)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  template === tmpl.id
                    ? 'border-tnt-red bg-tnt-red/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900 mb-1">{tmpl.name}</h4>
                <p className="text-sm text-gray-600">{tmpl.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Import from File</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload CSV or Excel file
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    Drag and drop or click to select
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          {uploadedFile && (
            <div className="mt-2 text-sm text-gray-600">
              Uploaded: {uploadedFile.name}
            </div>
          )}
        </div>
      </div>

      {/* Booking Forms */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Trip Details ({bookings.length} booking{bookings.length !== 1 ? 's' : ''})
          </h3>
          <button
            onClick={addBooking}
            className="bg-tnt-red hover:bg-tnt-red-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Add Booking
          </button>
        </div>

        <div className="p-6 space-y-6">
          {bookings.map((booking, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-base font-medium text-gray-900">
                  Booking #{index + 1}
                </h4>
                {bookings.length > 1 && (
                  <button
                    onClick={() => removeBooking(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select
                    value={booking.serviceType}
                    onChange={(e) => updateBooking(index, 'serviceType', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  >
                    <option value="">Select service</option>
                    <option value="airport">Airport Transfer</option>
                    <option value="corporate">Corporate Travel</option>
                    <option value="hourly">Hourly Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    value={`${booking.contactInfo?.firstName || ''} ${booking.contactInfo?.lastName || ''}`.trim()}
                    onChange={(e) => {
                      const names = e.target.value.split(' ')
                      updateBooking(index, 'contactInfo.firstName', names[0] || '')
                      updateBooking(index, 'contactInfo.lastName', names.slice(1).join(' ') || '')
                    }}
                    placeholder="Employee name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Email
                  </label>
                  <input
                    type="email"
                    value={booking.contactInfo?.email}
                    onChange={(e) => updateBooking(index, 'contactInfo.email', e.target.value)}
                    placeholder="employee@company.com"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={booking.pickupLocation}
                    onChange={(e) => updateBooking(index, 'pickupLocation', e.target.value)}
                    placeholder="Pickup address"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drop-off Location
                  </label>
                  <input
                    type="text"
                    value={booking.dropoffLocation}
                    onChange={(e) => updateBooking(index, 'dropoffLocation', e.target.value)}
                    placeholder="Destination address"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={booking.pickupDateTime?.toISOString().slice(0, 16)}
                    onChange={(e) => updateBooking(index, 'pickupDateTime', new Date(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <select
                    value={booking.passengerCount}
                    onChange={(e) => updateBooking(index, 'passengerCount', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  >
                    {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} passenger{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Center
                  </label>
                  <input
                    type="text"
                    placeholder="Optional cost center"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary and Submit */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Booking Summary</h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">Estimated Total</p>
            <p className="text-2xl font-bold text-tnt-red">${calculateTotal().toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              {bookings.reduce((sum, b) => sum + (b.passengerCount || 0), 0)}
            </p>
            <p className="text-sm text-gray-600">Total Passengers</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              {bookings.filter(b => b.serviceType === 'airport').length}
            </p>
            <p className="text-sm text-gray-600">Airport Transfers</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-tnt-red border-gray-300 rounded focus:ring-tnt-red"
              />
              <span className="ml-2 text-sm text-gray-700">
                Send confirmation emails to employees
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-tnt-red border-gray-300 rounded focus:ring-tnt-red"
              />
              <span className="ml-2 text-sm text-gray-700">
                Apply corporate discount
              </span>
            </label>
          </div>
          
          <div className="flex space-x-3">
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors">
              Save as Draft
            </button>
            <button
              onClick={submitBulkBooking}
              className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Submit All Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
