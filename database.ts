import { supabase } from './supabase'

// TNT Limousine Database Operations
export const database = {
  // Vehicle Operations
  async getVehicles() {
    // TNT Limousine Fleet with Real Pricing Data
    return [
      {
        id: '1',
        name: 'Sedan 04/05',
        type: 'sedan',
        category: 'luxury',
        make: 'Mercedes-Benz',
        model: 'S-Class',
        year: 2023,
        capacity: 3,
        hourly_rate: 60.00,
        driver_gratuity: 12.00,
        fuel_surcharge: 10.00,
        mileage_charge: 18.00,
        minimum_hours: 3,
        total_hourly_rate: 100.00,
        point_to_point_rate: 95.00,
        point_to_point_gratuity: 40.00,
        features: ['leather_seats', 'wifi', 'bottled_water', 'phone_chargers', 'climate_control', 'premium_sound'],
        image_url: '/images/tnt-executive-sedan.jpg',
        color: 'Black',
        license_plate: 'TNT-001',
        is_available: true
      },
      {
        id: '2',
        name: 'Transit 12 or 15',
        type: 'transit',
        category: 'group',
        make: 'Ford',
        model: 'Transit',
        year: 2023,
        capacity: 15,
        hourly_rate: 90.00,
        driver_gratuity: 12.00,
        fuel_surcharge: 10.00,
        mileage_charge: 18.00,
        minimum_hours: 3,
        total_hourly_rate: 137.00,
        point_to_point_rate: 165.00,
        point_to_point_gratuity: 40.00,
        features: ['group_seating', 'luggage_space', 'air_conditioning', 'comfortable_ride'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: 'White',
        license_plate: 'TNT-002',
        is_available: true
      },
      {
        id: '3',
        name: 'Executive Mini Bus 09',
        type: 'mini_bus',
        category: 'executive',
        make: 'Mercedes-Benz',
        model: 'Sprinter',
        year: 2022,
        capacity: 12,
        hourly_rate: 95.00,
        driver_gratuity: 12.00,
        fuel_surcharge: 10.00,
        mileage_charge: 18.00,
        minimum_hours: 3,
        total_hourly_rate: 142.00,
        point_to_point_rate: 170.00,
        point_to_point_gratuity: 50.00,
        features: ['executive_seating', 'wifi', 'climate_control', 'premium_interior', 'luggage_space'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: 'Black',
        license_plate: 'TNT-003',
        is_available: true
      },
      {
        id: '4',
        name: 'Mini Bus 01 (Sofa)',
        type: 'mini_bus',
        category: 'comfort',
        make: 'Mercedes-Benz',
        model: 'Sprinter',
        year: 2021,
        capacity: 10,
        hourly_rate: 95.00,
        driver_gratuity: 12.00,
        fuel_surcharge: 10.00,
        mileage_charge: 18.00,
        minimum_hours: 3,
        total_hourly_rate: 142.00,
        point_to_point_rate: 170.00,
        point_to_point_gratuity: 50.00,
        features: ['sofa_seating', 'wifi', 'climate_control', 'entertainment_system', 'comfortable_lounge'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: 'White',
        license_plate: 'TNT-004',
        is_available: true
      },
      {
        id: '5',
        name: 'Stretch Limo 03',
        type: 'stretch_limo',
        category: 'luxury',
        make: 'Lincoln',
        model: 'Town Car',
        year: 2020,
        capacity: 8,
        hourly_rate: 113.00,
        driver_gratuity: 12.00,
        fuel_surcharge: 10.00,
        mileage_charge: 18.00,
        minimum_hours: 3,
        total_hourly_rate: 160.00,
        point_to_point_rate: 230.00,
        point_to_point_gratuity: 50.00,
        features: ['bar', 'tv', 'sound_system', 'mood_lighting', 'privacy_partition', 'champagne_service', 'ice_bucket'],
        image_url: '/images/tnt-wedding-limo-interior.jpg',
        color: 'Black',
        license_plate: 'TNT-005',
        is_available: true
      },
      {
        id: '6',
        name: 'Sprinter Limo 02',
        type: 'sprinter_limo',
        category: 'luxury',
        make: 'Mercedes-Benz',
        model: 'Sprinter',
        year: 2022,
        capacity: 10,
        hourly_rate: 113.00,
        driver_gratuity: 12.00,
        fuel_surcharge: 10.00,
        mileage_charge: 18.00,
        minimum_hours: 3,
        total_hourly_rate: 160.00,
        point_to_point_rate: 260.00,
        point_to_point_gratuity: 50.00,
        features: ['luxury_interior', 'bar', 'tv_screens', 'premium_sound', 'mood_lighting', 'privacy_partition'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: 'Black',
        license_plate: 'TNT-006',
        is_available: true
      },
      {
        id: '7',
        name: 'Limo Bus 10',
        type: 'limo_bus',
        category: 'party',
        make: 'Ford',
        model: 'F-550',
        year: 2021,
        capacity: 18,
        hourly_rate: 152.00,
        driver_gratuity: 15.00,
        fuel_surcharge: 10.00,
        mileage_charge: 18.00,
        minimum_hours: 3,
        total_hourly_rate: 208.00,
        point_to_point_rate: 300.00,
        point_to_point_gratuity: 50.00,
        features: ['dance_floor', 'full_bar', 'multiple_tvs', 'premium_sound_system', 'mood_lighting', 'laser_lights', 'karaoke', 'party_atmosphere'],
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: 'Black',
        license_plate: 'TNT-007',
        is_available: true
      }
    ]
  },

  async getVehiclesByType(type: string) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('type', type)
      .eq('is_available', true)
      .order('hourly_rate', { ascending: true })
    
    if (error) {
      console.error('Error fetching vehicles by type:', error)
      return []
    }
    
    return data || []
  },

  // Service Package Operations
  async getServicePackages() {
    // Return TNT Limousine service packages for demo
    return [
      {
        id: '1',
        name: 'Richmond Airport Transfer - One Way',
        type: 'airport',
        description: 'Professional airport transfer service from RIC to anywhere in Greater Richmond area',
        base_price: 75.00,
        duration_hours: 1,
        includes: ['meet_and_greet', 'flight_tracking', 'complimentary_water', 'luggage_assistance', '30_minutes_waiting_time'],
        restrictions: ['advance_booking_required'],
        image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '2',
        name: 'Richmond Airport Transfer - Round Trip',
        type: 'airport',
        description: 'Round trip airport transfer with return pickup scheduling',
        base_price: 140.00,
        duration_hours: 2,
        includes: ['meet_and_greet', 'flight_tracking', 'complimentary_water', 'luggage_assistance', 'flexible_return_timing', '30_minutes_waiting_time'],
        restrictions: ['advance_booking_required'],
        image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '3',
        name: 'Wedding Day - Basic Package',
        type: 'wedding',
        description: 'Transportation for bride and groom on their special day',
        base_price: 450.00,
        duration_hours: 6,
        includes: ['bridal_decorations', 'champagne_service', 'red_carpet', 'just_married_signs', 'complimentary_water', 'wedding_coordinator_communication'],
        restrictions: ['minimum_6_hours', 'advance_booking_required', 'final_headcount_48_hours'],
        image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '4',
        name: 'Wedding Day - Premium Package',
        type: 'wedding',
        description: 'Complete wedding transportation for entire wedding party',
        base_price: 850.00,
        duration_hours: 8,
        includes: ['bridal_decorations', 'champagne_service', 'red_carpet', 'just_married_signs', 'multiple_vehicles', 'photography_coordination', 'timeline_management', 'complimentary_water'],
        restrictions: ['minimum_8_hours', 'advance_booking_required', 'final_headcount_48_hours'],
        image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '5',
        name: 'Wedding Day - Luxury Package',
        type: 'wedding',
        description: 'Ultimate luxury wedding experience with full day coverage',
        base_price: 1200.00,
        duration_hours: 10,
        includes: ['bridal_decorations', 'premium_champagne', 'red_carpet', 'custom_signage', 'multiple_luxury_vehicles', 'dedicated_coordinator', 'photography_support', 'timeline_management', 'venue_coordination'],
        restrictions: ['minimum_10_hours', 'advance_booking_required', 'final_headcount_72_hours'],
        image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '6',
        name: 'Virginia Wine Country Tour - Half Day',
        type: 'wine_tour',
        description: 'Visit 3 premium Virginia wineries in the scenic countryside',
        base_price: 380.00,
        duration_hours: 5,
        includes: ['professional_driver', 'wine_cooler', 'bottled_water', 'winery_reservations', 'route_planning', 'pickup_and_dropoff'],
        restrictions: ['minimum_4_passengers', '21_and_over_only', 'advance_booking_required'],
        image_url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '7',
        name: 'Virginia Wine Country Tour - Full Day',
        type: 'wine_tour',
        description: 'Comprehensive wine tour visiting 4-5 top Virginia wineries',
        base_price: 650.00,
        duration_hours: 8,
        includes: ['professional_driver', 'wine_cooler', 'gourmet_lunch', 'bottled_water', 'winery_reservations', 'route_planning', 'pickup_and_dropoff', 'wine_education'],
        restrictions: ['minimum_4_passengers', '21_and_over_only', 'advance_booking_required'],
        image_url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '8',
        name: 'Corporate Airport Service',
        type: 'corporate',
        description: 'Executive transportation for business travelers',
        base_price: 85.00,
        duration_hours: 1,
        includes: ['professional_driver', 'business_amenities', 'flight_tracking', 'corporate_billing', 'expense_reporting', 'priority_booking'],
        restrictions: ['corporate_account_required'],
        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '9',
        name: 'Corporate Event Transportation',
        type: 'corporate',
        description: 'Group transportation for corporate events and meetings',
        base_price: 120.00,
        duration_hours: 4,
        includes: ['professional_drivers', 'multiple_vehicles', 'event_coordination', 'corporate_billing', 'group_management', 'flexible_scheduling'],
        restrictions: ['corporate_account_required', 'advance_booking_required'],
        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '10',
        name: 'Executive Hourly Service',
        type: 'corporate',
        description: 'On-demand executive transportation by the hour',
        base_price: 95.00,
        duration_hours: 1,
        includes: ['professional_driver', 'business_amenities', 'flexible_scheduling', 'corporate_billing', 'priority_service', 'discretion_guaranteed'],
        restrictions: ['corporate_account_required', 'minimum_2_hours'],
        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '11',
        name: 'Prom Night Package',
        type: 'special_event',
        description: 'Safe and stylish prom transportation',
        base_price: 320.00,
        duration_hours: 5,
        includes: ['red_carpet_service', 'prom_decorations', 'non_alcoholic_beverages', 'music_requests', 'photo_opportunities', 'parent_communication'],
        restrictions: ['advance_booking_required', 'parent_approval_required', 'no_alcohol_policy'],
        image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      },
      {
        id: '12',
        name: 'Night Out - Party Package',
        type: 'special_event',
        description: 'Safe transportation for nights out in Richmond',
        base_price: 180.00,
        duration_hours: 4,
        includes: ['designated_driver', 'party_atmosphere', 'bottled_water', 'flexible_stops', 'safety_priority'],
        restrictions: ['advance_booking_required', 'responsible_drinking_policy'],
        image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        is_active: true
      }
    ]
  },

  async getServicePackagesByType(type: string) {
    const { data, error } = await supabase
      .from('service_packages')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('base_price', { ascending: true })
    
    if (error) {
      console.error('Error fetching service packages by type:', error)
      return []
    }
    
    return data || []
  },

  // Quote Operations
  async createQuote(quoteData: any) {
    // Generate quote number
    const quoteNumber = `Q-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    
    const quote = {
      ...quoteData,
      quote_number: quoteNumber,
      valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: 'pending'
    }

    const { data, error } = await supabase
      .from('quotes')
      .insert([quote])
      .select()
    
    if (error) {
      console.error('Error creating quote:', error)
      // Return mock quote for development
      return {
        id: Date.now().toString(),
        quote_number: quoteNumber,
        ...quote
      }
    }
    
    return data?.[0] || null
  },

  async calculateQuotePrice(serviceType: string, vehicleType: string, pickupDate: string, hours: number, miles: number = 0, destination: string = '') {
    try {
      const vehicles = await this.getVehicles()
      const vehicle = vehicles.find(v => v.type === vehicleType) || vehicles[0]
      
      if (!vehicle) {
        return {
          base_price: 100,
          additional_fees: 20,
          taxes: 9.60,
          total_amount: 129.60
        }
      }

      const pickupDateTime = new Date(pickupDate)
      const pickupHour = pickupDateTime.getHours()
      const dayOfWeek = pickupDateTime.getDay() // 0 = Sunday, 1 = Monday, etc.
      
      let basePrice = 0
      let driverGratuity = 0
      let fuelSurcharge = 0
      let tolls = 0
      let parking = 0
      
      // Airport runs have fixed pricing
      if (serviceType === 'airport') {
        const airportRates = this.getAirportRates(vehicle.type, destination)
        basePrice = airportRates.base
        driverGratuity = airportRates.gratuity
        fuelSurcharge = airportRates.fuel
        tolls = airportRates.tolls
        parking = airportRates.parking
      }
      // Point-to-point service
      else if (serviceType === 'point_to_point') {
        basePrice = vehicle.point_to_point_rate || vehicle.hourly_rate
        driverGratuity = vehicle.point_to_point_gratuity || 40.00
        fuelSurcharge = 10.00
        // Point-to-point mileage charges
        const mileageCharge = 10.00 // Per hour mileage as per pricing sheet
        basePrice += mileageCharge
      }
      // Hourly service
      else {
        const effectiveHours = Math.max(hours, vehicle.minimum_hours || 3)
        basePrice = vehicle.hourly_rate * effectiveHours
        driverGratuity = (vehicle.driver_gratuity || 12.00) * effectiveHours
        fuelSurcharge = (vehicle.fuel_surcharge || 10.00) * effectiveHours
        const mileageCharge = (vehicle.mileage_charge || 18.00) * effectiveHours
        basePrice += mileageCharge
      }
      
      // After-hour surcharge (11 PM - 6 AM)
      let afterHourSurcharge = 0
      if (pickupHour >= 23 || pickupHour <= 6) {
        afterHourSurcharge = 20.00
      }
      
      // Calculate discounts
      let discount = 0
      
      // 6+ Hour Trip - 10% off total cost
      if (hours >= 6) {
        discount += 0.10
      }
      
      // Monday-Thursday Hourly or P2P - 10% off total cost
      if (dayOfWeek >= 1 && dayOfWeek <= 4 && (serviceType === 'hourly' || serviceType === 'point_to_point')) {
        discount += 0.10
      }
      
      // Trip Inquiries 4 days out or less - 15% off total cost
      const daysUntilTrip = Math.ceil((pickupDateTime.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
      if (daysUntilTrip <= 4) {
        discount += 0.15
      }
      
      // Cap discount at reasonable amount
      discount = Math.min(discount, 0.25) // Max 25% total discount
      
      const subtotal = basePrice + driverGratuity + fuelSurcharge + tolls + parking + afterHourSurcharge
      const discountAmount = subtotal * discount
      const discountedTotal = subtotal - discountAmount
      
      // Virginia tax (varies by locality, using 8% as average)
      const taxes = discountedTotal * 0.08
      const totalAmount = discountedTotal + taxes

      return {
        base_price: Math.round(basePrice * 100) / 100,
        driver_gratuity: Math.round(driverGratuity * 100) / 100,
        fuel_surcharge: Math.round(fuelSurcharge * 100) / 100,
        tolls: Math.round(tolls * 100) / 100,
        parking: Math.round(parking * 100) / 100,
        after_hour_surcharge: Math.round(afterHourSurcharge * 100) / 100,
        subtotal: Math.round(subtotal * 100) / 100,
        discount_amount: Math.round(discountAmount * 100) / 100,
        discount_percentage: Math.round(discount * 100),
        taxes: Math.round(taxes * 100) / 100,
        total_amount: Math.round(totalAmount * 100) / 100
      }
    } catch (error) {
      console.error('Error calculating quote price:', error)
      return {
        base_price: 100,
        additional_fees: 20,
        taxes: 9.60,
        total_amount: 129.60
      }
    }
  },

  // Get airport rates based on vehicle type and destination
  getAirportRates(vehicleType: string, destination: string) {
    const airportRates = {
      sedan: {
        richmond: { base: 74.00, gratuity: 11.00, fuel: 10.00, tolls: 5.00, parking: 5.00 },
        charlottesville: { base: 260.00, gratuity: 33.00, fuel: 30.00, tolls: 5.00, parking: 5.00 },
        national: { base: 283.00, gratuity: 50.00, fuel: 50.00, tolls: 55.00, parking: 12.00 },
        dulles: { base: 293.00, gratuity: 50.00, fuel: 50.00, tolls: 55.00, parking: 12.00 },
        bwi: { base: 440.00, gratuity: 67.00, fuel: 60.00, tolls: 75.00, parking: 15.00 }
      },
      transit: {
        richmond: { base: 131.00, gratuity: 24.00, fuel: 10.00, tolls: 5.00, parking: 5.00 },
        charlottesville: { base: 420.00, gratuity: 65.00, fuel: 30.00, tolls: 5.00, parking: 5.00 },
        national: { base: 508.00, gratuity: 75.00, fuel: 50.00, tolls: 55.00, parking: 12.00 },
        dulles: { base: 523.00, gratuity: 75.00, fuel: 45.00, tolls: 55.00, parking: 12.00 },
        bwi: { base: 600.00, gratuity: 110.00, fuel: 54.00, tolls: 75.00, parking: 15.00 }
      },
      sprinter_limo: {
        richmond: { base: 150.00, gratuity: 24.00, fuel: 10.00, tolls: 5.00, parking: 5.00 },
        charlottesville: { base: 465.00, gratuity: 70.00, fuel: 30.00, tolls: 5.00, parking: 5.00 },
        national: { base: 588.00, gratuity: 75.00, fuel: 50.00, tolls: 55.00, parking: 12.00 },
        dulles: { base: 603.00, gratuity: 75.00, fuel: 45.00, tolls: 55.00, parking: 12.00 },
        bwi: { base: 656.00, gratuity: 110.00, fuel: 54.00, tolls: 75.00, parking: 15.00 }
      },
      limo_bus: {
        richmond: { base: 170.00, gratuity: 35.00, fuel: 10.00, tolls: 5.00, parking: 5.00 },
        charlottesville: { base: 494.00, gratuity: 90.00, fuel: 30.00, tolls: 5.00, parking: 5.00 },
        national: { base: 803.00, gratuity: 100.00, fuel: 50.00, tolls: 55.00, parking: 12.00 },
        dulles: { base: 803.00, gratuity: 125.00, fuel: 50.00, tolls: 55.00, parking: 12.00 },
        bwi: { base: 940.00, gratuity: 175.00, fuel: 60.00, tolls: 75.00, parking: 15.00 }
      }
    }
    
    // Default to sedan rates if vehicle type not found
    const vehicleRates = (airportRates as any)[vehicleType] || airportRates.sedan
    
    // Default to Richmond rates if destination not found
    const destKey = destination.toLowerCase()
    if (destKey.includes('charlottesville') || destKey.includes('williamsburg')) {
      return vehicleRates.charlottesville
    } else if (destKey.includes('national') || destKey.includes('dca')) {
      return vehicleRates.national
    } else if (destKey.includes('dulles') || destKey.includes('iad')) {
      return vehicleRates.dulles
    } else if (destKey.includes('bwi') || destKey.includes('baltimore')) {
      return vehicleRates.bwi
    }
    
    return vehicleRates.richmond
  },

  async getQuotesByEmail(email: string) {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching quotes:', error)
      return []
    }
    
    return data || []
  },

  // Booking Operations
  async createBooking(bookingData: any) {
    // Generate booking number
    const bookingNumber = `TNT-${new Date().getFullYear()}-${String(Date.now()).slice(-4).padStart(4, '0')}`
    
    const booking = {
      ...bookingData,
      booking_number: bookingNumber,
      status: 'pending',
      payment_status: 'pending'
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
    
    if (error) {
      console.error('Error creating booking:', error)
      return {
        id: Date.now().toString(),
        booking_number: bookingNumber,
        ...booking
      }
    }
    
    return data?.[0] || null
  },

  async getCustomerBookings(customerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicles(*),
        service_packages(*),
        customers(*)
      `)
      .eq('customer_id', customerId)
      .order('pickup_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching customer bookings:', error)
      // Return mock booking data
      return [
        {
          id: '1',
          booking_number: 'TNT-2024-0001',
          service_type: 'airport',
          pickup_date: '2024-08-25',
          pickup_time: '14:30',
          pickup_address: '1234 Monument Ave, Richmond, VA',
          destination_address: 'Richmond International Airport (RIC)',
          total_amount: 97.20,
          status: 'confirmed',
          vehicles: {
            name: 'Mercedes S-Class - Executive',
            type: 'sedan'
          }
        }
      ]
    }
    
    return data || []
  },

  async getBookingByNumber(bookingNumber: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicles(*),
        service_packages(*),
        customers(*),
        corporate_accounts(*)
      `)
      .eq('booking_number', bookingNumber)
      .single()
    
    if (error) {
      console.error('Error fetching booking:', error)
      return null
    }
    
    return data
  },

  async updateBookingStatus(bookingId: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()
    
    if (error) {
      console.error('Error updating booking status:', error)
      return null
    }
    
    return data?.[0] || null
  },

  // Customer Operations
  async createCustomer(customerData: any) {
    const { data, error } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
    
    if (error) {
      console.error('Error creating customer:', error)
      return {
        id: Date.now().toString(),
        ...customerData
      }
    }
    
    return data?.[0] || null
  },

  async getCustomerByEmail(email: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching customer:', error)
      return null
    }
    
    return data
  },

  // Corporate Account Operations
  async getCorporateAccounts() {
    const { data, error } = await supabase
      .from('corporate_accounts')
      .select('*')
      .eq('is_active', true)
      .order('company_name', { ascending: true })
    
    if (error) {
      console.error('Error fetching corporate accounts:', error)
      // Return mock corporate accounts
      return [
        {
          id: '1',
          company_name: 'Capital One Bank',
          account_number: 'CO-2024-001',
          credit_limit: 25000,
          discount_rate: 10,
          is_active: true
        },
        {
          id: '2',
          company_name: 'Dominion Energy',
          account_number: 'DE-2024-002',
          credit_limit: 35000,
          discount_rate: 12,
          is_active: true
        }
      ]
    }
    
    return data || []
  },

  async getCorporateAccountBookings(accountId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicles(*),
        service_packages(*),
        customers(*)
      `)
      .eq('corporate_account_id', accountId)
      .order('pickup_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching corporate bookings:', error)
      return []
    }
    
    return data || []
  },

  // System Settings
  async getSystemSetting(key: string) {
    const { data, error } = await supabase
      .from('system_settings')
      .select('setting_value')
      .eq('setting_key', key)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching system setting:', error)
      return null
    }
    
    return data?.setting_value || null
  },

  // Dashboard Analytics
  async getDashboardStats(customerId?: string, corporateAccountId?: string) {
    try {
      let bookingsQuery = supabase.from('bookings').select('*')
      let quotesQuery = supabase.from('quotes').select('*')
      
      if (customerId) {
        bookingsQuery = bookingsQuery.eq('customer_id', customerId)
        quotesQuery = quotesQuery.eq('customer_id', customerId)
      }
      
      if (corporateAccountId) {
        bookingsQuery = bookingsQuery.eq('corporate_account_id', corporateAccountId)
      }
      
      const [bookingsResult, quotesResult] = await Promise.all([
        bookingsQuery,
        quotesQuery
      ])
      
      const bookings = bookingsResult.data || []
      const quotes = quotesResult.data || []
      
      return {
        totalBookings: bookings.length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        upcomingBookings: bookings.filter(b => 
          b.status === 'confirmed' && new Date(b.pickup_date) > new Date()
        ).length,
        totalQuotes: quotes.length,
        pendingQuotes: quotes.filter(q => q.status === 'pending').length,
        totalSpent: bookings
          .filter(b => b.status === 'completed')
          .reduce((sum, b) => sum + parseFloat(b.total_amount || '0'), 0),
        averageBookingValue: bookings.length > 0 
          ? bookings.reduce((sum, b) => sum + parseFloat(b.total_amount || '0'), 0) / bookings.length 
          : 0
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      // Return mock stats for development
      return {
        totalBookings: 5,
        completedBookings: 3,
        upcomingBookings: 2,
        totalQuotes: 8,
        pendingQuotes: 3,
        totalSpent: 1245.80,
        averageBookingValue: 249.16
      }
    }
  },

  // Trip Tracking
  async getTripStatus(bookingId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicles(*),
        customers(*)
      `)
      .eq('id', bookingId)
      .single()
    
    if (error) {
      console.error('Error fetching trip status:', error)
      // Return mock trip status
      return {
        id: bookingId,
        booking_number: 'TNT-2024-0001',
        status: 'in_progress',
        driver_name: 'James Anderson',
        driver_phone: '804-555-0301',
        vehicle_location: {
          lat: 37.5407,
          lng: -77.4360
        },
        estimated_arrival: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        pickup_address: '1234 Monument Ave, Richmond, VA',
        destination_address: 'Richmond International Airport (RIC)'
      }
    }
    
    return data
  }
}

// Trip operations for track page compatibility
export const tripOperations = {
  getTripStatus: database.getTripStatus
}