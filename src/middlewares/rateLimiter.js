import ratelimit from "../config/upstash.js";

export default async function rateLimiter(req, res, next) {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            res.status(429).json({ message: "Too many requests, try again later" });
        }

        next();
    }
    catch (error) {
        console.log("Rate limiter error: ", error);
        next(error);
    }
}