'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeroProps {
  onRequestQuote: () => void
}

export default function Hero({ onRequestQuote }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: 'Premium Luxury Transportation',
      subtitle: 'Experience excellence with TNT Limousine services',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      cta: 'Book Your Ride'
    },
    {
      title: 'Airport Transfers Made Easy',
      subtitle: 'Reliable, punctual service with flight tracking',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      cta: 'Schedule Transfer'
    },
    {
      title: 'Wedding Transportation',
      subtitle: 'Make your special day even more memorable',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      cta: 'Wedding Packages'
    },
    {
      title: 'Corporate Travel Solutions',
      subtitle: 'Professional service for business clients',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      cta: 'Corporate Portal'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onRequestQuote}
                className="bg-tnt-red hover:bg-tnt-red-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift min-w-[200px]"
              >
                {heroSlides[currentSlide].cta}
              </button>
              <Link
                href="/corporate"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift min-w-[200px]"
              >
                Corporate Login
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center glass-morphism p-6 rounded-lg">
              <div className="w-12 h-12 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-300 text-sm">Available around the clock for your transportation needs</p>
            </div>

            <div className="text-center glass-morphism p-6 rounded-lg">
              <div className="w-12 h-12 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Professional Drivers</h3>
              <p className="text-gray-300 text-sm">Licensed, insured, and expertly trained chauffeurs</p>
            </div>

            <div className="text-center glass-morphism p-6 rounded-lg">
              <div className="w-12 h-12 bg-tnt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Luxury Fleet</h3>
              <p className="text-gray-300 text-sm">Premium vehicles maintained to the highest standards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-tnt-red transition-colors duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-tnt-red transition-colors duration-300"
        aria-label="Next slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-tnt-red' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}