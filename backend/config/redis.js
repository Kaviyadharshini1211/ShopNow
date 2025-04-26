import { createClient } from "redis";

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

let redisClient = null;

if (host && port) {
  redisClient = createClient({
    socket: {
      host,
      port: Number(port),
    },
  });

  redisClient.on("error", (err) => console.error("Redis Error:", err));
  redisClient.on("connect", () => console.log(`✅ Redis connected to ${host}:${port}`));

  // Connect when module is loaded
  (async () => {
    try {
      await redisClient.connect();
    } catch (err) {
      console.error("🚨 Failed to connect to Redis:", err);
    }
  })();
} else {
  console.log("⚠️  REDIS_HOST or REDIS_PORT not set—skipping Redis connection");
}

export default redisClient;
