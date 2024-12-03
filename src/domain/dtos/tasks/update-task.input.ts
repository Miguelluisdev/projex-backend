import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from 'src/domain/dtos/tasks/create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int)
  id: number;
}
