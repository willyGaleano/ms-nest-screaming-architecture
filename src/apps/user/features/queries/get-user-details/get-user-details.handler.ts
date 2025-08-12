import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserStatus } from '@root/generated/prisma';
import { LoggerService } from '@logger/services';
import { UserCacheService } from '@user/services';
import { GetUserDetailsResponse } from '@user/dtos';
import { UserDetailsQuery } from './get-user-details.query';
import { USER_NOT_FOUND_ERROR, USER_UNAVAILABLE_ERROR } from '@user/errors';

@QueryHandler(UserDetailsQuery)
export class UserDetailsHandler implements IQueryHandler<UserDetailsQuery> {
  private readonly logger = new Logger(UserDetailsHandler.name);

  constructor(private readonly userCacheService: UserCacheService) {}

  async execute(query: UserDetailsQuery): Promise<GetUserDetailsResponse> {
    const { userId } = query;
    const user = await this.userCacheService.getUserById(userId);

    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR());

    if (this.isInvalidUserStatus(user.status))
      throw new ForbiddenException(USER_UNAVAILABLE_ERROR());

    this.logger.debug(
      LoggerService.createLogEntry('User details retrieved successfully', {
        userId: user.id,
        userName: user.name,
      }),
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private isInvalidUserStatus(status: UserStatus): boolean {
    return status === UserStatus.INACTIVE || status === UserStatus.SUSPENDED;
  }
}
