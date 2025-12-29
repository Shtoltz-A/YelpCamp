import { Router } from "express";
import * as reviewController from "../controllers/reveiwController.js";
import { validate } from "../middleware/validation.js";
import { isLoggedIn } from "../middleware/auth.js";
import { reviewSchema } from "../schemas/schemas.js";
import { isReviewAuthor } from "../middleware/auth.js";

const router = Router({mergeParams: true});

router.post("/", isLoggedIn, isReviewAuthor, validate(reviewSchema), reviewController.createReview);
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.deleteReview);

export default router;