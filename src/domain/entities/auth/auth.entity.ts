import { Field, ObjectType } from '@nestjs/graphql';
import { Auth } from '@prisma/client';

@ObjectType()
export class AuthEntity implements Auth {
  @Field()
  uuid: string;

  @Field()
  user_id: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;

  @Field(() => Date, { nullable: true })
  expires_at: Date | null;

  @Field({ nullable: true })
  token?: string | null;
}
