const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js"); //importing Listing model to handle listing data
const wrapAsync = require("../utlis/wrapasync"); //importing wrapAsync to handle async errors in routes
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js"); //importing isLoggedIn middleware to check if user is logged in before creating a listing
const multer = require("multer");//importing multer for handling file uploads
const{storage} = require("../CloudConfig.js");//importing cloudinary storage configuration for multer
const upload = multer({ storage });//setting storage for uploaded files

const controllers = require("../controllers/listings.js"); //importing controllers for listings routes


router.route("/")
.get(wrapAsync(controllers.index))//Index Route to show all listings
.post(
  isLoggedIn,
  upload.single("listing[image]"),//middleware to handle file upload for listing image
  validateListing,
  wrapAsync(controllers.createListing),
);//Create Route to create a new listing



//new route to show form to create new listing
router.get("/new", isLoggedIn, controllers.renderNewForm);



//show 
router.route("/:id")
.get(wrapAsync(controllers.showListing))//show route to show details of a particular listing
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),//middleware to handle file upload for listing image
  validateListing,
  wrapAsync(controllers.updateListing),
)//update route to update a particular listing
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(controllers.deleteListing),
);//delete route to delete a particular listing


//edit route to show form to edit a particular listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(controllers.editListing),
);


module.exports = router;
