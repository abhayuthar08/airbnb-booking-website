

// // Require necessary packages
// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const ejsMate = require('ejs-mate');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const User = require('./models/user.js');
// const MongoStore = require('connect-mongo');
// const Listing = require('./models/listing.js');
// require('dotenv').config();

// // Import routers
// const listingsRouter = require('./routes/listing.js');
// const reviewsRouter = require('./routes/review.js');
// const userRouter = require('./routes/user.js');

// // Set up express app
// const app = express();

// // View engine setup
// app.set('view engine', 'ejs');
// app.set("views", path.join(__dirname, 'views'));
// app.engine('ejs', ejsMate);

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//     secret: 'snlshlo',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 7 * 24 * 60 * 1000,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly: true
//     }
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Connect to MongoDB
// const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ticketsystem";
// mongoose.connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("✅ Connected to MongoDB"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // Set flash & current user globally
// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     res.locals.currUser = req.user;
//     next();
// });

// // ✅ Home Route: Render main.ejs with listings
// app.get('/', async (req, res) => {
//     try {
//         const allListings = await Listing.find({});
//         res.render('main', { allListings }); // Make sure this file exists in /views
//     } catch (err) {
//         console.error("Error fetching listings:", err);
//         req.flash('error', 'Cannot load listings');
//         res.redirect('/listings');
//     }
// });

// // Other routes
// app.use('/listings', listingsRouter);
// app.use('/listings/:id/reviews', reviewsRouter);
// app.use('/', userRouter);

// // Static pages
// app.get('/app-info', (req, res) => {
//     res.render('listings/app-info');
// });
// app.get('/conditions', (req, res) => {
//     res.render('listings/conditions');
// });
// app.get('/about-us', (req, res) => {
//     res.render('listings/about-us');
// });

// // 404 Error Handler
// app.use((req, res, next) => {
//     res.status(404).render('error/404', { title: 'Page Not Found' });
// });

// // Start server
// app.listen(8080, () => {
//     console.log('🚀 Server started on http://localhost:8080');
// });


// Require necessary packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const MongoStore = require('connect-mongo');
const Listing = require('./models/listing.js');
const { data: sampleListings } = require('./init/data.js'); // Add this line
require('dotenv').config();

// Import routers
const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

// Set up express app
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: 'snlshlo',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB and initialize data
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ticketsystem";

async function initializeDatabase() {
    try {
        // Check if data already exists
        const count = await Listing.countDocuments();
        if (count === 0) {
            console.log("Initializing database with sample data...");
            await Listing.deleteMany({});
            const dataWithOwner = sampleListings.map(obj => ({
                ...obj,
                owner: '66ad2082974deee4f6058cb8' // your owner ID
            }));
            await Listing.insertMany(dataWithOwner);
            console.log(`${sampleListings.length} listings inserted`);
            
            // Create admin user if needed
            const adminExists = await User.findOne({ username: 'admin' });
            if (!adminExists) {
                const admin = new User({ 
                    username: 'admin',
                    email: 'admin@example.com',
                    role: 'admin'
                });
                await User.register(admin, 'admin123');
                console.log('Admin user created');
            }
        }
    } catch (err) {
        console.error("Database initialization error:", err);
    }
}

async function startServer() {
    try {
        await mongoose.connect(MONGO_URL).then( console.log("✅ Connected to MongoDB"));
       
        
        await initializeDatabase();

        // Set flash & current user globally
        app.use((req, res, next) => {
            res.locals.success = req.flash('success');
            res.locals.error = req.flash('error');
            res.locals.currUser = req.user;
            next();
        });

        // ✅ Home Route: Render main.ejs with listings
        app.get('/', async (req, res) => {
            try {
                const allListings = await Listing.find({});
                res.render('main', { allListings });
            } catch (err) {
                console.error("Error fetching listings:", err);
                req.flash('error', 'Cannot load listings');
                res.redirect('/listings');
            }
        });

        // Other routes
        app.use('/listings', listingsRouter);
        app.use('/listings/:id/reviews', reviewsRouter);
        app.use('/', userRouter);

        // Static pages
        app.get('/app-info', (req, res) => {
            res.render('listings/app-info');
        });
        app.get('/conditions', (req, res) => {
            res.render('listings/conditions');
        });
        app.get('/about-us', (req, res) => {
            res.render('listings/about-us');
        });

        // 404 Error Handler
        app.use((req, res, next) => {
            res.status(404).render('error/404', { title: 'Page Not Found' });
        });

        // Start server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`🚀 Server started on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
}

startServer();