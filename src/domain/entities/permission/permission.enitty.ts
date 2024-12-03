import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProjectEntity } from 'src/domain/entities/project/project.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';

@ObjectType()
export class PermissionEntity {
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
  permission_type: string;

  @Field(() => ID, { description: 'ID do usuário que concedeu a permissão' })
  granted_by: string;

  @Field(() => Date, { description: 'Data em que a permissão foi concedida' })
  grantedAt: Date;
}
