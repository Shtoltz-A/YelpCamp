import { Router } from "express";
import * as reviewController from "../controllers/reveiwController.js";
import { validate } from "../middleware/validation.js";
import { isLoggedIn } from "../middleware/auth.js";
import { reviewSchema } from "../schemas/schemas.js";

const router = Router({mergeParams: true});

router.post("/", isLoggedIn, validate(reviewSchema), reviewController.createReview);
router.delete("/:reviewId", isLoggedIn, reviewController.deleteReview);

export default router;