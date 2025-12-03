
import Campground from "../models/Campground.js";
import db from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
db.connectDB();

const camps = [
    { title: "My campground 1", description: "This is a basic campground N 1", location: "Toulouse", price: 25, image: "public/images/camp1.jpg"},
    { title: "My campground 2", description: "This is a basic campground N 2", location: "Toulouse", price: 35, image: "public/images/camp1.jpg"},
    { title: "My campground 3", description: "This is a basic campground N 3", location: "St Orens", price: 25 },
    { title: "My campground 4", description: "This is a basic campground N 4", location: "Labège", price: 30 },
    { title: "My campground 5", description: "This is a basic campground N 5", location: "Colomiers", price: 40 },
    { title: "My campground 6", description: "This is a basic campground N 6", location: "Perpignan", price: 25 },
    { title: "My campground 7", description: "This is a basic campground N 7", location: "Toulouse", price: 45},
    { title: "Perpiground", description: "This is a basic campground N 8", location: "Perpignan", price: 19 },
    { title: "My campground 9", description: "This is a basic campground N 9", location: "Toulouse", price: 30 },
    { title: "FOIXground 10", description: "This is a basic campground N 10", location: "Foix", price: 28 },
    { title: "Balmaground 11", description: "This is a basic campground N 11", location: "Balma", price: 43 },
];

// Campground.deleteMany().then(res => {
//     console.log(res)
//     db.closeDB();
// });

Campground.insertMany(camps).then(res => {
    console.log(res)
    db.closeDB();
});

