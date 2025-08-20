'use client'

import React, { useState } from 'react'
import CorporateLayout from '@/components/corporate/CorporateLayout'
import BulkBookingInterface from '@/components/corporate/BulkBookingInterface'
import UsageAnalytics from '@/components/corporate/UsageAnalytics'
import TeamManagement from '@/components/corporate/TeamManagement'
import BillingOverview from '@/components/corporate/BillingOverview'
import { CorporateAccount, UsageAnalytics as UsageAnalyticsType } from '@/types'

export default function CorporateDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock corporate account data
  const corporateAccount: CorporateAccount = {
    id: 'corp-001',
    companyName: 'Acme Corporation',
    accountCode: 'ACME-2024',
    billingAddress: {
      street: '123 Business Plaza',
      city: 'Downtown',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    contactPerson: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@acme.com',
      phone: '555-0199'
    },
    creditLimit: 50000,
    currentBalance: 12500,
    paymentTerms: 'Net 30',
    users: [
      {
        id: 'user-1',
        email: 'sarah.johnson@acme.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'admin',
        permissions: ['book', 'approve', 'manage_users', 'view_reports'],
        active: true
      },
      {
        id: 'user-2',
        email: 'mike.chen@acme.com',
        firstName: 'Mike',
        lastName: 'Chen',
        role: 'user',
        permissions: ['book'],
        costCenter: 'Engineering',
        active: true
      }
    ],
    settings: {
      requireApproval: true,
      approvalLimit: 500,
      allowedServices: ['airport', 'corporate', 'hourly'],
      restrictedHours: {
        start: '22:00',
        end: '06:00'
      },
      defaultBillingCode: 'TRAVEL-001'
    }
  }

  const usageData: UsageAnalyticsType = {
    period: 'monthly',
    totalTrips: 45,
    totalCost: 8750,
    averageTripCost: 194,
    mostUsedService: 'Airport Transfer',
    costByService: {
      'Airport Transfer': 4500,
      'Corporate Travel': 2800,
      'Hourly Service': 1450
    },
    tripsByDate: {
      '2024-08-01': 3,
      '2024-08-02': 2,
      '2024-08-03': 1,
      '2024-08-05': 4,
      '2024-08-06': 2
    },
    topRoutes: [
      { route: 'Office → Airport', count: 18, totalCost: 1800 },
      { route: 'Airport → Hotel District', count: 12, totalCost: 1560 },
      { route: 'Conference Center Circuit', count: 8, totalCost: 1200 }
    ]
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'booking', name: 'Bulk Booking', icon: '📅' },
    { id: 'team', name: 'Team Management', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  return (
    <CorporateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {corporateAccount.companyName}
            </h1>
            <p className="text-gray-600">Account: {corporateAccount.accountCode}</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
              Quick Book
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
              Download Report
            </button>
          </div>
        </div>

        {/* Account Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Current Balance</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${corporateAccount.currentBalance.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">of ${corporateAccount.creditLimit.toLocaleString()} limit</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">This Month</h3>
            <p className="text-2xl font-bold text-tnt-red">{usageData.totalTrips}</p>
            <p className="text-sm text-gray-600">Total trips</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Monthly Spend</h3>
            <p className="text-2xl font-bold text-tnt-red">
              ${usageData.totalCost.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Current month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
            <p className="text-2xl font-bold text-gray-900">
              {corporateAccount.users.filter(u => u.active).length}
            </p>
            <p className="text-sm text-gray-600">Team members</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-tnt-red text-tnt-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-300`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <UsageAnalytics data={usageData} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow border">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { user: 'Mike Chen', action: 'Booked airport transfer', time: '2 hours ago', amount: '$85' },
                      { user: 'Sarah Johnson', action: 'Approved bulk booking', time: '4 hours ago', amount: '$450' },
                      { user: 'David Kim', action: 'Booked hourly service', time: '1 day ago', amount: '$180' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-tnt-red">{activity.amount}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Trips</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { service: 'Airport Transfer', user: 'Mike Chen', date: 'Aug 18, 8:00 AM', cost: '$85' },
                      { service: 'Corporate Event', user: 'Sarah Johnson', date: 'Aug 20, 2:00 PM', cost: '$300' },
                      { service: 'Client Meeting', user: 'David Kim', date: 'Aug 22, 10:00 AM', cost: '$120' }
                    ].map((trip, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{trip.service}</p>
                          <p className="text-sm text-gray-600">{trip.user} • {trip.date}</p>
                        </div>
                        <p className="text-sm font-medium text-tnt-red">{trip.cost}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'booking' && (
            <BulkBookingInterface account={corporateAccount} />
          )}

          {activeTab === 'team' && (
            <TeamManagement account={corporateAccount} />
          )}

          {activeTab === 'analytics' && (
            <UsageAnalytics data={usageData} detailed />
          )}

          {activeTab === 'billing' && (
            <BillingOverview account={corporateAccount} />
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow border">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Approval Settings</h4>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={corporateAccount.settings.requireApproval}
                        className="h-4 w-4 text-tnt-red border-gray-300 rounded focus:ring-tnt-red"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require approval for bookings</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approval threshold ($)
                      </label>
                      <input
                        type="number"
                        value={corporateAccount.settings.approvalLimit}
                        className="w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-tnt-red focus:border-tnt-red"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Service Restrictions</h4>
                  <div className="space-y-2">
                    {['airport', 'corporate', 'wedding', 'wine-tour', 'hourly'].map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={corporateAccount.settings.allowedServices.includes(service)}
                          className="h-4 w-4 text-tnt-red border-gray-300 rounded focus:ring-tnt-red"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {service.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CorporateLayout>
  )
}