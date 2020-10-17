"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = multer_1["default"]({
    storage: storage,
    fileFilter: fileFilter
}).single('image');
