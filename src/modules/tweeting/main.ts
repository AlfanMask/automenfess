import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { delay } from './helper/helper.js';
import login from './login.js';
require('dotenv').config()

// middlewares
puppeteer.use(StealthPlugin())

// instances
let browser: Browser;
let page: Page;

export default async function startTweeter() {
  // Launch the browser and open a new blank page
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();

  // generate random user agents so not detected as the same user
  const userAgent = require('user-agents');
  console.log("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36");
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36");
  
  // Login
  await login()
}

export { page, browser };