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

  @Query(() => [ProjectEntity], { name: 'project' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => ProjectEntity, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => ProjectEntity)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.update(
      updateProjectInput.id,
      updateProjectInput,
    );
  }

  @Mutation(() => ProjectEntity)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.remove(id);
  }
}
