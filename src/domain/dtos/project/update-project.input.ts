import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusProject } from 'src/domain/enums/status.project.enum';
import { CreateProjectInput } from './create-project.input';

@InputType()
export class UpdateProjectInput extends OmitType(CreateProjectInput, [
  'title',
  'category',
  'description',
  'end_date',
  'start_date',
  'goal',
  'type_project',
]) {
  @IsUUID()
  @IsString()
  @Field(() => String, { description: 'ID único do projeto' })
  uuid: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: 'Título do projeto' })
  title?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: 'Tipo do projeto' })
  type_project?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: 'Descrição do projeto' })
  description?: string;

  @IsOptional()
  @IsDate()
  @Field(() => String, { nullable: true, description: 'Data de término' })
  end_date?: Date;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: 'Categoria do projeto' })
  category?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: 'Meta do projeto' })
  goal?: string;

  @IsOptional()
  @IsEnum(StatusProject)
  @Field(() => StatusProject, {
    nullable: true,
    description: 'Status do projeto',
  })
  status_project?: StatusProject;
}
