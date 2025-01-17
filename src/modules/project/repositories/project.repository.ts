import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/aplication/repositories/factories/repository.factory';
import { CreateProjectInput } from 'src/domain/dtos/project/create-project.input';
import { UpdateProjectInput } from 'src/domain/dtos/project/update-project.input';
import { QueryBuilderEntity } from 'src/domain/entities/builder/query-builder.entity';
import { ProjectEntity } from 'src/domain/entities/project/project.entity';

@Injectable()
export class ProjectRepository extends RepositoryFactory<
  ProjectEntity,
  CreateProjectInput,
  UpdateProjectInput
> {
  constructor() {
    super('Project');
  }

  // parou de dar erro se der provavelmente no enum
  findAll(query: QueryBuilderEntity): Promise<ProjectEntity[]> {
    return this.prismaService.project.findMany(query);
  }
  
  findByCreator(creator_id: string): Promise<ProjectEntity | null> {
    return this.prismaService.project.findFirst({
      where: { creator_id, deleted_at: null },
    });
  }

  findById(uuid: string): Promise<ProjectEntity | null> {
    return this.prismaService.project.findFirst({
      where: {
        uuid,
        deleted_at: null,
      },
    });
  }
}
