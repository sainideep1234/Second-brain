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
        //@ts-ignore
        const token = req.headers.Authorization;
        const istoken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("middleware" + istoken);
        if (istoken) {
            //@ts-ignore
            req.userId = istoken.id;
            next();
        }
        else {
            res.status(403).json({
                msg: "token is not present ",
            });
        }
    }
    catch (error) { }
};
exports.authmiddleware = authmiddleware;
