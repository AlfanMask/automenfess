import { Response } from "express";
import Tweet from "./tweet";

export default interface queueRes {
    tweet: Tweet;
    res: Response;
}