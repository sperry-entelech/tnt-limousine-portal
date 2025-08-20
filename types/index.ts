// Service Types
export interface ServiceType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration?: string;
  features: string[];
  image?: string;
}

// Vehicle Types
export interface Vehicle {
  id: string;
  type: 'sedan' | 'suv' | 'stretch-limo' | 'party-bus';
  name: string;
  capacity: number;
  hourlyRate: number;
  dayRate?: number;
  features: string[];
  images: string[];
  available: boolean;
}

// Booking Types
export interface BookingRequest {
  id?: string;
  serviceType: string;
  vehicleId: string;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDateTime: Date;
  returnDateTime?: Date;
  passengerCount: number;
  specialRequests?: string;
  contactInfo: ContactInfo | PartialContactInfo;
  addOns: string[];
  estimatedPrice?: number;
  status: 'quote' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  accountCode?: string;
}

export interface PartialContactInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  accountCode?: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

// Trip Tracking Types
export interface TripStatus {
  id: string;
  bookingId: string;
  status: 'scheduled' | 'driver-assigned' | 'en-route' | 'arrived' | 'in-transit' | 'completed';
  driverInfo?: DriverInfo;
  vehicleLocation?: Location;
  estimatedArrival?: Date;
  updates: StatusUpdate[];
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  photo?: string;
  rating: number;
  vehicleInfo: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  };
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: Date;
}

export interface StatusUpdate {
  timestamp: Date;
  status: string;
  message: string;
  location?: Location;
}

// Corporate Types
export interface CorporateAccount {
  id: string;
  companyName: string;
  accountCode: string;
  billingAddress: Address;
  contactPerson: ContactInfo;
  creditLimit: number;
  currentBalance: number;
  paymentTerms: string;
  users: CorporateUser[];
  settings: CorporateSettings;
}

export interface CorporateUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'approver';
  permissions: string[];
  costCenter?: string;
  active: boolean;
}

export interface CorporateSettings {
  requireApproval: boolean;
  approvalLimit: number;
  allowedServices: string[];
  restrictedHours?: {
    start: string;
    end: string;
  };
  defaultBillingCode?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Analytics Types
export interface UsageAnalytics {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  totalTrips: number;
  totalCost: number;
  averageTripCost: number;
  mostUsedService: string;
  costByService: { [service: string]: number };
  tripsByDate: { [date: string]: number };
  topRoutes: Array<{
    route: string;
    count: number;
    totalCost: number;
  }>;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'credit-card' | 'corporate-account' | 'invoice';
  details: any;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  accountId: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
  items: InvoiceItem[];
  createdAt: Date;
}

export interface InvoiceItem {
  bookingId: string;
  description: string;
  amount: number;
  date: Date;
}

// Quote Types
export interface QuoteRequest {
  serviceType: string;
  vehicleType?: string;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDateTime: Date;
  returnDateTime?: Date;
  passengerCount: number;
  addOns: string[];
  specialRequests?: string;
}

export interface Quote {
  id: string;
  request: QuoteRequest;
  basePrice: number;
  addOnCosts: number;
  taxes: number;
  totalPrice: number;
  validUntil: Date;
  terms: string[];
  createdAt: Date;
}
