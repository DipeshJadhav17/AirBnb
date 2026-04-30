const express = require('express');
const router = express.Router({ mergeParams: true });//creating a router for reviews with mergeParams to access params from parent routes
const wrapAsync = require("../utlis/wrapasync");//importing wrapAsync to handle async errors in routes
const Review = require('../models/review');//importing Review model to handle reviews for listings
const Listing = require('../models/listing.js');//importing Listing model to handle listing data
const mongoose = require('mongoose');
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");//importing validateReview middleware to validate review data before creating a review

const controllers = require("../controllers/reviews");//importing review controllers to handle review logic



//Review routes to add a review to a particular listing
router.post("/", isLoggedIn, validateReview, wrapAsync(controllers.createReview));


//delete route to delete a particular review
router.delete("/:reviewID", isLoggedIn, isReviewAuthor, wrapAsync(controllers.deleteReview));

module.exports = router;