# Tech Tools Store

A production-grade e-commerce platform for developer hardware, specialized keyboards, productivity gadgets, microcontrollers, and debugging tools.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript, Shadcn/ui
- **Backend**: Next.js API Routes with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for cart session storage
- **Payments**: Stripe Checkout API with secure webhook handling
- **Deployment**: Vercel (Frontend) + Render/Railway (Database)

## Features

- Server-Side Rendering (SSR) for product listings
- Incremental Static Regeneration (ISR) for product detail pages
- Guest checkout (no mandatory registration)
- Secure payment processing via Stripe
- Inventory management with row-level locking
- Automatic stock restoration on abandoned checkouts
- Responsive, modern UI with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis instance (optional, for cart persistence)
- Stripe account (for payments)

### Installation

1. Clone the repository and install dependencies:

```bash
cd tech-tools-store
npm install
```

2. Copy the environment file and configure your variables:

```bash
cp .env.example .env
```

3. Update `.env` with your credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/techtools"
REDIS_URL="redis://localhost:6379"
STRIPE_SECRET_KEY="sk_test_xxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
NEXT_PUBLIC_URL="http://localhost:3000"
```

4. Generate Prisma client and push the schema:

```bash
npm run db:generate
npm run db:push
```

5. Seed the database with sample products:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stripe Integration

### Setting Up Stripe CLI for Local Testing

1. Install Stripe CLI:
   - Windows: `scoop install stripe`
   - macOS: `brew install stripe/stripe-cli/stripe`

2. Login to Stripe:

```bash
stripe login
```

3. Forward webhooks to your local server:

```bash
npm run stripe:listen
```

4. Copy the webhook signing secret (`whsec_...`) to your `.env` file.

5. Test webhook events:

```bash
stripe trigger checkout.session.completed
stripe trigger checkout.session.expired
```

## Project Structure

```
tech-tools-store/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── src/
│   ├── app/
│   │   ├── (shop)/         # Public shopping routes
│   │   ├── api/            # API routes
│   │   └── checkout/       # Checkout flow
│   ├── components/         # React components
│   └── lib/                # Utility libraries
└── public/
    └── videos/             # Loading video assets
```

## Loading Video Setup

Download the network animation video from [Pixabay](https://pixabay.com/videos/connection-global-graphic-network-113368/) and place it at:

```
public/videos/network-intro.mp4
```

## Database Schema

The platform uses the following data models:

- **User**: Customer accounts with authentication
- **Category**: Product categories (keyboards, microcontrollers, etc.)
- **Product**: Items with specs, pricing, and inventory
- **Order**: Purchase records with status tracking
- **OrderItem**: Line items linking orders to products

## Security Features

1. **Price Verification**: Server-side validation of product prices
2. **Webhook Signature**: Cryptographic verification of Stripe webhooks
3. **No Card Storage**: All payment data handled by Stripe
4. **Inventory Locking**: PostgreSQL transactions prevent overselling
5. **Session Expiry**: Automatic stock restoration after 30 minutes

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |
| `npm run stripe:listen` | Forward Stripe webhooks |

## License

MIT
