import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project, StatusProject } from '@prisma/client';

import { NotificationEntity } from '../notification/notification.entity';
import { PermissionEntity } from '../permission/permission.enitty';
import { TaskEntity } from '../tasks/task.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
export class ProjectEntity implements Project {
  deleted_at: Date;
  @Field(() => ID, { description: 'ID único do projeto' })
  uuid: string;

  @Field(() => String, { description: 'Título do projeto' })
  title: string;

  @Field(() => String, { description: 'Descrição do projeto' })
  description: string;

  @Field(() => String, { description: 'Tipo do projeto' })
  type_project: string;

  @Field(() => String, { description: 'Categoria do projeto' })
  category: string;

  @Field(() => String, { description: 'Objetivo do projeto' })
  goal: string;

  @Field(() => Date, { description: 'Data de início do projeto' })
  start_date: Date;

  @Field(() => Date, { description: 'Data de término do projeto' })
  end_date: Date;

  @Field(() => Date, { description: 'Data de criação do projeto' })
  created_at: Date;

  @Field(() => Date, { description: 'Data de atualização do projeto' })
  updated_at: Date;

  @Field(() => ID, { description: 'ID do criador do projeto' })
  creator_id: string;

  @Field(() => UserEntity, {
    description: 'Criador do projeto',
    nullable: true, // Pode ser nulo se os dados do criador não forem carregados
  })
  creator?: UserEntity;

  @Field(() => [TaskEntity], {
    description: 'Tarefas associadas ao projeto',
    nullable: true,
  })
  tasks?: TaskEntity[];

  @Field(() => [NotificationEntity], {
    description: 'Notificações associadas ao projeto',
    nullable: true,
  })
  notifications?: NotificationEntity[];

  @Field(() => [PermissionEntity], {
    description: 'Permissões do projeto',
    nullable: true,
  })
  permission?: PermissionEntity[];

  @Field(() => StatusProject, { description: 'Status atual do projeto' })
  status_project: StatusProject;
}
