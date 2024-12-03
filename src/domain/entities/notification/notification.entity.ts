import { Field, ID, ObjectType } from '@nestjs/graphql';

import { NotificationType } from 'src/domain/enums/notification.enum';
import { ProjectEntity } from '../project/project.entity';
import { TaskEntity } from '../tasks/task.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
export class NotificationEntity {
  @Field(() => ID, { description: 'ID único da notificação' })
  uuid: string;

  @Field(() => NotificationType, { description: 'Tipo de notificação' })
  type: NotificationType;

  @Field(() => String, { description: 'E-mail associado à notificação' })
  email: string;

  @Field(() => String, { description: 'Mensagem da notificação' })
  message: string;

  @Field(() => ID, { description: 'ID do usuário relacionado', nullable: true })
  user_id: string | null;

  @Field(() => UserEntity, {
    description: 'Usuário relacionado à notificação',
    nullable: true,
  })
  user: UserEntity | null;

  @Field(() => ID, { description: 'ID do projeto relacionado', nullable: true })
  project_id: string | null;

  @Field(() => ProjectEntity, {
    description: 'Projeto relacionado à notificação',
    nullable: true,
  })
  project: ProjectEntity | null;

  @Field(() => ID, { description: 'ID da tarefa relacionada', nullable: true })
  task_id: string | null;

  @Field(() => TaskEntity, {
    description: 'Tarefa relacionada à notificação',
    nullable: true,
  })
  task: TaskEntity | null;

  @Field(() => Date, {
    description: 'Data em que a notificação foi lida',
    nullable: true,
  })
  read_at: Date | null;

  @Field(() => Date, { description: 'Data de criação da notificação' })
  created_at: Date;
}
