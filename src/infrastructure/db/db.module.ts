import { Module } from '@nestjs/common';
import { ContextDbService, PrismaService } from '@db/services';

@Module({
  providers: [PrismaService, ContextDbService],
  exports: [ContextDbService],
})
export class DbModule {}
