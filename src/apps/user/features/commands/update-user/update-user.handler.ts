import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserValidationService } from '@user/services';
import { StringCacheService } from '@cache/services';
import { LoggerService } from '@logger/services';
import { UserCommandRepository } from '@user/repositories';
import { omitNullish } from '@common/utils';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserResponse, UpdateUserRequest } from '@user/dtos';
import { UpdateUserSelect } from '@user/types';
import { USER_DETAILS_CACHE_KEY_PREFIX } from '@user/constants';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/types';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  private readonly logger = new Logger(UpdateUserHandler.name);
  private readonly userDetailsCacheTtlSeconds: number;

  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly stringCacheService: StringCacheService,
    private readonly userValidationService: UserValidationService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.userDetailsCacheTtlSeconds = this.configService.getOrThrow<number>(
      'USER_DETAILS_CACHE_TTL_SECONDS',
    );
  }

  async execute(command: UpdateUserCommand): Promise<UpdateUserResponse> {
    const { userId, updateUserRequest } = command;

    const filteredUpdateRequest = omitNullish(updateUserRequest);

    if (filteredUpdateRequest === null)
      throw new BadRequestException('Input update request cannot be empty');

    await this.userValidationService.isAvailable(userId);

    const updatedUser = await this.updateUser(userId, filteredUpdateRequest);

    await this.refreshUserCache(userId, filteredUpdateRequest);

    return {
      id: updatedUser.id,
      status: updatedUser.status,
    };
  }

  private async updateUser(
    userId: string,
    updateUserRequest: Partial<UpdateUserRequest>,
  ): Promise<UpdateUserSelect> {
    return this.userCommandRepository.update<UpdateUserSelect>({
      where: { id: userId },
      data: updateUserRequest,
      select: {
        id: true,
        status: true,
      },
    });
  }

  private async refreshUserCache(
    userId: string,
    updateUserRequest: Partial<UpdateUserRequest>,
  ): Promise<void> {
    try {
      const cacheKey = `${USER_DETAILS_CACHE_KEY_PREFIX}:${userId}`;
      const userCache = await this.stringCacheService.get(cacheKey);

      if (!userCache) return;

      const parsedUserCache = JSON.parse(userCache) as Record<string, unknown>;
      const updatedUserCache = {
        ...parsedUserCache,
        ...updateUserRequest,
      };
      await this.stringCacheService.set(
        cacheKey,
        JSON.stringify(updatedUserCache),
        { EX: this.userDetailsCacheTtlSeconds },
      );
    } catch (error) {
      this.logger.error(
        LoggerService.createLogEntry(
          'Error refreshing user cache',
          { userId },
          error,
        ),
      );
    }
  }
}
