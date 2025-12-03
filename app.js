import express from "express";
import path from "path";
import ejsMate from "ejs-mate";
import dotenv from "dotenv";
import methodOverride from "method-override";
import db from "./config/db.js";
import homeRouter from "./routes/home.js";
import campgroundsRouter from "./routes/campgrounds/index.js";
import ExpressError from "./utils/ExpressError.js";
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

app.use("/", homeRouter);
app.use("/campgrounds", campgroundsRouter);

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