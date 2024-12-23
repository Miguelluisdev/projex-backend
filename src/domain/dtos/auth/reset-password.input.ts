import { Field, InputType } from '@nestjs/graphql';
import {
  IsJWT,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  isNotEmpty,
} from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  token: string;

  @Field(() => String)
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
