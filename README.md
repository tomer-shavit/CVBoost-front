# CVBoost

Frontend for CVBoost — an AI-powered resume analyzer that scores resumes, suggests line-by-line improvements, and provides actionable feedback to help job seekers stand out.

## Features

- **Upload & Analyze** — drag-and-drop a PDF resume and get AI feedback in seconds
- **Multi-category Scoring** — clarity, relevance, achievements, and keywords (0-100 each)
- **Line-by-line Rewrites** — before/after suggestions for stronger phrasing
- **Bilingual** — auto-detects French and English
- **Credit-based Subscriptions** — Lemon Squeezy integration for payments
- **Analysis History** — user dashboard to revisit past results
- **Dark Mode** — full theme support

## Tech Stack

- **Next.js 13** (App Router, Server Components, Server Actions)
- **TypeScript**, **Tailwind CSS**, **Framer Motion**
- **NextAuth.js** with Google OAuth
- **Prisma** + **Neon PostgreSQL** (serverless)
- **Lemon Squeezy** for subscriptions
- **Mixpanel** for analytics

## Architecture

```
Browser → Next.js App
             │
     ┌───────┼───────────┐
     ▼       ▼           ▼
  NextAuth  /api/boost  Lemon Squeezy
  (Google)    │         (webhooks)
     │        ▼           │
     │   AWS Lambda       │
     │   (GPT-4o)         │
     ▼                    ▼
       Neon PostgreSQL
```

The frontend proxies resume analysis requests through `/api/boost` to an [AWS Lambda function](https://github.com/tomer-shavit/CVBoost) that runs the actual GPT-4o analysis. Results are encrypted and stored in the database.

## Project Structure

```
app/
├── (site)/
│   ├── page.tsx                # Landing page
│   ├── boost/page.tsx          # Resume upload
│   ├── boost/[boostId]/page.tsx # Analysis results
│   ├── checkout/page.tsx       # Pricing & subscription
│   ├── user/page.tsx           # Dashboard
│   └── auth/signin/page.tsx    # Login
├── api/
│   ├── auth/[...nextauth]/     # Auth endpoints
│   ├── boost/route.ts          # Lambda proxy
│   └── checkout/               # Payment webhooks
└── context/                    # React contexts

components/                     # UI components by feature
actions/                        # Server actions (save boosts)
helper/                         # Utilities (encryption, fetchers)
hooks/                          # Custom hooks (upload, analytics)
services/                       # Mixpanel integration
prisma/                         # Schema & migrations
types/                          # TypeScript definitions
```

## Setup

### Prerequisites

- Node.js 18+
- Neon PostgreSQL database
- Google OAuth credentials
- Lemon Squeezy account (for payments)

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL_NEON=postgresql://...

# Auth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
NEXTAUTH_SECRET=random-secret-string

# Backend
BOOST_FUNC_API=https://your-lambda-endpoint.amazonaws.com/...

# Encryption
ENCRYPTION_SEED=random-secret-for-encrypting-resumes

# Payments
LEMON_SQUEEZY_WEBHOOK_SECRET=your-webhook-secret

# Analytics (optional)
NEXT_PUBLIC_MIXPANEL_ID=your-mixpanel-token
```

### Install & Run

```bash
npm install
npx prisma generate
npx prisma db push    # first time — creates tables
npm run dev           # http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## User Flow

1. **Sign in** with Google OAuth
2. **Upload** a PDF resume (max 2 pages)
3. **Receive** AI analysis — scores, feedback, and line-by-line rewrites
4. **Review** results on the analysis page, like/dislike individual suggestions
5. **Revisit** past analyses from the dashboard

## Data Model

| Model                | Purpose                                     |
|---------------------|---------------------------------------------|
| `User`              | Auth, credit balance, relations             |
| `ResumeBoost`       | Analysis record with encrypted resume text  |
| `Feedback`          | Individual feedback items per analysis      |
| `Subscription`      | Lemon Squeezy subscription state            |
| `SubscriptionInvoice` | Payment history                           |

## Deployment

Designed for Vercel or any platform that supports Next.js. Set all environment variables in your hosting provider's dashboard.

```bash
npm run build
```

## Related

- [CVBoost (Backend)](https://github.com/tomer-shavit/CVBoost) — AWS Lambda function that performs the GPT-4o resume analysis

## License

MIT
