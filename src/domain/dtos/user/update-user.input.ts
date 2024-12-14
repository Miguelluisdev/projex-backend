import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password', 'email', 'username']),
) {
  @Field(() => String, { nullable: true }) 
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  username: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsStrongPassword()
  password: string;
}
