
### Clarify the plaza and shop model

- Treat a shop's location as structured data: plaza, floor, and shop number. A shop number should be unique within its plaza, not necessarily across the whole site.
- Let a seller manage a shop only after claiming it or being invited by an administrator. Consider supporting multiple staff members for one shop later.
- Keep the public shop URL stable and readable, for example `/shop/xness-plaza-122`, even if the shop changes its name or location.
- Buyers should be able to search for shops by name, location, category, and the kinds of products they sell. Product discovery can lead to the seller's shop page, keeping the shop—not a marketplace product grid—as the main destination.

### Define the first release

The current page list includes discovery, product listings, checkout, payments, chat, reviews, wishlists, analytics, and seller payouts. Building all of these at once is a large project. A safer first release could include:

1. Public plaza and floor directory.
2. Shop pages with location, opening hours, contact details, and a basic catalogue.
3. Search and filters for shops and their categories.
4. Seller registration, shop claiming, and shop management.
5. Admin review and reporting tools.

Start with a “Contact this shop” or “Ask about availability” action if you have not decided who handles payment, delivery, refunds, and disputes. Add cart and checkout after those responsibilities and seller demand are clear.

### Make account roles flexible

- A person may be both a buyer and a seller. Prefer account capabilities and shop membership over making buyer and seller mutually exclusive account types.
- Do not let a public registration form create an administrator account. Admin access should be granted through a protected, deliberate process.
- Let buyers browse public shops without signing in; require an account only for actions that need one.

### Plan ordering and payments carefully

- Define whether each seller or Xness is responsible for confirming stock, accepting an order, delivery or pickup, cancellations, returns, refunds, and customer support.
- If a cart contains items from multiple shops, show each shop's subtotal, delivery cost, and order status clearly. Confirm whether payment is one checkout with separate shop orders or separate checkouts.
- Payment-provider webhooks should be signature-verified and processed idempotently so retries cannot create duplicate payments or orders.
- Do not mark an order as paid based only on a browser redirect. Confirm payment on the server with the payment provider.
- Do not store card numbers or security codes. If Xness pays sellers, investigate the provider's marketplace or connected-account product, seller verification requirements, fees, and applicable local regulations before building payouts.
- Use order states that match the real fulfilment process. For example, a pickup shop may need “ready for pickup” rather than “shipped.”

### Strengthen the security plan

- Enforce authorization on the server for every shop, product, and order operation. Check that the signed-in user has permission for that specific record; hiding buttons in the interface is not access control.
- Use a well-maintained authentication solution or a modern password-hashing algorithm such as Argon2id. Store sessions securely, support revocation and expiration, and protect password-reset tokens with short expiry and single-use behavior.
- Require verified contact details for sellers and use multi-factor authentication for administrators; consider it for sellers who manage orders or payouts.
- Validate and limit all user input and uploaded files on the server. Use a dedicated image-storage service, safe file types and size limits, and never trust a filename or client-supplied content type.
- Rate-limit sign-in, password-reset, contact, and other abuse-prone actions. Add seller/shop reporting and moderation.
- Keep secrets such as `DATABASE_URL` and payment keys on the server, use environment-specific keys, and never commit them to the repository.
- Collect only necessary personal information, restrict access to it, and document retention, deletion, and privacy practices.
- Back up the database and test restoring it. Log important security and order events without logging passwords, payment secrets, or unnecessary personal data.

### Expand the data model as requirements become clear

The initial tables may also need `plazas`, `shop_memberships`, `categories`, `addresses`, `payments`, `shop_orders`, and `reviews` as the corresponding features are introduced. Add foreign keys and database constraints for ownership and unique shop locations; do not rely on application code alone to prevent duplicate locations or invalid relationships.

### Decisions to settle before checkout development

- Is Xness only a directory at launch, or does it accept orders and payments?
- Can one seller have multiple shops, and can a shop have multiple staff members?
- Which country or region is the first launch for, and what payment and privacy rules apply there?
- Who handles delivery, returns, refunds, disputes, and seller payouts?
- What exactly does a “Pro” account provide, and how will paid placement be labelled?
