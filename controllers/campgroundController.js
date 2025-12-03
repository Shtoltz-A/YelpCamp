import Campground from "../models/Campground.js";
import ExpressError from "../utils/ExpressError.js";

export const getAllCampgrounds = async (req, res) => {
    const camps = await Campground.find().lean();
    if (!camps) throw new ExpressError("Error loading campgrounds form the DB", 400);
    res.render("campgrounds/index", { camps });
};

export const getCampground = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id).lean();

    if (!camp) throw new ExpressError("Campground not found", 404);

    res.render("campgrounds/show", { camp });
};

export const createCampground = async (req, res) => {
    if (!req.body.campground) throw new ExpressError("Invalid Campground Data", 400)
    const { campground } = req.body;
    const camp = new Campground({ ...campground });
    await camp.save();
    res.redirect("/campgrounds")
};

export const getCampgroundToUpdate = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id).lean();

    if (!camp) throw new ExpressError("Campground not found", 404);

    res.render("campgrounds/edit", { camp });
};

export const updateCampground = async (req, res) => {
    const { campground } = req.body;
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...campground });
    res.redirect(`/campgrounds/${id}`)
};

export const deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
};