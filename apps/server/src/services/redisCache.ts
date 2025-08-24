import redisClient from "../lib/redis";
import { CACHE_TTL_MS } from "./consts";

export const redisCache = {
  get: async (key: string) => {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Redis GET error:", err);
      return null;
    }
  },
  set: async (key: string, value: any) => {
    try {
      await redisClient.setEx(
        key,
        Math.ceil(CACHE_TTL_MS / 1000),
        JSON.stringify(value)
      );
    } catch (err) {
      console.error("Redis SET error:", err);
    }
  },
};
