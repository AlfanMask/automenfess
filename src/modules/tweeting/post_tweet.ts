import { delay } from "./helper/helper";
import { page } from "./main";

export default async function postTweet(message: string): Promise<string> {
    console.log('postTweet-1')
    
    // put the comment using puppeteer
    // type R on keyboard to reply on the post
    await page.keyboard.type('N')
    await delay(2000)
    console.log('postTweet-2: is typing...')
    
    await page.keyboard.type(message, { delay: 100 })
    await delay(1000);
    console.log('postTweet-3')

    // type ctrl + enter to post
    page.keyboard.down('ControlLeft');
    page.keyboard.press('Enter');
    await delay(2000)
    await page.keyboard.up('ControlLeft');
    console.log('postTweet-4: POSTED!')
  
    // if any popup with close button -> click close
    const buttonCount = await page.$$eval('button[aria-label="Close"]', (buttons) => buttons.length);
    console.log('postTweet-5')
    const isAnyCloseBtn = buttonCount > 0;
    if (isAnyCloseBtn) {
      await page.locator('button[aria-label="Close"]').click()
      await delay(1000);
      console.log('postTweet-6')
    }

    // get post url
    // check top article that cotnains menfess username
    await delay(5000);
    const articleElements = await page.$$('article');
    console.log('postTweet-7')
    for (const article of articleElements) {
      const textContent = await article.evaluate(el => el.textContent);
      console.log('postTweet-8')
      if (textContent?.includes(`@${process.env.USERNAME_TWT}`)) {
        await article?.click()
        await delay(1000);
        const postUrl = await page.url()
        await delay(1000);
        await page.goBack()
        console.log('postTweet-9')
        console.log('postTweet-10-returned url: DONE!')
        return postUrl;
      }
    }
    console.log('postTweet-10-error-returned-url: DONE!')
    return ''
}