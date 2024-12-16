import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { enviroment } from 'src/aplication/config/enviroment';
import { IS_PUBLIC_KEY } from 'src/aplication/decorator/is-public.decorator';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = GqlExecutionContext.create(context).getContext();
    Logger.debug('Headers:', request?.headers); // Adicione este log para debugar
    const token = this.extractTokenFromHeader(request?.headers);

    if (!token) {
      Logger.warn('Token not found in headers');
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: enviroment.JWT_SECRET,
      });

      const access = await this.authService.findById(payload.sub);

      if (access.expires_at < new Date()) {
        await this.authService.disconnect(access.uuid);
        throw new HttpException('Access expired', HttpStatus.UNAUTHORIZED);
      }

      request['access'] = access; // Certifique-se de que `access` está sendo configurado
      return true;
    } catch (error) {
      Logger.error('FAILED TO VERIFY TOKEN', error.message);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}
