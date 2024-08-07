import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { login } from "./tweeting";
import { delay } from './helper/helper.js';
require('dotenv').config()

// middlewares
puppeteer.use(StealthPlugin())

// instances
let page: Page;

export default async function startTweeter() {
  // Launch the browser and open a new blank page
  const browser: Browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();

  // generate random user agents so not detected as the same user
  const userAgent = require('user-agents');
  console.log("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36");
  await page.setUserAgent(userAgent.random().toString());


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