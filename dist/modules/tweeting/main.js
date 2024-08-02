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
exports.page = void 0;
exports.default = startTweeter;
const puppeteer_1 = __importDefault(require("puppeteer"));
const tweeting_1 = require("./tweeting");
const helper_js_1 = require("./helper/helper.js");
require('dotenv').config();
// instances
let page;
function startTweeter() {
    return __awaiter(this, void 0, void 0, function* () {
        // Launch the browser and open a new blank page
        const browser = yield puppeteer_1.default.launch({ headless: true });
        exports.page = page = yield browser.newPage();
        // Navigate to twitter login page
        yield page.goto('https://twitter.com/login/');
        yield (0, helper_js_1.delay)(1000);
        // Login
        const email = process.env.EMAIL_TWT || '';
        const username = process.env.USERNAME_TWT || '';
        const password = process.env.PASSWORD_TWT || '';
        yield (0, tweeting_1.login)(email, username, password);
    });
}
