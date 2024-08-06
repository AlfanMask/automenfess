import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Tweet from "./constants/tweet";
import tweeting from "./modules/tweeting/main"
import { postTweet } from "./modules/tweeting/tweeting";
import { isProcessing, processQueue, queueTweets } from "./queue";

// initialize express app and middlewares
const app = express()
app.use(bodyParser.json())
app.use(cors())

// start AutoMenfess instance
tweeting();

// routes
app.post('/tweet', async (req: Request, res: Response) => {
    const tweet: Tweet = req.body as Tweet;
    queueTweets.push({ tweet, res })
    console.log(tweet.message);

    // process tweet post using queue
    if (!isProcessing) {
        processQueue()
    }
});

// start server
app.listen(3000, () => {
    console.log("Server is running");
})