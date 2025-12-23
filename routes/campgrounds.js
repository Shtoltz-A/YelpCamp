import { Router } from "express";
import * as campgroundController from "../controllers/campgroundController.js";
import { validate } from "../middleware/validation.js";
import { isLoggedIn } from "../middleware/auth.js";
import { campgroundSchema } from "../schemas/schemas.js";

const router = Router();

router.get("/", campgroundController.getAllCampgrounds);
router.get("/new", isLoggedIn, (req, res) => res.render("campgrounds/new"));
router.get("/:id", campgroundController.getCampground);
router.get("/:id/edit", isLoggedIn, campgroundController.getCampgroundToUpdate);
router.post("/", isLoggedIn, validate(campgroundSchema), campgroundController.createCampground);
router.put("/:id", isLoggedIn, validate(campgroundSchema), campgroundController.updateCampground);
router.delete("/:id", isLoggedIn, campgroundController.deleteCampground);

export default router;