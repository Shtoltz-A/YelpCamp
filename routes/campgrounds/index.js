import { Router } from "express";
import * as campgroundController from "../../controllers/campgroundController.js";
import * as reviewController from "../../controllers/reveiwController.js";
import { validate } from "../../middleware/validation.js";
import { campgroundSchema, reviewSchema } from "../../schemas/schemas.js";

const router = Router();

router.post("/:id/reviews", validate(reviewSchema), reviewController.createReview);
router.delete("/:id/reviews/:reviewId", reviewController.deleteReview);

router.get("/", campgroundController.getAllCampgrounds);
router.get("/new", (req, res) => res.render("campgrounds/new"));
router.get("/:id", campgroundController.getCampground);
router.get("/:id/edit", campgroundController.getCampgroundToUpdate);
router.post("/", validate(campgroundSchema), campgroundController.createCampground);
router.put("/:id", validate(campgroundSchema), campgroundController.updateCampground);
router.delete("/:id", campgroundController.deleteCampground);

export default router;