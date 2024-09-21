import express from "express";
import {
  authCheck,
  login,
  logout,
  signup,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getme", protectRoute, authCheck);

export default router;
