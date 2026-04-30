if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
//




const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const ejs = require("ejs");//importing ejs for rendering views
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");//importing ejs-mate for layout support in ejs
const ExpressError = require("./utlis/ExpressError");//importing ExpressError to handle custom errors in routes
const session = require("express-session");//importing express-session to handle sessions in the app
const MongoStore = require('connect-mongo').default;//importing connect-mongo to store session data in MongoDB for better performance and scalability
const flash = require("connect-flash");//importing connect-flash to handle flash messages in the app
const LocalStrategy = require("passport-local");//importing passport-local for local authentication strategy
const passport = require("passport");
const User = require("./models/user");//importing User model for authentication

app.use(express.json());
app.engine("ejs", ejsMate);//setting ejs-mate as the engine for ejs files
app.set("views", path.join(__dirname, "views"));//setting views directory
app.set("view engine", "ejs");//setting view engine to ejs
app.use(express.static(path.join(__dirname, "public")));//setting static files directory like css,js,imgs etc.
app.use(express.urlencoded({ extended: true }));//to parse form data
app.use(methodOverride("_method"));//to use put and delete methods in forms


// MongoDB connection URL
const mongo_url = process.env.ATLAS_URL;

main().then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((err) => {
    console.log(err)
});

async function main() {
    await mongoose.connect(mongo_url);
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/wanderlust');` if your database has auth enabled
}


const store = MongoStore.create({
    mongoUrl: mongo_url,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60 //time period in seconds to update session in database if it hasn't been modified  
})//creating a new MongoStore instance to store session data in MongoDB using the connection URL from environment variables


store.on("error", (err) => {
    console.log("Session store error:", err);
});


const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,//cookie expires in 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000//cookie max age is 7 days
    },
    httpOnly: true //to prevent client side scripts from accessing the cookie
}





app.use(session(sessionOptions));//using express-session with defined options
app.use(flash());//using connect-flash for flash messages


app.use(passport.initialize());//initializing passport for authentication
app.use(passport.session());//using passport session to persist login sessions
passport.use(new LocalStrategy(User.authenticate()));//using passport-local strategy for authentication with User model

app.use((req, res, next) => {
    res.locals.success = req.flash("success");//setting success flash message to res.locals to be accessible in all views
    res.locals.error = req.flash("error");//setting error flash message to res.locals to be accessible in all views
    res.locals.currUser = req.user;//setting current user to res.locals to be accessible in all views
    next();
})


passport.serializeUser(User.serializeUser());//serializing user for session
passport.deserializeUser(User.deserializeUser());//deserializing user for session


const listingRouter = require('./routes/listings.js');//importing listing routes
const reviewRouter = require("./routes/reviews.js");//importing review routes
const userRouter = require("./routes/user.js");//importing user routes

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


// app.get('/', (req, res) => {
//     res.send('Welcome to AirBNB Clone!');
// })



// app.get('/listings', (req, res) => {
//     let sampleListing = new Listing({
//         title: "Beautiful Beach House",
//         description: "A lovely beach house with stunning ocean views.",
//         image: "",
//         price: 250,
//         location: "Malibu",
//         country: "USA"
//     })
//     sampleListing.save();
//     console.log(sampleListing);
//     res.send('Listing created and saved to database');
// })




app.use('/listings', listingRouter);//using listing routes for all routes starting with /listings
app.use("/listings/:id/reviews", reviewRouter);//using review routes for all routes starting with /listings/:id/reviews
app.use("/", userRouter);//using user routes for all routes starting with /user






//catch-all route to handle 404 errors
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

//error handling middleware to handle all errors in the app and render error page with error message
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("./listings/error.ejs", { message });
})

