import { Router } from "express";
import * as _ from "lodash";
import { login, register, getMe } from "../controllers/userController";
import { auth } from "../middleware/auth";
const router = Router();
router.post("/login", login);
router.post("/register", register);
router.get("/me", auth, getMe);
export default router;
