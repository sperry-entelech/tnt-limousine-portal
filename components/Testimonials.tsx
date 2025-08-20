'use client'

import React, { useState, useEffect } from 'react'

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Wedding Client',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      text: 'TNT Limousine made our wedding day absolutely perfect! The attention to detail and professional service exceeded our expectations. Our driver was punctual, courteous, and the vehicle was immaculate.',
      service: 'Wedding Transportation'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Corporate Executive',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      text: 'As a frequent business traveler, I rely on TNT for all my airport transfers. Their corporate portal makes booking seamless, and I never worry about being late for flights. Consistently excellent service.',
      service: 'Corporate Travel'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Wine Tour Customer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      text: 'Our wine tour with TNT was incredible! The driver was knowledgeable about the area, the vehicle was luxury, and we felt safe throughout the day. Perfect for special celebrations!',
      service: 'Wine Tours'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Airport Transfer Client',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      text: 'Flight tracking and real-time updates gave me peace of mind during my business trip. The driver was waiting when I landed, and the ride to my hotel was comfortable and professional.',
      service: 'Airport Transfer'
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      role: 'Special Event Client',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      text: 'Booked TNT for my daughter\'s prom and couldn\'t be happier. The party bus was amazing, the driver was professional, and all the kids had a fantastic time. Safety and fun combined perfectly!',
      service: 'Special Events'
    },
    {
      id: 6,
      name: 'Robert Wilson',
      role: 'Corporate Account Manager',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      text: 'TNT handles all our company\'s transportation needs. Their corporate dashboard makes managing multiple employees\' rides easy, and the monthly billing simplifies our accounting process.',
      service: 'Corporate Solutions'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. See what our satisfied customers have to say about their TNT Limousine experience.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Client Photo */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-tnt-red"
                  />
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-gray-700 mb-4 italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                    <p className="text-tnt-red font-medium text-sm mt-1">
                      {testimonials[currentTestimonial].service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover-lift"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover-lift"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentTestimonial ? 'bg-tnt-red' : 'bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-tnt-red mb-2">5.0</div>
            <div className="text-white font-medium">Average Rating</div>
            <div className="text-gray-400 text-sm">Based on 500+ reviews</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-tnt-red mb-2">98%</div>
            <div className="text-white font-medium">On-Time Rate</div>
            <div className="text-gray-400 text-sm">Punctual service</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-tnt-red mb-2">24/7</div>
            <div className="text-white font-medium">Availability</div>
            <div className="text-gray-400 text-sm">Always ready to serve</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-tnt-red mb-2">10+</div>
            <div className="text-white font-medium">Years Experience</div>
            <div className="text-gray-400 text-sm">Trusted service</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience TNT Limousine?</h3>
          <p className="text-gray-300 mb-6">Join thousands of satisfied customers who trust us for their transportation needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 hover-lift">
              Book Your Ride
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-300 hover-lift">
              View Our Fleet
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
