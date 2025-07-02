require('dotenv').config();
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const User = require('../models/user.js');

const MONGO_URL = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Seeder is using DB:", mongoose.connection.name, "on host:", mongoose.connection.host);
    initDB()
      .then(async () => {
        const count = await Listing.countDocuments();
        console.log("Listings in collection after seeding:", count);
        console.log("Database initialized successfully");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Failed to initialize database:", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}

async function initDB() {
  try {
    await Listing.deleteMany({});
    // Create/find demo user
    let demoUser = await User.findOne({ username: 'demo-seed-user' });
    if (!demoUser) {
      demoUser = new User({ username: 'demo-seed-user', email: 'demo@seed.com' });
      await User.register(demoUser, 'demopassword');
    }
    // Assign demo user's _id as owner
    const listingsWithOwner = initData.data.map((obj) => ({ ...obj, owner: demoUser._id }));
    const inserted = await Listing.insertMany(listingsWithOwner);
    console.log(`Inserted ${inserted.length} listings into the database (owner: ${demoUser._id})`);
    // Debug: print first listing inserted
    if (inserted.length > 0) {
      console.log('First inserted listing:', inserted[0]);
    }
  } catch (error) {
    throw new Error(`Failed to initialize database: ${error.message}`);
  }
}

// Make sure your .env contains:
// MONGO_URL=mongodb+srv://xrusherop008:abhi%40123x@cluster0.wiiof0l.mongodb.net/airbnb-hotel-book-app?retryWrites=true&w=majority&appName=Cluster0




