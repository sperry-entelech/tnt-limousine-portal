-- TNT Limousine Complete Database Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Vehicle Fleet Management
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- sedan, suv, stretch_limo, party_bus
    category VARCHAR(50) NOT NULL, -- luxury, premium, executive, party
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    per_mile_rate DECIMAL(10,2) DEFAULT 0,
    minimum_hours INTEGER DEFAULT 3,
    features TEXT[], -- array of features
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    color VARCHAR(30),
    license_plate VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Packages
CREATE TABLE service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- airport, wedding, wine_tour, corporate, prom, special_event
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    duration_hours INTEGER,
    includes TEXT[], -- array of included services
    restrictions TEXT[],
    is_active BOOLEAN DEFAULT true,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing Rules (Dynamic Pricing)
CREATE TABLE pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    service_type VARCHAR(50), -- airport, wedding, wine_tour, corporate
    vehicle_type VARCHAR(50), -- sedan, suv, stretch_limo
    rule_type VARCHAR(50) NOT NULL, -- base_rate, surge, discount, holiday
    multiplier DECIMAL(5,2) DEFAULT 1.0,
    fixed_amount DECIMAL(10,2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    day_of_week INTEGER[], -- 0=Sunday, 6=Saturday
    start_time TIME,
    end_time TIME,
    minimum_distance INTEGER,
    maximum_distance INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Areas
CREATE TABLE service_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- city, airport, venue, region
    zip_codes TEXT[],
    base_charge DECIMAL(10,2) DEFAULT 0,
    per_mile_rate DECIMAL(10,2) DEFAULT 2.50,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    address_line1 VARCHAR(200),
    address_line2 VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    customer_type VARCHAR(20) DEFAULT 'individual', -- individual, corporate
    company_name VARCHAR(200),
    preferred_contact VARCHAR(20) DEFAULT 'email', -- email, phone, sms
    special_requests TEXT,
    loyalty_points INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Corporate Accounts
CREATE TABLE corporate_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(200) NOT NULL,
    account_number VARCHAR(50) UNIQUE NOT NULL,
    billing_email VARCHAR(255) NOT NULL,
    billing_address_line1 VARCHAR(200),
    billing_address_line2 VARCHAR(200),
    billing_city VARCHAR(100),
    billing_state VARCHAR(50),
    billing_zip_code VARCHAR(20),
    credit_limit DECIMAL(12,2) DEFAULT 10000,
    payment_terms INTEGER DEFAULT 30, -- days
    discount_rate DECIMAL(5,2) DEFAULT 0,
    account_manager VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Corporate Users (employees who can book)
CREATE TABLE corporate_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    corporate_account_id UUID REFERENCES corporate_accounts(id),
    customer_id UUID REFERENCES customers(id),
    role VARCHAR(50) DEFAULT 'user', -- admin, approver, user
    cost_center VARCHAR(100),
    can_approve_bookings BOOLEAN DEFAULT false,
    spending_limit DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    corporate_account_id UUID REFERENCES corporate_accounts(id),
    service_package_id UUID REFERENCES service_packages(id),
    vehicle_id UUID REFERENCES vehicles(id),
    
    -- Service Details
    service_type VARCHAR(50) NOT NULL,
    pickup_date DATE NOT NULL,
    pickup_time TIME NOT NULL,
    pickup_address TEXT NOT NULL,
    pickup_city VARCHAR(100),
    pickup_state VARCHAR(50),
    pickup_zip VARCHAR(20),
    destination_address TEXT,
    destination_city VARCHAR(100),
    destination_state VARCHAR(50),
    destination_zip VARCHAR(20),
    
    -- Additional Stops
    stops JSONB, -- array of stop objects
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    additional_fees DECIMAL(10,2) DEFAULT 0,
    taxes DECIMAL(10,2) DEFAULT 0,
    tips DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Booking Details
    passenger_count INTEGER DEFAULT 1,
    duration_hours INTEGER,
    estimated_miles INTEGER,
    special_requests TEXT,
    flight_number VARCHAR(20),
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, assigned, in_progress, completed, cancelled
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
    
    -- Driver Assignment
    driver_name VARCHAR(100),
    driver_phone VARCHAR(20),
    driver_assigned_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Quotes
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Service Details (similar to bookings but for quotes)
    service_type VARCHAR(50) NOT NULL,
    pickup_date DATE,
    pickup_time TIME,
    pickup_address TEXT NOT NULL,
    destination_address TEXT,
    passenger_count INTEGER DEFAULT 1,
    duration_hours INTEGER,
    vehicle_type VARCHAR(50),
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    additional_fees DECIMAL(10,2) DEFAULT 0,
    taxes DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Quote Status
    status VARCHAR(50) DEFAULT 'pending', -- pending, sent, accepted, expired, cancelled
    valid_until TIMESTAMP WITH TIME ZONE,
    special_requests TEXT,
    
    -- Conversion
    converted_to_booking_id UUID REFERENCES bookings(id),
    converted_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    corporate_account_id UUID REFERENCES corporate_accounts(id),
    payment_method VARCHAR(50) NOT NULL, -- credit_card, bank_transfer, corporate_billing, cash
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    transaction_id VARCHAR(100),
    payment_processor VARCHAR(50), -- stripe, paypal, manual
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver Communication Log
CREATE TABLE driver_communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    message_type VARCHAR(50) NOT NULL, -- assignment, update, arrival, completion
    message TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- Customer Communications (emails, SMS)
CREATE TABLE customer_communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id),
    booking_id UUID REFERENCES bookings(id),
    quote_id UUID REFERENCES quotes(id),
    communication_type VARCHAR(50) NOT NULL, -- email, sms, call
    subject VARCHAR(200),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, sent, delivered, failed
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_pickup_date ON bookings(pickup_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_quotes_customer_email ON quotes(customer_email);
CREATE INDEX idx_quotes_created_at ON quotes(created_at);
CREATE INDEX idx_vehicles_type ON vehicles(type);
CREATE INDEX idx_vehicles_available ON vehicles(is_available);
CREATE INDEX idx_corporate_users_account ON corporate_users(corporate_account_id);

-- Row Level Security Policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_users ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (customize based on your auth setup)
CREATE POLICY "Customers can view own data" ON customers
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can view vehicles" ON vehicles
    FOR SELECT TO anon, authenticated USING (is_available = true);

CREATE POLICY "Anyone can view service packages" ON service_packages
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Anyone can create quotes" ON quotes
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Insert trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();