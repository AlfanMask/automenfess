import puppeteer, { Browser, Page } from 'puppeteer';
import { login, postTweet } from "./tweeting";
import { delay } from './helper/helper.js';
require('dotenv').config()

// instances
let page: Page;

export default async function startTweeter() {
  // Launch the browser and open a new blank page
  const browser: Browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  
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