import { Inject, Injectable } from '@nestjs/common';
import { Message, RecordMetadata } from 'kafkajs';
import type { Producer } from 'kafkajs';
import { KAFKA_PRODUCER } from '@broker/kafka/constants';

@Injectable()
export class KafkaProducerService {
  constructor(
    @Inject(KAFKA_PRODUCER)
    private kafkaProducer: Producer,
  ) {}

  async send(topic: string, messages: Message[]): Promise<RecordMetadata[]> {
    return this.kafkaProducer.send({
      topic,
      messages,
    });
  }

  async sendBatch(
    batch: { topic: string; messages: Message[] }[],
  ): Promise<RecordMetadata[]> {
    return this.kafkaProducer.sendBatch({
      topicMessages: batch,
    });
  }
}
