// config/redis.js
import { createClient } from "redis";

const host = process.env.REDIS_HOST || "127.0.0.1"; // 👈 default localhost
const port = process.env.REDIS_PORT || 6379;        // 👈 default port

const redisClient = createClient({
  socket: {
    host,
    port: Number(port),
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
redisClient.on("connect", () => console.log(`✅ Redis connected to ${host}:${port}`));

(async () => {
  try {
    await redisClient.connect();
    console.log("🚀 Redis connection successful!");
  } catch (err) {
    console.error("🚨 Failed to connect to Redis:", err);
  }
})();

export default redisClient;
