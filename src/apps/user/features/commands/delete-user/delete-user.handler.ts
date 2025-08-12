import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoggerService } from '@logger/services';
import { StringCacheService } from '@cache/services';
import { UserCommandService, UserValidationService } from '@user/services';
import { DeleteUserCommand } from './delete-user.command';
import { DeleteUserResponse } from '@user/dtos';
import { USER_DETAILS_CACHE_KEY_PREFIX } from '@user/constants';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  private readonly logger = new Logger(DeleteUserHandler.name);

  constructor(
    private readonly userValidationService: UserValidationService,
    private readonly userCommandService: UserCommandService,
    private readonly stringCacheService: StringCacheService,
  ) {}

  async execute(command: DeleteUserCommand): Promise<DeleteUserResponse> {
    const { userId } = command;

    await this.userValidationService.isAvailable(userId);

    await Promise.all([
      this.userCommandService.softDelete(userId),
      this.invalidateUserCache(userId),
    ]);

    return { success: true };
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    try {
      const cacheKey = `${USER_DETAILS_CACHE_KEY_PREFIX}:${userId}`;
      await this.stringCacheService.delete(cacheKey);
    } catch (error) {
      this.logger.error(
        LoggerService.createLogEntry(
          'Error invalidating user cache',
          { userId },
          error,
        ),
      );
    }
  }
}
