import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from '../../../domain/dtos/project/create-project.input';
import { UpdateProjectInput } from '../../../domain/dtos/project/update-project.input';
import { ProjectEntity } from '../../../domain/entities/project/project.entity';
import { ProjectService } from '../services/project.service';

@Resolver(() => ProjectEntity)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => ProjectEntity)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.create(createProjectInput);
  }

  @Query(() => [ProjectEntity], { name: 'findAllProject' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => ProjectEntity, { name: 'findProjectById' })
  findById(@Args('id', { type: () => Int }) uuid: string) {
    return this.projectService.findOne(uuid);
  }

  @Mutation(() => ProjectEntity)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.update(updateProjectInput);
  }

  @Mutation(() => ProjectEntity)
  removeProject(@Args('uuid', { type: () => String }) uuid: string) {
    return this.projectService.remove(uuid);
  }
}
