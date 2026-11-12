# LookBook Myanmar

A production-oriented multi-vendor marketplace starter for Myanmar with three Android apps sharing one backend:

- **Buyer**: browse, search, wishlist, cart, checkout, orders, language switch.
- **Seller**: verification status, product publishing, stock, incoming orders, shipment status.
- **Admin**: dashboard metrics, seller approval/suspension, product/category moderation, audit-ready controls.
- **Backend**: Node.js + Express + Prisma + PostgreSQL, JWT auth, RBAC, validation, rate limiting, structured errors.

## Important scope and safety notes

This repository is an implementation-ready starter, not a claim that live merchant accounts or courier contracts exist. KBZPay, WavePay, and AYA Pay are represented by a provider interface and remain disabled until you add official merchant API credentials and callback verification. Cash on delivery can be enabled with an environment flag. The API never treats buyer screenshots as payment proof.

The apps are native Expo projects and can be built from a phone using Expo's cloud build service. You only need to edit the environment values in one file and run the provided commands in a cloud terminal such as GitHub Codespaces, Replit, or Expo's web workflow.

## Fastest phone-only path

1. Install **Expo Go** on the Android phone.
2. Create a free Expo account at https://expo.dev and sign in from the phone/browser.
3. Upload this ZIP to GitHub or open it in GitHub Codespaces/Replit.
4. Copy `backend/.env.example` to `backend/.env`, set a PostgreSQL URL and a long JWT secret.
5. Run `pnpm install`, `pnpm db:push`, `pnpm db:seed`, and `pnpm dev:backend`.
6. Put the public backend URL into each app's `EXPO_PUBLIC_API_URL` in its `.env` file.
7. Run `pnpm build:buyer`, `pnpm build:seller`, or `pnpm build:admin` after `eas login`.
8. Open the generated build links on the phone and install each APK.

For an initial UI test without a deployed backend, use Expo Go after starting Metro; authentication and data still require the API URL to be reachable from the phone.

## Project layout

```text
apps/buyer       Buyer Android app
apps/seller      Seller Android app
apps/admin       Admin Android app
packages/shared  API client, types, theme, translations
backend          Express API, Prisma schema, seed, tests
```

## Local/cloud terminal commands

```bash
corepack enable
pnpm install
cp backend/.env.example backend/.env
pnpm db:push
pnpm db:seed
pnpm dev:backend
```

In a second terminal:

```bash
pnpm dev:buyer   # or dev:seller / dev:admin
```

## Demo development accounts

Created only by `pnpm db:seed`; change them before any real deployment:

- Buyer: `buyer@demo.lookbook.mm` / `DemoBuyer123!`
- Seller: `seller@demo.lookbook.mm` / `DemoSeller123!`
- Admin: `admin@demo.lookbook.mm` / `DemoAdmin123!`

## APK builds from a phone

Install EAS CLI in the cloud terminal, then:

```bash
npm install -g eas-cli
 eas login
pnpm build:buyer
pnpm build:seller
pnpm build:admin
```

Each command creates an Android APK using the `preview` profile. The terminal prints a download URL. Open that URL on the Android phone, download the APK, allow installation from the browser when Android asks, and install it. For Play Store release builds use `eas build --platform android --profile production` to create an AAB instead.

## Production deployment checklist

- Use managed PostgreSQL with backups and TLS.
- Set a unique `JWT_SECRET`; never commit `.env`.
- Put the API behind HTTPS.
- Configure object storage and replace the development image URL policy with signed durable URLs.
- Add official payment callback credentials only after merchant approval.
- Configure courier callbacks or keep shipment updates manual.
- Run `pnpm test:backend` before deployment.
- Change all seed passwords and remove demo seed data from production.

## API documentation

See `docs/API.md`. The core workflow is:

1. `POST /api/auth/register` or `/api/auth/login`
2. `GET /api/products`
3. `POST /api/cart/items`
4. `POST /api/orders`
5. Seller/admin users use role-protected product/order endpoints.


