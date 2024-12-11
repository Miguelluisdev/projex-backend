import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAccess = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.auth;
  },
);
