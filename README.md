# TNT Limousine - Customer Portal & Booking System

A comprehensive luxury transportation booking platform built for TNT Limousine in Richmond, Virginia. Features real-time quote generation, fleet management, corporate account services, and automated customer journey workflows.

![TNT Limousine](https://images.unsplash.com/photo-1544824580-ce6de2d62ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🚗 Features

### Customer Portal
- **Real-time Quote Generation** - Instant pricing based on service type, vehicle selection, and Richmond market rates
- **Fleet Showcase** - Interactive display of luxury vehicles (Mercedes S-Class, Cadillac Escalade, stretch limos)
- **Service Packages** - Airport transfers, weddings, wine tours, corporate travel, special events
- **Mobile-Responsive Design** - TNT's black and red branding with professional luxury aesthetic

### Corporate Dashboard
- **Account Management** - Multi-user access controls and permissions
- **Bulk Booking** - Excel/CSV import and recurring reservations
- **Usage Analytics** - Monthly summaries and cost analysis with export capabilities
- **Billing Integration** - Corporate billing and expense reporting

### Backend & Automation
- **Database Schema** - Comprehensive PostgreSQL schema for vehicles, bookings, customers, pricing
- **n8n Workflows** - Customer journey automation from quote to completion
- **Supabase Integration** - Real-time data synchronization and Row Level Security
- **Mock Data System** - Realistic TNT Limousine data for development and demos

## 🛠 Tech Stack

- **Frontend**: Next.js 15+ with App Router, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL), n8n workflow automation
- **UI/UX**: Custom design system with TNT branding
- **Authentication**: Supabase Auth with corporate account support
- **Deployment**: Ready for Azure Static Web Apps / Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tnt-limousine-portal.git
   cd tnt-limousine-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** (Optional)
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials (optional - uses mock data by default)
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tnt-limousine-portal/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── dashboard/         # Customer dashboard
│   ├── corporate/         # Corporate portal
│   ├── track/             # Trip tracking
│   └── login/             # Authentication
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── Hero.tsx          # Landing page hero
│   ├── Services.tsx      # Service showcase
│   ├── Fleet.tsx         # Vehicle fleet
│   ├── QuoteForm.tsx     # Multi-step quote form
│   └── corporate/        # Corporate components
├── lib/                  # Utilities and services
│   ├── database.ts       # Database operations
│   └── supabase.ts       # Supabase client
├── supabase/            # Database schema and seeds
│   ├── schema.sql       # Complete database schema
│   └── seed.sql         # Sample TNT Limousine data
├── types/               # TypeScript definitions
└── public/              # Static assets
```

## 💰 Pricing & Services

### TNT Limousine Fleet (Richmond, VA)
- **Mercedes S-Class Executive** - $85/hour
- **BMW 7 Series** - $80/hour  
- **Cadillac Escalade VIP** - $95/hour
- **Lincoln Navigator** - $90/hour
- **Lincoln Stretch Limo** - $125-135/hour
- **Mercedes Sprinter Party Bus** - $150/hour

### Service Packages
- **Airport Transfers** - Starting at $75
- **Wedding Packages** - $450-1200 (6-10 hours)
- **Wine Tours** - $380-650 (5-8 hours)
- **Corporate Services** - $85-120/hour
- **Special Events** - $180-320

## 🗃 Database Schema

### Core Tables
- `vehicles` - Fleet management with specifications and rates
- `service_packages` - Service offerings and pricing
- `customers` - Customer profiles and preferences
- `bookings` - Reservation management and tracking
- `quotes` - Quote generation and conversion tracking
- `corporate_accounts` - Multi-tenant corporate billing
- `pricing_rules` - Dynamic pricing and surge rules

### Features
- **Multi-tenant Architecture** - Corporate account isolation
- **Audit Trails** - Complete booking and payment history
- **Real-time Availability** - Vehicle scheduling conflicts prevention
- **Dynamic Pricing** - Time-based, seasonal, and service-specific rates

## 🔄 Automation Workflows (n8n)

### Customer Journey
1. **Lead Capture** → CRM integration and scoring
2. **Quote Generation** → Real-time pricing and availability
3. **Booking Confirmation** → Payment processing and scheduling
4. **Pre-trip Reminders** → 24-hour automated notifications
5. **Trip Tracking** → Real-time driver communication
6. **Post-trip Follow-up** → Feedback collection and reviews

### Corporate Features
- **Bulk Booking Import** - Excel/CSV processing
- **Approval Workflows** - Multi-level booking approvals
- **Usage Analytics** - Automated monthly reporting
- **Billing Integration** - Corporate account management

## 🎨 Design System

### TNT Limousine Branding
- **Primary Colors**: Black (#000000), TNT Red (#DC2626)
- **Typography**: Professional, luxury-focused fonts
- **Components**: Consistent design patterns across all interfaces
- **Mobile-First**: Responsive design for on-the-go booking

## 🚀 Deployment

### Development
```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # Code linting
```

### Production Options
- **Vercel** - Automatic deployments from GitHub
- **Azure Static Web Apps** - Enterprise hosting
- **Netlify** - JAMstack deployment

## 📊 Demo Data

The system includes comprehensive mock data representing TNT Limousine's Richmond operations:
- **Fleet**: 10 luxury vehicles with real specifications
- **Services**: Complete service catalog with Richmond pricing
- **Customers**: Sample individual and corporate accounts
- **Bookings**: Realistic reservation history
- **Corporate Accounts**: Capital One, Dominion Energy, Altria Group

## 🔐 Security Features

- **Row Level Security** - Supabase RLS policies
- **Input Validation** - Comprehensive form validation
- **HTTPS Only** - Secure data transmission
- **Environment Variables** - Secure credential management
- **Corporate Data Isolation** - Multi-tenant security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**TNT Limousine**
- Website: [tntlimousine.com](https://tntlimousine.com)
- Phone: (804) 555-LIMO
- Email: info@tntlimousine.com
- Service Area: Richmond, VA and surrounding areas

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Automation by [n8n](https://n8n.io/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons by [Heroicons](https://heroicons.com/)

---

**Ready to experience luxury transportation?** Visit [TNT Limousine](http://localhost:3000) to book your ride today!