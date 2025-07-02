# Museum Ticket Booking App

A full-stack Node.js application for discovering museums and booking tickets online. Built with Express, EJS, MongoDB, and Passport.js for authentication.

---

## Features

- User authentication (sign up, login, logout)
- Browse and search museum listings
- View detailed museum information
- Book tickets and download PDF tickets with QR codes
- Add and delete reviews for museums
- Admin user auto-created on first run
- Responsive UI with a splash animation (shown only once per session)
- Flash messages for user feedback
- Health check endpoint for deployment

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap (or your custom CSS)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Passport.js (passport-local-mongoose)
- **PDF & QR:** pdfkit, qrcode
- **Session Store:** connect-mongo
- **Other:** dotenv, connect-flash, ejs-mate

---

## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd "SIH project"
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```
PORT=8080
MONGO_URL=<your-mongodb-connection-string>
SESSION_SECRET=<your-session-secret>
DEFAULT_OWNER_ID=<optional-owner-id>
ADMIN_PASSWORD=<optional-admin-password>
```

### 4. Run the app locally

```sh
npm run dev
```
or
```sh
node app.js
```

Visit [http://localhost:8080](http://localhost:8080) in your browser.

---

## Deployment

### Render, Railway, or Fly.io (Recommended)

1. Push your code to GitHub.
2. Create a new Web Service on your chosen platform.
3. Set your environment variables in the dashboard.
4. Use `npm run dev` or `node app.js` as the start command.

### Notes

- Do **not** commit your `.env` file.
- Make sure your static files are in the `public` folder.
- The app listens on `process.env.PORT` for deployment compatibility.

---

## Default Admin

- **Username:** `admin`
- **Password:** `admin123` (or as set in your `.env`)

---

## Folder Structure

```
SIH project/
├── app.js
├── package.json
├── .env
├── public/
├── views/
│   ├── firstpage.ejs
│   ├── listings/
│   ├── error/
│   └── ...
├── models/
├── controllers/
├── routes/
├── init/
└── ...
```

---

## API & App Endpoints

| Method | Endpoint                        | Description                                 |
|--------|---------------------------------|---------------------------------------------|
| GET    | `/`                             | Welcome page with "Visit Website" button    |
| GET    | `/health`                       | Health check endpoint (returns JSON)        |
| GET    | `/listings`                     | Show all museum listings                    |
| GET    | `/listings/:id`                 | Show details for a specific listing         |
| GET    | `/listings/:id/reviews`         | Show reviews for a listing                  |
| POST   | `/listings/:id/reviews`         | Add a review to a listing                   |
| DELETE | `/listings/:id/reviews/:rid`    | Delete a review from a listing              |
| GET    | `/app-info`                     | Static info page                            |
| GET    | `/conditions`                   | Static conditions page                      |
| GET    | `/about-us`                     | Static about-us page                        |
| GET    | `/signup`                       | Show signup form                            |
| POST   | `/signup`                       | Register a new user                         |
| GET    | `/login`                        | Show login form                             |
| POST   | `/login`                        | Authenticate user                           |
| GET    | `/logout`                       | Logout user                                 |
| GET    | `/bookticket/:id`               | Show ticket booking page for a listing      |
| POST   | `/bookticket/:id`               | Book a ticket for a listing                 |
| GET    | `/download/:bookingId`          | Download PDF ticket with QR code            |
| ALL    | `*`                             | 404 error page                              |

> **Note:** Some endpoints may require authentication.

---

## License

MIT

---

## Credits

- Built for Smart India Hackathon (SIH) project.
- Inspired by museum and ticketing platforms.