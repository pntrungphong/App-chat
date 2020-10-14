"use strict";
exports.__esModule = true;
exports.auth = void 0;
var jwt = require("jsonwebtoken");
var config_1 = require("config");
exports.auth = function (req, res, next) {
    var token = req.header("Authorization");
    if (!token)
        return res.status(401).send("Access denied. No token provided");
    try {
        var decode = jwt.verify(token, config_1.get("jwtPrivateKey"));
        req.user = decode;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
};
