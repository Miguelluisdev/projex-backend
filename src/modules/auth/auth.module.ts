import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { enviroment } from 'src/aplication/config/enviroment';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: enviroment.JWT_SECRET,
      global: true,
      signOptions: {
        expiresIn: '15d',
      },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
