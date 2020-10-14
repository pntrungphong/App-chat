"use strict";
exports.__esModule = true;
exports.validateRoom = exports.ChatRoom = exports.chatRoomSchema = void 0;
var joi = require("@hapi/joi");
var mongoose_1 = require("mongoose");
exports.chatRoomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
exports.ChatRoom = mongoose_1.model("ChatRoom", exports.chatRoomSchema);
exports.validateRoom = function (room) {
    var schema = joi.object({
        name: joi.string().min(5).max(50).required()
    });
    return schema.validate(room);
};
