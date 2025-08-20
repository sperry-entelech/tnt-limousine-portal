'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavigationProps {
  onRequestQuote: () => void
}

export default function Navigation({ onRequestQuote }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Corporate', href: '/corporate' },
    { name: 'Track Trip', href: '/track' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-tnt-red rounded-full flex items-center justify-center border-2 border-gray-800">
                <span className="text-white font-black text-sm">TNT</span>
              </div>
              <span className="ml-2 text-white text-lg font-script italic">Limousine</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-gray-300 text-xs">Luxury Transportation • Richmond, VA</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-tnt-red transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onRequestQuote}
              className="bg-tnt-red hover:bg-tnt-red-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 hover-lift"
            >
              Get Quote
            </button>
            <Link
              href="/login"
              className="hidden sm:block text-white hover:text-tnt-red transition-colors duration-300 font-medium"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-tnt-red transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="block px-3 py-2 text-white hover:text-tnt-red transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}