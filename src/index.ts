import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Tweet from "./constants/tweet";
import tweeting from "./modules/tweeting/main"
import { postTweet } from "./modules/tweeting/tweeting";

// initialize express app and middlewares
const app = express()
app.use(bodyParser.json())
app.use(cors())

// start AutoMenfess instance
tweeting();

// routes
app.post('/tweet', async (req: Request, res: Response) => {
    const tweet: Tweet = req.body as Tweet;
    console.log(tweet.message);

    // tweet
    try {
        const twtPostUrl: string = await postTweet(tweet.message)
        res.json({
            twtPostUrl,
            status: 200,
        })
    } catch (error) {
        res.sendStatus(500);
    }
});

// start server
app.listen(3000, () => {
    console.log("Server is running");
})