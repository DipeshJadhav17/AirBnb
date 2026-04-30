const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');



// MongoDB connection URL
const mongo_url = 'mongodb://127.0.0.1:27017/AirBNB_clone';

main().then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect(mongo_url);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/wanderlust');` if your database has auth enabled
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => {
        return { ...obj, owner: "69d3532e45fe35768f2e94b1"};
    });
    await Listing.insertMany(initData.data);
    //await Listing.deleteMany({title: "Happy Home"});
    console.log("Database initialized with sample data");
}

initDB();