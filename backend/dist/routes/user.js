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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// const process.env.JWT_SECRET = "sdffgk;jnbfmgde";
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const signupSchema = zod_1.default.object({
    userName: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validschema = signupSchema.safeParse(req.body);
        if (!validschema.success) {
            res.status(400).json({
                msg: "user credentials not match ",
            });
            return;
        }
        const { userName, password } = req.body;
        const preUser = yield db_1.userModal.findOne({ userName });
        if (preUser) {
            res.status(409).json({
                msg: "user is already signed up ",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const user = yield db_1.userModal.create({
            userName,
            password: hashedPassword,
        });
        if (user) {
            res.status(201).json({
                msg: "user signup successfully ",
            });
            return;
        }
    }
    catch (error) {
        return res.status(500).json({
            msg: "User not created",
        });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validschema = signupSchema.safeParse(req.body);
        if (!validschema.success) {
            res.status(400).json({
                msg: "creadentials are wrong ",
            });
        }
        // search user
        const { userName, password } = req.body;
        const user = yield db_1.userModal.findOne({ userName });
        if (!user) {
            return res.status(403).json({
                msg: "email not present  ",
            });
        }
        //double authentication first username checkj now password
        //check password
        const isvalidpass = yield bcrypt_1.default.compare(password, user.password);
        if (!isvalidpass) {
            return res.status(403).json({
                msg: "password is wrong ",
            });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({
            msg: "login successfully",
            token: token,
        });
    }
    catch (error) {
        return res.json({
            msg: "error " + error,
        });
    }
}));
