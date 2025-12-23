import User from "../models/User.js";
import ExpressError from "../utils/ExpressError.js";

export const createUser = async (req, res, next) => {
    if (!req.body) throw new ExpressError("Invalid User Data", 400);
    
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const newUser = await User.register(user, password);

        req.login(newUser, err => {
            if (err) return next(err);

            req.flash("success", `Welcome to YelpCamp ${newUser.username}!`);
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

export const loginUser = (req, res, next) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.returnTo  || "/campgrounds";
    delete res.locals.returnTo;

    res.redirect(redirectUrl);
};

export const logoutUser = (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);

        req.flash("success", "Goodbye!");
        res.redirect("/campgrounds");
    });
};

