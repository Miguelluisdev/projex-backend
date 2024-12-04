import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Permission } from '@prisma/client';
import { ProjectEntity } from 'src/domain/entities/project/project.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { PermissionType } from 'src/domain/enums/permission.enum';

@ObjectType()
export class PermissionEntity implements Permission {
  @Field(() => ID, { description: 'ID único da permissão' })
  uuid: string;

  @Field(() => ID, { description: 'ID do usuário que possui a permissão' })
  user_id: string;

  @Field(() => UserEntity, {
    description: 'Usuário relacionado à permissão',
  })
  user: UserEntity;

  @Field(() => ID, {
    description: 'ID do projeto ao qual a permissão se refere',
    nullable: true,
  })
  project_id: string;

  @Field(() => ProjectEntity, {
    description: 'Projeto relacionado à permissão',
    nullable: true,
  })
  project?: ProjectEntity;

  @Field(() => String, {
    description: 'Tipo de permissão concedida (e.g., leitura, escrita, admin)',
  })
  permission_type: PermissionType;

  @Field(() => ID, { description: 'ID do usuário que concedeu a permissão' })
  granted_by: string;

  @Field(() => Date, { description: 'Data em que a permissão foi concedida' })
  grantedAt: Date;
}
