# 0ne

Next.js app using the App Router, Tailwind CSS, Lucide React icons, and Neon Serverless Postgres.

## Setup

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

## Neon database

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to the connection string from your Neon project. The server-side SQL client is available from `@/lib/db`:

```ts
import { sql } from "@/lib/db";

const rows = await sql`select now()`;
```

Keep database queries in server components, route handlers, or server actions; do not expose the connection string in client-side code.

Use icons from `lucide-react` in your components, for example `import { Database } from "lucide-react";`.

See the [Next.js documentation](https://nextjs.org/docs) for framework guidance and [Neon's documentation](https://neon.tech/docs/serverless/serverless-driver) for the serverless driver.


hi i want to create bussines site called Xness and this how it will work just as building let Xness plaza so a person is given a room then use is a given a laocation like Xness shop no 122 at floor 2 then use put he or she wants let me say use sells electrionics tv cookers things like that so this site will have two user the buyer and sell some will be given a shop number id username for location in searching and also the sller will have page not like jumia or other site this will not list things to buy maybe those have pro accounts then when user clicks in the item take the buyer to that page the page will act as shop then the site will act a big buiding that is the structure before we go to coding what are suggestion improvements what do thing of it what will it need in terms of security ordering 

## Xness Plan

### Concept
Virtual plaza: a big building with floors and numbered shops. Buyers enter shops (not a flat product list). Sellers own a shop page. Pro accounts can list on the lobby.

### Navigation
Top bar: Logo, search, floor selector, cart, account. Breadcrumbs: Lobby -> Floor N -> Shop No.X -> Product. Mobile hamburger drawer.

### Pages
1. Home `/` (introduction): hero, floor directory, featured/pro shops, trending, footer.
2. Floor `/floor/[n]`: shop grid by number, filters (category, verified), sort.
3. Shop `/shop/[shopNumber]`: banner, name, verified badge, hours, rating, product grid, about, chat.
4. Product `/product/[id]`: gallery, price, stock, description, add-to-cart, related, reviews.
5. Cart `/cart`: grouped by shop, qty edit, remove, subtotals + grand total.
6. Checkout `/checkout`: address, payment (Stripe), split orders per shop.
7. Orders `/orders`: buyer status/tracking/receipts; seller incoming + mark shipped.
8. Seller `/seller`: shop editor, product CRUD, orders, analytics.
9. Auth `/login`, `/register`: role selector (buyer/seller).

### Colors
Primary #1E3A8A, Accent #F59E0B, Surface #F8FAFC/#0F172A, Success #10B981, Danger #EF4444. Slate neutrals.

### Typography
Inter (headings/body), JetBrains Mono for shop numbers.

### Database (Neon Postgres)
users, sessions, shops, products, carts, orders, order_items. Indexes on shop_number, floor, shop_id, buyer_id.

### Security
bcrypt + httpOnly session cookies, RBAC, tenant isolation, rate limiting, input validation, image upload validation, Stripe for payments (no card storage).

### Ordering Flow
placed -> paid -> processing -> shipped -> delivered. Multi-shop cart splits into per-shop orders. Inventory decrement on paid. Escrow optional.

### User Account
- Register: name, email, password, role (buyer/seller). Sellers create a shop during onboarding.
- Login/logout, session via httpOnly cookie (7 days).
- Profile page `/account`: name, email, password change, order history, saved addresses.
- Buyer features: wishlist, saved shops, order tracking, reviews.
- Seller features: shop editor, product CRUD, order management, analytics, payout settings.
- Roles: buyer, seller, admin. Admin verifies shops and moderates.
- Security: bcrypt password hashing, MFA for sellers (optional), email verification, password reset via token.">

## Additional suggestions

These suggestions add to the plan above; they do not replace it.
