# Airbnb-like Booking App

A modern, full-stack demo booking platform inspired by Airbnb. Features robust demo data, a complete booking/payment flow, MongoDB Atlas/local support, and a clean, consistent UI theme.

---

## Features
- User authentication (signup, login, logout)
- Browse, filter, and view listings with Unsplash images
- Book listings with a fake payment flow (no real payment required)
- View your bookings ("Your Bookings" page)
- Leave reviews and ratings
- Modern, responsive dark blue-gray UI with accent colors
- Robust demo data seeder (owners, listings, reviews)
- Works with both MongoDB Atlas and local MongoDB
- Secure: `.env` and `node_modules/` are gitignored

---

## Tech Stack
- Node.js, Express.js, MongoDB, Mongoose
- EJS templating, Bootstrap 5, custom CSS
- Passport.js authentication
- connect-mongo for session storage
- dotenv for environment variables

---

## Setup Instructions
1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd airbnb
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your values:
     - `MONGO_URL` (MongoDB connection string)
     - `SECRET` (session secret)
     - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` (Cloudinary, optional for image uploads)
   - **Note:** `.env` is already included in `.gitignore` for security.
4. **Seed the database with demo data**
   ```sh
   node init/index.js
   ```
5. **Start the server**
   ```sh
   node app.js
   ```
6. **Visit** [http://localhost:3000/listings](http://localhost:3000/listings)
