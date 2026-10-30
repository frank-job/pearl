Markdown
# 🏛️ Virtual Plaza E-Commerce Platform

A multi-tenant e-commerce marketplace built around a virtual building mental model. Instead of browsing a flat product catalog, buyers navigate floors and visit numbered shops, offering sellers dedicated virtual storefronts and floor visibility.

---

## 🌟 Key Features

### 🛒 Buyer Experience
- **Virtual Building Navigation:** Explore distinct floors (`/floor/[n]`) and browse numbered shops (`/shop/[shopNumber]`).
- **Lobby Showcase:** Home page features directory, trending products, and Pro seller listings.
- **Shop Storefronts:** Rich shop pages with direct seller chat, business hours, and verified badges.
- **Multi-Shop Cart & Checkout:** Add items across multiple shops in a single session; automatic split-order generation per seller.
- **Order Tracking:** Track real-time order status from `placed` to `delivered`.

### 🏪 Seller Experience
- **Interactive Onboarding:** Choose an available floor and claim a unique shop number (e.g., Shop `104`, `201A`).
- **Storefront Editor:** Customize shop banners, logos, business hours, and shop bio.
- **Product CRUD:** Manage inventory, upload media, set pricing, and toggle listing visibility.
- **Order & Payout Management:** View incoming sub-orders, update shipping statuses, and connect Stripe for direct payouts.

---

## 🎨 Design System & Palette

| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary** | `#1E3A8A` | Main actions, brand headers, active floor highlights |
| **Accent** | `#F59E0B` | Badges, featured items, CTA highlights |
| **Surface (Light / Dark)** | `#F8FAFC` / `#0F172A` | Backgrounds, cards, modular containers |
| **Success** | `#10B981` | Order status, stock availability, verified badges |
| **Danger** | `#EF4444` | Stock alerts, errors, item removal |

- **Headings & Body:** [Inter](https://fonts.google.com/specimen/Inter)
- **Shop Identifiers:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (for shop numbers & IDs)

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router, Server Actions, API Routes)
- **Database:** Neon PostgreSQL (Serverless connection pooling, instant schema branching)
- **ORM & Migrations:** Prisma / Drizzle ORM
- **Authentication:** Custom httpOnly session cookies + bcrypt password hashing
- **Payments:** Stripe Connect (Split payments & automated seller transfers)
- **Media Uploads:** Cloudinary / AWS S3
- **Styling:** Tailwind CSS

---

## 🗄️ Database Architecture

Plaza Building
└── Floors (1..N)
└── Shops (Numbered 101, 102, 201...)
├── Products & Inventory
├── Sub-Orders & Analytics
└── Stripe Connect ID


### Main Entities
- `users`: Core account identity and RBAC roles (`buyer`, `seller`, `admin`).
- `floors`: Metadata for plaza floors (theme, category, shop capacity).
- `shops`: Tenant storefronts linked to sellers and floor positions.
- `products`: Product listings scoped to specific shop tenants.
- `carts` & `cart_items`: Persistent shopping cart state.
- `parent_orders` & `shop_orders`: Split-order structure handling single payment checkouts across multiple store vendors.

---

## 🔒 Security & Data Integrity

- **Tenant Isolation:** All product and order writes enforce strict shop ownership validation based on the authenticated seller session.
- **Atomic Stock Decrements:** Inventory updates use atomic PostgreSQL transactions to prevent race conditions during high-concurrency checkout.
- **Payment Security:** Payments are processed via Stripe Webhooks without storing credit card details on local servers.
- **Session Security:** httpOnly, SameSite cookies with a 7-day expiration window.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm
- Neon PostgreSQL connection string

### Environment Variables (`.env.local`)

```env
DATABASE_URL="postgresql://user:password@ep-cool-project.neon.tech/neondb?sslmode=require"
SESSION_SECRET="your-super-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
Installation
Bash
# Clone the repository
git clone [https://github.com/your-username/virtual-plaza.git](https://github.com/your-username/virtual-plaza.git)

# Navigate into directory
cd virtual-plaza

# Install dependencies
pnpm install

# Run database migrations
pnpm prisma db push

# Start development server
pnpm dev