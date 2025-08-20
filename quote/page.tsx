'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import LiveQuoteCalculator from '@/components/LiveQuoteCalculator'
import Footer from '@/components/Footer'

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation onRequestQuote={() => {}} />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-10 bg-tnt-red rounded-full flex items-center justify-center border-2 border-gray-300 mr-4">
              <span className="text-white font-black text-lg">TNT</span>
            </div>
            <span className="text-white text-2xl font-script italic">Limousine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Quote Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant pricing with TNT Limousine's real rates. No hidden fees, no surprises - 
            just transparent pricing for Richmond's premier luxury transportation.
          </p>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LiveQuoteCalculator />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TNT Limousine?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with Richmond's most trusted luxury transportation service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                Real-time quotes with all fees included. No hidden charges or surprise costs.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Booking</h3>
              <p className="text-gray-600">
                Get your quote and book immediately. Professional service guaranteed.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Fleet</h3>
              <p className="text-gray-600">
                Modern luxury vehicles with professional chauffeurs and premium amenities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help with Your Quote?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our transportation specialists are standing by to assist with custom quotes, 
            group bookings, and special requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:804-555-LIMO"
              className="bg-tnt-red hover:bg-tnt-red-dark text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300"
            >
              Call (804) 555-LIMO
            </a>
            <a
              href="mailto:info@tntlimousine.com"
              className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-bold transition-colors duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}