"use strict";
exports.__esModule = true;
exports.Chat = void 0;
var mongoose_1 = require("mongoose");
var chatSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1["default"].Types.ObjectId,
        ref: "User"
    },
    receiver: { type: mongoose_1["default"].Types.ObjectId, ref: "User" },
    message: {
        type: String,
        maxlength: 1000
    }
});
exports.Chat = mongoose_1.model("Chat", chatSchema);
