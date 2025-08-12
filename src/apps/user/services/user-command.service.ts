import { Injectable } from '@nestjs/common';
import { UserStatus } from '@root/generated/prisma';
import { UserCommandRepository } from '@user/repositories';

@Injectable()
export class UserCommandService {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  async softDelete(userId: string): Promise<void> {
    return this.userCommandRepository.update({
      where: { id: userId },
      data: { status: UserStatus.INACTIVE },
      select: { id: true },
    });
  }
}
