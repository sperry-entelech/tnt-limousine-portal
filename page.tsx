'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Fleet from '@/components/Fleet'
import QuoteForm from '@/components/QuoteForm'
import LiveQuoteCalculator from '@/components/LiveQuoteCalculator'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  return (
    <main className="min-h-screen">
      <Navigation onRequestQuote={() => setShowQuoteForm(true)} />
      <Hero onRequestQuote={() => setShowQuoteForm(true)} />
      <Services />
      <Fleet />
      
      {/* Live Quote Calculator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LiveQuoteCalculator />
        </div>
      </section>
      
      <Testimonials />
      <Footer />
      
      {showQuoteForm && (
        <QuoteForm onClose={() => setShowQuoteForm(false)} />
      )}
    </main>
  )
}