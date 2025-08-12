import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserApiDoc,
  GetUserDetailsApiDoc,
  UpdateUserApiDoc,
  DeleteUserApiDoc,
} from '@user/decorators';
import {
  CreateUserCommand,
  UpdateUserCommand,
  DeleteUserCommand,
} from '@user/features/commands';
import { UserDetailsQuery } from '@user/features/queries';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserDetailsParams,
  GetUserDetailsResponse,
  UpdateUserParams,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserParams,
  DeleteUserResponse,
} from '@user/dtos';

@ApiTags('Users')
@Controller({
  version: '1',
  path: 'users',
})
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CreateUserApiDoc()
  async create(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return this.commandBus.execute<CreateUserCommand, CreateUserResponse>(
      new CreateUserCommand(createUserRequest),
    );
  }

  @Get(':userId')
  @GetUserDetailsApiDoc()
  async getDetails(
    @Param() params: GetUserDetailsParams,
  ): Promise<GetUserDetailsResponse> {
    return this.queryBus.execute<UserDetailsQuery, GetUserDetailsResponse>(
      new UserDetailsQuery(params.userId),
    );
  }

  @Put(':userId')
  @UpdateUserApiDoc()
  async update(
    @Param() params: UpdateUserParams,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    return this.commandBus.execute<UpdateUserCommand, UpdateUserResponse>(
      new UpdateUserCommand(params.userId, updateUserRequest),
    );
  }

  @Delete(':userId')
  @DeleteUserApiDoc()
  async delete(@Param() params: DeleteUserParams): Promise<DeleteUserResponse> {
    return this.commandBus.execute<DeleteUserCommand, DeleteUserResponse>(
      new DeleteUserCommand(params.userId),
    );
  }
}
