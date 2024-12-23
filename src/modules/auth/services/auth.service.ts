import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { addDays, addMinutes } from 'date-fns';
import { ServiceBase } from 'src/aplication/bases/services/service.base';
import { AuthInput } from 'src/domain/dtos/auth/auth.dto';
import { ForgotPasswordInput } from 'src/domain/dtos/auth/forgot-password.input';
import { ResetPasswordInput } from 'src/domain/dtos/auth/reset-password.input';
import { UpdateAuthInput } from 'src/domain/dtos/auth/update-auth.input';
import { AuthEntity } from 'src/domain/entities/auth/auth.entity';
import { MailerService } from 'src/modules/mail/mail.service';
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
    private readonly mailerService: MailerService,
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

  async forgotPassword(input: ForgotPasswordInput): Promise<boolean> {
    const user = await this.userService.findByEmail(input.email);

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    const token = this.jwtService.sign(
      { sub: user.uuid },
      { expiresIn: '15m' },
    );

    // adicionar o envio de email com este link
    const link = `http://localhost:3000/reset-password?token=${token}`;

    await this.mailerService.sendMail(
      user.email,
      'Redefinição de Senha',
      `Acesse o link para redefinir sua senha: ${link}`,
      `<p>Olá,</p>
       <p>Para redefinir sua senha, clique no link abaixo:</p>
       <a href="${link}">Redefinir Senha</a>
       <p>Este link é válido por 15 minutos.</p>`,
    );

    console.log('Email de redefinição enviado:', link);
    return true;
  }

  async resetPassword(input: ResetPasswordInput): Promise<string> {
    let payload;

    try {
      payload = this.jwtService.verify(input.token);
    } catch (error) {
      throw new HttpException('Token invalido', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.userService.updatePassword(user.uuid, input.password);
    console.log('password reseted');

    await this.mailerService.sendMail(
      user.email,
      'Senha Alterada com Sucesso',
      `Sua senha foi alterada com sucesso.`,
      `<p>Olá,</p>
       <p>Sua senha foi alterada com sucesso. Caso não tenha sido você, entre em contato com o suporte imediatamente.</p>
       <p><a href="http://localhost:3000">Acessar Sistema</a></p>`,
    );

    const newToken = this.jwtService.sign(
      { sub: user.uuid },
      { expiresIn: '15d' },
    );

    return newToken;
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
