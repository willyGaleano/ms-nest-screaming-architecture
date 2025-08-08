import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import {
  KafkaConfigService,
  KafkaProducerService,
} from '@broker/kafka/services';
import { KAFKA_CLIENT, KAFKA_PRODUCER } from '@broker/kafka/constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          KafkaConfigService.getOptions(configService),
      },
    ]),
  ],
  providers: [
    {
      provide: KAFKA_PRODUCER,
      useFactory: async (kafkaClient: ClientKafka) => {
        return kafkaClient.connect();
      },
      inject: [KAFKA_CLIENT],
    },
    KafkaProducerService,
  ],
  exports: [KafkaProducerService, KAFKA_PRODUCER],
})
export class KafkaModule {}
