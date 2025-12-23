import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { storeReturnTo } from "../middleware/returnTo.js"
import passport from "passport";

const router = Router();

router.get("/register", (req, res) => res.render("users/register"));
router.post("/register", userController.createUser);

router.get("/login", (req, res) => res.render("users/login"));
router.post("/login", storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login"}), userController.loginUser);

router.get("/logout", (userController.logoutUser))


export default router;