'use client'

import React, { useState } from 'react'
import { CorporateAccount, Invoice } from '@/types'

interface BillingOverviewProps {
  account: CorporateAccount
}

export default function BillingOverview({ account }: BillingOverviewProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

  // Mock invoice data
  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      accountId: account.id,
      amount: 2450,
      dueDate: new Date('2024-09-15'),
      status: 'pending',
      items: [
        { bookingId: 'B001', description: 'Airport Transfer - Mike Chen', amount: 85, date: new Date('2024-08-01') },
        { bookingId: 'B002', description: 'Corporate Event Transport', amount: 300, date: new Date('2024-08-03') },
        { bookingId: 'B003', description: 'Hourly Service - David Kim', amount: 180, date: new Date('2024-08-05') }
      ],
      createdAt: new Date('2024-08-15')
    },
    {
      id: 'INV-2024-002',
      accountId: account.id,
      amount: 1850,
      dueDate: new Date('2024-08-15'),
      status: 'paid',
      items: [
        { bookingId: 'B004', description: 'Airport Transfer - Sarah Johnson', amount: 95, date: new Date('2024-07-01') },
        { bookingId: 'B005', description: 'Wine Tour - Team Event', amount: 450, date: new Date('2024-07-10') }
      ],
      createdAt: new Date('2024-07-15')
    }
  ]

  const paymentMethods = [
    {
      id: 'pm-1',
      type: 'credit-card',
      details: { last4: '4242', brand: 'Visa', expiryMonth: 12, expiryYear: 2025 },
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'corporate-account',
      details: { accountNumber: 'CA-' + account.accountCode },
      isDefault: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const downloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId)
    alert('Invoice download started')
  }

  const payInvoice = (invoiceId: string) => {
    console.log('Paying invoice:', invoiceId)
    alert('Payment processed successfully')
  }

  const totalOutstanding = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const creditUtilization = (account.currentBalance / account.creditLimit) * 100

  return (
    <div className="space-y-6">
      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Current Balance</h3>
          <p className="text-2xl font-bold text-gray-900">
            ${account.currentBalance.toLocaleString()}
          </p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  creditUtilization > 80 ? 'bg-red-500' : creditUtilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${creditUtilization}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {creditUtilization.toFixed(1)}% of ${account.creditLimit.toLocaleString()} limit
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Outstanding</h3>
          <p className="text-2xl font-bold text-red-600">
            ${totalOutstanding.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            {invoices.filter(inv => inv.status === 'pending').length} pending invoice{invoices.filter(inv => inv.status === 'pending').length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Payment Terms</h3>
          <p className="text-2xl font-bold text-gray-900">{account.paymentTerms}</p>
          <p className="text-sm text-gray-600">Standard terms</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Next Payment</h3>
          <p className="text-lg font-bold text-gray-900">
            {invoices.find(inv => inv.status === 'pending')?.dueDate.toLocaleDateString() || 'None due'}
          </p>
          <p className="text-sm text-gray-600">Due date</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-tnt-red hover:bg-tnt-red-dark text-white p-4 rounded-lg font-medium transition-colors">
            Make Payment
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 p-4 rounded-lg font-medium transition-colors">
            Download Statement
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 p-4 rounded-lg font-medium transition-colors">
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            <button className="text-sm text-tnt-red hover:text-tnt-red-dark font-medium">
              View All Invoices
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-500">
                        Created {invoice.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${invoice.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {invoice.dueDate.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => downloadInvoice(invoice.id)}
                        className="text-tnt-red hover:text-tnt-red-dark font-medium"
                      >
                        Download
                      </button>
                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => payInvoice(invoice.id)}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          Pay Now
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedInvoice(selectedInvoice === invoice.id ? null : invoice.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Details */}
        {selectedInvoice && (
          <div className="border-t border-gray-200 p-6">
            {invoices.filter(inv => inv.id === selectedInvoice).map((invoice) => (
              <div key={invoice.id}>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Invoice {invoice.id} Details
                </h4>
                <div className="space-y-3">
                  {invoice.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.description}</p>
                        <p className="text-xs text-gray-500">
                          Booking ID: {item.bookingId} • {item.date.toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 font-semibold">
                    <p className="text-gray-900">Total</p>
                    <p className="text-gray-900">${invoice.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        </div>
        <div className="p-6 space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  {method.type === 'credit-card' ? (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {method.type === 'credit-card' 
                      ? `${(method.details as any).brand} ending in ${(method.details as any).last4}`
                      : `Corporate Account ${(method.details as any).accountNumber}`
                    }
                  </p>
                  {method.type === 'credit-card' && (
                    <p className="text-xs text-gray-500">
                      Expires {(method.details as any).expiryMonth}/{(method.details as any).expiryYear}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {method.isDefault && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Default
                  </span>
                )}
                <button className="text-sm text-tnt-red hover:text-tnt-red-dark font-medium">
                  Edit
                </button>
              </div>
            </div>
          ))}
          
          <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
            + Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing Settings */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Billing Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive invoice and payment notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tnt-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tnt-red"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Auto-Pay</h4>
              <p className="text-sm text-gray-600">Automatically pay invoices on due date</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tnt-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tnt-red"></div>
            </label>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Invoice Delivery</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="delivery" defaultChecked className="h-4 w-4 text-tnt-red border-gray-300 focus:ring-tnt-red" />
                <span className="ml-2 text-sm text-gray-700">Email only</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="delivery" className="h-4 w-4 text-tnt-red border-gray-300 focus:ring-tnt-red" />
                <span className="ml-2 text-sm text-gray-700">Email and postal mail</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="delivery" className="h-4 w-4 text-tnt-red border-gray-300 focus:ring-tnt-red" />
                <span className="ml-2 text-sm text-gray-700">Portal access only</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
