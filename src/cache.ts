import { createClient } from "redis";
import * as dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    }
});

redisClient.connect().then(() => {
    logger.info("Connected to Redis");
}).catch((err: any) => {
    logger.error("Unable to connect to Redis: " + err);
    process.exit(1);
});

export default redisClient;