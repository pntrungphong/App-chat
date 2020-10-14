"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var chatRoomController = require("../controllers/chatRoomController");
var router = express_1.Router();
router.get("/chat", auth_1.auth, chatRoomController.getAllChatRooms);
router.post("/chat", auth_1.auth, chatRoomController.createChatRoom);
exports["default"] = router;
