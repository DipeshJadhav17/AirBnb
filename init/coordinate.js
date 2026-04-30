const mongoose = require("mongoose");
const Listing = require("../models/listing");

mongoose.connect("mongodb://127.0.0.1:27017/AirBNB_clone");

async function updateOldListings() {
    const listings = await Listing.find({
        $or: [
            { geometry: { $exists: false } },
            { "geometry.coordinates": { $exists: false } }
        ]
    });

    console.log(`Found ${listings.length} listings`);

    for (let listing of listings) {
        try {
            const location = listing.location;

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
                {
                    headers: {
                        "User-Agent": "Airbnb Clone App/1.0"
                    }
                }
            );

            const data = await response.json();

            if (data.length > 0) {
                listing.geometry = {
                    type: "Point",
                    coordinates: [
                        parseFloat(data[0].lon),
                        parseFloat(data[0].lat)
                    ]
                };

                await listing.save();
                console.log(`Updated: ${listing.title}`);
            } else {
                console.log(`No result for: ${location}`);
            }

            await new Promise(r => setTimeout(r, 1000)); // polite delay
        } catch (err) {
            console.log(err);
        }
    }

    mongoose.connection.close();
}

updateOldListings();