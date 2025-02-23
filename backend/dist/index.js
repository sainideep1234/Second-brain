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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const user_1 = require("./routes/user");
const content_1 = require("./routes/content");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const MONGODB_URL = 'mongodb+srv://yashmalkhan545:Authokrloyash123@authkrlo.awd4h.mongodb.net/second-Brain';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', user_1.userRouter);
app.use('/content', content_1.contentRouter);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(MONGODB_URL);
        app.listen(3002);
        console.log('server started on port 3002');
    });
}
main();
