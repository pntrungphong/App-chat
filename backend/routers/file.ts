import { Router } from "express";
import { auth } from "../middleware/auth";
const upload = require("../controllers/fileController");
const router = Router();
router.post('/upload',auth,upload.upload)
export default router;
