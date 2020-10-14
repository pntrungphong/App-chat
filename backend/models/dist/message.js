"use strict";
exports.__esModule = true;
exports.Message = exports.messageSchema = void 0;
var mongoose_1 = require("mongoose");
exports.messageSchema = new mongoose_1.Schema({
    chatRoom: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        minlength: 1
    }
});
exports.Message = mongoose_1.model("message", exports.messageSchema);
