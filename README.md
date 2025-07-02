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

---

## Booking & Payment Flow
- Go to any listing and click "Book" to open the booking form.
- Enter your details and dates, see the total price calculated live.
- Click "Fake Pay" to complete the booking (no real payment is processed).
- View your bookings on the "Your Bookings" page.

---

## Folder Structure
- `app.js` - Main Express app
- `models/` - Mongoose models (Listing, User, Review, Booking)
- `routes/` - Express route handlers
- `controllers/` - Route controller logic
- `views/` - EJS templates
- `public/` - Static assets (CSS, JS, images)
- `init/` - Demo data and seeder

---

## Environment Variables
Create a `.env` file in the root:
```
MONGO_URL=your_mongodb_url
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

---

## Notes
- All sensitive data and credentials should be kept in `.env` (already in `.gitignore`).
- `node_modules/` is also ignored by `.gitignore` and should never be committed.

---

## License
MIT
