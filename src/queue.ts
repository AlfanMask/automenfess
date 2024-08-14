import queueRes from "./constants/queue";
import { delay } from "./modules/tweeting/helper/helper";
import postTweet from "./modules/tweeting/post_tweet";

let queueTweets: Array<queueRes> = []
let isProcessing: boolean = false;

const processQueue = async () => {
    try {
        isProcessing = true;
        const firstQueue: queueRes = queueTweets.shift() as queueRes;
        const twtPostUrl: string = await postTweet(firstQueue.tweet.message)
        firstQueue.res.json({
            twtPostUrl,
            status: 200,
        })

        // delay for 5s
        await delay(5000);
    }
    catch (error) {
        console.error('Error in tweet queue:', error);
    }
    finally {
        // Process the next item in the queue
        if (queueTweets.length > 0) {
            processQueue()
        } else {
            isProcessing = false;
        }
    }
}

export { queueTweets, isProcessing, processQueue }