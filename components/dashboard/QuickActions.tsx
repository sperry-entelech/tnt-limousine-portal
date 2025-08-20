'use client'

import React from 'react'
import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    {
      name: 'Book Airport Transfer',
      description: 'Quick booking for airport pickup/dropoff',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      href: '/dashboard/book?service=airport',
      color: 'bg-blue-500'
    },
    {
      name: 'Repeat Last Trip',
      description: 'Book the same trip as last time',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      href: '/dashboard/book?repeat=true',
      color: 'bg-green-500'
    },
    {
      name: 'Track Active Trip',
      description: 'See live location and ETA',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '/dashboard/track',
      color: 'bg-tnt-red'
    },
    {
      name: 'Emergency Contact',
      description: '24/7 support hotline',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: 'tel:+15551234567',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6 space-y-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="block group hover:bg-gray-50 rounded-lg p-3 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-tnt-red transition-colors">
                  {action.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {action.description}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-tnt-red transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Support Section */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h4>
          <p className="text-xs text-gray-600 mb-3">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex space-x-2">
            <button className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs py-2 px-3 rounded hover:bg-gray-50 transition-colors">
              Live Chat
            </button>
            <button className="flex-1 bg-tnt-red text-white text-xs py-2 px-3 rounded hover:bg-tnt-red-dark transition-colors">
              Call Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
