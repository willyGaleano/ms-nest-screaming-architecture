import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { EnvironmentVariables } from '@config/types';

export class KafkaConfigService {
  static getOptions(
    configService: ConfigService<EnvironmentVariables>,
  ): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.getOrThrow<string>('KAFKA_CLIENT_ID'),
          brokers: configService.getOrThrow<string>('KAFKA_BROKERS').split(','),
          connectionTimeout: configService.get<number>(
            'KAFKA_CONNECTION_TIMEOUT',
          ),
          authenticationTimeout: configService.get<number>(
            'KAFKA_AUTHENTICATION_TIMEOUT',
          ),
          requestTimeout: configService.get<number>('KAFKA_REQUEST_TIMEOUT'),

          retry: {
            initialRetryTime: configService.get<number>(
              'KAFKA_CLIENT_RETRY_INITIAL_TIME',
            ),
            retries: configService.get<number>('KAFKA_CLIENT_RETRY_RETRIES'),
            maxRetryTime: configService.get<number>(
              'KAFKA_CLIENT_RETRY_MAX_TIME',
            ),
            factor: configService.get<number>('KAFKA_CLIENT_RETRY_FACTOR'),
          },
        },
        consumer: {
          groupId: configService.getOrThrow<string>('KAFKA_CONSUMER_GROUP_ID'),
          allowAutoTopicCreation: configService.get<boolean>(
            'KAFKA_CONSUMER_ALLOW_AUTO_TOPIC_CREATION',
          ),
          maxWaitTimeInMs: configService.get<number>(
            'KAFKA_CONSUMER_MAX_WAIT_TIME',
          ),
          sessionTimeout: configService.get<number>(
            'KAFKA_CONSUMER_SESSION_TIMEOUT',
          ),
          rebalanceTimeout: configService.get<number>(
            'KAFKA_CONSUMER_REBALANCE_TIMEOUT',
          ),
          heartbeatInterval: configService.get<number>(
            'KAFKA_CONSUMER_HEARTBEAT_INTERVAL',
          ),
          minBytes: configService.get<number>('KAFKA_CONSUMER_MIN_BYTES'),
          maxBytes: configService.get<number>('KAFKA_CONSUMER_MAX_BYTES'),
          maxBytesPerPartition: configService.get<number>(
            'KAFKA_CONSUMER_MAX_BYTES_PER_PARTITION',
          ),
          retry: {
            initialRetryTime: configService.get<number>(
              'KAFKA_CONSUMER_RETRY_INITIAL_TIME',
            ),
            retries: configService.get<number>('KAFKA_CONSUMER_RETRY_RETRIES'),
            maxRetryTime: configService.get<number>(
              'KAFKA_CONSUMER_RETRY_MAX_TIME',
            ),
            factor: configService.get<number>('KAFKA_CONSUMER_RETRY_FACTOR'),
            multiplier: configService.get<number>(
              'KAFKA_CONSUMER_RETRY_MULTIPLIER',
            ),
          },
        },
        run: {
          autoCommit: configService.get<boolean>('KAFKA_RUN_AUTO_COMMIT'),
          autoCommitInterval: configService.get<number>(
            'KAFKA_CONSUMER_AUTO_COMMIT_INTERVAL',
          ),
          autoCommitThreshold: configService.get<number>(
            'KAFKA_CONSUMER_AUTO_COMMIT_THRESHOLD',
          ),
          eachBatchAutoResolve: configService.get<boolean>(
            'KAFKA_CONSUMER_EACH_BATCH_AUTO_RESOLVE',
          ),
          partitionsConsumedConcurrently: configService.get<number>(
            'KAFKA_CONSUMER_PARTITIONS_CONSUMED_CONCURRENTLY',
          ),
        },
        subscribe: {
          fromBeginning:
            configService.get<boolean>('KAFKA_CONSUMER_FROM_BEGINNING') ??
            false,
        },
        producer: {
          idempotent: configService.get<boolean>('KAFKA_PRODUCER_IDEMPOTENT'),
          allowAutoTopicCreation: configService.get<boolean>(
            'KAFKA_PRODUCER_ALLOW_AUTO_TOPIC_CREATION',
          ),
          metadataMaxAge: configService.get<number>(
            'KAFKA_PRODUCER_METADATA_MAX_AGE',
          ),
          transactionTimeout: configService.get<number>(
            'KAFKA_PRODUCER_TRANSACTION_TIMEOUT',
          ),
          createPartitioner: (() => {
            const partitionerType = configService.get<string>(
              'KAFKA_CLIENT_PARTITIONER',
            );
            return partitionerType === 'legacy'
              ? Partitioners.LegacyPartitioner
              : Partitioners.DefaultPartitioner;
          })(),
          retry: {
            initialRetryTime: configService.get<number>(
              'KAFKA_PRODUCER_RETRY_INITIAL_TIME',
            ),
            retries: configService.get<number>('KAFKA_PRODUCER_RETRY_RETRIES'),
            maxRetryTime: configService.get<number>(
              'KAFKA_PRODUCER_RETRY_MAX_TIME',
            ),
            factor: configService.get<number>('KAFKA_PRODUCER_RETRY_FACTOR'),
            multiplier: configService.get<number>(
              'KAFKA_PRODUCER_RETRY_MULTIPLIER',
            ),
          },
        },
        send: {
          timeout: configService.get<number>('KAFKA_SEND_TIMEOUT'),
          acks: configService.get<number>('KAFKA_SEND_ACKS'),
        },
      },
    };
  }
}
