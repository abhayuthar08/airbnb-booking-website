require('dotenv').config();
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

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
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function initDB() {
  await Listing.deleteMany({});
  initData.data = initData.data.map(obj => ({
    ...obj,
    owner: '66ad2082974deee4f6058cb8', // ensure this ID exists in your DB
    image: obj.image && obj.image.trim() !== "" ? obj.image : DEFAULT_IMAGE // <-- Set default image if missing
  }));
  const inserted = await Listing.insertMany(initData.data);
  console.log(`Inserted ${inserted.length} listings`);
}
