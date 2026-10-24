const Listing = require("./models/listing.js"); //importing Listing model to handle listing data
const Review = require("./models/review.js"); //importing Review model to handle reviews for listings
const ExpressError = require("./utlis/ExpressError"); //importing ExpressError to handle custom errors in routes
const { ListingSchema, ReviewSchema } = require("./schema"); //importing ListingSchema for validating listing data
const mongoose = require("mongoose");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req);//
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.get("Referrer") || "/listings"; // saving the original url in session to redirect back after login
    // req.session.redirectUrl = "/listings/" + req.params.id; // saving the original url in session to redirect back after login
    // console.log(req.session.redirectUrl); // having all deatils of the request object to debug and check the original url
    req.flash("error", "You must be logged in to do that!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect("/listings/" + id);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewID } = req.params;
  const review = await Review.findById(reviewID);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of that review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//middleware to validate listing data using Joi and ListingSchema
module.exports.validateListing = (req, res, next) => {
  const { error } = ListingSchema.validate(req.body);
  console.log(error);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(400, msg));
  }
  next();
};

//middleware to validate listing data using Joi and ListingSchema
module.exports.validateReview = (req, res, next) => {
  const { error } = ReviewSchema.validate(req.body);
  console.log(error);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(400, msg));
  }
  next();
};
