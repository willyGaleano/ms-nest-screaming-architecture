export const mockE2EEnvironmentVariables = {
  // APP
  APP_NAME: 'ms-nest-screaming-architecture',
  HTTP_PORT: 3001,
  NODE_ENV: 'test',
  ENVIRONMENT: 'test',

  // LOGGER
  LOG_LEVEL: 'error',
  LOGGER_MESSAGE_KEY: 'msg',
  LOGGER_TARGET: 'pino-pretty',
  LOGGER_ERROR_KEY: 'error',

  // HEALTH
  HEALTH_CHECK_MEMORY_HEAP_LIMIT: 150000000, // 150MB

  // SECURITY
  THROTTLE_TTL: 60000,
  THROTTLE_REQUESTS: 100,
  THROTTLE_BLOCK_DURATION: 30000,
  CORS_ORIGIN: 'http://localhost:3001',
  CORS_CREDENTIALS: true,
  CORS_METHODS: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  CORS_ALLOWED_HEADERS:
    'Content-Type,X-Requested-With,Cache-Control,Authorization,Accept,Origin,x-correlation-id,x-request-id,x-message-id',

  // CACHE
  REDIS_PORT: 6380,
  REDIS_PASSWORD: 'test123',
  REDIS_HOST: 'localhost',
  REDIS_USE_TLS: false,

  // HTTP CLIENT
  HTTP_CLIENT_TIMEOUT: 30000,
  HTTP_CLIENT_MAX_RATE: 1000,
  HTTP_CLIENT_MAX_REDIRECTS: 5,
  HTTP_CLIENT_MAX_RETRIES: 3,
};
