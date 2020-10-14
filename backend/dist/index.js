"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("./routers/user"));
var file_1 = __importDefault(require("./routers/file"));
var chatroom_1 = __importDefault(require("./routers/chatroom"));
var config_1 = require("config");
var cors_1 = __importDefault(require("cors"));
var jwt = __importStar(require("jsonwebtoken"));
var message_1 = require("./models/message");
var app = express_1.default();
app.use(cors_1.default());
if (!config_1.get("jwtPrivateKey")) {
    process.exit(1);
}
mongoose_1.default
    .connect("mongodb://localhost/appchat")
    .then(function () { return console.log("Connected to MongoDB..."); })
    .catch(function () { return console.error("Could not connect to MongoDB..."); });
app.use(express_1.default.json());
app.use("/api", user_1.default);
app.use("/api", chatroom_1.default);
app.use("/api", file_1.default);
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    return console.log("Listening on port " + port + "...");
});
var io = require("socket.io")(server);
io.use(function (socket, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, payload, _id;
    return __generator(this, function (_a) {
        try {
            token = socket.handshake.query.token;
            payload = jwt.verify(token, config_1.get("jwtPrivateKey"));
            _id = payload._id;
            socket.userId = _id;
            next();
        }
        catch (error) {
            console.log(error, "lol");
        }
        return [2 /*return*/];
    });
}); });
io.on("connection", function (socket) {
    socket.on("joinRoom", function (chatroomId) {
        socket.room = chatroomId;
        console.log(socket.room, "socket 1");
        socket.join(socket.room);
    });
    socket.on("SEND_MESSAGE", function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var message, chatroomId, newMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = data.message, chatroomId = data.chatroomId;
                    console.log(message);
                    newMessage = new message_1.Message({
                        chatRoom: chatroomId,
                        user: socket.userId,
                        message: message,
                    });
                    console.log(socket.room, "socet 2");
                    io.to(socket.room).emit("MESSAGE", data);
                    return [4 /*yield*/, newMessage.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("disconnected", function (chatroomId) {
        socket.leave(chatroomId);
        console.log("A user left chatroom: " + chatroomId);
    });
});
