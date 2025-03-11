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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
require("dotenv/config");
const authmiddleware_1 = require("../middleware/authmiddleware");
const func_1 = require("../func");
require("dotenv/config");
const generative_ai_1 = require("@google/generative-ai");
const contentRouter = (0, express_1.Router)();
exports.contentRouter = contentRouter;
contentRouter.post("/post", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title, type } = req.body;
        yield db_1.contentModal.create({
            title,
            link,
            type,
            userId: req.userId,
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
            .find({ userId: req.userId });
        if (content) {
            res.status(201).json({
                msg: "content retrieved successfully",
                content,
            });
            return;
        }
        else {
            res.status(403).json({
                msg: "content is not available ",
            });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            msg: "content is not available " + error,
        });
    }
}));
contentRouter.delete("/delete/:contentId", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    try {
        yield db_1.contentModal.deleteMany({ _id: contentId });
        res.status(201).json({
            msg: "contetn delete successfully",
        });
    }
    catch (error) {
        res.status(501).json({
            msg: "not delet the conetnt ",
        });
    }
}));
contentRouter.post("/share", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        if (!id) {
            res.status(411).json({ msg: "id is not present" });
            return;
        }
        const alreadylink = yield db_1.shareModal.findOne({
            userId: id,
            isShareLink: true,
        });
        if (alreadylink) {
            res
                .status(201)
                .json({ msg: "already has share link ", link: alreadylink.shareLink });
            return;
        }
        const sharerandomlink = (0, func_1.randomString)();
        const share = yield db_1.shareModal.create({
            userId: id,
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
        // Find the share document
        const document = yield db_1.shareModal.findOne({
            shareLink: link,
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
contentRouter.get("/youtube", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.contentModal.find({ userId, type: "youtube" });
    if (!content) {
        res.status(204).json({
            msg: "No YOutube conetnt is present",
        });
        return;
    }
    res.status(201).json({
        msg: "conetnt retrieve successulyy ",
        content,
    });
}));
contentRouter.get("/twitter", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.contentModal.find({ userId, type: "twitter" });
    if (!content) {
        res.status(204).json({
            msg: "No YOutube conetnt is present",
        });
        return;
    }
    res.status(201).json({
        msg: "conetnt retrieve successulyy ",
        content,
    });
}));
contentRouter.post("/chat", authmiddleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const prompt = req.body.prompt;
    const userId = req.userId; // Extracted from auth middleware
    try {
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
        // Initialize the AI model
        const genAI = new generative_ai_1.GoogleGenerativeAI("AIzaSyDKReyAHYCLtfadJyXYqXfGnefdqXKjJmc");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        // Generate AI response
        const result = yield model.generateContentStream(prompt);
        let responseText = "";
        try {
            for (var _d = true, _e = __asyncValues(result.stream), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const chunk = _c;
                responseText += chunk.text();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Save the message in DB
        const message = yield db_1.messageModal.create({
            userId,
            request: prompt,
            response: responseText
        });
        // Fetch all previous messages of this user
        const allMessages = yield db_1.messageModal.find({ userId }).sort({ createdAt: -1 });
        // Send the stored messages to client
        return res.status(200).json({
            message: "Chat history retrieved successfully",
            chatHistory: allMessages
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "An error occurred while processing your request" });
    }
}));
