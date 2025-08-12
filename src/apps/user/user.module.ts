import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from '@db/db.module';
import { KafkaModule } from '@broker/kafka/kafka.module';
import { CacheModule } from '@cache/cache.module';
import { UserController } from '@user/controllers';
import { UserCommandRepository, UserQueryRepository } from '@user/repositories';
import {
  UserCacheService,
  UserCommandService,
  UserValidationService,
} from '@user/services';
import {
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
} from '@user/features/commands';
import { UserDetailsHandler } from '@user/features/queries';

@Module({
  imports: [CqrsModule, KafkaModule, DbModule, CacheModule],
  controllers: [UserController],
  providers: [
    UserQueryRepository,
    UserCommandRepository,
    UserCacheService,
    UserValidationService,
    UserCommandService,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    UserDetailsHandler,
  ],
})
export class UserModule {}
