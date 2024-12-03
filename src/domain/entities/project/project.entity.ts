import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NotificationEntity } from '../notification/notification.entity';
import { PermissionEntity } from '../permission/permission.enitty';
import { TaskEntity } from '../tasks/task.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
export class ProjectEntity {
  @Field(() => ID, { description: 'ID único do projeto' })
  uuid: string;

  @Field(() => String, { description: 'Título do projeto' })
  title: string;

  @Field(() => String, { description: 'Descrição do projeto' })
  description: string;

  @Field(() => String, { description: 'Tipo do projeto' })
  type_project: string;

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

  @Field(() => UserEntity, { description: 'Criador do projeto' })
  creator: UserEntity;

  @Field(() => [TaskEntity], { description: 'Tarefas associadas ao projeto' })
  tasks: TaskEntity[];

  @Field(() => [NotificationEntity], {
    description: 'Notificações associadas ao projeto',
  })
  notifications: NotificationEntity[];

  @Field(() => [PermissionEntity], { description: 'Permissões do projeto' })
  permission: PermissionEntity[];
}
