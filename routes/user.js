const express = require("express");
const router = express.Router();
const User = require("../models/user.js"); //importing User model for user authentication
const wrapasync = require("../utlis/wrapasync.js"); //importing wrapasync to handle async errors in routes
const passport = require("passport"); //importing passport for authentication
const { saveRedirectUrl } = require("../middleware.js"); //importing saveRedirectUrl middleware to save the original url before redirecting to login page

const controllers = require("../controllers/users"); //importing review controllers to handle review logic


router.route("/signup")
.get(controllers.renderSignUpForm)
.post(wrapasync(controllers.signup));


router.route("/login")
.get(controllers.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  controllers.login,
);

router.get("/logout", controllers.logout);

module.exports = router;
