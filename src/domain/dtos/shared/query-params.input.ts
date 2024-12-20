import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsSort } from 'src/aplication/validators/sort';


@InputType()
export class QueryParamsInput {
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true, defaultValue: 1 })
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true, defaultValue: 10 })
  pageSize: number = 10;

  @IsString()
  @IsOptional()
  @IsSort()
  @Field({ nullable: true })
  orderBy?: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  from?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  to?: Date;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  cache: boolean = true;
}