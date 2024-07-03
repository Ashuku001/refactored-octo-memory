require("dotenv").config();
const { RedisPubSub } = require("graphql-redis-subscriptions");
const {Redis} = require("ioredis")

const redisConnectionListener = (err) => {
  if (err) console.error(err); // eslint-disable-line no-console
  console.info("Succefuly connected to redis"); // eslint-disable-line no-console
};

const redisOptions = {
  host: process.env.REDIS_DOMAIN_NAME,
  port: process.env.REDIS_PORT_NUMBER,
  retryStrategy: times => {
    return Math.min(times * 50, 2000);
  }
};

const pubsub = new RedisPubSub({
  publisher: new Redis(redisOptions),
  subscriber: new Redis(redisOptions),
  connectionListener: redisConnectionListener,
});

if (exports) {
  exports.pubsub = pubsub;
}
