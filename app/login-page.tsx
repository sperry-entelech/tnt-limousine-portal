'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [userType, setUserType] = useState<'customer' | 'corporate'>('customer')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accountCode: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, always succeed and redirect
      if (userType === 'corporate') {
        router.push('/corporate')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <div className="w-16 h-16 bg-tnt-red rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">TNT</span>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/" className="font-medium text-tnt-red hover:text-tnt-red-dark">
            return to homepage
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* User Type Selection */}
          <div className="mb-6">
            <div className="flex rounded-lg border border-gray-300 p-1">
              <button
                type="button"
                onClick={() => setUserType('customer')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  userType === 'customer'
                    ? 'bg-tnt-red text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Customer Login
              </button>
              <button
                type="button"
                onClick={() => setUserType('corporate')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  userType === 'corporate'
                    ? 'bg-tnt-red text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Corporate Login
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {userType === 'corporate' && (
              <div>
                <label htmlFor="accountCode" className="block text-sm font-medium text-gray-700">
                  Account Code
                </label>
                <div className="mt-1">
                  <input
                    id="accountCode"
                    name="accountCode"
                    type="text"
                    value={formData.accountCode}
                    onChange={(e) => handleInputChange('accountCode', e.target.value)}
                    placeholder="Enter your corporate account code"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-tnt-red focus:border-tnt-red sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-tnt-red focus:border-tnt-red sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-tnt-red focus:border-tnt-red sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-tnt-red focus:ring-tnt-red border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-tnt-red hover:text-tnt-red-dark">
                  Forgot your password?
                </a>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tnt-red hover:bg-tnt-red-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tnt-red disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to TNT Limousine?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Customer:</strong> customer@demo.com / demo123</p>
              <p><strong>Corporate:</strong> admin@acme.com / demo123 (Account: ACME-2024)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
