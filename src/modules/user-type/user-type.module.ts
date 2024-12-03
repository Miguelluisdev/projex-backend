import { Module } from '@nestjs/common';
import { UserTypeResolver } from './resolvers/user-type.resolver';
import { UserTypeService } from './services/user-type.service';

@Module({
  providers: [UserTypeResolver, UserTypeService],
})
export class UserTypeModule {}
