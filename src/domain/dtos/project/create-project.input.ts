import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusProject } from 'src/domain/enums/status.project.enum';

@InputType()
export class CreateProjectInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  type_project: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Field(() => String)
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @Field(() => String)
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  category: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  goal: string;

}
