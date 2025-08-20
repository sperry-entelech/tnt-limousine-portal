'use client'

import React, { useState, useEffect } from 'react'
import { database } from '@/lib/database'

export default function Services() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        const serviceData = await database.getServicePackages()
        setServices(serviceData)
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadServices()
  }, [])

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'airport':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )
      case 'wedding':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'wine_tour':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        )
      case 'corporate':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'special_event':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
    }
  }

  const getDefaultImage = (serviceType: string) => {
    switch (serviceType) {
      case 'airport':
        return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      case 'wedding':
        return 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      case 'wine_tour':
        return 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      case 'corporate':
        return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      case 'special_event':
        return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      default:
        return 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  }

  if (loading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tnt-red mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading our services...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience luxury transportation tailored to your needs. From airport transfers to special events, 
            we provide professional, reliable, and elegant service for every occasion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service: any, index: number) => (
            <div
              key={service.id || index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image_url || getDefaultImage(service.type)}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-tnt-red/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${service.base_price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-tnt-red/10 rounded-lg flex items-center justify-center text-tnt-red mr-3">
                    {getServiceIcon(service.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                    {service.duration_hours && (
                      <p className="text-sm text-gray-500">{service.duration_hours} hours</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {service.includes && service.includes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Includes:</h4>
                    <div className="space-y-1">
                      {service.includes.slice(0, 3).map((feature: string, i: number) => (
                        <div key={i} className="flex items-center text-xs text-gray-600">
                          <svg className="w-3 h-3 text-tnt-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="capitalize">{feature.replace(/_/g, ' ')}</span>
                        </div>
                      ))}
                      {service.includes.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{service.includes.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Starting at</p>
                      <p className="text-lg font-bold text-tnt-red">${service.base_price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Service Type</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {service.type.replace(/_/g, ' ')}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-tnt-red hover:bg-tnt-red-dark text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Features */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose TNT Limousine?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Service</h4>
              <p className="text-gray-600">
                Licensed, insured, and professionally trained chauffeurs dedicated to your safety and comfort.
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
                Advanced scheduling and GPS tracking ensure punctual arrivals for all your important events.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Luxury Experience</h4>
              <p className="text-gray-600">
                Premium vehicles with luxury amenities and personalized service for an unforgettable experience.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Book Your Ride?</h3>
          <p className="text-lg text-gray-600 mb-6">
            Contact us today for personalized service and competitive pricing
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
              Request Quote
            </button>
            <button className="border-2 border-tnt-red text-tnt-red hover:bg-tnt-red hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
              Call (804) 555-LIMO
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
