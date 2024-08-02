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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.postTweet = postTweet;
const helper_1 = require("./helper/helper");
const main_1 = require("./main");
function login(email, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // fill email
        yield main_1.page.locator('input.r-30o5oe').fill(email);
        yield (0, helper_1.delay)(1000);
        // click next
        let nextBtn = (yield main_1.page.waitForSelector('::-p-xpath(//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/button[2])')) || null;
        yield (nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.click());
        yield (0, helper_1.delay)(1000);
        // check if need to input username because unusual activity detected
        const spanElements = yield main_1.page.$$('span');
        for (const span of spanElements) {
            const textContent = yield span.evaluate(el => el.textContent);
            if (textContent === null || textContent === void 0 ? void 0 : textContent.includes('Enter your phone number or username')) {
                // fill username
                yield main_1.page.locator('input.r-30o5oe').fill(username);
                yield (0, helper_1.delay)(1000);
                nextBtn = yield main_1.page.waitForSelector('::-p-xpath(//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/button)');
                yield (nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.click());
                yield (0, helper_1.delay)(1000);
                break;
            }
        }
        yield main_1.page.locator('input[type="password"]').fill(password);
        yield (0, helper_1.delay)(1000);
        nextBtn = yield main_1.page.waitForSelector('::-p-xpath(//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div/button)');
        yield (nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.click());
        yield (0, helper_1.delay)(1000);
        // check if there is a closed button in popup -> close    
        const buttonCount = yield main_1.page.$$eval('button[aria-label="Close"]', (buttons) => buttons.length);
        const isAnyCloseBtn = buttonCount > 0;
        if (isAnyCloseBtn) {
            yield main_1.page.locator('button[aria-label="Close"]').click();
            yield (0, helper_1.delay)(1000);
        }
        // close bottom popup if any
        yield (0, helper_1.delay)(5000);
        const closeBtn = yield main_1.page.waitForSelector('::-p-xpath(//*[@id="layers"]/div/div[1]/div/div/div/button)');
        yield (closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.click());
        console.log("LOGGED IN..");
    });
}
function postTweet(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputBtn = yield main_1.page.waitForSelector('::-p-xpath(//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div[2]/div[1]/div/div/div/div[2]/div[1])');
        yield (inputBtn === null || inputBtn === void 0 ? void 0 : inputBtn.click());
        yield main_1.page.keyboard.type(message, { delay: 100 });
        yield (0, helper_1.delay)(1000);
        const postBtn = yield main_1.page.waitForSelector('::-p-xpath(//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div[2]/div/div/div/button)');
        yield (postBtn === null || postBtn === void 0 ? void 0 : postBtn.click());
        yield (0, helper_1.delay)(1000);
        // if any popup with close button -> click close
        const buttonCount = yield main_1.page.$$eval('button[aria-label="Close"]', (buttons) => buttons.length);
        const isAnyCloseBtn = buttonCount > 0;
        if (isAnyCloseBtn) {
            yield main_1.page.locator('button[aria-label="Close"]').click();
            yield (0, helper_1.delay)(1000);
        }
        // get post url
        // check top article that cotnains menfess username
        yield (0, helper_1.delay)(5000);
        const articleElements = yield main_1.page.$$('article');
        for (const article of articleElements) {
            const textContent = yield article.evaluate(el => el.textContent);
            if (textContent === null || textContent === void 0 ? void 0 : textContent.includes(`@${process.env.USERNAME_TWT}`)) {
                yield (article === null || article === void 0 ? void 0 : article.click());
                yield (0, helper_1.delay)(1000);
                const postUrl = yield main_1.page.url();
                yield (0, helper_1.delay)(1000);
                yield main_1.page.goBack();
                return postUrl;
            }
        }
        return '';
    });
}
