import { Router } from "express";
import * as campgroundController from "../controllers/campgroundController.js";
import { validate } from "../middleware/validation.js";
import { campgroundSchema } from "../schemas/schemas.js";

const router = Router();

router.get("/", campgroundController.getAllCampgrounds);
router.get("/new", (req, res) => res.render("campgrounds/new"));
router.get("/:id", campgroundController.getCampground);
router.get("/:id/edit", campgroundController.getCampgroundToUpdate);
router.post("/", validate(campgroundSchema), campgroundController.createCampground);
router.put("/:id", validate(campgroundSchema), campgroundController.updateCampground);
router.delete("/:id", campgroundController.deleteCampground);

export default router;