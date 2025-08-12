import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserDetailsResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserResponse,
} from '@user/dtos';

export function CreateUserApiDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user',
      description:
        'Creates a new user in the system with the provided information. Returns the user ID and status upon successful creation.',
    }),
    ApiBody({
      type: CreateUserRequest,
      description: 'User data required for creation',
      examples: {
        example1: {
          summary: 'Complete user data',
          description: 'Example with all required fields',
          value: {
            name: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            gender: 'MALE',
          },
        },
        example2: {
          summary: 'Minimal user data',
          description:
            'Example with only required fields (lastName is optional)',
          value: {
            name: 'Jane',
            email: 'jane@example.com',
            gender: 'FEMALE',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'User created successfully',
      type: CreateUserResponse,
      example: {
        id: 'cl9ebqhxs00003b68wpfli1y',
        status: 'ACTIVE',
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid input data',
      example: {
        statusCode: 400,
        message: [
          'name must be longer than or equal to 2 characters',
          'email must be an email',
          'gender must be one of the following values: MALE, FEMALE, OTHER',
        ],
        error: 'Bad Request',
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    }),
  );
}

export function GetUserDetailsApiDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user details by ID',
      description:
        'Retrieves detailed information about a specific user by their unique identifier.',
    }),
    ApiParam({
      name: 'userId',
      description: 'The unique identifier of the user (CUID format)',
      type: 'string',
      example: 'cl9ebqhxs00003b68wpfli1y',
    }),
    ApiOkResponse({
      description: 'User details retrieved successfully',
      type: GetUserDetailsResponse,
      example: {
        id: 'cl9ebqhxs00003b68wpfli1y',
        name: 'John',
        email: 'john.doe@example.com',
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid user ID format',
      example: {
        statusCode: 400,
        message: ['Invalid user ID format'],
        error: 'Bad Request',
      },
    }),
    ApiNotFoundResponse({
      description: 'User not found',
      example: {
        statusCode: 404,
        message: 'User with ID cl9ebqhxs00003b68wpfli1y not found',
        error: 'Not Found',
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    }),
  );
}

export function UpdateUserApiDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user information',
      description:
        'Updates user information by their unique identifier. Only provided fields will be updated.',
    }),
    ApiParam({
      name: 'userId',
      description: 'The unique identifier of the user (CUID format)',
      type: 'string',
      example: 'cl9ebqhxs00003b68wpfli1y',
    }),
    ApiBody({
      type: UpdateUserRequest,
      description: 'User data to update (all fields are optional)',
      examples: {
        example1: {
          summary: 'Update name and email',
          description: 'Example updating only name and email',
          value: {
            name: 'John Updated',
            email: 'john.updated@example.com',
          },
        },
        example2: {
          summary: 'Update all fields',
          description: 'Example updating all available fields',
          value: {
            name: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            gender: 'FEMALE',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'User updated successfully',
      type: UpdateUserResponse,
      example: {
        id: 'cl9ebqhxs00003b68wpfli1y',
        status: 'ACTIVE',
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid input data',
      example: {
        statusCode: 400,
        message: [
          'name must be longer than or equal to 2 characters',
          'email must be an email',
          'gender must be one of the following values: MALE, FEMALE, OTHER',
        ],
        error: 'Bad Request',
      },
    }),
    ApiNotFoundResponse({
      description: 'User not found',
      example: {
        statusCode: 404,
        message: 'User with ID cl9ebqhxs00003b68wpfli1y not found',
        error: 'Not Found',
      },
    }),
    ApiForbiddenResponse({
      description: 'User is unavailable for updates',
      example: {
        statusCode: 403,
        message: 'User is currently unavailable',
        error: 'Forbidden',
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    }),
  );
}

export function DeleteUserApiDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user (soft delete)',
      description:
        'Performs a soft delete of a user by setting their status to INACTIVE. The user data is preserved but the user becomes unavailable.',
    }),
    ApiParam({
      name: 'userId',
      description: 'The unique identifier of the user (CUID format)',
      type: 'string',
      example: 'cl9ebqhxs00003b68wpfli1y',
    }),
    ApiOkResponse({
      description: 'User deleted successfully',
      type: DeleteUserResponse,
      example: {
        id: 'cl9ebqhxs00003b68wpfli1y',
        status: 'INACTIVE',
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid user ID format',
      example: {
        statusCode: 400,
        message: ['Invalid user ID format'],
        error: 'Bad Request',
      },
    }),
    ApiNotFoundResponse({
      description: 'User not found',
      example: {
        statusCode: 404,
        message: 'User with ID cl9ebqhxs00003b68wpfli1y not found',
        error: 'Not Found',
      },
    }),
    ApiForbiddenResponse({
      description: 'User is already deleted',
      example: {
        statusCode: 403,
        message: 'User is currently unavailable',
        error: 'Forbidden',
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    }),
  );
}
