import { Router } from "express";
import * as reviewController from "../controllers/reveiwController.js";
import { validate } from "../middleware/validation.js";
import { reviewSchema } from "../schemas/schemas.js";

const router = Router({mergeParams: true});

router.post("/", validate(reviewSchema), reviewController.createReview);
router.delete("/:reviewId", reviewController.deleteReview);

export default router;