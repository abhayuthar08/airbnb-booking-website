require('dotenv').config();
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const User = require('../models/user.js');

const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ticketsystem";
const DEFAULT_IMAGE = "https://th.bing.com/th/id/OIP.uozkdEREisT5W-KEJPX49gHaEt?w=254&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"; // <-- Add your default image URL

main()
  .then(() => {
    console.log("Connected to MongoDB");
    return initDB();
  })
  .then(() => {
    console.log("Database initialized successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.connection.close();
  });

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
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
  await Listing.deleteMany({});
  initData.data = initData.data.map(obj => ({
    ...obj,
    owner: '66ad2082974deee4f6058cb8', // ensure this ID exists in your DB
    image: obj.image && obj.image.trim() !== "" ? obj.image : DEFAULT_IMAGE // <-- Set default image if missing
  }));
  const inserted = await Listing.insertMany(initData.data);
  console.log(`Inserted ${inserted.length} listings`);
}

// Make sure your .env contains:
// MONGO_URL=mongodb+srv://xrusherop008:abhi%40123x@cluster0.wiiof0l.mongodb.net/airbnb-hotel-book-app?retryWrites=true&w=majority&appName=Cluster0
