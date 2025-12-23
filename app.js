import express from "express";
import path from "path";
import ejsMate from "ejs-mate";
import dotenv from "dotenv";
import methodOverride from "method-override";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import db from "./config/db.js";
import homeRouter from "./routes/home.js";
import campgroundsRouter from "./routes/campgrounds.js";
import reviewsRouter from "./routes/reviews.js";
import userRouter from "./routes/users.js";
import ExpressError from "./utils/ExpressError.js";
import User from "./models/User.js";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

db.connectDB();

// session
app.use(session({
    name: "YelpCampSession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 день
    }
}));

// passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// routes
app.use("/", homeRouter);
app.use("/", userRouter);
app.use("/campgrounds", campgroundsRouter);
app.use("/campgrounds/:id/reviews", reviewsRouter);

// fallback 404
app.all("*splat", (req, res, next) => {
    next(new ExpressError(`Page ${req.originalUrl} not found`, 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh boy, something went wrong!";
    res.status(statusCode).render("error", { err });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});