import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';
import { UserEntity } from 'src/domain/entities/user/user.entity';

@ObjectType()
export class UserTypeEntity implements UserType {
  @Field(() => ID, { description: 'ID único do tipo de usuário' })
  uuid: string;

  @Field(() => ID, { description: 'ID do usuário relacionado' })
  user_id: string;

  @Field(() => UserEntity, {
    description: 'Usuário relacionado ao tipo de usuário',
  })
  user: UserEntity;

  @Field(() => String, { description: 'E-mail do usuário relacionado' })
  email: string;

  @Field(() => String, { description: 'Posição ou cargo do usuário' })
  position: string;

  @Field(() => Date, { description: 'Data de criação do registro' })
  created_at: Date;

  @Field(() => Date, { description: 'Data de atualização do registro' })
  updated_at: Date;
}
