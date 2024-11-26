import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UserService } from '../user/services/user.service';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
