import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateUserTypeInput } from './create-user-type.input';

@InputType()
export class UpdateUserTypeInput extends PartialType(CreateUserTypeInput) {
  @Field(() => Int)
  id: number;
}
