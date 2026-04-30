const Listing = require("../models/listing");
const Review = require("../models/review");
const mongoose = require("mongoose");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Successfully added the review!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewID } = req.params;
  const reviewObjectId = new mongoose.Types.ObjectId(reviewID);

  // 1. Delete review
  await Review.findByIdAndDelete(reviewObjectId);

  // 2. Remove reference from listing
  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewObjectId },
  });

  // await Review.findByIdAndDelete(reviewID);
  // await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });//pulling review from listing's reviews array
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${id}`);
};
