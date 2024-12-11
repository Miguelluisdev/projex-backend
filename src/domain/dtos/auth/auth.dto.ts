import { Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
