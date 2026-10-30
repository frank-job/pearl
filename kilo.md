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
