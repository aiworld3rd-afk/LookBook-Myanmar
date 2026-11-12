# Implementation status

## Functional in this archive

- Three separate Expo Android app packages with distinct application IDs: buyer, seller, and admin.
- Shared TypeScript types, palette, and Burmese/English strings.
- Express API with JWT login/register, role checks, rate limiting, validation, product search, cart, order creation, seller product creation, seller dashboard, admin dashboard, and seller status management.
- Prisma/PostgreSQL schema covering users, seller profiles, addresses, products, images, variants, carts, orders, payments, reviews, notifications, promotions, and audit logs.
- Seed data for development-only demo accounts and one published product.
- EAS preview profiles that produce installable APKs.

## Still required before a real public launch

- Set up a hosted PostgreSQL database and HTTPS backend URL.
- Add durable object storage and signed upload URLs for seller image uploads.
- KBZPay QR and AYA Pay manual-payment flows are included: buyers use the supplied QR and submit a reference, admins verify against the actual KBZPay or AYA Pay account, and only admins can move the order to PAID. No buyer screenshot or reference automatically proves payment. Rejected orders release their reserved stock.
- Add a production courier integration or operate shipment updates manually.
- Expand the native seller/admin forms and buyer checkout/address screens beyond the included working foundation.
- Run dependency installation, Prisma validation, automated tests, and device testing in the chosen cloud terminal after Corepack allows the pnpm download.
- Replace all demo passwords and remove seed accounts from production.

The archive is deliberately not presented as a completed production marketplace until those deployment-specific items are configured and tested.

- Buyer app now uses the supplied buyer logo for the launcher icon, splash image, and login branding; seller/admin branding remains unchanged.
