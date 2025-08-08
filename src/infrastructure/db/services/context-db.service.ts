import { Injectable } from '@nestjs/common';
import { PrismaService } from '@db/services';

@Injectable()
export class ContextDbService {
  constructor(private readonly prismaService: PrismaService) {}

  get prisma(): PrismaService {
    return this.prismaService;
  }

  get user(): PrismaService['user'] {
    return this.prismaService.user;
  }
}
