import Redis from "ioredis";

import { ENV_VARS } from "../config/envVars";

export const redis = new Redis(ENV_VARS.REDDIS_URL);
// await redis.set("foo", "bar");
