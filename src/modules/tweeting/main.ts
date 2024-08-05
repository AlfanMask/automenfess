import puppeteer, { Browser, Page } from 'puppeteer';
import { login, postTweet } from "./tweeting";
import { delay } from './helper/helper.js';
require('dotenv').config()

// instances
let page: Page;

export default async function startTweeter() {
  // Launch the browser and open a new blank page
  const browser: Browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();

  // generate random user agents so not detected as the same user
  const userAgent = require('user-agents');
  console.log("main-1")
  console.log(userAgent.random().toString());
  await page.setUserAgent(userAgent.random().toString());
  console.log("main-2")


  // Navigate to twitter login page
  await page.goto('https://twitter.com/login/');
  await delay(1000);
  
  // Login
  const email: string = process.env.EMAIL_TWT || '';
  const username: string = process.env.USERNAME_TWT || '';
  const password: string = process.env.PASSWORD_TWT || '';
  await login(email, username, password)
}

export { page };