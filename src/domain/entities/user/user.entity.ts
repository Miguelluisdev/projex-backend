import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserMain } from '@prisma/client';
import { AuthEntity } from '../auth/auth.entity';
import { NotificationEntity } from '../notification/notification.entity';
import { ProjectEntity } from '../project/project.entity';
import { TaskEntity } from '../tasks/task.entity';

@ObjectType()
export class UserEntity implements UserMain {
  @Field(() => ID, { description: 'uuid unico', nullable: true })
  uuid: string;

  @Field(() => String, { description: 'Name of the user' })
  username: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Password user' })
  password: string;

  @Field(() => Date, {
    description: 'Creation timestamp of the user',
    nullable: true,
  })
  created_at: Date;

  @Field(() => Date, {
    description: 'Last update timestamp of the user',
    nullable: true,
  })
  updated_at: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Deletion timestamp of the user, if deleted',
  })
  deleted_at: Date;

  @Field(() => [ProjectEntity], {
    description: 'Projects associated with the user',
    nullable: true,
  })
  projects?: ProjectEntity[];

  @Field(() => [TaskEntity], {
    description: 'Tasks associated with the user',
    nullable: true,
  })
  tasks?: TaskEntity[];

  @Field(() => [NotificationEntity], {
    description: 'Notifications associated with the user',
    nullable: true,
  })
  notifications?: AuthEntity[];
  @Field(() => [AuthEntity], {
    description: 'Notifications associated with the user',
    nullable: true,
  })
  Auth?: AuthEntity[];

  @Field({ nullable: true })
  token?: string | null;
}
