require("dotenv").config();
const redis = require("redis");

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-13748.c323.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 13748,
  },
});

module.exports = redisClient;
