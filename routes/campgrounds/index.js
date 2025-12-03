import { Router } from "express";
import * as campgroundController from "../../controllers/campgroundController.js";

const router = Router();

router.get("/", campgroundController.getAllCampgrounds);
router.get("/new", (req, res) => res.render("campgrounds/new"));
router.get("/:id", campgroundController.getCampground);
router.get("/:id/edit", campgroundController.getCampgroundToUpdate);
router.post("/", campgroundController.createCampground);
router.put("/:id", campgroundController.updateCampground);
router.delete("/:id", campgroundController.deleteCampground);

export default router;