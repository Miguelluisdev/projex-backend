import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { addDays } from 'date-fns';
import { ServiceBase } from 'src/aplication/bases/services/service.base';
import { AuthInput } from 'src/domain/dtos/auth/auth.dto';
import { UpdateAuthInput } from 'src/domain/dtos/auth/update-auth.input';
import { AuthEntity } from 'src/domain/entities/auth/auth.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService
  implements ServiceBase<AuthEntity, AuthInput, UpdateAuthInput>
{
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
  ) {}

  async create(authInput: AuthInput): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(authInput.email);

    const passwordIsEqual = await compare(authInput.password, user?.password);

    if (!passwordIsEqual)
      throw new HttpException('nao autorizado', HttpStatus.UNAUTHORIZED);

    const auth = await this.justCreated(user.uuid);

    return auth;
  }

  async justCreated(user_id: string): Promise<AuthEntity> {
    const auth = await this.authRepository.create({
      expires_at: addDays(new Date(), 15),
      user_id,
    });

    const payload = { sub: auth.uuid };

    const token = this.jwtService.sign(payload);

    return {
      ...auth,
      token,
    };
  }

  async findById(uuid: string): Promise<AuthEntity> {
    const auth = await this.authRepository.findByid(uuid);

    if (!auth) {
      throw new HttpException(
        'Atenticação não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return auth;
  }

  disconnect(uuid: string): Promise<AuthEntity> {
    return this.authRepository.update({ uuid, expires_at: new Date() });
  }
}
