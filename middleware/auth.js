import Campground from "../models/Campground.js";
import Review from "../models/Review.js";

export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login")
    }
    next();
};

export const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);

    if (!camp.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
};

export const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
};