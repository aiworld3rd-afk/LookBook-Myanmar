# Beginner phone-only setup

## Option A: GitHub Codespaces (recommended)

1. In GitHub, create a new repository and upload this ZIP by using **Add file → Upload files**.
2. Open the repository, choose **Code → Codespaces → Create codespace on main**.
3. In the Codespaces terminal run `corepack enable` and `pnpm install`.
4. Create a hosted PostgreSQL database (Neon, Supabase, Railway, or another provider). Copy its connection string.
5. Run `cp backend/.env.example backend/.env`, then edit only `DATABASE_URL`, `JWT_SECRET`, and `CORS_ORIGIN`.
6. Run `pnpm db:push && pnpm db:seed && pnpm dev:backend`.
7. Make the backend port public in the Codespaces **Ports** tab, then copy its HTTPS URL.
8. In `apps/buyer/.env`, `apps/seller/.env`, and `apps/admin/.env`, set `EXPO_PUBLIC_API_URL` to that URL.
9. Run one app with `pnpm dev:buyer`; use the Expo QR code with Expo Go, or build an APK with the commands below.

## Building three installable APKs

```bash
npm install -g eas-cli
eas login
pnpm build:buyer
pnpm build:seller
pnpm build:admin
```

When EAS asks about Android application IDs, accept the generated defaults. Each command returns a web link. Open it on your phone and install the APK. Repeat for the other two links.

If Android blocks the install: Settings → Apps → Special app access → Install unknown apps → allow your browser/files app. Turn it back off after installation.

## What you do not need to manually create

The ZIP already contains all source folders, configuration, Prisma schema, seed, API docs, EAS profiles, and app screens. You only provide your own database URL, JWT secret, Expo login, and official provider credentials if you later enable them.



## KBZPay QR manual verification

The buyer app displays the supplied KBZPay QR. Buyers must transfer the exact order amount and submit the transaction reference. The admin must compare it with the real KBZPay account transaction before choosing **VERIFY**. Never mark an order paid from a screenshot alone. The review window shown to buyers is 24 hours; it is an operational target, not an automatic payment confirmation.


AYA Pay recipient details are configured as `Khin Htay Hlaing` / `09753506146`. Buyers see these details and admins manually verify the transfer before releasing the order.


Buyer payment proof now accepts both the transaction reference number and a receipt screenshot from the phone gallery. The admin must still match the information against the actual wallet transaction.

## Alternative: build APKs without Expo EAS login

The ZIP includes `.github/workflows/build-apks.yml`. Upload the project to GitHub, open the **Actions** tab, choose **Build LookBook Myanmar APKs**, and press **Run workflow**. GitHub will build Buyer, Seller, and Admin APKs in three cloud jobs. When the run finishes, open the run page, scroll to **Artifacts**, download each APK ZIP, extract it, and install the APK on Android.

This alternative still requires a GitHub account because GitHub must provide the cloud build machine. It does not require an Expo/EAS account.
