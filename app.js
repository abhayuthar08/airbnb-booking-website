// if(process.env.NODE_ENV != "production") {
//     require("dotenv").config();
// }

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const Listing = require('./models/listing.js');
// const Review = require('./models/review.js');
// const path = require('path');
// const ejsMate = require('ejs-mate');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// // const LocalStrategy = require('passport-local').Strategy;
// // const bodyParser = require('body-parser');
// const User = require('./models/user.js');
// const MongoStore = require('connect-mongo');

// const listingsRouter = require('./routes/listing.js')
// const reviewsRouter = require('./routes/review.js')
// const userRouter = require('./routes/user.js')

// app.set('view engine', 'ejs');
// app.set("views", path.join(__dirname, 'views'));
// app.use(express.urlencoded({ extended: true }));
// app.engine('ejs', ejsMate);
// app.use(express.static(path.join(__dirname, 'public')));


// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// // const dbUrl = process.env.ATLASDB_URL;


// main()
//     .then(() => {
//         console.log("connected to db");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main() {
//     await mongoose.connect(dbUrl);
// }

// const store = MongoStore.create({
//     // mongoUrl :dbUrl,
//     crypto : {
//         secret : process.env.SECRET
//     },
//     touchAfter : 24 * 3600,
// });

// store.on("error" , () => {
//     console.log("ERROR in MONGO SESSION STORE",err);
// })

// const sessionOptions = {
//     store,
//     secret : process.env.SECRET ,
//     resave : false,
//     saveUninitialized : true,
//     cookie : {
//         expires : Date.now ()  + 7 * 24 * 60 * 1000,
//         maxAge : 7 * 24 * 60 * 60 * 1000,
//         httpOnly : true
//     }
// };



// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// app.use((req,res,next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     res.locals.currUser = req.user;
//     next();
// })

// app.get('/demousers' , async (req , res) => {
//     let fakeUser = new User ({
//         email : "student@gmail.com",
//         username : "delta-student"
//     })

//     let registeredUser = await User.register(fakeUser , "helloworld");
//     res.send(registeredUser);
// })

// app.use('/listings' , listingsRouter);
// app.use('/listings/:id/reviews' , reviewsRouter);
// app.use('/' , userRouter);
// app.listen(8080, () => {
//     console.log('Server started on port 8080');
// });


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const MongoStore = require('connect-mongo');

const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const bookingRouter = require('./routes/booking.js');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const dbUrl = process.env.MONGO_URL;

// Connect to MongoDB
async function main() {
    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Session store setup
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET || "defaultsecret"
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

// Demo user route (optional)
app.get('/demousers', async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student"
    });

    let registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
});

// Routers
app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use('/', userRouter);
app.use(bookingRouter);

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
