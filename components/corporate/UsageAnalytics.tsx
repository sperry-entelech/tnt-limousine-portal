'use client'

import React, { useState } from 'react'
import { UsageAnalytics as UsageAnalyticsType } from '@/types'

interface UsageAnalyticsProps {
  data: UsageAnalyticsType
  detailed?: boolean
}

export default function UsageAnalytics({ data, detailed = false }: UsageAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>(data.period)

  const periods = [
    { id: 'daily', name: 'Last 7 Days' },
    { id: 'weekly', name: 'Last 4 Weeks' },
    { id: 'monthly', name: 'Last 12 Months' },
    { id: 'quarterly', name: 'Last 4 Quarters' },
    { id: 'yearly', name: 'Last 5 Years' }
  ]

  const exportReport = () => {
    // Mock export functionality
    console.log('Exporting report for period:', selectedPeriod)
    alert('Report exported successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Trips</h3>
          <p className="text-3xl font-bold text-gray-900">{data.totalTrips}</p>
          <p className="text-sm text-green-600">+12% from last period</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
          <p className="text-3xl font-bold text-tnt-red">${data.totalCost.toLocaleString()}</p>
          <p className="text-sm text-green-600">-5% from last period</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Average Trip Cost</h3>
          <p className="text-3xl font-bold text-gray-900">${data.averageTripCost}</p>
          <p className="text-sm text-red-600">+8% from last period</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Most Used Service</h3>
          <p className="text-lg font-semibold text-gray-900">{data.mostUsedService}</p>
          <p className="text-sm text-gray-600">65% of all trips</p>
        </div>
      </div>

      {detailed && (
        <>
          {/* Period Selector and Export */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Analytics</h3>
              <div className="flex space-x-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                >
                  {periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={exportReport}
                  className="bg-tnt-red hover:bg-tnt-red-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Export Report
                </button>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Trip Volume Chart</p>
                  <p className="text-xs text-gray-400">Chart integration would go here</p>
                </div>
              </div>

              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Service Distribution</p>
                  <p className="text-xs text-gray-400">Pie chart integration would go here</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Service Breakdown */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Cost by Service</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(data.costByService).map(([service, cost]) => {
              const percentage = (cost / data.totalCost) * 100
              return (
                <div key={service}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{service}</span>
                    <span className="text-sm text-gray-600">${cost.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-tnt-red h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Routes */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Most Popular Routes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data.topRoutes.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-tnt-red text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{route.route}</p>
                    <p className="text-sm text-gray-600">{route.count} trips</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-tnt-red">${route.totalCost.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total cost</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {detailed && (
        <>
          {/* Cost Trends */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">↗ 12%</p>
                  <p className="text-sm text-gray-600">Trip Volume Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">↗ 8%</p>
                  <p className="text-sm text-gray-600">Average Cost Increase</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">92%</p>
                  <p className="text-sm text-gray-600">On-Time Performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Cost Optimization Recommendations</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Consider switching 15% of airport transfers to shared ride service for 20% savings</li>
                  <li>• Implement advance booking policy to reduce last-minute premium rates</li>
                  <li>• Consolidate similar routes for potential volume discounts</li>
                  <li>• Review hourly service usage patterns to optimize vehicle allocation</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
