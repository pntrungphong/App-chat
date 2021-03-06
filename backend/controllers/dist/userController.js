"use strict";
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
exports.__esModule = true;
exports.validate = exports.login = exports.getMe = exports.register = void 0;
var users_1 = require("../models/users");
var bcrypt = require("bcrypt");
var joi = require("@hapi/joi");
var jwt = require("jsonwebtoken");
var config_1 = require("config");
exports.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, name, password, image, error, user, salt, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, name = _a.name, password = _a.password;
                console.log(req.file);
                image = req.file.originalName;
                error = users_1.validateUser(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                return [4 /*yield*/, users_1.User.findOne({ email: email })];
            case 1:
                user = _c.sent();
                if (user)
                    return [2 /*return*/, res.status(400).send("User is already exits")];
                user = new users_1.User({ email: email, name: name, password: password, image: image });
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _c.sent();
                _b = user;
                return [4 /*yield*/, bcrypt.hash(user.password, salt)];
            case 3:
                _b.password = _c.sent();
                // await user.save();
                res.status(200).send("User " + user.name + "  registered successfully");
                return [2 /*return*/];
        }
    });
}); };
exports.getMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_1.User.findById(req.user._id).select("-password")];
            case 1:
                user = _a.sent();
                res.status(200).send(user);
                return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, error, user, validateUser, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                error = exports.validate(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                return [4 /*yield*/, users_1.User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send("Invalid email and password")];
                return [4 /*yield*/, bcrypt.compare(password, user.password.toString())];
            case 2:
                validateUser = _b.sent();
                if (!validateUser)
                    return [2 /*return*/, res.status(400).send("Invalid email and password")];
                token = jwt.sign({ _id: user._id, name: user.name }, config_1.get("jwtPrivateKey"), { expiresIn: "2h" });
                res.status(200).send(token);
                return [2 /*return*/];
        }
    });
}); };
exports.validate = function (user) {
    var schema = joi.object({
        email: joi.string().min(10).max(100).email().required(),
        password: joi.string().min(6).max(1024).required()
    });
    return schema.validate(user);
};
