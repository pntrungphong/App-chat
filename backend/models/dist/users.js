"use strict";
exports.__esModule = true;
exports.validateUser = exports.User = exports.UserSchema = void 0;
var joi = require("@hapi/joi");
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
}, {
    timestamps: true
});
exports.User = mongoose_1.model("User", exports.UserSchema);
exports.validateUser = function (user) {
    var schema = joi.object({
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(10).max(100).email().required(),
        password: joi.string().min(6).max(1024).required()
    });
    return schema.validate(user);
};
