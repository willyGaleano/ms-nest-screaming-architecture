import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KafkaProducerService } from '@broker/kafka/services';
import { LoggerService } from '@logger/services';
import { UserCommandRepository } from '@user/repositories';
import { UserValidationService } from '@user/services';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponse, CreateUserRequest } from '@user/dtos';
import { CreateUserSelect } from '@user/types';
import { NOTIFICATION_TOPICS } from '@notification/constants';
import { EmailNotificationPayload } from '@notification/dtos';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name);

  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly userValidationService: UserValidationService,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
    const { createUserRequest } = command;

    await this.userValidationService.existsByEmail(createUserRequest.email);

    const user = await this.persistNewUser(createUserRequest);

    await this.sendUserCreationNotification(createUserRequest);

    return {
      id: user.id,
      status: user.status,
    };
  }

  private async persistNewUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserSelect> {
    return this.userCommandRepository.create<CreateUserSelect>({
      data: {
        ...createUserRequest,
      },
      select: {
        id: true,
        status: true,
      },
    });
  }

  private async sendUserCreationNotification(
    createUserRequest: CreateUserRequest,
  ): Promise<void> {
    try {
      const { name, email } = createUserRequest;

      const emailNotificationPayload: EmailNotificationPayload = {
        to: [{ email }],
        subject: 'Welcome! Your account has been created',
        text: `Hello ${name}, your account has been successfully created. Welcome to our platform!`,
        html: `
          <h2>Welcome ${name}!</h2>
          <p>Your account has been successfully created.</p>
          <p>Welcome to our platform!</p>
        `,
        category: 'User Registration',
      };

      await this.kafkaProducerService.send(
        NOTIFICATION_TOPICS.EMAIL_NOTIFICATION,
        [
          {
            value: JSON.stringify(emailNotificationPayload),
          },
        ],
      );
    } catch (error) {
      this.logger.error(
        LoggerService.createLogEntry(
          'Error sending user creation notification',
          undefined,
          error,
        ),
      );
    }
  }
}
