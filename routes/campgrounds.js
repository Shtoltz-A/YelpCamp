import { Router } from "express";
import * as campgroundController from "../controllers/campgroundController.js";
import { validate } from "../middleware/validation.js";
import { isLoggedIn, isAuthor } from "../middleware/auth.js";
import { campgroundSchema } from "../schemas/schemas.js";

const router = Router();

router.route("/")
    .get(campgroundController.getAllCampgrounds)
    .post(isLoggedIn, validate(campgroundSchema), campgroundController.createCampground);

router.get("/new", isLoggedIn, (req, res) => res.render("campgrounds/new"));

router.route("/:id")
    .get(campgroundController.getCampground)
    .put(isLoggedIn, isAuthor, validate(campgroundSchema), campgroundController.updateCampground)
    .delete(isLoggedIn, isAuthor, campgroundController.deleteCampground);

router.get("/:id/edit", isLoggedIn, isAuthor, campgroundController.getCampgroundToUpdate);

export default router;