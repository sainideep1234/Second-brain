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
exports.contentRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authmiddleware_1 = require("../middleware/authmiddleware");
const func_1 = require("../func");
const JWT_SECRET = "sdffgk;jnbfmgde";
const contentRouter = (0, express_1.Router)();
exports.contentRouter = contentRouter;
contentRouter.post("/post", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = req.body.link;
        const title = req.body.title;
        yield db_1.contentModal.create({
            title,
            link,
            tag: [],
            // @ts-ignore
            id: req.id,
        });
        return res.status(201).json({
            msg: "content store successfully ",
        });
    }
    catch (error) {
        return res.status(411).json({
            msg: "content not store because  " + error,
        });
    }
}));
contentRouter.get("/get", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield db_1.contentModal
            // @ts-ignore
            .find({ userId: req.id })
            .populate("id", "userName");
        console.log(content);
        if (content) {
            res.status(201).json({
                msg: "content retrieved successfully",
                content,
            });
        }
        else {
            res.status(403).json({
                msg: "content is not available ",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            msg: "content is not available " + error,
        });
    }
}));
contentRouter.delete("/delete", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    // @ts-ignore
    yield db_1.contentModal.deleteMany({ _id: contentId, id: req.id });
    res.status(411).json({
        msg: "contetn delete successfully",
    });
}));
contentRouter.post("/share", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const { id } = jsonwebtoken_1.default.decode(req.body.token);
        if (!id) {
            return res.status(411).json({ msg: "id is not present" });
        }
        const alreadylink = yield db_1.shareModal.findOne({
            userId: id,
            isShareLink: true,
        });
        if (alreadylink) {
            return res
                .status(201)
                .json({ msg: "already has share link ", link: alreadylink.shareLink });
        }
        const sharerandomlink = (0, func_1.randomString)();
        const share = yield db_1.shareModal.create({
            id,
            shareLink: sharerandomlink,
            isShareLink: true,
        });
        res.status(200).json({
            msg: "share link created successfully ",
            link: share.shareLink,
        });
    }
    catch (error) {
        res.status(200).json({
            msg: "error while genrating link ",
            error,
        });
    }
}));
contentRouter.get("/share/:link", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const link = req.params.link;
        const shli = link.split(":")[1];
        // Find the share document
        const document = yield db_1.shareModal.findOne({
            shareLink: shli,
            isShareLink: true,
        });
        if (!document) {
            return res.status(404).json({ msg: "Shared link is invalid or expired" });
        }
        // Convert id to string if it's an ObjectId
        const id = (_a = document === null || document === void 0 ? void 0 : document.userId) === null || _a === void 0 ? void 0 : _a.toString();
        // Find associated content
        const contents = yield db_1.contentModal.find({ userId: id });
        if (contents.length === 0) {
            return res
                .status(404)
                .json({ msg: "No content available for this user" });
        }
        return res.status(200).json({
            msg: "Data retrieved successfully",
            contents,
        });
    }
    catch (error) {
        console.error("Error in /share/:link route:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}));
