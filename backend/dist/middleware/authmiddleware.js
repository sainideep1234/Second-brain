"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "sdffgk;jnbfmgde";
const authmiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(403).json({ msg: "token is not present " });
            return;
        }
        const istoken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (istoken) {
            req.userId = istoken.id;
            next();
        }
    }
    catch (error) { }
};
exports.authmiddleware = authmiddleware;
