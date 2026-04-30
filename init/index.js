require('dotenv').config({ path: '../.env' });



const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');


// MongoDB connection URL
const mongo_url = process.env.ATLAS_URL;

async function main() {
    await mongoose.connect(mongo_url);
    // use `await mongoose.connect('mongodb://user:password@
    await initDB();
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => {
        return { ...obj, owner: "69d3532e45fe35768f2e94b1" };
    });
    await Listing.insertMany(initData.data);
    //await Listing.deleteMany({title: "Happy Home"});
    console.log("Database initialized with sample data");
}

main().then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((err) => {
    console.log(err)
});

console.log("ENV:", process.env.ATLAS_URL);
