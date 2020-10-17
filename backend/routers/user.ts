import { Router } from "express";
import * as _ from "lodash";
import { login, register, getMe } from "../controllers/userController";
import { auth } from "../middleware/auth";
// const upload=multer({dest:'uploads'})
const router = Router();
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log("Phong Pham: ", new Date().toISOString());
    console.log("Khang Manh: ", Date.now());
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  // fileFilter:fileFilter
}).single("image");

router.post("/login", login);
router.post("/register", upload, register);
router.get("/me", auth, getMe);
export default router;
