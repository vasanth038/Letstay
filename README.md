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
