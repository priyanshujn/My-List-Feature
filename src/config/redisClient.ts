import Redis from "ioredis";

let redis: Redis | null = null;

export const getRedis = () => {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379
    });
  }
  return redis;
};

export const closeRedis = async () => {
  if (redis) {
    await redis.quit();
    redis = null;
  }
};
