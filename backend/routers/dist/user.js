"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var auth_1 = require("../middleware/auth");
// const upload=multer({dest:'uploads'})
var router = express_1.Router();
var multer_1 = require("multer");
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        console.log("Phong Pham: ", new Date().toISOString());
        console.log("Khang Manh: ", Date.now());
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = multer_1["default"]({
    storage: storage
}).single("image");
router.post("/login", userController_1.login);
router.post("/register", upload, userController_1.register);
router.get("/me", auth_1.auth, userController_1.getMe);
exports["default"] = router;
