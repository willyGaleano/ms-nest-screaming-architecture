export const mockE2EEnvironmentVariables = {
  // APP BASE
  APP_NAME: 'ms-nest-screaming-architecture',
  HTTP_PORT: 3001,
  NODE_ENV: 'test',
  ENVIRONMENT: 'test',

  // LOGGER
  LOG_LEVEL: 'error',
  LOGGER_MESSAGE_KEY: 'msg',
  LOGGER_TARGET: 'pino-pretty',
  LOGGER_ERROR_KEY: 'error',

  // SECURITY
  // throttle
  THROTTLE_TTL: 60000,
  THROTTLE_REQUESTS: 100,
  THROTTLE_BLOCK_DURATION: 30000,
  // cors
  CORS_ORIGIN: 'http://localhost:3001,http://127.0.0.1:3001',
  CORS_CREDENTIALS: true,
  CORS_METHODS: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  CORS_ALLOWED_HEADERS:
    'Content-Type,X-Requested-With,Cache-Control,Authorization,Accept,Origin,x-correlation-id,x-request-id,x-message-id',

  // CACHE
  REDIS_PORT: 6380,
  REDIS_PASSWORD: 'test123',
  REDIS_HOST: 'localhost',
  REDIS_USE_TLS: false,

  // Database
  POSTGRES_PORT: 5433,
  POSTGRES_USER: 'testuser',
  POSTGRES_PASSWORD: 'testpass',
  POSTGRES_DB: 'testdb',
  DATABASE_URL:
    'postgres://testuser:testpass@localhost:5433/testdb?schema=public',

  // HTTP CLIENT
  HTTP_CLIENT_TIMEOUT: 30000,
  HTTP_CLIENT_MAX_RATE: 1000,
  HTTP_CLIENT_MAX_REDIRECTS: 5,
  HTTP_CLIENT_MAX_RETRIES: 3,

  // KAFKA
  KAFKA_CLIENT_ID: 'ms-nest-screaming-architecture-test',
  KAFKA_BROKERS: 'localhost:9093',
  KAFKA_CONSUMER_GROUP_ID: 'ms-nest-screaming-consumer-test',
  KAFKA_CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk',
  KAFKA_CLIENT_PARTITIONER: 'default',
  KAFKA_CONSUMER_ALLOW_AUTO_TOPIC_CREATION: true,

  // HEALTH
  HEALTH_CHECK_MEMORY_HEAP_LIMIT: 150000000, // 150MB for testing
};
