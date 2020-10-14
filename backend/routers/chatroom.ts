import { Router } from "express";
import * as _ from "lodash";
import { auth } from "../middleware/auth";
const chatRoomController = require("../controllers/chatRoomController");
const router = Router();
router.get("/chat", auth, chatRoomController.getAllChatRooms);
router.post("/chat", auth, chatRoomController.createChatRoom);
export default router;
