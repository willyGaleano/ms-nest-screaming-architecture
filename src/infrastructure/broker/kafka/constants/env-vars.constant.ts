import { z } from 'zod/v4';
import { booleanFromString } from '@common/schemas';

export const KAFKA_ENV_VARS = z
  .object({
    /*
    ============================================
            KAFKA CLIENT CONFIGURATION
    ============================================
    */
    KAFKA_CLIENT_ID: z.string(),
    KAFKA_BROKERS: z.string(),
    KAFKA_CLUSTER_ID: z.string().optional(),
    // Client Partitioner Configuration
    KAFKA_CLIENT_PARTITIONER: z.enum(['default', 'legacy']).default('default'),
    // Connection & Authentication Timeouts
    KAFKA_CONNECTION_TIMEOUT: z.coerce.number().default(3000),
    KAFKA_AUTHENTICATION_TIMEOUT: z.coerce.number().default(1000),
    KAFKA_REQUEST_TIMEOUT: z.coerce.number().default(30000),
    // Retry Configuration for Client
    KAFKA_CLIENT_RETRY_INITIAL_TIME: z.coerce.number().default(300),
    KAFKA_CLIENT_RETRY_RETRIES: z.coerce.number().default(5),
    KAFKA_CLIENT_RETRY_MAX_TIME: z.coerce.number().default(30000),
    KAFKA_CLIENT_RETRY_FACTOR: z.coerce.number().default(2),
    /*
    ============================================
            KAFKA CONSUMER CONFIGURATION
    ============================================
    */
    KAFKA_CONSUMER_GROUP_ID: z.string(),
    // Consumer Timing Configuration
    KAFKA_CONSUMER_MAX_WAIT_TIME: z.coerce.number().default(5000),
    KAFKA_CONSUMER_SESSION_TIMEOUT: z.coerce.number().default(30000),
    KAFKA_CONSUMER_REBALANCE_TIMEOUT: z.coerce.number().default(60000),
    KAFKA_CONSUMER_HEARTBEAT_INTERVAL: z.coerce.number().default(3000),
    // Consumer Data Limits
    KAFKA_CONSUMER_MIN_BYTES: z.coerce.number().default(1),
    KAFKA_CONSUMER_MAX_BYTES: z.coerce.number().default(10485760), // 10MB
    KAFKA_CONSUMER_MAX_BYTES_PER_PARTITION: z.coerce.number().default(1048576), // 1MB
    // Consumer Topic Configuration
    KAFKA_CONSUMER_ALLOW_AUTO_TOPIC_CREATION: booleanFromString('false'),
    // Consumer Retry Configuration
    KAFKA_CONSUMER_RETRY_INITIAL_TIME: z.coerce.number().default(100),
    KAFKA_CONSUMER_RETRY_RETRIES: z.coerce.number().default(3),
    KAFKA_CONSUMER_RETRY_MAX_TIME: z.coerce.number().default(30000),
    KAFKA_CONSUMER_RETRY_FACTOR: z.coerce.number().default(2),
    KAFKA_CONSUMER_RETRY_MULTIPLIER: z.coerce.number().default(1),
    /*
    ============================================
            KAFKA RUN CONFIGURATION
    ============================================
    */
    KAFKA_RUN_AUTO_COMMIT: z.boolean().default(true),
    KAFKA_CONSUMER_AUTO_COMMIT_INTERVAL: z.coerce.number().default(5000),
    KAFKA_CONSUMER_AUTO_COMMIT_THRESHOLD: z.coerce.number().default(100),
    KAFKA_CONSUMER_EACH_BATCH_AUTO_RESOLVE: booleanFromString('true'),
    KAFKA_CONSUMER_PARTITIONS_CONSUMED_CONCURRENTLY: z.coerce
      .number()
      .default(1),
    /*
    ============================================
            KAFKA SUBSCRIPTION CONFIGURATION
    ============================================
    */
    KAFKA_CONSUMER_FROM_BEGINNING: booleanFromString('false'),
    /*
    ============================================
            KAFKA PRODUCER CONFIGURATION
    ============================================
    */
    KAFKA_PRODUCER_IDEMPOTENT: booleanFromString('true'),
    KAFKA_PRODUCER_ALLOW_AUTO_TOPIC_CREATION: booleanFromString('false'),
    // Producer Performance Configuration
    KAFKA_PRODUCER_METADATA_MAX_AGE: z.coerce.number().default(300000),
    KAFKA_PRODUCER_TRANSACTION_TIMEOUT: z.coerce.number().default(60000),
    // Producer Retry Configuration
    KAFKA_PRODUCER_RETRY_INITIAL_TIME: z.coerce.number().default(100),
    KAFKA_PRODUCER_RETRY_RETRIES: z.coerce
      .number()
      .default(Number.MAX_SAFE_INTEGER),
    KAFKA_PRODUCER_RETRY_MAX_TIME: z.coerce.number().default(30000),
    KAFKA_PRODUCER_RETRY_FACTOR: z.coerce.number().default(2),
    KAFKA_PRODUCER_RETRY_MULTIPLIER: z.coerce.number().default(1),
    /*
    ============================================
            KAFKA SEND CONFIGURATION
    ============================================
    */
    KAFKA_SEND_TIMEOUT: z.coerce.number().default(30000),
    KAFKA_SEND_ACKS: z
      .enum(['0', '1', '-1', 'all'])
      .default('-1')
      .transform((value) => {
        if (value === 'all' || value === '-1') return -1;
        return Number(value);
      }),
  })
  .describe('Kafka Environment Variables');
