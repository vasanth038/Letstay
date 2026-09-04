# HotelBooking — MERN Stack Project

A full-stack hotel booking web app: React (Vite + Tailwind) frontend and an
Express + MongoDB backend with JWT cookie-based authentication, dynamic
database-driven content, a real booking flow, and an owner dashboard.

## Features

**Authentication**
- Register / login / logout with bcrypt-hashed passwords and an httpOnly JWT cookie.
- Session restored automatically on page refresh (`GET /api/users/me`).

**Public browsing**
- Homepage with a hero search bar, featured hotels, exclusive offers, and testimonials — all pulled from the database via the API.
- Rooms listing page with a location filter, and a room details page.

**Booking flow**
- Any logged-in user can book a room for chosen check-in/out dates and guest count.
- "My Bookings" page shows a user's bookings with status (pending/confirmed/cancelled).
- A mock "Pay Now" step marks a booking as paid and confirmed (see note below — there's no real payment processor wired in).
- Users can cancel their own bookings.

**Owner dashboard**
- Any user can self-serve upgrade to an "owner" account via "List Your Property."
- Owners get a dashboard to add new room listings, remove their own listings, and see incoming bookings for their rooms.

## What was fixed / added on top of the original code

**Backend**
- Added the missing `server/routes/users.js` (only imported before, never written).
- Added `server/middleware/auth.js` (JWT cookie check) and `server/middleware/role.js` (owner-only routes).
- Added `cookie-parser` so the auth middleware can actually read the cookie.
- Added `/api/auth/logout`, `/api/users/become-owner`.
- Added full CRUD-ish routes for rooms (`/api/rooms`), read-only routes for hotels/offers (`/api/hotels`, `/api/offers`), and a bookings API (`/api/bookings`) with create/list/pay/cancel.
- Added Mongoose models: `Hotel`, `Room`, `Offer`, `Booking`, and a `role` field on `User`.
- Added `server/seed.js` to populate the database with demo hotels, rooms, and offers (using hosted Unsplash image URLs so it works without local image files).
- Fixed the register route's error response (previously returned the raw validation-error array).

**Frontend**
- Fixed `Hero.jsx`'s broken image bindings (`src="{assets.calenderIcon}"` as a literal string, and a hardcoded broken background path).
- Fixed `App.jsx` calling `Navbar()` / `Footer()` as plain functions instead of rendering `<Navbar />` / `<Footer />` (breaks React's hook rules).
- Added `src/context/AppContext.jsx` — real auth state, used across the app.
- Added `src/utils/api.js` — a small fetch wrapper used by every data-fetching page.
- `FeaturedHotels`, `ExclusiveOffer`, and `Rooms` now fetch from the API instead of static hardcoded arrays.
- Added `RoomDetails.jsx` with a working booking form, `MyBookings.jsx`, `Dashboard.jsx` (owner), `ListProperty.jsx` (become an owner), `ProtectedRoute.jsx`, and `NotFound.jsx`.
- Wired `login.jsx` / `signUp.jsx` to the context with visible error states and redirects.
- Added Vite/Tailwind config, `index.html`, `index.css`, and `package.json` so the project builds out of the box (verified with a real `vite build`).

## Project structure

```
hotel-booking/
├── server/
│   ├── models/          user, hotel, room, offer, booking
│   ├── routes/          auth, users, hotels, offers, rooms, bookings
│   ├── middleware/       auth (JWT), role (owner check)
│   ├── seed.js           populates demo hotels/rooms/offers
│   └── index.js
└── client/
    └── src/
        ├── assets/        branding assets + icons (logo, hero image, svgs)
        ├── components/    Navbar, Hero, cards, forms, ProtectedRoute...
        ├── context/       AppContext.jsx (auth state)
        ├── pages/         Home, Rooms, RoomDetails, MyBookings, Dashboard...
        └── utils/api.js   fetch wrapper
```

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your MongoDB URI and a JWT secret
npm run seed             # populates demo hotels/rooms/offers
npm run dev               # or: npm start
```

### 2. Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Important: branding image assets
This zip does not include your original branding files (`logo.png`,
`heroimg.jpeg`, the icon SVGs) — only the code that references them. Copy
your original files into `client/src/assets/` with the exact filenames used
in `assets.js`. Hotel/room/offer photos no longer need local files — they now
come from the database (seeded with hosted Unsplash URLs, or your own URLs
when you add rooms through the owner dashboard).

## Notes / honest caveats
- **Payment is mocked.** "Pay Now" just flips a flag in the database — there's no Stripe/Razorpay integration. Swapping in a real processor would mean creating a payment intent server-side and confirming it client-side before calling `/api/bookings/:id/pay`.
- **No availability calendar.** Booking a room doesn't check for date overlaps with existing bookings yet — a good next feature.
- **"Become an owner" is self-serve** with no verification step, which is fine for a demo/portfolio project but not for production.
- Add input sanitization and rate limiting on the auth routes before treating this as production-ready.
