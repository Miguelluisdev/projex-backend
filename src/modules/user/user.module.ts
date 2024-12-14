import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/services/user.service';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService, PrismaService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
