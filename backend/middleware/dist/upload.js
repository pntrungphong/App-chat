"use strict";
exports.__esModule = true;
exports.uploadFileMiddleware = void 0;
var multer_1 = require("multer");
var util_1 = require("util");
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var uploadFile = multer_1["default"]({
    storage: storage
}).single('image');
exports.uploadFileMiddleware = util_1["default"].promisify(uploadFile);
