if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utlis/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

const mongo_url = process.env.ATLAS_URL;
const isProd = process.env.NODE_ENV === "production";

// ---------- App setup ----------
app.set("trust proxy", 1); // needed behind Vercel's proxy
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ---------- MongoDB connection (cached for serverless) ----------
let connectionPromise = null;
function connectDB() {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongo_url).then(() => {
            console.log("Connected to MongoDB successfully");
        }).catch((err) => {
            connectionPromise = null; // allow retry on next request
            throw err;
        });
    }
    return connectionPromise;
}

// make sure DB is connected before handling any request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

// ---------- Session ----------
const store = MongoStore.create({
    mongoUrl: mongo_url,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
    console.log("Session store error:", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProd,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// ---------- Passport ----------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------- Globals available in all views ----------
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ---------- Routes ----------


app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// 404 handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
});

// ---------- Start server (local only) ----------
if (require.main === module) {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

module.exports = app; // Vercel uses this export
