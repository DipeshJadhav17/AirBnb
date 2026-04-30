const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  //   console.log(req.user);
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const Listings = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner"); //populating reviews and owner for the listing
  if (!Listings) {
    req.flash("error", "listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { Listings });
};

module.exports.createListing = async (req, res, next) => {
  const url = req.file.path;
  const filename = req.file.filename;
  const newlisting = new Listing(req.body.listing); //creating new listing from form data
  newlisting.owner = req.user._id; //setting owner of the listing to the current logged in user
  newlisting.image = { url, filename }; //setting image url and filename for the listing

  //geocoding the location entered by the user using nomantim geocoding service
  const location = req.body.listing.location;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    {
      headers: {
        "User-Agent": "AirBnb Clone App/1.0"
    }
  }
  );

  // const text = await response.text();
  // console.log(text); //logging the raw response text to check if it's valid JSON
  // const data = JSON.parse(text);
  const data = await response.json();

  if (data.length > 0) {
    const lat = data[0].lat;
    const lon = data[0].lon;

    newlisting.geometry = {
      type: "Point",
      coordinates: [lon, lat]
    };
  }


  await newlisting.save(); //saving new listing to database
  req.flash("success", "Successfully created a new listing!"); //flashing success message to show on next page
  res.redirect("/listings"); //redirecting to show page of newly created listing
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const Listings = await Listing.findById(id);
  if (!Listings) {
    req.flash("error", "listing does not exist!");
    return res.redirect("/listings");
  }
  let originalUrlImage = Listings.image?.url || Listings.image;//getting original image url from listing object, if it exists
  if (typeof originalUrlImage === "string") {
    originalUrlImage = originalUrlImage.replace("/upload", "/upload/w_100,h_100,c_fill"); //resizing original image to width of 300px for display on edit form
  }
  // Listings.image.url = originalUrlImage; //setting the modified url back to the listing object for display on edit form
  res.render("./listings/edit.ejs", { Listings, originalUrlImage }); //rendering edit form with listing data and modified image url
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Successfully updated the listing!");
  res.redirect("/listings/" + id);

};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  //const deletedListing = await Listing.findByIdAndDelete(id);
  //console.log(deletedListing);//logging deleted listing to console
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};
