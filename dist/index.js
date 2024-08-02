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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./modules/tweeting/main"));
const tweeting_1 = require("./modules/tweeting/tweeting");
// initialize express app and middlewares
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// start AutoMenfess instance
(0, main_1.default)();
// routes
app.post('/tweet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    console.log(tweet.message);
    // tweet
    try {
        const twtPostUrl = yield (0, tweeting_1.postTweet)(tweet.message);
        res.json({
            twtPostUrl,
            status: 200,
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
// start server
app.listen(3000, () => {
    console.log("Server is running");
});
