import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const isTLS = REDIS_URL.startsWith("rediss://");

// Singleton pattern — reuse the same connection across hot-reloads in dev
const globalForRedis = globalThis as unknown as { redisClient: ReturnType<typeof createClient> };

const redisClient =
    globalForRedis.redisClient ??
    createClient(
        isTLS
            ? {
                  url: REDIS_URL,
                  socket: {
                      tls: true,
                      rejectUnauthorized: false,
                      reconnectStrategy: (retries: number) => Math.min(retries * 50, 2000),
                  },
              }
            : {
                  url: REDIS_URL,
                  socket: {
                      reconnectStrategy: (retries: number) => Math.min(retries * 50, 2000),
                  },
              }
    );

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

if (!globalForRedis.redisClient) {
    globalForRedis.redisClient = redisClient;
    redisClient.connect().catch(console.error);
}

export default redisClient;

