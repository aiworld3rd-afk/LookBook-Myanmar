# API quick reference

Base URL is the deployed backend URL. Send `Authorization: Bearer <token>` for protected routes.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create buyer/seller account |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/products` | Public | Search/filter published products |
| GET | `/api/categories` | Public | Category list |
| POST | `/api/cart/items` | Buyer | Add/update cart item |
| GET | `/api/cart` | Buyer | Read cart |
| POST | `/api/orders` | Buyer | Create COD/provider-pending order |
| GET | `/api/orders` | Auth | Buyer/seller order view |
| POST | `/api/seller/products` | Seller | Create product; publishing requires approval |
| PATCH | `/api/seller/orders/:id` | Seller | Update processing/shipping status |
| GET | `/api/seller/dashboard` | Seller | Sales counts/revenue |
| GET | `/api/admin/dashboard` | Admin | Marketplace metrics |
| GET | `/api/admin/sellers` | Admin | Seller applications |
| PATCH | `/api/admin/sellers/:id` | Admin | Approve/reject/suspend seller |

Payment providers intentionally stay pending until official server-to-server callbacks are configured. Add those callbacks in a separate provider adapter; never accept a screenshot or client-only reference as proof.



## Manual KBZPay QR payment

`GET /api/payments/kbz-qr` returns the QR image path and the 24-hour review instructions. Create an order with `paymentProvider: "KBZ_QR"`; the order is created as `PAYMENT_REVIEW`. The buyer then submits the transfer reference with `POST /api/payments/:paymentId/submit-reference`. An admin checks the actual KBZPay merchant transaction and calls `PATCH /api/admin/payments/:paymentId/review` with `{ "decision": "VERIFY" }` or `{ "decision": "REJECT" }`. A buyer-submitted screenshot or reference is only a search aid and never automatically proves payment.


## AYA Pay manual payment

`GET /api/payments/aya-pay` returns the configured AYA Pay recipient name and phone. Create an order with `paymentProvider: "AYA_PAY"`, then submit the transfer reference through the same `/api/payments/:paymentId/submit-reference` endpoint. Admin review covers both KBZPay QR and AYA Pay pending payments. The admin must verify the real wallet transaction before choosing VERIFY.


## Receipt screenshot upload

`POST /api/payments/:paymentId/proof` accepts multipart form data with `transactionReference` and an image file named `receipt`. Supported image types are JPEG, PNG, and WebP up to 8 MB. The stored image and reference remain pending until an admin checks the actual KBZPay or AYA Pay wallet transaction.
