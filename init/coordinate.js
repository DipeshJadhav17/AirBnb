require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const fetch = require("node-fetch"); // install if not installed

const mongo_url = process.env.ATLAS_URL;

// ✅ Connect DB
async function connectDB() {
  try {
    await mongoose.connect(mongo_url);
    console.log("✅ DB Connected");
  } catch (err) {
    console.log("❌ DB Error:", err);
  }
}

// ✅ Main function
async function updateOldListings() {
  await connectDB();

  const listings = await Listing.find({
    $or: [
      { geometry: { $exists: false } },
      { "geometry.coordinates": { $exists: false } },
      { "geometry.coordinates": { $size: 0 } },
      { "geometry.coordinates.0": null }
    ]
  });

  console.log(`📦 Found ${listings.length} listings`);

  for (let listing of listings) {
    try {
      const location = listing.location;

      if (!location) {
        console.log(`❌ No location for: ${listing.title}`);
        continue;
      }

      console.log(`📍 Searching: ${location}`);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
        {
          headers: {
            "User-Agent": "Airbnb Clone App"
          }
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        listing.geometry = {
          type: "Point",
          coordinates: [
            parseFloat(data[0].lon), // longitude
            parseFloat(data[0].lat)  // latitude
          ]
        };

        await listing.save();
        console.log(`✅ Updated: ${listing.title}`);
      } else {
        console.log(`❌ No result for: ${location}`);
      }

      // ⏱️ Delay to avoid API block
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (err) {
      console.log(`❌ Error for ${listing.title}:`, err.message);
    }
  }

  console.log("🎉 DONE");
  mongoose.connection.close();
}

// Run
updateOldListings();