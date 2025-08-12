import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserQueryRepository } from '../repositories';
import {
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
  USER_UNAVAILABLE_ERROR,
} from '../errors';
import { UserStatus } from '@root/generated/prisma';

@Injectable()
export class UserValidationService {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async isAvailable(userId: string): Promise<void> {
    const user = await this.userQueryRepository.findUnique<{
      status: UserStatus;
    }>({
      where: { id: userId },
      select: { status: true },
    });

    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR());

    if (
      user.status === UserStatus.INACTIVE ||
      user.status === UserStatus.SUSPENDED
    )
      throw new ForbiddenException(USER_UNAVAILABLE_ERROR());
  }

  async existsByEmail(email: string): Promise<void> {
    const user = await this.userQueryRepository.findUnique<{
      id: string;
    }>({
      where: { email: email },
      select: { id: true },
    });

    if (user) throw new NotFoundException(USER_ALREADY_EXISTS_ERROR());
  }
}
