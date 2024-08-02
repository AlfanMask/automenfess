import { ElementHandle, NodeFor, Page } from "puppeteer";
import { delay } from "./helper/helper";
import { page } from "./main";

async function login(email: string, username: string, password: string) {
    // fill email
    await page.locator('input.r-30o5oe').fill(email);
    await delay(1000);
  
    // click next
    let nextBtn: ElementHandle<NodeFor<any>> | null = await page.waitForSelector('::-p-xpath(//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/button[2])') || null;
    await nextBtn?.click()
    await delay(1000);
    
    // check if need to input username because unusual activity detected
    const spanElements = await page.$$('span');
    for (const span of spanElements) {
      const textContent = await span.evaluate(el => el.textContent);
      if (textContent?.includes('Enter your phone number or username')) {
        // fill username
        await page.locator('input.r-30o5oe').fill(username);
        await delay(1000);

        nextBtn = await page.waitForSelector('::-p-xpath(//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/button)');
        await nextBtn?.click()
        await delay(1000);
        break;
      }
    }
    
    await page.locator('input[type="password"]').fill(password)
    await delay(1000);

    nextBtn = await page.waitForSelector('::-p-xpath(//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div/button)');
    await nextBtn?.click()
    await delay(1000);
  
    // check if there is a closed button in popup -> close    
    const buttonCount = await page.$$eval('button[aria-label="Close"]', (buttons) => buttons.length);
    const isAnyCloseBtn = buttonCount > 0;
    if (isAnyCloseBtn) {
      await page.locator('button[aria-label="Close"]').click()
      await delay(1000);
    }
  
    // close bottom popup if any
    await delay(5000);
    const closeBtn = await page.waitForSelector('::-p-xpath(//*[@id="layers"]/div/div[1]/div/div/div/button)');
    await closeBtn?.click()

    console.log("LOGGED IN..")
  }
  
async function postTweet(message: string): Promise<string> {
    const inputBtn = await page.waitForSelector('::-p-xpath(//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div[2]/div[1]/div/div/div/div[2]/div[1])');
    await inputBtn?.click()
    
    await page.keyboard.type(message, { delay: 100 })
    await delay(1000);
  
    const postBtn = await page.waitForSelector('::-p-xpath(//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div[2]/div/div/div/button)');
    await postBtn?.click()
    await delay(1000);
  
    // if any popup with close button -> click close
    const buttonCount = await page.$$eval('button[aria-label="Close"]', (buttons) => buttons.length);
    const isAnyCloseBtn = buttonCount > 0;
    if (isAnyCloseBtn) {
      await page.locator('button[aria-label="Close"]').click()
      await delay(1000);
    }

    // get post url
    // check top article that cotnains menfess username
    await delay(5000);
    const articleElements = await page.$$('article');
    for (const article of articleElements) {
      const textContent = await article.evaluate(el => el.textContent);
      if (textContent?.includes(`@${process.env.USERNAME_TWT}`)) {
        await article?.click()
        await delay(1000);
        const postUrl = await page.url()
        await delay(1000);
        await page.goBack()
        return postUrl;
      }
    }
    return ''
}

export { login, postTweet }