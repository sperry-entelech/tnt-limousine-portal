import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TNT Limousine - Luxury Transportation Services',
  description: 'Premium limousine and transportation services for airport transfers, weddings, wine tours, and corporate travel.',
  keywords: ['limousine', 'luxury transportation', 'airport transfer', 'wedding transportation', 'wine tours', 'corporate travel'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}