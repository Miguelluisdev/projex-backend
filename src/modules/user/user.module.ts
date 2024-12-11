import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/services/user.service';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [AuthModule],
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
