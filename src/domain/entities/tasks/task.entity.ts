import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tasks } from '@prisma/client';
import { NotificationEntity } from 'src/domain/entities/notification/notification.entity';
import { ProjectEntity } from 'src/domain/entities/project/project.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { Status } from 'src/domain/enums/status.enum';

@ObjectType()
export class TaskEntity implements Tasks {
  @Field(() => ID, { description: 'ID único da tarefa' })
  uuid: string;

  @Field(() => ID, { description: 'ID do projeto associado' })
  project_id: string;

  @Field(() => String, { description: 'Título da tarefa' })
  title: string;

  @Field(() => String, { description: 'Descrição da tarefa' })
  description: string;

  @Field(() => String, {
    description: 'ID do usuário designado',
    nullable: true,
  })
  assigned_to: string | null;

  @Field(() => UserEntity, {
    description: 'Usuário designado para a tarefa',
    nullable: true,
  })
  assignee: UserEntity | null;

  @Field(() => Status, { description: 'Status atual da tarefa' })
  status: Status;

  @Field(() => Date, { description: 'Data de início da tarefa' })
  start_date: Date;

  @Field(() => Date, {
    description: 'Data de vencimento da tarefa',
    nullable: true,
  })
  due_date: Date | null;

  @Field(() => Date, { description: 'Data de criação da tarefa' })
  created_at: Date;

  @Field(() => Date, { description: 'Data de atualização da tarefa' })
  updated_at: Date;

  @Field(() => Date, {
    description: 'Data de conclusão da tarefa',
    nullable: true,
  })
  completed_at: Date | null;

  @Field(() => ProjectEntity, {
    description: 'Projeto ao qual a tarefa pertence',
  })
  project: ProjectEntity;

  @Field(() => [NotificationEntity], {
    description: 'Notificações relacionadas à tarefa',
  })
  notifications: NotificationEntity[];
}
