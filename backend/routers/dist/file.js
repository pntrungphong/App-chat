"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var upload = require("../controllers/fileController");
var router = express_1.Router();
router.post('/upload', auth_1.auth, upload.upload);
exports["default"] = router;
