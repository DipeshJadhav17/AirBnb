require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
// const { data } = require('./data.js'); 
const data = require('./data.js');
const Listing = require('../models/listing.js');

const mongo_url = process.env.ATLAS_URL;

async function main() {
    await mongoose.connect(mongo_url);
    await initDB();
}

const initDB = async () => {
    await Listing.deleteMany({});

    const updatedData = data.map((obj) => {
        return { ...obj, owner: "69d3532e45fe35768f2e94b1" };
    });

    await Listing.insertMany(updatedData);

    console.log("Database initialized with sample data");
}

main()
.then(() => console.log("Connected to MongoDB successfully"))
.catch((err) => console.log(err));

console.log("ENV:", process.env.ATLAS_URL);