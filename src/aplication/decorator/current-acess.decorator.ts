import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentAccess = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext();
    if (!request.access) {
      throw new HttpException('Access not found', HttpStatus.UNAUTHORIZED);
    }
    return request.access;
  },
);
