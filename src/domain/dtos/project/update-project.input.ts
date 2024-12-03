import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateProjectInput } from 'src/domain/dtos/project/create-project.input';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => Int)
  id: number;
}
