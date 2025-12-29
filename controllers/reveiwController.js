import Campground from "../models/Campground.js";
import Review from "../models/Review.js";
import ExpressError from "../utils/ExpressError.js";

export const createReview = async (req, res) => {
    if (!req.body.review) throw new ExpressError("Invalid Review Data", 400);
    const { review } = req.body;
    const { id } = req.params;
    const camp = await Campground.findById(id);
    const rev = new Review(review);
    rev.author = req.user._id;
    camp.reviews.push(rev);
    await rev.save();
    await camp.save();
    req.flash("success", "The new review was successfully created!");
    res.redirect(`/campgrounds/${id}`);
};

export const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "The review was successfully deleted!");
    res.redirect(`/campgrounds/${id}`);
};