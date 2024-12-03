import { Module } from '@nestjs/common';
import { PermissionResolver } from './resolvers/permission.resolver';
import { PermissionService } from './services/permission.service';

@Module({
  providers: [PermissionResolver, PermissionService],
})
export class PermissionModule {}
