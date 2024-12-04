import { registerEnumType } from '@nestjs/graphql';

export enum PermissionType {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

registerEnumType(PermissionType, {
  name: 'Permission',
  description: 'Autorização dos usuarios',
});
